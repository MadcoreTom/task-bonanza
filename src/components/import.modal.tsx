import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, RootState, setCell, setSelection, stageData } from "../state/store";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";


export function ImportModal(props: { open: boolean, onChange: (open: boolean) => any }) {
    const dispatch = useDispatch();
    const stagedData = useSelector((state: RootState) => state.main.stagedData);

    return <Modal
        isOpen={props.open}
        placement="top-center"
        onOpenChange={props.onChange}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Import CSV</ModalHeader>
                    <ModalBody>
                        <p>
                            Load a CSV file (comma-separated values). The file must have a header.
                        </p>
                        <p>
                            Note: Importing a CSV will replace existing data
                        </p>
                        <div>
                            <Input type="file" title="Import Datta" fullWidth={false} onChange={e => loadFile(e, d => dispatch(stageData(d)))}>Import Data</Input>
                        </div>
                        {stagedData != null ? <p>
                            {stagedData.length} rows and {stagedData[0].length} columns.
                        </p> : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" isDisabled={stagedData == null} onPress={() => { dispatch(importStagedData()); onClose() }} >
                            Import
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
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
                const lines = str.split(/[\n\r]+/).filter(line => line.trim().length > 0);
                const data = lines.map(line => line.split(/,/))
                callback(data);
            }
        };
        reader.readAsText(evt.target.files[0]);
    } else {
        console.log("No files selected")
    }
}