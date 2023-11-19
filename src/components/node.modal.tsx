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
import { RootState, closeColumnModal, closeNodeModal, saveColumn, saveRow } from "../state/store";
import { Column } from "../state/column.types";

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

export function NodeModal(props: { idx: number }) {
    const dispatch = useDispatch();
    const headings = useSelector((state: RootState) => state.main.headings);
    const row = useSelector((state: RootState) => state.main.data[props.idx]);
    const [tempRow, setTempRow] = React.useState(row);


    function save(){
        console.log("SAVE");
        dispatch(saveRow({idx:props.idx,row:tempRow}));
        dispatch(closeNodeModal());
    }

    return (
        <Layer zIndex={modalZIndex}>
            <Modal
                accessibilityModalLabel="Edit Node"
                align="start"
                heading="Edit Node"
                onDismiss={() => { }}
                footer={
                    <Flex alignItems="center" justifyContent="end">
                        <ButtonGroup>
                            <Button text="Cancel" onClick={() => dispatch(closeNodeModal())} />
                            <Button color="blue" text="Apply" onClick={save} />
                        </ButtonGroup>
                    </Flex>
                }
                size="md"
            >
                <Box marginBottom={1} minHeight={500} overflow="scrollY" padding={4}>
                    <Flex gap={4} direction="column">
                    {
                        headings.map((h,i)=><Field heading={h} value={tempRow[i]} onChange={val=>{tempRow[i] = val;setTempRow([...tempRow]);}} key={i}/>)
                    }
                    </Flex>
                </Box>
            </Modal>
        </Layer>
    );
}


function Field({ heading, value, onChange }: { heading: Column, value: string, onChange: (v: string) => void }) {
    if (heading.type == "FREE_TEXT" || heading.type == "KEYWORD") {
        return <TextField
            id={'field-' + heading.name}
            label={heading.name}
            onChange={({ value }) => onChange(value)}
            type="text"
            value={value}
        />
    } else {
        return <NumberField
            id={'field-' + heading.name}
            label={heading.name}
            onChange={({ value }) => onChange(""+value)}
            value={parseFloat(value)}
        />
    }
}