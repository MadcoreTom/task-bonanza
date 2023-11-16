import * as React from "react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

const TILE_WIDTH = 150;

export function GraphGhost() {
    const selected = useSelector((state: RootState) => state.main.selected);

    if (!selected) {
        return null;
    }

    return <g transform={`translate(${selected.x},${selected.y})`}>
        <rect
            x={0} y={0}
            width={TILE_WIDTH} height={100}
            fill="transparent"
            stroke="teal"
            strokeWidth={2}
            rx={10}
            style={{pointerEvents:"none"}}
            strokeDasharray="4,2"
        >
        </rect>
    </g>
}
