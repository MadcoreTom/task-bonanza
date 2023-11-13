import * as React from "react";
import { GraphNodes } from "./graph.node";

export function Graph(props:{nodes:any}) {
    let [offset, setOffset] = React.useState([0, 0])

    function onDrag(evt: React.MouseEvent) {
        if (evt.buttons > 0) {
            setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY])
        }
    }

    return <svg height="600"
        id="graph"
        onMouseMoveCapture={onDrag}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px`}}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
        <rect x={0} y={0} width={100} height={100} stroke="blue" strokeWidth={10} fill="transparent" />
       {props.nodes}
        </g>
        <rect x={0} y={0} width={100} height={100} stroke="red" strokeWidth={10} fill="transparent"  />
    </svg>
}
