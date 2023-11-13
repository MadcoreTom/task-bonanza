import * as React from "react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

function GraphNode(props: { text: string, x: number, y: number }) {
    return <g transform={`translate(${props.x},${props.y})`} onMouseDown={evt => console.log(props.text)}>
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
    const textIdx = headings.map((h, i) => h.name == view.textColumn ? i : null).filter(x => x != null)[0] || 0;
    const xIdx = headings.map((h, i) => h.type == "X" ? i : null).filter(x => x != null)[0] || 0;
    const yIdx = headings.map((h, i) => h.type == "Y" ? i : null).filter(x => x != null)[0] || 0;

    return <g>
        {
            data.map(row => <GraphNode text={row[textIdx]} x={parseFloat(row[xIdx])} y={parseFloat(row[yIdx])} />)
        }
    </g>
}