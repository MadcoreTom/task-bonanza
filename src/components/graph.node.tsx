import * as React from "react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

const TILE_WIDTH = 150;

function GraphNode(props: { text: string, x: number, y: number, colour: string, emoji?:string }) {
    console.log(props)
    return <g transform={`translate(${props.x},${props.y})`} onMouseDown={evt => console.log(props.text)}>
        <rect
            x={0} y={0}
            width={TILE_WIDTH} height={100}
            fill="white"
            stroke={props.colour}
            strokeWidth={2}
            rx={10}
            className="hoverable"
        >
        </rect>

        <text x={TILE_WIDTH / 2} y={20} fill="black" textAnchor="middle">{props.text}</text>
        {props.emoji && <text x={10} y={10} >{props.emoji}</text>}
    </g>
}

export function GraphNodes() {
    const headings = useSelector((state: RootState) => state.main.headings);
    const data = useSelector((state: RootState) => state.main.data);
    const view = useSelector((state: RootState) => state.main.view);
    const textIdx = headings.map((h, i) => h.name == view.textColumn ? i : null).filter(x => x != null)[0] || 0;
    const xIdx = headings.map((h, i) => h.type == "X" ? i : null).filter(x => x != null)[0] || 0;
    const yIdx = headings.map((h, i) => h.type == "Y" ? i : null).filter(x => x != null)[0] || 0;
    const colourIdx = headings.map((h, i) => h.name == view.colourColumn ? i : null).filter(x => x != null)[0] || 0;
    const colourMapping = headings.filter(h=> h.name == view.colourColumn && h.type == "KEYWORD" ).map(h=>h.mapping)[0];
    const emojiIdx = headings.map((h, i) => h.name == view.emojiColumn ? i : null).filter(x => x != null)[0] || 0;
    const emojiMapping = headings[emojiIdx].type == "KEYWORD" ? headings[emojiIdx].mapping : {};
    console.log("EMOJIMAPPING", emojiMapping)

    return <g>
        {
            data.map(row => 
                <GraphNode 
                text={row[textIdx]}
                 x={parseFloat(row[xIdx])} 
                 y={parseFloat(row[yIdx])} 
                 colour={colourMapping[row[colourIdx]]?.colour}
                 emoji={emojiMapping[row[emojiIdx]]?.emoji}
                 />
            )
        }
    </g>
}