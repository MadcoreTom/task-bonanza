import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ViewDef } from "../model/view.model";

export function ViewSidebar() {
    const columns = useSelector((state: RootState) => state.main.columns);
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "view" ? state.main.selected.idx : 0);
    const view = useSelector((state: RootState) => state.main.views[selected]);


    const [tmpView, setTmpView] = React.useState(null as ViewDef | null);
    console.log("T", JSON.stringify(tmpView))
    React.useEffect(() => {
        setTmpView(view);
    }, [view]);


    if (view == undefined || tmpView == null) {
        return <span>err, cannot find view {selected}</span>
    }

    const items = columns.map((c, i) => {
        return { label: c.name, key: i }
    });

    items.unshift({
        label: "none",
        key: -1
    });


    console.log("items", JSON.stringify(items))



    return <React.Fragment>
        <h1>View {tmpView.name}</h1>


        <ViewDropdown title="Colour" options={items} view={tmpView} updateView={setTmpView} property="colour" />
        <ViewDropdown title="Emoji" options={items} view={tmpView} updateView={setTmpView} property="emoji" />        
        <ViewDropdown title="Title" options={items} view={tmpView} updateView={setTmpView} property="title" />

        <Button color="secondary">
            Hello Button
        </Button>
    </React.Fragment>
}

function ViewDropdown(props: { title: string, options: { label: string, key: number }[], view: ViewDef, updateView: (view: ViewDef) => void, property: keyof ViewDef }) {
    return <Select
    label={props.title}
    placeholder="None"
    selectionMode="single"
    className="max-w-xs"
    selectedKeys={[props.view[props.property] == null ? -1 : props.view[props.property] + ""]}
    onChange={e => props.updateView({ ...props.view, colour: parseInt(e.target.value) })}
>
    {props.options.map((item) => (
        <SelectItem key={item.key}>
            {item.label}
        </SelectItem>
    ))}
</Select>
}