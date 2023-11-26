import * as React from "react";
import { RootState, openNodeModal, selectNode } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { calculateWrap } from "../text-measure-util";

const TILE_WIDTH = 150;
const TILE_HEIGHT = 40;

function GraphNode(props: { text: string, x: number, y: number, colour: string, emoji?: string, emojiValue: string, idx: number, onDoubleClick: () => void }) {
    const dispatch = useDispatch();
    const lines = calculateWrap(props.text, 150);
    console.log(props)
    return <g transform={`translate(${props.x},${props.y})`}>
        <rect
            x={0} y={0}
            width={TILE_WIDTH} height={TILE_HEIGHT + lines.length * 20}
            fill="white"
            stroke={props.colour}
            strokeWidth={2}
            rx={10}
            className="hoverable"
            onMouseDown={evt => { dispatch(selectNode({ x: props.x, y: props.y, idx: props.idx })); evt.stopPropagation(); }}
            onDoubleClick={props.onDoubleClick}
        >
        </rect>


        {
            lines.map((line, i) =>
                <text x={TILE_WIDTH / 2} y={45 + i * 20} fill="black" textAnchor="middle" fontFamily="sans-serif" key={i}>{line}</text>
            )
        }
        {props.emoji && <Emoji emoji={props.emoji} text={props.emojiValue} />}
    </g>
}

function Emoji({ emoji, text }: { emoji: string, text: string }) {
    // <text x={10} y={10} textAnchor="middle" alignmentBaseline="middle" fontSize="20px" >{props.emoji}<title>{props.emojiValue}</title></text>
    const w = 30;
    const size = w * 0.6;
    const r = w / 2;
    return <React.Fragment>
        <circle cx={r} cy={r} r={r} fill="#eee">
            <title>{text}</title>
        </circle>
        <text x={r} y={r} textAnchor="middle" alignmentBaseline="middle" fontSize={size + "px"} style={{ pointerEvents: "none" }}>{emoji}</text>
    </React.Fragment>
}

export function GraphNodes() {
    const dispatch = useDispatch();

    const headings = useSelector((state: RootState) => state.main.headings);
    const data = useSelector((state: RootState) => state.main.data);
    const view = useSelector((state: RootState) => state.main.view);
    const textIdx = headings.map((h, i) => h.name == view.textColumn ? i : null).filter(x => x != null)[0] || 0;
    const xIdx = headings.map((h, i) => h.type == "X" ? i : null).filter(x => x != null)[0] || 0;
    const yIdx = headings.map((h, i) => h.type == "Y" ? i : null).filter(x => x != null)[0] || 0;
    const wIdx = headings.map((h, i) => h.type == "W" ? i : null).filter(x => x != null)[0] || 0;

    const colourIdx = headings.map((h, i) => h.name == view.colourColumn ? i : null).filter(x => x != null)[0] || 0;
    const emojiIdx = headings.map((h, i) => h.name == view.emojiColumn ? i : null).filter(x => x != null)[0] || 0;
    const emojiMapping = headings[emojiIdx].type == "KEYWORD" ? headings[emojiIdx].mapping : {};

    console.log("💲 nodes redraw");

    const colourHeading = headings[colourIdx];
    let colourMappingFunction: (val: string) => string = a => colourHeading.mapping[a]?.colour;
    if (colourHeading.type == "NUMBER") {
        colourMappingFunction = v => {
            const n = parseFloat(v);
            const a = (n - colourHeading.min) / (colourHeading.max - colourHeading.min); // 0 to 1
            const b = 1 - a; // 1 to 0
            const red = colourHeading.minRGB[0] * b + colourHeading.maxRGB[0] * a;
            const green = colourHeading.minRGB[1] * b + colourHeading.maxRGB[1] * a;
            const blue = colourHeading.minRGB[2] * b + colourHeading.maxRGB[2] * a;
            return `rgb(${red},${green},${blue})`
        }
    }

    return <g>
        {
            data.map((row, i) =>
                <GraphNode
                    text={row[textIdx]}
                    x={parseFloat(row[xIdx])}
                    y={parseFloat(row[yIdx])}
                    w={parseFloat(row[wIdx])}
                    colour={colourMappingFunction(row[colourIdx])}
                    emoji={emojiMapping[row[emojiIdx]]?.emoji}
                    emojiValue={row[emojiIdx]}
                    idx={i}
                    key={i}
                    onDoubleClick={() => dispatch(openNodeModal(i))}
                />
            )
        }
    </g>
}