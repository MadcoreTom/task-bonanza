import * as React from "react";
import { Input, Switch } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { NodeSelection } from "../model/view.model";

export function NodeSidebar() {
    const selected = useSelector((state: RootState) => state.main.selected as NodeSelection);
    const record = useSelector((state: RootState) => state.main.records[selected.idx]);
    const columns = useSelector((state: RootState) => state.main.columns);

    return <React.Fragment>
        <h1>Node {selected.idx}</h1>
        <Switch title="MouseDown" isSelected={selected.mouseDown} />
        {
            columns.map((c,i)=>{
                return  <Input
                isReadOnly
                label={c.name}
                variant="bordered"
                value={record.columns[i]}
                defaultValue="-"
              />})
        }
    </React.Fragment>
}