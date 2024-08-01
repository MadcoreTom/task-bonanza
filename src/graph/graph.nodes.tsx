import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelection } from "../state/store";
import { Record } from "../model/data";

export function GraphNodes(props: { transformer: NodeViewTransformer }) {
    const recordCount = useSelector((state: RootState) => state.main.records.length);
    console.log("$ re-render nodes");

    const nodes: any[] = [];

    for (let i = 0; i < recordCount; i++) {
        nodes.push(<GraphNode idx={i} key={i} transformer={props.transformer} />)
    }

    return <React.Fragment>
        {nodes}
    </React.Fragment>
}

export type NodeViewTransformer = {
    getTitle: (record: Record) => string,
    getColour: (record: Record) => string
}

function GraphNode(props: { idx: number, transformer: NodeViewTransformer }) {
    const record = useSelector((state: RootState) => state.main.records[props.idx]);
    const data = useSelector((state: RootState) => state.main.views[state.main.tab].data[props.idx]);
    const dispatch = useDispatch();

    const x = data ? data.pos[0] : props.idx * 200;
    const y= data ? data.pos[1]: (props.idx * 60) % 600;

    return <g transform={`translate(${x},${y})`}>
        <rect
            x={0} y={0}
            width={200} height={60}
            fill="white"
            stroke={props.transformer.getColour(record)}
            strokeWidth={2}
            rx={10}
            className="hoverable"
        onMouseDown={evt => { dispatch(setSelection({/* x: props.x, y: props.y, idx: props.idx*/ type:"node", idx:props.idx, mouseDown:true, pos:[x, y ]})); evt.stopPropagation(); }}
        // onDoubleClick={props.onDoubleClick}
        >
        </rect>
        <text x={100} y="15" textAnchor="middle">{props.transformer.getTitle(record)}</text>
    </g>
}

export function GhostNode( ) {
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "node" && state.main.selected.mouseDown ? state.main.selected : null);

    if(!selected){
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
            style={{pointerEvents:"none"}}
        >
        </rect>
    </g>
}