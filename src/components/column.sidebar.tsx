import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem, Input, Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ButtonGroup } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateColumn } from "../state/store";
import { ColumnDef } from "../model/view.model";
import { ICONS } from "./icons";
import { Column } from "../model/data";
import { hslToBorder, textToHsl } from "../colour";

export function ColumnSidebar() {
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "column" ? state.main.selected.idx : 0);
    const dispatch = useDispatch();

    const column = useSelector((state: RootState) => state.main.columns[selected]);
    console.log(column, column, selected);

    const [tmpColumn, setTmpColumn] = React.useState(null as ColumnDef | null);
    React.useEffect(() => {
        setTmpColumn(column);
    }, [column]);

    if (!tmpColumn) {
        return "null"
    }

    return <React.Fragment>
        <h1>Column {column.name}</h1>
        <Input
            label="Column Name"
            value={tmpColumn.name}
            onChange={e => setTmpColumn({ ...column, name: e.target.value })}
            onBlur={e => dispatch(updateColumn({ idx: selected, def: tmpColumn }))}
        />

        <Select
            label="Data Type"
            placeholder="None"
            selectionMode="single"
            className="max-w-xs"
            description="This affects how data from this column is sorted and displayed"
            selectedKeys={[column.type]}
            onChange={e => dispatch(updateColumn({ idx: selected, def: changeType(column, e.target.value as any) }))}
        >
            <SelectItem key="Number" startContent={ICONS.emoji}>Number</SelectItem>
            <SelectItem key="Keyword" startContent={ICONS.keywords}>Keyword</SelectItem>
            <SelectItem key="Alphabetical" startContent={ICONS.alphabetical}>Alphabetical</SelectItem>
        </Select>

        {column.type == "Number" ? <NumberColumn column={column} idx={selected} /> : null}
        {column.type == "Keyword" ? <KeywordColumn column={column} idx={selected} /> : null}


    </React.Fragment>
}

function changeType(def: ColumnDef, type: "Number" | "Keyword" | "Alphabetical"): ColumnDef {
    if (type == def.type) {
        return def;
    }
    switch (type) {
        case "Number":
            return {
                ...def,
                type: "Number",
                minColour: "minColour" in def ? def.minColour : [0, 0, 0],
                maxColour: "maxColour" in def ? def.maxColour : [0, 0, 0]
            }
        case "Alphabetical":
            return {
                ...def,
                type: "Alphabetical",
                minColour: "minColour" in def ? def.minColour : [0, 0, 0],
                maxColour: "maxColour" in def ? def.maxColour : [0, 0, 0]
            }
        case "Keyword":
            return {
                ...def,
                type: "Keyword",
                map: {}
            }
    }
}

function NumberColumn(props: { column: ColumnDef, idx: number }) {
    const columnData = useSelector((state: RootState) => state.main.records.map(r => r.columns[props.idx]));

    const invalidCount = columnData.filter(d => d != null && isNaN(parseFloat(d))).length;
    console.log(columnData);

    let warning: any = null;
    if (invalidCount > 0) {
        warning = <div className="bg-warning p-2 rounded" role="alert">
            Warning, there are {invalidCount} values in this column that are not valid numbers.
        </div>

    }

    return <div>
        {warning}
        <Button aria-label="min colour" style={{ backgroundColor: "#ff22bb" }}> {ICONS.colour} Minimum Colour</Button>
        <Button aria-label="max colour" style={{ backgroundColor: "#0022dd" }}> {ICONS.colour} Maximum Colour</Button>
    </div>
}

function KeywordColumn(props: { column: ColumnDef, idx: number }) {
    const columnData = useSelector((state: RootState) => state.main.records.map(r => r.columns[props.idx]));

    const uniqueVals = columnData.filter(d => d != null && d.trim().length > 0)
        .sort()
        .reduce(
            (acc, cur) => { if (acc[acc.length - 1] != cur) { acc.push(cur); }; return acc; },
            [] as string[]
        );

    return <div>
        <Table aria-label="Column keywords table">
            <TableHeader>
                <TableColumn>Keyword</TableColumn>
                <TableColumn>Settings</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    uniqueVals.map(v => {
                        return <TableRow key={v}>
                            <TableCell>{v}</TableCell>
                            <TableCell>
                                <ButtonGroup variant="bordered">
                                    <Button isIconOnly aria-label="Colour" size="sm" style={{ backgroundColor: hslToBorder(textToHsl(v)) }}> {ICONS.colour} </Button>
                                    <Button isIconOnly aria-label="Emoji" size="sm"> {ICONS.emoji} </Button>
                                    <Button isIconOnly aria-label="Move Up" size="sm"> {ICONS.numeric} </Button>
                                    <Button isIconOnly aria-label="Move Down" size="sm"> {ICONS.numeric} </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    </div>
}