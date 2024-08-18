import * as React from "react";
import { ColumnDef, ViewDef } from "../model/view.model";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export function Swimlanes(props: { column: ColumnDef, view: ViewDef }) {
    const xOffset = useSelector((state: RootState) => state.main.offset[0]);
    if (props.column && props.column.type == "Keyword") {
        const sortedSwimlanes = props.view.swimlanes || [];
        // make this span the full height and have a floating title
        return <g transform={`translate(${xOffset},0)`}>
            {sortedSwimlanes.map((k, i) =>
                <g transform={`translate(${i * 250},0)`} key={i}>
                    <rect fill="#ccccce" stroke="transparent" width="220" height="100%" r="10" opacity={0.25}>
                    </rect>
                    <text y="15" x="125" textAnchor="middle">{k}</text>
                </g>
            )
            }
        </g>
    }
    return null;
}