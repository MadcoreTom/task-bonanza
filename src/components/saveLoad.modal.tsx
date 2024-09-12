import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, commitRecords, importStagedData, load, RootState, save, setCell, setFilename, setSelection, stageData } from "../state/store";
import { Button, ButtonGroup, Divider, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";

import { ICONS } from "./icons";
import { ImportDialog } from "./import.modal";
import { ExportModal } from "./export.modal";

export function SaveLoadModal() {
    const dispatch = useDispatch();
    const dialogue = useSelector((state: RootState) => state.main.dialogue);

    const isSave = !!dialogue?.save;
    const isLoad = !!dialogue?.load;

    const title = isSave ? "Save file" : (isLoad ? "Load file" : "");

    return <Modal
        isOpen={isSave || isLoad}
        placement="top-center"
        onOpenChange={open => dispatch(setFilename({ dialogue: {} }))}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        <div className="w-full max-w-[260px] gap-2 flex flex-col">
                            {
                                isSave ? <SaveDialog onClose={onClose} /> : <LoadDialog onClose={onClose} />
                            }
                        </div>
                    </ModalBody>

                </>
            )}
        </ModalContent>
    </Modal >
}

function SaveDialog({ onClose }: { onClose: () => any }) {
    const location = useSelector((state: RootState) => state.main.dialogue?.save?.location);
    const dispatch = useDispatch();

    let content: any;
    switch (location) {
        case "browser":
            content = <BrowserList mode="save" onClose={onClose} />;
            break;
        case "file":
            content = <ExportModal />;
            break;
        default:
            content = null;
    }


    return <React.Fragment>
        <ButtonGroup fullWidth={true}>
            <Button onClick={() => dispatch(setFilename({ dialogue: { save: { location: "browser" } } }))} variant={location == "browser" ? "solid" : "bordered"} color="primary">Browser</Button>
            <Button onClick={() => dispatch(setFilename({ dialogue: { save: { location: "file" } } }))} variant={location == "file" ? "solid" : "bordered"} color="primary">Download</Button>
        </ButtonGroup>
        {content}
    </React.Fragment>
}

function BrowserList({ mode, onClose }: { mode: "save" | "load", onClose: () => any }) {
    const filename = useSelector((state: RootState) => state.main.filename);
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState(null as string | null);

    const items = (JSON.parse(window.localStorage.getItem("Madcoretom.TB.filenames") || "[]") as string[]).map(i => { return { key: i } });
    const isSave = mode == "save";
    const mainButtonText = isSave ? "Save" : "Load" ;
    const mainSaveFunction = () => { (isSave ? () => dispatch(save()) : () => dispatch(load()))(); dispatch(setFilename({ dialogue: {} })) }

    return <React.Fragment>
        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox
                items={items}
                aria-label="Dynamic Actions"
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
        <Button color="primary" onPress={mainSaveFunction}>
            {mainButtonText}
        </Button>
    </React.Fragment>
}


function LoadDialog({ onClose }: { onClose: () => any }) {
    const location = useSelector((state: RootState) => state.main.dialogue?.load?.location);
    const dispatch = useDispatch();

    let content: any;
    switch (location) {
        case "browser":
            content = <BrowserList mode="load" onClose={onClose} />;
            break;
        case "file":
            content = <ImportDialog />;
            break;
        default:
            content = null;
    }
    console.log("LOC", location)


    return <React.Fragment>
        <ButtonGroup fullWidth={true}>
            <Button onClick={() => dispatch(setFilename({ dialogue: { load: { location: "browser" } } }))} variant={location == "browser" ? "solid" : "bordered"} color="primary">Browser</Button>
            <Button onClick={() => dispatch(setFilename({ dialogue: { load: { location: "file" } } }))} variant={location == "file" ? "solid" : "bordered"} color="primary">Upload</Button>
        </ButtonGroup>
        {content}
    </React.Fragment>
}
