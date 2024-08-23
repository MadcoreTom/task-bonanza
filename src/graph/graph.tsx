import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragNode, releaseNode, RootState, setOffset, setSelection } from "../state/store";
import { GhostNode, GraphNodes } from "./graph.nodes";
import { Swimlanes } from "./graph.swimlane";
import { getTransformerForView } from "./graph.transformer";
import { Arrows, PendingArrows } from "./graph.arrows";

export function Graph(props: { viewIdx: number }) {
    // TODO the view data casuues this to re-render on every drag
    const view = useSelector((state: RootState) => state.main.views[props.viewIdx]);
    const columns = useSelector((state: RootState) => state.main.columns);

    console.log("💲💲 Graph redraw")
    const transformer = getTransformerForView(view, columns);

    return <PannableSvg dontPan={view.swimlane == null ? null : <Swimlanes column={columns[view.swimlane]} view={view} />}>
        <GraphNodes transformer={transformer} />
        <GhostNode />
        <marker id="arrowhead0" viewBox="0 0 60 60" refX="44" refY="34" markerUnits="strokeWidth" markerWidth="8" markerHeight="10" orient="auto">
            <path d="M 0 0 L 60 30 L 0 60 z" fill="black" /> </marker>
            <defs>
            <clipPath id="nodeClip">
                <rect x={0} y={0} width={200} height={60} rx={5} />
            </clipPath>
        </defs>
        <Arrows />
        <PendingArrows />
    </PannableSvg>
}


/**
 * Creates a SVG and pans the background and the main <g>
 * without re-rendering the child components
 */
function PannableSvg({ children, dontPan }) {
    const offset = useSelector((state: RootState) => state.main.offset);
    const nodeSelected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "node" && state.main.selected.mouseDown);// if a node is selected
    const linkSelected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "link" && state.main.selected.pos ? state.main.selected : null);
    const dispatch = useDispatch();

    function onDrag(evt: React.MouseEvent) {
        if (evt.buttons > 0) {
            if (nodeSelected) {
                dispatch(dragNode({ delta: [evt.movementX, evt.movementY] }));
            } else if(linkSelected && linkSelected.mouse){
                dispatch(setSelection({...linkSelected, mouse: [linkSelected.mouse[0] + evt.movementX, linkSelected.mouse[1] + evt.movementY]}))
            }else {
                dispatch(setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]));
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
        {dontPan}
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {children}
        </g>
    </svg>

}