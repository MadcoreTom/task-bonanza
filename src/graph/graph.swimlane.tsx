import * as React from "react";
import { ColumnDef } from "../model/view.model";

export function Swimlanes(props: { column: ColumnDef }) {
    if (props.column.type == "Keyword") {
        const sortedSwimlanes = Object.entries(props.column.map) //.sort((a,b)=>a.)
            .map(([k, v]) => k);

        return <g>
            {sortedSwimlanes.map((k, i) =>
                <g transform={`translate(${i * 250},0)`} key={i}>
                    <rect fill="#aaaaaa" stroke="transparent" width="220" height="1000" r="10" opacity={0.25}>
                    </rect>
                    <text y="15" x="125" textAnchor="middle">{k}</text>
                </g>
            )
            }
        </g>
    }
    return null;
}