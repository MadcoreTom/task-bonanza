import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

export function Graph() {

    const recordCount = useSelector((state: RootState) => state.main.records.length);
    // const view = useSelector((state: RootState) => state.main.view);
    // const dispatch = useDispatch();


    console.log("💲💲 Graph redraw")

    return     <PannableSvg>
            {/* <GraphGhost /> */}
            <circle />
        </PannableSvg> 
}


/**
 * Creates a SVG and pans the background and the main <g>
 * without re-rendering the child components
 */
function PannableSvg({ children }) {
    let [offset, setOffset] = React.useState([0, 0]);
    const selected = false;//useSelector((state: RootState) => state.main.selected);
    const dispatch = useDispatch();

    console.log("Panning")

    function onDrag(evt: React.MouseEvent) {
        if (evt.buttons > 0) {
            if (selected) {
                // dispatch(dragNode({ dx: evt.movementX, dy: evt.movementY }));
            } else {
                setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]);
            }
        }
    }

    function onMouseUp() {
        if (selected) {
            // dispatch(releaseNode());
        }
    }

    return <svg height="600"
        id="graph"
        onMouseMoveCapture={onDrag}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {children}
        </g>
    </svg>

}