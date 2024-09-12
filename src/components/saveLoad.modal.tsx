import * as React from "react";
import Spreadsheet, { CellBase, EntireColumnsSelection, Matrix, Selection as SheetSelection } from "react-spreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, load, RootState, save, setCell, setFilename, setSelection, stageData } from "../state/store";
import { Button, ButtonGroup, Divider, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";

import { ICONS } from "./icons";

export function SaveLoadModal() {
    const dispatch = useDispatch();
    const dialogue = useSelector((state: RootState) => state.main.dialogue);

    const isSave = !!dialogue?.save;
    const isLoad = !!dialogue?.load;

    const title = isSave ? "Save file" : (isLoad? "Load file" : "");
    const mainButtonText =  isSave ? "Save" : (isLoad? "Load" : "");
    const mainSaveFunction = ()=>{(isSave ? ()=>dispatch(save()): (isLoad?()=>dispatch(load()): ()=>{}))(); dispatch(setFilename({dialogue:{}}))}

    return <Modal
        isOpen={isSave || isLoad}
        placement="top-center"
        onOpenChange={open=>dispatch(setFilename({dialogue:{}}))}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        <div className="w-full max-w-[260px] gap-2 flex flex-col">
                            {
                                isSave ? <SaveDialog /> : <LoadDialog/>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={mainSaveFunction}>
                            {mainButtonText}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
}

function SaveDialog() {
    const location = useSelector((state: RootState) => state.main.dialogue?.save?.location);
    const dispatch = useDispatch();

    let content: any;
    switch (location) {
        case "browser":
            content = <BrowserList mode="save" />;
            break;
        case "file":
            content = <SaveExportDialog />;
            break;
        default:
            content = null;
    }


    return <React.Fragment>
        <ButtonGroup fullWidth={true}>
            <Button onClick={() => dispatch(setFilename({dialogue:{save:{location:"browser"}}}))} variant={location == "browser" ? "solid" : "bordered"} color="primary">Browser</Button>
            <Button onClick={() => dispatch(setFilename({dialogue:{save:{location:"file"}}}))}  variant={location == "file" ? "solid" : "bordered"} color="primary">Download</Button>
        </ButtonGroup>
        {content}
    </React.Fragment>
}

function BrowserList({ mode }: { mode: "save" | "load" }) {
    const filename = useSelector((state: RootState) => state.main.filename);
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState(null as string | null);

    const items = (JSON.parse(window.localStorage.getItem("Madcoretom.TB.filenames") || "[]") as string[]).map(i => { return { key: i } });
    console.log(selected, items)

    return <React.Fragment>        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
            items={items}
            aria-label="Dynamic Actions"
            // onAction={key => { setSelected(key.toString()) }}
            selectionMode="single"
            selectedKeys={selected ? [selected] : []}
            onSelectionChange={s => { setSelected([...s][0] as string); dispatch(setFilename({ filename: [...s][0] as string })) }}
            variant="flat"
        >
            {(item) => (
                <ListboxItem
                    key={item.key}
                    startContent={ICONS.file}
                >
                    {item.key}
                </ListboxItem>
            )}
        </Listbox></div>
        {mode == "save" ?
            <div>
                <Input labelPlacement="outside" value={filename} onChange={e => dispatch(setFilename({ filename: e.target.value }))} />
            </div> : null}
    </React.Fragment>
}

function SaveExportDialog() {
    const filename = useSelector((state: RootState) => state.main.filename);


    return <React.Fragment>

        <Input labelPlacement="outside" value={filename}/* onChange={e => setFilename(e.target.value)}*/ />

    </React.Fragment>
}

function LoadDialog() {
    const location = useSelector((state: RootState) => state.main.dialogue?.load?.location);
    const dispatch = useDispatch();

    let content: any;
    switch (location) {
        case "browser":
            content = <BrowserList mode="load" />;
            break;
        case "file":
            content = <div>TODO</div>;
            break;
        default:
            content = null;
    }
    console.log("LOC",location)


    return <React.Fragment>
        <ButtonGroup fullWidth={true}>
            <Button onClick={() => dispatch(setFilename({dialogue:{load:{location:"browser"}}}))} variant={location == "browser" ? "solid" : "bordered"} color="primary">Browser</Button>
            <Button onClick={() => dispatch(setFilename({dialogue:{load:{location:"file"}}}))}  variant={location == "file" ? "solid" : "bordered"} color="primary">Upload</Button>
        </ButtonGroup>
        {content}
    </React.Fragment>
}
