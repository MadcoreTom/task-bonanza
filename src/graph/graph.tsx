import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragNode, releaseNode, RootState } from "../state/store";
import { GhostNode, GraphNodes, NodeViewTransformer } from "./graph.nodes";

export function Graph(props: { viewIdx: number }) {

    const view = useSelector((state: RootState) => state.main.views[props.viewIdx]);
    // const dispatch = useDispatch();

    console.log("💲💲 Graph redraw")

    const transformer: NodeViewTransformer = {
        getColour: (record) => view.colour != null ? stringToColor(record.columns[view.colour]) : "red",
        getTitle: (record) => view.title != null ? record.columns[view.title] : "null"
    }

    return <PannableSvg>
        <GraphNodes transformer={transformer} />
        <GhostNode />
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
                dispatch(dragNode({ delta: [evt.movementX,  evt.movementY] }));
            } else {
                setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]);
            }
        }
    }

    return <svg height="600"
        id="graph"
        onMouseMoveCapture={onDrag}
        onMouseUp={()=>dispatch(releaseNode())}
        onMouseLeave={()=>dispatch(releaseNode())}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {children}
        </g>
    </svg>

}

// TODO AI generated, don't keep it in
function stringToColor(str) {
    // Calculate a hash value for the input string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to RGB values
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    // Create the HTML color string
    const colorString = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;

    return colorString;
}
