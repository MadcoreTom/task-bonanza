import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem } from "@nextui-org/react";

export function ViewSidebar() {
    const [colour, setColour] = React.useState(null as null | string);

    const items = [
        {
            key: "new",
            label: "Assignee",
        },
        {
            key: "copy",
            label: "Phase",
        },
        {
            key: "edit",
            label: "Status",
        },
        {
            key: "delete",
            label: "Age",
        }
    ];



    return <React.Fragment>
        <h1>View</h1>
        <Select
            label="Colour"
            placeholder="None"
            selectionMode="single"
            className="max-w-xs"
        >
            {items.map((item) => (
                <SelectItem key={item.key}>
                    {item.label}
                </SelectItem>
            ))}
        </Select>

        <Select
            label="Swimlane"
            placeholder="None"
            selectionMode="single"
            className="max-w-xs"
        >
            {items.map((item) => (
                <SelectItem key={item.key}>
                    {item.label}
                </SelectItem>
            ))}
        </Select>

        <Button color="secondary">
            Hello Button
        </Button>
    </React.Fragment>
}