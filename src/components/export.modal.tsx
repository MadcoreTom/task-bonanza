import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, RootState, setCell, setSelection, stageData } from "../state/store";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import { Record } from "../model/data";
import { ColumnDef } from "../model/view.model";
import { formatCsv } from "../csv";


export function ExportModal(props: { open: boolean, onChange: (open: boolean) => any }) {
    const records = useSelector((state: RootState) => state.main.records);
    const columns = useSelector((state: RootState) => state.main.columns);
    const [filename, setFilename] = React.useState("untitled.csv");

    return <Modal
        isOpen={props.open}
        placement="top-center"
        onOpenChange={props.onChange}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Export CSV</ModalHeader>
                    <ModalBody>
                        <p>
                            Exports your data as a CSV file (comma-separated values).
                        </p>
                        <p>
                           CSVs can be opened by other programs
                        </p>
                        <div>
                            <Input labelPlacement="outside"  value={filename} onChange={e=>setFilename(e.target.value)}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary"  onPress={() => { exportRecords(records, columns, filename); onClose() }} >
                            Export
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
}


// TODO move
function exportRecords(records:Record[],columns:ColumnDef[], name:string) {

    var element = document.createElement('a');
    const data = formatCsv([columns.map(c=>c.name)])+"\n"+formatCsv(records.map(r=>r.columns));
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', name ? name : "noname.csv");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}