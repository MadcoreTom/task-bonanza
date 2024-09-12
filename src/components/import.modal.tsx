import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, RootState, setCell, setSelection, stageData } from "../state/store";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import { parseCsv } from "../csv";


export function ImportDialog() {
    const dispatch = useDispatch();
    const stagedData = useSelector((state: RootState) => state.main.stagedData);

    return <React.Fragment>
                        <p>
                            Load a CSV file (comma-separated values). The file must have a header.
                        </p>
                        <p>
                            Note: Importing a CSV will replace existing data
                        </p>
                        <div>
                            <Input type="file" title="Import Data" fullWidth={false} onChange={e => loadFile(e, d => dispatch(stageData(d)))}>Import Data</Input>
                        </div>
                        {stagedData != null ? <p>
                            {stagedData.length} rows and {stagedData[0].length} columns.
                        </p> : null}
               
                        <Button color="primary" isDisabled={stagedData == null} onPress={() => { dispatch(importStagedData()); }} >
                            Import
                        </Button>
                        </React.Fragment>
}


// TODO move
function loadFile(evt: React.ChangeEvent<HTMLInputElement>, callback: (data: string[][]) => any) {
    if (evt.target.files) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (!evt.target || evt.target.readyState != 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }
            if (evt.target.result) {
                const str = evt.target.result.toString();
                callback(parseCsv(str));
            }
        };
        reader.readAsText(evt.target.files[0]);
    } else {
        console.log("No files selected")
    }
}