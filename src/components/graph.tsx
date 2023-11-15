import * as React from "react";
import { Flex , DropdownOption} from 'gestalt'
import { MyDropdown } from "./dropdown";
import { RootState, setView } from "../state/store";
import { useSelector, useDispatch } from 'react-redux'
import { ViewState } from "../state/state";
import { Column } from "../state/column.types";
import { Dispatch } from "@reduxjs/toolkit";

export function Graph(props: { nodes: any }) {
    let [offset, setOffset] = React.useState([0, 0]);

    const headings = useSelector((state: RootState) => state.main.headings);
    const view = useSelector((state: RootState) => state.main.view);
    const dispatch = useDispatch();

    function onDrag(evt: React.MouseEvent) {
        if (evt.buttons > 0) {
            setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY])
        }
    }

    return <React.Fragment>
        <div style={{ height: "100px", marginBottom: "-100px", zIndex: 9 }}>
            <Flex alignContent="center" direction="row" alignItems="center" justifyContent="center" gap={1} >
                {DROPDOWNS.map((d,i)=>d.render(view,headings, dispatch))}
            </Flex>
        </div>
        <svg height="600"
            id="graph"
            onMouseMoveCapture={onDrag}
            style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
            onContextMenu={(e) => e.preventDefault()}>
            <g transform={`translate(${offset[0]},${offset[1]})`}>
                {props.nodes}
            </g>
        </svg>
    </React.Fragment>
}


abstract class ViewDropdown {
    constructor(private readonly key: keyof ViewState, private readonly prefix: string) {

    }

    render(view: ViewState, headings: Column[], dispatch: Dispatch) {
        return <MyDropdown
            value={this.getValue(view)}
            options={this.getOptions(headings)}
            label={this.getLabel()}
            onClose={v => this.onClose(v, dispatch)}
        />
    }

    getValue(view: ViewState): string {
        return view[this.key];
    }
    getLabel(): (selected: string)=>string {
        return  (selected: string)=>this.prefix + ": " + selected;
    }
    abstract getOptions(headings: Column[]): DropdownOption[];
    onClose(selected: string, dispatch: Dispatch) {
        dispatch(setView({ [this.key]: selected }));
    }
}

class EmojiViewDropdown extends ViewDropdown {
    constructor() {
        super("emojiColumn", "Emoji")
    }

    getOptions(headings: Column[]) {
        return headings.filter(h => h.type == "KEYWORD")
            .map(h => { return { value: h.name, label: h.name, subtext: h.type } })
    }
}

class ColourViewDropdown extends ViewDropdown {
    constructor() {
        super("colourColumn", "Colour")
    }

    getOptions(headings: Column[]) {
        return headings.filter(h => h.type == "KEYWORD" || h.type == "NUMBER")
            .map(h => { return { value: h.name, label: h.name, subtext: h.type } })
    }
}
class TextViewDropdown extends ViewDropdown {
    constructor() {
        super("textColumn", "Text")
    }

    getOptions(headings: Column[]) {
        return headings.filter(h => h.type != "X" && h.type != "Y")
            .map(h => { return { value: h.name, label: h.name, subtext: h.type } })
    }
}


const DROPDOWNS: ViewDropdown[] = [new TextViewDropdown(), new ColourViewDropdown(), new EmojiViewDropdown()];