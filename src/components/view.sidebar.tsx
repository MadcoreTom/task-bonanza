import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem, Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateView } from "../state/store";
import { ViewDef } from "../model/view.model";
import { ICONS } from "./icons";

export function ViewSidebar() {
    const columns = useSelector((state: RootState) => state.main.columns);
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "view" ? state.main.selected.idx : 0);
    const view = useSelector((state: RootState) => state.main.views[selected]);
    const dispatch = useDispatch();

    /*
        const [tmpView, setTmpView] = React.useState(null as ViewDef | null);
        console.log("T", JSON.stringify(tmpView))
        */
    React.useEffect(() => {
        setTmpView(view);
    }, [view]);


    const tmpView = view;
    const setTmpView = v => {
        console.log("VV", v)
        dispatch(updateView({ idx: selected, def: v }));
    }


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

        <Input
            label="View Name"
            value={view.name}
            // onChange={e => setTmpColumn({ ...column, name: e.target.value })}
            // onBlur={e => dispatch(updateColumn({ idx: selected, def: tmpColumn }))}
        />

        <ViewDropdown title="Title" options={items} view={tmpView} updateView={setTmpView} property="title" icon={ICONS.title} />
        <ViewDropdown title="Text" options={items} view={tmpView} updateView={setTmpView} property="text" icon={ICONS.title} />
        <ViewDropdown title="Colour" options={items} view={tmpView} updateView={setTmpView} property="colour" icon={ICONS.colour} />
        <ViewDropdown title="Emoji" options={items} view={tmpView} updateView={setTmpView} property="emoji" icon={ICONS.emoji} />
        <ViewDropdown title="Arrows" options={items} view={tmpView} updateView={setTmpView} property="arrows" icon={ICONS.arrowsSplit} />
        <ViewDropdown title="Swimlane" options={items} view={tmpView} updateView={setTmpView} property="swimlane" icon={ICONS.swimlane} />
        <ViewDropdown title="Row" options={items} view={tmpView} updateView={setTmpView} property="row" icon={ICONS.rows} />
    </React.Fragment>
}

function ViewDropdown(props: { title: string, options: { label: string, key: number }[], view: ViewDef, updateView: (view: ViewDef) => void, property: keyof ViewDef, icon: any }) {
    return <Select
        label={props.title}
        placeholder="None"
        selectionMode="single"
        className="max-w-xs"
        startContent={props.icon}
        selectedKeys={[props.view[props.property] == null ? -1 : props.view[props.property] + ""]}
        onChange={e => props.updateView({ ...props.view, [props.property]: parseInt(e.target.value) })}
        variant={props.view[props.property] == null || props.view[props.property] ==-1 ? "bordered" : "flat"}
    >
        {props.options.map((item) => (
            <SelectItem key={item.key}>
                {item.label}
            </SelectItem>
        ))}
    </Select>
}