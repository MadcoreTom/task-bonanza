import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem, Input, Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ButtonGroup, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateColumn } from "../state/store";
import { ColumnDef, ColumnDefKeywordMapItem, KeywordColumnDef } from "../model/view.model";
import { ICONS } from "./icons";
import { Column } from "../model/data";
import { HSL, hslToBorder, textToHsl } from "../colour";
import { ColourPicker } from "./colour.picker";

export function getUniqueValues(data:string[]):string[]{
    return data.filter(d => d != null && d.trim().length > 0)
        .sort()
        .reduce(
            (acc, cur) => { if (acc[acc.length - 1] != cur) { acc.push(cur); }; return acc; },
            [] as string[]
        );
}

export function KeywordColumn(props: { column: KeywordColumnDef, idx: number }) {
    const columnData = useSelector((state: RootState) => state.main.records.map(r => r.columns[props.idx]));
    const dispatch = useDispatch();

    const col = props.column;

    if (col.type != "Keyword") {
        return null;
    }

    const uniqueVals = getUniqueValues(columnData);

    function updateMap(v: string, data: ColumnDefKeywordMapItem): KeywordColumnDef {
        const map2 = { ...col.map };
        if(map2[v]){
            map2[v] = {...map2[v], ...data}
        } else {
            map2[v] = data
        }
        return {
            ...col, map: map2
        }
    }

    return <div>
        <Table aria-label="Column keywords table">
            <TableHeader>
                <TableColumn>Keyword</TableColumn>
                <TableColumn>Settings</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    uniqueVals.map(v => <TableRow key={v}><TableCell>{v}</TableCell><TableCell>
                        <KeyWordRow idx={props.idx} value={v} column={col} key={v} updateCol={data => dispatch(updateColumn({ idx: props.idx, def: updateMap(v, data) }))} />
                    </TableCell></TableRow>)
                }
            </TableBody>
        </Table>
    </div>
}

function KeyWordRow(props: { idx: number, value: string, column: KeywordColumnDef, updateCol: (def: Partial<ColumnDefKeywordMapItem>) => void }) {
    const v = props.value;
    const col = props.column;

    if (col.type != "Keyword") {
        return null;
    }

    let colour = textToHsl(v);
    const mapData = col.map[v];
    if (mapData && mapData.colour) {
        colour = mapData.colour;
    }

    return <ButtonGroup variant="bordered">
        <ColourPicker colour={textToHsl(v)} onChange={e => props.updateCol({ colour: e })}>
            <Button isIconOnly aria-label="Colour" size="sm" style={{ backgroundColor: hslToBorder(colour) }}> {ICONS.colour} </Button>
        </ColourPicker>
        <Button isIconOnly aria-label="Emoji" size="sm"> {ICONS.emoji} </Button>
        <Button isIconOnly aria-label="Move Up" size="sm"> {ICONS.sortUp} </Button>
        <Button isIconOnly aria-label="Move Down" size="sm"> {ICONS.sortDown} </Button>
    </ButtonGroup>

}