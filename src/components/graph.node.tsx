import * as React from "react";
import { RootState, selectNode } from "../state/store";
import { useDispatch, useSelector } from "react-redux";

const TILE_WIDTH = 150;

function GraphNode(props: { text: string, x: number, y: number, colour: string, emoji?:string }) {
    const dispatch = useDispatch();
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
            onMouseDown={evt=>{dispatch(selectNode({x:props.x,y:props.y}));evt.stopPropagation();}}
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
    const emojiIdx = headings.map((h, i) => h.name == view.emojiColumn ? i : null).filter(x => x != null)[0] || 0;
    const emojiMapping = headings[emojiIdx].type == "KEYWORD" ? headings[emojiIdx].mapping : {};
    

    const colourHeading = headings[colourIdx];
    let colourMappingFunction:(val:string)=>string = a=>colourHeading.mapping[a]?.colour;
    if(colourHeading.type == "NUMBER"){
        colourMappingFunction = v=>{
            const n = parseFloat(v);
            const a = (n-colourHeading.min)/(colourHeading.max-colourHeading.min); // 0 to 1
            const b = 1-a; // 1 to 0
            const red = colourHeading.minRGB[0] * b + colourHeading.maxRGB[0] * a;
            const green = colourHeading.minRGB[1] * b + colourHeading.maxRGB[1] * a;
            const blue = colourHeading.minRGB[2] * b + colourHeading.maxRGB[2] * a;
            return `rgb(${red},${green},${blue})`
        }
        console.log("colours")
    } else {
        console.log("CH", colourHeading)
    }

    return <g>
        {
            data.map(row => 
                <GraphNode 
                text={row[textIdx]}
                 x={parseFloat(row[xIdx])} 
                 y={parseFloat(row[yIdx])} 
                 colour={colourMappingFunction(row[colourIdx])}
                 emoji={emojiMapping[row[emojiIdx]]?.emoji}
                 />
            )
        }
    </g>
}