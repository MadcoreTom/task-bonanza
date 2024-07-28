import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem } from "@nextui-org/react";

export function ColumnSidebar(props: { column: string }) {


    return <React.Fragment>
        <h1>Column {props.column}</h1>


        <Button color="secondary">
            Hello Button
        </Button>
    </React.Fragment>
}