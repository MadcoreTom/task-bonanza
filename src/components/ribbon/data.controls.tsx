import { Button, Divider } from "@nextui-org/react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { addColumn, addRow, commitRecords, save } from "../../state/store";
import { ICONS } from "../icons";

export function DataControls() {
    const dispatch = useDispatch();

    return <React.Fragment>
        <Button variant="light" color="primary" onClick={() => dispatch(commitRecords())}>Save Changes</Button>
        <Button variant="light" color="primary" onClick={() => dispatch(addRow())} startContent={ICONS.add}>Add Row</Button>
        <Button variant="light" color="primary" onClick={() => dispatch(addColumn())} startContent={ICONS.add}>Add Column</Button>
    </React.Fragment>
}