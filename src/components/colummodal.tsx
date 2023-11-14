import * as React from "react";
import {
    Box,
    Button,
    ButtonGroup,
    CompositeZIndex,
    FixedZIndex,
    Flex,
    Layer,
    Modal,
    NumberField,
    Table,
    Text,
    TextField,
} from 'gestalt';
import { useDispatch, useSelector } from "react-redux";
import { RootState, closeColumnModal,  saveColumn } from "../state/store";
import { COLUMN_TYPES, Column, ColumnType, KeywordMeta } from "../state/column.types";
import { MyDropdown } from "./dropdown";

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);
const COLUMN_TYPE_OPTIONS = COLUMN_TYPES.map(t => {return{ value: t.name, label: t.name, subtext: t.description }});

export default function ColumnModal() {
    const dispatch = useDispatch();
    const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);
    const headings = useSelector((state: RootState) => state.main.headings);
    const data = useSelector((state: RootState) => state.main.data);

    if (columnModalIdx == null) {
        return;
    }

    const column = headings[columnModalIdx] as Column;

    const [columnMeta, setColumnMeta] = React.useState(() => {
        const copy = { ...column };
        if (copy.type == "KEYWORD") {
            const idx = headings.map((h,i)=>h.name == column.name ? i : null).filter(a=>a!=null)[0] as number;
            copy.mapping = consolidateMapping(idx, data, copy.mapping);
        }
        return copy as ColumnType
    });

    function updateMapping(key:string,partial:Partial<KeywordMeta>){
        if(columnMeta.type == "KEYWORD"){
            const meta = {...columnMeta};
            meta.mapping[key] = {...meta.mapping[key], ...partial};
            setColumnMeta(meta);
        }
    }


    return (
        <Layer zIndex={modalZIndex}>
            <Modal
                accessibilityModalLabel="Create new board"
                align="start"
                heading={column.name + " Metadata"}
                onDismiss={() => { }}
                footer={
                    <Flex alignItems="center" justifyContent="end">
                        <ButtonGroup>
                            <Button text="Close" onClick={() => dispatch(closeColumnModal())} />
                            <Button color="red" text="Save & Close" onClick={()=>dispatch(saveColumn({columnIdx:columnModalIdx, column: columnMeta as Column}))} />
                        </ButtonGroup>
                    </Flex>
                }
                size="md"
            >
                <Box marginBottom={6} minHeight={500}>
                    <Text inline={true}>{column.name} of type {columnMeta.type}</Text>
                    <MyDropdown value={column.type} options={COLUMN_TYPE_OPTIONS} onClose={t => setColumnMeta({ ...columnMeta, type: t })} label={v=>v} />
                  {columnMeta.type == "KEYWORD" && <KeywordConfig updateMapping={updateMapping} columnType={columnMeta}/>}
                </Box>
            </Modal>
        </Layer>
    );
}


/*
if this has unique values -> option to choose free text or unique 
if its all numbers or null, then try a number range. you get cool stuff like colour gradients and continuous filters
*/

/*
Number
- validates all are number or blank
- calculates min
- calculates max

Keyword
- calculates all unique values (we want this to be a superset of existing, for example we don't want to lose the colour of 'in progress' just because nothing is currently in progress)
*/

function KeywordConfig(props:{updateMapping:(key:string,partial:Partial<KeywordMeta>)=>void,columnType:ColumnType}) {
    if(props.columnType.type != "KEYWORD"){
        return null;
    }

    const mapping = props.columnType.mapping;

    const rows = Object.keys(mapping).map((k, i) =>
        <Table.Row key={i}>
            <Table.Cell><Text>{k}</Text></Table.Cell>
            <Table.Cell>
                <NumberField
                    id={`mapping-order-${i}`}
                    label="Order"
                    onChange={evt => props.updateMapping(k,{order:evt.value})}
                    placeholder={"" + i}
                    value={mapping[k].order}
                />

            </Table.Cell>
            <Table.Cell><Text><TextField
                id={`mapping-colour-${i}`}
                label="Colour"
                placeholder="#FF0000"
                type="text"
                onChange={evt => props.updateMapping(k,{colour:evt.value})}
                value={mapping[k].colour}
            /></Text></Table.Cell>
            <Table.Cell><Text><TextField
                id={`mapping-emoji-${i}`}
                label="Emoji"
                onChange={evt => props.updateMapping(k,{emoji:evt.value})}
                placeholder="🙂"
                type="text"
                value={mapping[k].emoji}
            /></Text></Table.Cell>
        </Table.Row>

    )

    return <Box>
        <Table accessibilityLabel="Sticky footer">
            <Table.Header sticky>
                <Table.Row>
                <Table.HeaderCell><Text>Value</Text></Table.HeaderCell>
                <Table.HeaderCell><Text>Order</Text></Table.HeaderCell>
                <Table.HeaderCell><Text>Colour</Text></Table.HeaderCell>
                <Table.HeaderCell><Text>Emoji</Text></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    </Box>
}


function  consolidateMapping(idx:number, data:string[][], existing:{[key:string] : KeywordMeta}) : {[key:string] : KeywordMeta}{
    const result = {};
    for(let key in existing){
        result[key] = {...existing[key]};
    }
    const allValues = data.map(r=>r[idx]);
    for(let value of allValues){
        if(!(value in result)){
            result[value] = {colour:Math.random() > 0.5 ? "pink": "limegreen"}
        }
    }
    return result;
}