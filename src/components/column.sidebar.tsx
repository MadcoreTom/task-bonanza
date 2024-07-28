import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ColumnSelection } from "../model/view.model";

export function ColumnSidebar() {
    const columns = useSelector((state: RootState) => state.main.columns);
    const selected = useSelector((state: RootState) => state.main.selected as ColumnSelection);

    const column = columns[selected.idx];console.log(column, columns, selected)


    return <React.Fragment>
        <h1>Column {column.name}</h1>


        <Button color="secondary">
            Hello Button
        </Button>
    </React.Fragment>
}