import * as React from "react";
import { Button, Table, Text } from "gestalt";
import { useDispatch, useSelector } from "react-redux";
import { RootState, openColumnModal } from "../state/store";
import { Column } from "../state/column.types";

export function DataTable() {
  const headings = useSelector((state: RootState) => state.main.headings);
  const data = useSelector((state: RootState) => state.main.data);
  const filteredData = data.slice(0, 10);

  return <Table accessibilityLabel="Sticky footer">
    <Table.Header sticky>
      <Headings headings={headings} />
    </Table.Header>
    <Table.Body>
      {
        filteredData.map((d, idx) => <Row data={d} headings={headings} key={idx} />)
      }
    </Table.Body>
  </Table>
}

function Headings(props: { headings: Column[] }) {
  const dispatch = useDispatch();

  const cells = props.headings.map((h, idx) =>
    <Table.HeaderCell key={'h-' + idx}>
      <Button
        accessibilityLabel="Import"
        size="sm"
        text={h.name}
        iconEnd="edit"
        onClick={()=>dispatch(openColumnModal({idx:idx}))}
      />
    </Table.HeaderCell>)
  return <Table.Row>{cells}</Table.Row>
}

function Row(props: { data: string[], headings: Column[] }) {
  return <Table.Row>
    {props.headings.map((h, i) => <Table.Cell key={i}><Text>{props.data[i] + "which is a " + h.type}</Text></Table.Cell>)}
  </Table.Row>
}