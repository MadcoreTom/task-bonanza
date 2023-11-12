import * as React from "react";
import {
    Box,
    Button,
    ButtonGroup,
    CompositeZIndex,
    Dropdown,
    DropdownOption,
    FixedZIndex,
    Flex,
    Layer,
    Modal,
    Text,
} from 'gestalt';
import { useDispatch, useSelector } from "react-redux";
import { RootState, closeColumnModal } from "../state/store";
import { COLUMN_TYPES } from "../state/column.types";

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function ColumnModal() {
    const dispatch = useDispatch();
    const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);
    const headings = useSelector((state: RootState) => state.main.headings);

    if (columnModalIdx == null) {
        return;
    }

    const column = headings[columnModalIdx];
    
    const [columnMeta, setColumnMeta] = React.useState(column);

    return (
        <Layer zIndex={modalZIndex}>
            <Modal
                accessibilityModalLabel="Create new board"
                align="start"
                heading="Column Metadata"
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
                    <Text>{column.name} of type {columnMeta.type}</Text>
                    <ColumnTypeDropdown type={column.type} onClose={t=>setColumnMeta({...columnMeta, type: t})}/>
                </Box>
            </Modal>
        </Layer>
    );
}

/*
if this has unique values -> option to choose free text or unique 
if its all numbers or null, then try a number range. you get cool stuff like colour gradients and continuous filters
*/


const PAGE_HEADER_ZINDEX = new FixedZIndex(11);

export function ColumnTypeDropdown(props: { type: string, onClose:(type:string)=>void }) {
    const [open, setOpen] = React.useState(false);
    const x: DropdownOption = {
        label: props.type,
        value: props.type
    }
    const [selected, setSelected] = React.useState(x);
    const anchorRef = React.useRef(null);

    const onSelect = ({ item }) => {
        setSelected(item);
        setOpen(false);
        props.onClose(item.value);
    };

    const options = COLUMN_TYPES.map(t => <Dropdown.Item
        key={t.name}
        option={{ value: t.name, label: t.name, subtext: t.description }}
        onSelect={onSelect}
        selected={selected}
    />
    )

    return (
        <React.Fragment>
            <Box>
                <Button
                    accessibilityControls="column-type-dropdown"
                    accessibilityExpanded={open}
                    accessibilityHaspopup
                    iconEnd="arrow-down"
                    onClick={() => setOpen((prevVal) => !prevVal)}
                    ref={anchorRef}
                    selected={open}
                    size="md"
                    text={selected.label}
                />
            </Box>
            {open && (
                <Dropdown
                    anchor={anchorRef.current}
                    id="column-type-dropdown"
                    onDismiss={() => setOpen(false)}
                    zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
                >

                    {options}
                </Dropdown>
            )}
        </React.Fragment>
    );
}

/*
Number
- validates all are number or blank
- calculates min
- calculates max

Keyword
- calculates all unique values (we want this to be a superset of existing, for example we don't want to lose the colour of 'in progress' just because nothing is currently in progress)
*/