import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { commitRecords, RootState, setCell, setSelection } from "../state/store";
import { Button } from "@nextui-org/react";


export function SheetView() {
    const data = useSelector((state: RootState) => state.main.records);
    const columns = useSelector((state: RootState) => state.main.columns);
    const rows = data.map(d => d.columns.map(c => { return {value:c}}));
    const matrix: Matrix<CellBase> = rows;
    const dispatch = useDispatch();

    console.log("RERENDER SheetView")

    function sel(s: SheetSelection) {
        if (s instanceof EntireColumnsSelection) {
            dispatch(setSelection({ type: "column", idx: s.start}));
        }
    }

    return <React.Fragment>
        <Spreadsheet data={matrix} columnLabels={columns.map(c=>c.name)} 
        onSelect={sel}
         onCellCommit={(prev, cell, coords) => {
            if (coords && cell !== undefined) {
                dispatch(setCell({ value: cell == null ? "" : cell.value,  row: coords.row, column: coords.column }))
            }
        }} 
        />
        <Button onClick={()=>dispatch(commitRecords())}>Save Changes</Button>
    </React.Fragment>
}