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
import { RootState, closeColumnModal,  closeNodeModal,  saveColumn } from "../state/store";

const HEADER_ZINDEX = new FixedZIndex(10);
const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

export  function NodeModal(props:{idx:number}) {
    const dispatch = useDispatch();
    const headings = useSelector((state: RootState) => state.main.headings);
    const row = useSelector((state: RootState) => state.main.data[props.idx]);

   


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
                            <Button text="Close" onClick={() => dispatch(closeNodeModal())} />
                            <Button color="red" text="Save & Close" onClick={()=>null} />
                        </ButtonGroup>
                    </Flex>
                }
                size="md"
            >
                <Box marginBottom={1} minHeight={500}>
                    <Text>hello</Text>
                    {
                        headings.map((h,i)=><Text>{h.name} = {row[i]}</Text>)
                    }
                </Box>
            </Modal>
        </Layer>
    );
}
