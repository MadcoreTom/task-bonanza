import * as React from "react";
import { Button, Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { commitRecords, RootState, setCell, setSelection, setTab } from "../state/store";
import { NodeSelection } from "../model/view.model";
import { ICONS } from "./icons";

export function NodeSidebar() {
    const selected = useSelector((state: RootState) => state.main.selected as NodeSelection);
    const record = useSelector((state: RootState) => state.main.records[selected.idx]);
    const columns = useSelector((state: RootState) => state.main.columns);
    const isViewTab = useSelector((state: RootState) => state.main.tab >= 0);
    const dispatch = useDispatch();

    return <React.Fragment>
        <h1>Node {selected.idx}</h1>
        {
            columns.map((c, i) => {
                return <Input
                    label={c.name}
                    variant="bordered"
                    value={record.columns[i]}
                    onValueChange={value => { dispatch(setCell({ value, row: selected.idx, column: i })); dispatch(commitRecords()); console.log(value); }}
                    defaultValue="-"
                    key={i}
                />
            })
        }
        {isViewTab ? <Button startContent={ICONS.table} onClick={() => dispatch(setTab(-1))}>View in Table</Button> : null}
    </React.Fragment>
}