import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, load, RootState, save, setCell, setSelection, stageData } from "../state/store";
import { Button, ButtonGroup, Divider, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import { Record } from "../model/data";
import { ColumnDef } from "../model/view.model";
import { formatCsv } from "../csv";
import { ICONS } from "./icons";

export function SaveLoadModal(props:{open:boolean, onChange:(open:boolean)=>void}) {
    const dispatch = useDispatch();
    const [saveLoad, setSaveLoad] = React.useState("none" as "save" | "load" | "none");
    const [location, setLocation] = React.useState("none" as "browser" | "file" | "none");
    const [importExportType, setImportExportType] = React.useState("data" as "data" | "all" | "none");

    // const items = (JSON.parse(window.localStorage.getItem("Madcoretom.TB.filenames") || "[]") as string[]).map(i => { return { key: i } })

    return <Modal
        isOpen={props.open}
        placement="top-center"
        onOpenChange={props.onChange}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Incomplete save dialogue</ModalHeader>
                    <ModalBody>
                        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 gap-2 flex flex-col">
                            <ButtonGroup fullWidth={true}>
                                <Button onClick={() => setSaveLoad("save")} variant={saveLoad == "save" ? "solid" : "bordered"} color="primary">Save</Button>
                                <Button onClick={() => setSaveLoad("load")} variant={saveLoad == "load" ? "solid" : "bordered"} color="primary">Load</Button>
                            </ButtonGroup>
                            {saveLoad == "none" ? null :
                                <React.Fragment>
                                    <Divider orientation="horizontal" />
                                    <ButtonGroup fullWidth={true}>
                                        <Button onClick={() => setLocation("browser")} variant={location == "browser" ? "solid" : "bordered"} color="primary">Browser</Button>
                                        <Button onClick={() => setLocation("file")} variant={location == "file" ? "solid" : "bordered"} color="primary">My Computer</Button>
                                    </ButtonGroup>
                                </React.Fragment>
                            }
                                 {saveLoad != "save" || location != "file"  ? null :
                                <React.Fragment>
                                    <Divider orientation="horizontal" />
                                    <ButtonGroup fullWidth={true}>
                                    <Button onClick={() => setImportExportType("data")} variant={importExportType == "data" ? "solid" : "bordered"} color="primary">Data only</Button>
                                    <Button onClick={() => setImportExportType("all")} variant={importExportType == "all" ? "solid" : "bordered"} color="primary" isDisabled>All</Button>
                                    </ButtonGroup>
                                </React.Fragment>
                            }
                             {saveLoad != "load" || location != "file"  ? null :
                                <React.Fragment>
                                    <Divider orientation="horizontal" />
                                    <ButtonGroup fullWidth={true}>
                                    <Button onClick={() => setImportExportType("data")} variant={importExportType == "data" ? "solid" : "bordered"} color="primary">CSV data</Button>
                                    <Button onClick={() => setImportExportType("all")} variant={importExportType == "all" ? "solid" : "bordered"} color="primary" isDisabled>Everything</Button>
                                    </ButtonGroup>
                                </React.Fragment>
                            }

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
}