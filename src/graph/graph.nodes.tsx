import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
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

    return <g transform={`translate(${props.idx * 200},${(props.idx * 60) % 600})`}>
        <rect
            x={0} y={0}
            width={200} height={60}
            fill="white"
            stroke={props.transformer.getColour(record)}
            strokeWidth={2}
            rx={10}
            className="hoverable"
        // onMouseDown={evt => { dispatch(selectNode({ x: props.x, y: props.y, idx: props.idx })); evt.stopPropagation(); }}
        // onDoubleClick={props.onDoubleClick}
        >
        </rect>
        <text x={100} y="15" textAnchor="middle">{props.transformer.getTitle(record)}</text>
    </g>
}