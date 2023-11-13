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
    Text,
} from 'gestalt';
import { useDispatch, useSelector } from "react-redux";
import { RootState, closeColumnModal } from "../state/store";
import { COLUMN_TYPES, Column, ColumnType } from "../state/column.types";
import { MyDropdown } from "./dropdown";

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);
const COLUMN_TYPE_OPTIONS = COLUMN_TYPES.map(t => {return{ value: t.name, label: t.name, subtext: t.description }});

export default function ColumnModal() {
    const dispatch = useDispatch();
    const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);
    const headings = useSelector((state: RootState) => state.main.headings);

    if (columnModalIdx == null) {
        return;
    }

    const column = headings[columnModalIdx] as Column;

    const [columnMeta, setColumnMeta] = React.useState(column as ColumnType);

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
                            <Button color="red" text="Save & Close" />
                        </ButtonGroup>
                    </Flex>
                }
                size="sm"
            >
                <Box marginBottom={6} minHeight={500}>
                    <Text inline={true}>{column.name} of type {columnMeta.type}</Text>
                    <MyDropdown value={column.type} options={COLUMN_TYPE_OPTIONS} onClose={t => setColumnMeta({ ...columnMeta, type: t })} label={v=>v} />
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