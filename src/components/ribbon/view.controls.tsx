import { Button, Divider } from "@nextui-org/react";
import * as React from "react";
import { ImportModal } from "../import.modal";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, RootState, setSelection } from "../../state/store";
import { ICONS } from "../icons";

export function ViewControls() {
    const [importOpen, setImportOpen] = React.useState(false);
    const selected = useSelector((state: RootState) => state.main.selected);
    const dispatch = useDispatch();

    return <React.Fragment>
        <Button variant="bordered" color="primary" onClick={() => dispatch(addRow())} startContent={ICONS.add}>Add Node</Button>
        <Button  variant={selected != null && selected.type == "link" && selected.endIdx == undefined ? "solid" : "bordered"}   color="primary" onClick={() => { dispatch(setSelection({type:"link"})) }} startContent={ICONS.arrowsSplit}>Add Link</Button>
        <Divider orientation="vertical" />
        <Button variant="bordered" color="primary" startContent={ICONS.crosshair}>Re-centre</Button>
        <Divider orientation="vertical" />
        <Button variant={selected != null && selected.type == "view" ? "solid" : "bordered"} color="primary" onClick={() => { dispatch(setSelection("currentView")) }}>View Settings</Button>
        <Button variant="bordered" color="danger" onClick={() => { }}>Delete View</Button>
        <ImportModal open={importOpen} onChange={setImportOpen} />
    </React.Fragment>
}