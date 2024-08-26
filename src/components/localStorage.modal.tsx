import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, load, RootState, save, setCell, setSelection, stageData } from "../state/store";
import { Button, Divider, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import { Record } from "../model/data";
import { ColumnDef } from "../model/view.model";
import { formatCsv } from "../csv";
import { ICONS } from "./icons";


export function LocalStorageModal(props: { open: boolean, onChange: (open: boolean) => any }) {
    // const records = useSelector((state: RootState) => state.main.records);
    // const columns = useSelector((state: RootState) => state.main.columns);
    const [filename, setFilename] = React.useState("untitled.csv");
    const dispatch = useDispatch();

    const items = (JSON.parse(window.localStorage.getItem("Madcoretom.TB.filenames") || "[]") as string[])    .map(i=>{return {key:i}})
    const saveOver = filename && items.filter(k=>k.key == filename).length >0;

    return <Modal
        isOpen={props.open}
        placement="top-center"
        onOpenChange={props.onChange}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Local Storage</ModalHeader>
                    <ModalBody>
                         <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                <Listbox
                    items={items}
                    aria-label="Dynamic Actions"
                    onAction={key => {setFilename(key.toString())}}
                >
                    {(item) => (
                    <ListboxItem
                        key={item.key}
                        color="primary"
                        startContent={ICONS.file}
                    >
                        {item.key}
                    </ListboxItem>
                    )}
                </Listbox></div>
                        <div>
                            <Input labelPlacement="outside"  value={filename} onChange={e=>setFilename(e.target.value)}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                         <Button color="primary" isDisabled={!saveOver}  onPress={()=>{dispatch(load(filename)); onClose()}}>
                            Load
                        </Button>
                     
                        <Button color={saveOver ? "danger" : "primary"} onPress={()=>{dispatch(save(filename)); onClose()}} >
                            {saveOver? "Save Over" : "Save"}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
}

