import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickNode, mouseUpNode, RootState, setSelection } from "../state/store";
import { hslToBorder, hslToFill, hslToOutline } from "../colour";
import { calculateWrap } from "../text-measure-util";
import { NodeViewTransformer } from "./graph.transformer";

export function GraphNodes(props: { transformer: NodeViewTransformer }) {
    const recordCount = useSelector((state: RootState) => state.main.records.length);
    console.log("💲 re-render nodes");

    const nodes: any[] = [];

    for (let i = 0; i < recordCount; i++) {
        nodes.push(<GraphNode idx={i} key={i} transformer={props.transformer} />)
    }

    return <React.Fragment>
        {nodes}
    </React.Fragment>
}

function GraphNode(props: { idx: number, transformer: NodeViewTransformer }) {
    const record = useSelector((state: RootState) => state.main.records[props.idx]);
    const data = useSelector((state: RootState) => state.main.views[state.main.tab].data[props.idx]);
    const dispatch = useDispatch();

    const fixedX = props.transformer.getX(record);
    const x = fixedX == null ? (data ? data.pos[0] : props.idx * 200) : fixedX;
    const y = data ? data.pos[1] : (props.idx * 60) % 600;

    const hsl = props.transformer.getColour(record);

    const text = props.transformer.getText(record);
    const textLines = calculateWrap(text, 195, "12pt unset inherit");

    const fs = 12;
    return <g transform={`translate(${x},${y})`}>
        <rect
            x={0} y={0}
            width={200} height={60}
            fill="white"
            stroke={hslToOutline(hsl)}
            strokeWidth={1}
            rx={5}
            className="hoverable node"
            onMouseDown={evt => { dispatch(clickNode({ idx: props.idx, pos: [x, y] })); evt.stopPropagation(); }}
            onMouseUp={evt => { dispatch(mouseUpNode({ idx: props.idx, pos: [x, y] })); evt.stopPropagation(); }}
            style={{ filter: `drop-shadow(0 2px 4px ${hslToFill(hsl)})` }}
        >
        </rect>
        <line x1={0} y1={0} x2={0} y2={60} strokeWidth={10} stroke={hslToBorder(hsl)} clipPath="url(#nodeClip)" />

        <text x={100} y="15" textAnchor="middle">{props.transformer.getTitle(record)}</text>
        {textLines.map((t, i) => <text x={100} y={30 + fs * i} textAnchor="middle" fontSize={fs} key={i}>{t}</text>)}
    </g>
}

export function GhostNode() {
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "node" && state.main.selected.mouseDown ? state.main.selected : null);

    if (!selected) {
        return null;
    }

    return <g transform={`translate(${selected.pos[0]},${selected.pos[1]})`}>
        <rect
            x={0} y={0}
            width={200} height={60}
            fill="transparent"
            stroke="red"
            strokeWidth={2}
            rx={10}
            className="hoverable"
            strokeDasharray="4,2"
            style={{ pointerEvents: "none" }}
        >
        </rect>
    </g>
}


export function SelectedNode() {
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "node" && !state.main.selected.mouseDown ? state.main.selected : null);
    const data = useSelector((state: RootState) => selected ? state.main.views[state.main.tab].data[selected.idx] : null);
    const hasArrows = useSelector((state: RootState) => !!state.main.views[state.main.tab].arrows);
    const dispatch = useDispatch();

    if (!data || !selected) {
        return null;
    }

    return <g transform={`translate(${data.pos[0]},${data.pos[1]})`}>
        <rect
            x={-5} y={-5}
            width={210} height={70}
            fill="transparent"
            stroke="black"
            strokeWidth={2}
            rx={10}
            className="hoverable"
            style={{ pointerEvents: "none" }}
        >
        </rect>
        {hasArrows ?
            <circle cx={205} cy={30} r={10}
                fill="white"
                stroke="black"
                style={{ cursor: "pointer" }}
                onClick={(e) => dispatch(setSelection({ type: "link", startIdx: selected.idx, pos: [data.pos[0], data.pos[1]], mouse: [data.pos[0] + 200, data.pos[1]] }))} /> : null}
    </g>
}