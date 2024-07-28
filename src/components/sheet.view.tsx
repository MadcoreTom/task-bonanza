import * as React from "react";
import { Record } from "../model/data";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { Selection } from "../model/view.model";

export function SheetView(props: { data: Record[], onSelect:(sel:Selection)=>void }) {
    const rows = props.data.map(d => d.columns.map(c => { return { value: c } }));
    const matrix: Matrix<CellBase> = rows;

    console.log("RERENDER SheetView")

    function sel(s:SheetSelection){
        if(s instanceof EntireColumnsSelection){
            props.onSelect({type:"column", name: s.start + "XYZ"})
        }
    }

    return <Spreadsheet data={matrix} onSelect={sel}/>;
}