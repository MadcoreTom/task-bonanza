import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

function Arrow(props: { start: [number, number], end: [number, number] }) {
    const width = 200;
    const yOffset = 30;
    const curved = 50;
    return <path
        d={`M ${props.start[0] + width} ${props.start[1] + yOffset} C ${props.start[0] + width + curved} ${props.start[1] + yOffset}, ${props.end[0] - curved} ${props.end[1] + yOffset} ${props.end[0]} ${props.end[1] + yOffset}`}
        stroke="black" fill="transparent" strokeWidth="2" markerEnd="url(#arrowhead0)"
    />
}


export function Arrows() {
    const view = useSelector((state: RootState) => state.main.views[state.main.tab]);
    const arrowColumn = view.arrows as number; // TODO could be null
    const column = useSelector((state: RootState) => arrowColumn != null ? state.main.columns[arrowColumn] : null);
    const records = useSelector((state: RootState) => (column && column.type == "Link" && arrowColumn != null) ? state.main.records.map((r, i) => { return { startIdx: i, targets: r.columns[arrowColumn], key: r.columns[column.references] } }) : []);


    function getPos(idx: number): [number, number] {
        return view.data[idx] ? view.data[idx].pos : [0, 0];
    }

    const records2 = records.filter(r=>r.targets.trim().length > 0).map(r => {
        return {
            ...r, targetIdx: r.targets.split(",").map(t => {
                return records.map((z, j) => { return { idx: j, rec: z } }).filter(z => z.rec.key == t).map(z => z.idx)[0];
            }).filter(t => t !== undefined)
        };
    });

    const lines = [] as any[];
    let lineId = 0;
    records2.forEach((r, i) => {
        r.targetIdx.forEach(t => {
            lines.push(<Arrow start={getPos(r.startIdx)} end={getPos(t)} key={lineId++} />)
        })
    });

    return <React.Fragment>{lines}</React.Fragment>;
}

export function PendingArrows() {
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "link" && state.main.selected.pos ? state.main.selected : null);
    if (selected && selected.endIdx == undefined && selected.mouse) {
        // start to mouse
        return <Arrow start={selected.pos as [number, number]} end={selected.mouse} />
    }

    return null;
}