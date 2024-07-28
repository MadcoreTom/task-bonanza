import * as React from "react";
import { Record } from "../model/data";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch } from "react-redux";
import { setSelection } from "../state/store";

export function SheetView(props: { data: Record[]}) {
    const rows = props.data.map(d => d.columns.map(c => { return { value: c } }));
    const matrix: Matrix<CellBase> = rows;
    const dispatch = useDispatch();

    console.log("RERENDER SheetView")

    function sel(s:SheetSelection){
        if(s instanceof EntireColumnsSelection){
            dispatch(setSelection({type:"column", name: s.start + "XYZ"}));
        }
    }

    return <Spreadsheet data={matrix} onSelect={sel} />;
}