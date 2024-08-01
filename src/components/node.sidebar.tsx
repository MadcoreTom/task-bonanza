import * as React from "react";
import { Switch } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { NodeSelection } from "../model/view.model";

export function NodeSidebar() {
    const selected = useSelector((state: RootState) => state.main.selected as NodeSelection);

    return <React.Fragment>
        <h1>Node {selected.idx}</h1>
        <Switch title="MouseDown" isSelected={selected.mouseDown} />
    </React.Fragment>
}