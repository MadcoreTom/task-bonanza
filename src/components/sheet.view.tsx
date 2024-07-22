import * as React from "react";
import { Record } from "../model/data";

export function SheetView(props:{data:Record[]}){
    return <ul>
        {
            props.data.map((r,i)=>{
                return <li key={i}>
                     <b>{r.id}</b> {r.columns.join(", ")}
                </li>
            })
        }
    </ul>
}