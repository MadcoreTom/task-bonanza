import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ReactNode } from "react";
import { HSL, hslToBorder, PALETTE } from "../colour";


export function ColourPicker(props: { children: ReactNode, colour: HSL, onChange: (hsl: HSL) => void }) {
    return <Popover>
        <PopoverTrigger>
            {/* <Button isIconOnly aria-label="Colour" size="sm" style={{ backgroundColor: hslToBorder(textToHsl(v)) }}> {ICONS.colour} </Button> */}
            {props.children}
        </PopoverTrigger>
        <PopoverContent>
            <div style={{ width: 200, display: "flex", flexWrap: "wrap" }}>
                {PALETTE.map((hsl,i) => <ColourOption hsl={hsl} selected={props.colour} onChange={props.onChange} key={i}/>)}
            </div>
        </PopoverContent>
    </Popover>
}

function ColourOption(props: { hsl: HSL, selected: HSL,onChange: (hsl: HSL) => void }) {
    const selected = props.hsl.filter((x,i)=>props.selected[i]==x).length == 3;
    return <div style={{ width: 30, height: 30, borderRadius: 30, margin: 5, backgroundColor: hslToBorder(props.hsl), borderWidth:2, borderColor:selected?"black":"transparent", cursor:"pointer" }} onClick={()=>props.onChange(props.hsl)}></div>
}
