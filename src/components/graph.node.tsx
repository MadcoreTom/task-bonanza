import * as React from "react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

function GraphNode(props: { text: string }) {
    return <g transform={`translate(${Math.random() * 600},${Math.random() * 600})`}>
        <rect
            x={0} y={0}
            width={200} height={100}
            fill="white"
            stroke="blue"
        >
        </rect>

        <text x={4} y={50} fill="black">{props.text}</text>
    </g>
}

export function GraphNodes() {
    const headings = useSelector((state: RootState) => state.main.headings);
    const data = useSelector((state: RootState) => state.main.data);
    const view = useSelector((state: RootState) => state.main.view);
    const textIdx = headings.map((h,i)=>h.name == view.textColumn ? i : null).filter(x=>x!=null)[0] || 0;

    return <g>
        {
            data.map(row => <GraphNode text={row[textIdx]} />)
        }
    </g>
}