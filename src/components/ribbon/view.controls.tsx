import { Button, Divider } from "@nextui-org/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, autoAlign, reCentre, removeSelectedView, RootState, setSelection } from "../../state/store";
import { ICONS } from "../icons";

export function ViewControls() {
    const [importOpen, setImportOpen] = React.useState(false);
    const selected = useSelector((state: RootState) => state.main.selected);
    const dispatch = useDispatch();

    return <React.Fragment>
        <Button variant="light" color="primary" onClick={() => dispatch(addRow())} startContent={ICONS.add}>Add Node</Button>
        <Divider orientation="vertical" />
        <Button variant="light" color="primary" startContent={ICONS.crosshair} onClick={() => dispatch(reCentre())}>Re-centre</Button>
        <Button variant="light" color="primary" startContent={ICONS.move} onClick={() => dispatch(autoAlign())}>Auto-align</Button>
        <Divider orientation="vertical" />
        <Button variant={selected != null && selected.type == "view" ? "solid" : "light"} color="primary" onClick={() => { dispatch(setSelection("currentView")) }}>View Settings</Button>
        <Button variant="light" color="danger" onClick={() => dispatch(removeSelectedView())}>Delete View</Button>
    </React.Fragment>
}