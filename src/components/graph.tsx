import * as React from "react";
import { GraphNodes } from "./graph.node";
import {Button, Flex} from 'gestalt'
import { MyDropdown } from "./dropdown";

export function Graph(props:{nodes:any}) {
    let [offset, setOffset] = React.useState([0, 0])

    function onDrag(evt: React.MouseEvent) {
        if (evt.buttons > 0) {
            setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY])
        }
    }

    return <React.Fragment>
        <div style={{height:"100px", marginBottom:"-100px", zIndex:9}}>
            <Flex alignContent="center" direction="row" alignItems="center" justifyContent="center" gap={1} >
                 <MyDropdown value={"cat"} options={[{value:"none", label:"None"},{value:"cat",label:"Cat"},{value:"dog",label:"Dog",subtext:"Better than cats"}]} onClose={()=>{}} label={v=>`Colour${v == "none" ? "" : ": "+v}`}/>
                 <MyDropdown value={"cat"} options={[{value:"none", label:"None"},{value:"cat",label:"Cat"},{value:"dog",label:"Dog",subtext:"Better than cats"}]} onClose={()=>{}} label={v=>`Emoji${v == "none" ? "" : ": "+v}`}/>
                 <MyDropdown value={"cat"} options={[{value:"none", label:"None"},{value:"cat",label:"Cat"},{value:"dog",label:"Dog",subtext:"Better than cats"}]} onClose={()=>{}} label={v=>`Swimlane${v == "none" ? "" : ": "+v}`}/>
                 <MyDropdown value={"cat"} options={[{value:"none", label:"None"},{value:"cat",label:"Cat"},{value:"dog",label:"Dog",subtext:"Better than cats"}]} onClose={()=>{}} label={v=>`Row${v == "none" ? "" : ": "+v}`}/>
            </Flex>
        </div>
        <svg height="600"
        id="graph"
        onMouseMoveCapture={onDrag}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px`}}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
        <rect x={0} y={0} width={100} height={100} stroke="blue" strokeWidth={10} fill="transparent" />
       {props.nodes}
        </g>
        <rect x={0} y={0} width={100} height={100} stroke="red" strokeWidth={10} fill="transparent"  />
    </svg>
    </React.Fragment>
}
