import { Button, Divider } from "@nextui-org/react";
import * as React from "react";
import { ImportModal } from "../import.modal";
import { useDispatch } from "react-redux";
import { addColumn, addRow, commitRecords } from "../../state/store";
import { ICONS } from "../icons";
import { ExportModal } from "../export.modal";

export function DataControls() {
    const [importOpen, setImportOpen] = React.useState(false);
    const [exportOpen, setExportOpen] = React.useState(false);
    const dispatch = useDispatch();

    return <React.Fragment>
        <Button variant="bordered" color="primary" onClick={() => dispatch(commitRecords())}>Save Changes</Button>
        <Button variant="bordered" color="primary" onClick={() => dispatch(addRow())} startContent={ICONS.add}>Add Row</Button>
        <Button variant="bordered" color="primary" onClick={() => dispatch(addColumn())} startContent={ICONS.add}>Add Column</Button>
        <Divider orientation="vertical" />
        <Button variant="bordered" color="primary" onClick={() => setImportOpen(true)} startContent={ICONS.import}>Import</Button>
        <Button variant="bordered" color="primary" onClick={() => setExportOpen(true)} startContent={ICONS.export}>Export</Button>
        <ImportModal open={importOpen} onChange={setImportOpen} />
        <ExportModal open={exportOpen} onChange={setExportOpen} />
    </React.Fragment>
}