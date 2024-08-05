import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragNode, releaseNode, RootState } from "../state/store";
import { GhostNode, GraphNodes, NodeViewTransformer } from "./graph.nodes";
import { HSL, interpolateHsl, textToHsl } from "../colour";
import { ColumnDef } from "../model/view.model";
import { Record } from "../model/data";

export function Graph(props: { viewIdx: number }) {
    // TODO the view data casuues this to re-render on every drag
    const view = useSelector((state: RootState) => state.main.views[props.viewIdx]);
    const columns = useSelector((state: RootState) => state.main.columns);

    console.log("💲💲 Graph redraw")

    const colourColumn = view.colour == null ? null : columns[view.colour];

    function transformColour(record: Record): HSL {
        if (!colourColumn || view.colour == null) {
            return [0, 0, 0];
        }
        const val = record.columns[view.colour];
        switch (colourColumn.type) {
            case "Number":
                return interpolateHsl(val, colourColumn.minColour, colourColumn.maxColour);
            case "Keyword":
                return colourColumn.map[val]?.colour ? colourColumn.map[val].colour : textToHsl(val);
            case "Alphabetical":
            default:
                return textToHsl(val);
        }
    }

    const transformer: NodeViewTransformer = {
        getColour: transformColour,
        getTitle: (record) => view.title != null ? record.columns[view.title] : "null",
        getText: (record) => view.text != null ? record.columns[view.text] : "",
    }

    return <PannableSvg>
        <GraphNodes transformer={transformer} />
        <GhostNode />
        <marker id="arrowhead0" viewBox="0 0 60 60" refX="44" refY="34" markerUnits="strokeWidth" markerWidth="8" markerHeight="10" orient="auto">
            <path d="M 0 0 L 60 30 L 0 60 z" fill="#800000" /> </marker>
        <Arrows />
    </PannableSvg>
}


/**
 * Creates a SVG and pans the background and the main <g>
 * without re-rendering the child components
 */
function PannableSvg({ children }) {
    let [offset, setOffset] = React.useState([0, 0]);
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "node" && state.main.selected.mouseDown);// if a node is selected
    const dispatch = useDispatch();

    function onDrag(evt: React.MouseEvent) {
        if (evt.buttons > 0) {
            if (selected) {
                dispatch(dragNode({ delta: [evt.movementX, evt.movementY] }));
            } else {
                setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]);
            }
        }
    }

    return <svg height="600"
        id="graph"
        onMouseMoveCapture={onDrag}
        onMouseUp={() => dispatch(releaseNode())}
        onMouseLeave={() => dispatch(releaseNode())}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {children}
        </g>
    </svg>

}


function Arrows() {
    const view = useSelector((state: RootState) => state.main.views[state.main.tab]);
    const arrowColumn = view.arrows as number; // TODO could be null
    const column = useSelector((state: RootState) => arrowColumn != null ? state.main.columns[arrowColumn] : null);
    const records = useSelector((state: RootState) => (column && column.type == "Link" && arrowColumn != null) ? state.main.records.map((r,i) => { return { startIdx:i, targets: r.columns[arrowColumn], key: r.columns[column.references] } }) : []);


    function getPos(idx: number, axis: 0 | 1): number {
        return view.data[idx] ? view.data[idx].pos[axis] : 0;
    }

    const records2 = records.map(r => {
        return {
            ...r, targetIdx: r.targets.split(",").map(t => {
                return records.map((z, j) => { return { idx: j, rec: z } }).filter(z => z.rec.key == t).map(z => z.idx)[0];
            }).filter(t=>t !== undefined)
        };
    });

    const lines = [] as any[];
    records2.forEach((r, i) => {
         r.targetIdx.forEach(t => {
            lines.push(<line stroke="black"
                x1={getPos(r.startIdx, 0) + 200} y1={getPos(r.startIdx, 1)+30}
                x2={getPos(t, 0)} y2={getPos(t, 1)+30}
                marker-end="url(#arrowhead0)" />)
        })
    });

    return <React.Fragment>{lines}</React.Fragment>;
}