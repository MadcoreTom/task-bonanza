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

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function ColumnModal() {
    const dispatch = useDispatch();
    const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);
    const headings = useSelector((state: RootState) => state.main.headings);

    if(columnModalIdx==null){
        return;
    }

    const column = headings[columnModalIdx];

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
                            <Button text="Close" onClick={()=>dispatch(closeColumnModal())} />
                            <Button color="red" text="Save & Close" />
                        </ButtonGroup>
                    </Flex>
                }
                size="sm"
            >
                <Box marginBottom={6}>
                    <Text>This is a box with a margin</Text>
                    <Text>{column}</Text>
                </Box>
            </Modal>
        </Layer>
    );
}

/*
if this has unique values -> option to choose free text or unique 
if its all numbers or null, then try a number range. you get cool stuff like colour gradients and continuous filters
*/