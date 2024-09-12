import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, RootState, setCell, setSelection, stageData } from "../state/store";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import { Record } from "../model/data";
import { ColumnDef } from "../model/view.model";
import { formatCsv } from "../csv";


export function ExportModal() {
    const records = useSelector((state: RootState) => state.main.records);
    const columns = useSelector((state: RootState) => state.main.columns);
    const [filename, setFilename] = React.useState("untitled.csv");

    return   <React.Fragment>
 
                        <p>
                            Exports your data as a CSV file (comma-separated values).
                        </p>
                        <p>
                           CSVs can be opened by other programs
                        </p>
                        <div>
                            <Input labelPlacement="outside"  value={filename} onChange={e=>setFilename(e.target.value)}/>
                        </div>
                
                        <Button color="primary" variant="light"/* onPress={onClose}*/ >
                            Cancel
                        </Button>
                        <Button color="primary"  onPress={() => { exportRecords(records, columns, filename); }} >
                            Export
                        </Button>
     
    </React.Fragment >
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