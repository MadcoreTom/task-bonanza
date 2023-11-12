import * as React from "react";
import { Button, Table, Text } from "gestalt";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

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

function Headings(props: { headings: string[] }) {
  const cells = props.headings.map((h, idx) =>
    <Table.HeaderCell key={'h-' + idx}>
      <Button
        accessibilityLabel="Import"
        size="sm"
        text={h}
        iconEnd="edit"
      />
    </Table.HeaderCell>)
  return <Table.Row>{cells}</Table.Row>
}

function Row(props: { data: string[], headings: string[] }) {
  return <Table.Row>
    {props.headings.map((h, i) => <Table.Cell key={i}><Text>{props.data[i]}</Text></Table.Cell>)}
  </Table.Row>
}