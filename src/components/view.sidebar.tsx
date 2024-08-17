import * as React from "react";
import { Tabs, Card, Tab, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem, Input, Divider } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateView } from "../state/store";
import { ViewDef } from "../model/view.model";
import { ICONS } from "./icons";

type ViewMode = {
    key: keyof ViewDef,
    displayName: string,
    icon: any,
    filteredTypes?: string[]
}

const VIEW_MODES: ViewMode[] = [
    {
        key: "title",
        displayName: "Title",
        icon: ICONS.title
    },
    {
        key: "text",
        displayName: "Text",
        icon: ICONS.title// TODO
    },
    {
        key: "colour",
        displayName: "Colour",
        icon: ICONS.colour
    },
    {
        key: "emoji",
        displayName: "Emoji",
        icon: ICONS.emoji,
        filteredTypes: ["Keyworkd"]
    },
    {
        key: "arrows",
        displayName: "Arrows",
        icon: ICONS.arrowsSplit,
        filteredTypes: ["Link"]
    },
    {
        key: "swimlane",
        displayName: "Swimlane",
        icon: ICONS.swimlane,
        filteredTypes: ["Keyword"]
    },
    {
        key: "row",
        displayName: "Row",
        icon: ICONS.rows,
        filteredTypes: ["Keyword"]
    }
]

export function ViewSidebar() {
    const columns = useSelector((state: RootState) => state.main.columns);
    const selected = useSelector((state: RootState) => state.main.selected && state.main.selected.type == "view" ? state.main.selected.idx : 0);
    const view = useSelector((state: RootState) => state.main.views[selected]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setTmpView(view);
    }, [view]);


    const tmpView = view;
    const setTmpView = (v: ViewDef) => {
        dispatch(updateView({ idx: selected, def: v }));
    }


    if (view == undefined || tmpView == null) {
        return <span>err, cannot find view {selected}</span>
    }

    const items = columns.map((c, i) => {
        return { label: c.name, key: i, type: c.type } as { label: string, key: number, type: string | null }
    });

    function filteredItems(types: string[]) {
        return items.filter(i => i.type == null || types.indexOf(i.type) >= 0);
    }

    function addMode(mode: ViewMode) {
        const options = mode.filteredTypes ? filteredItems(mode.filteredTypes) : items;
        if (options.length > 0) {
            const option = options[0];
            console.log("Add mode", mode.displayName, option.key)
            setTmpView({ ...tmpView, [mode.key]: option.key })
        }
    }

    return <React.Fragment>
        <h1>View {tmpView.name}</h1>

        <Input
            label="View Name"
            value={view.name}
            onChange={e => setTmpView({ ...tmpView, name: e.target.value })}
        />
        {
            VIEW_MODES.filter(m => view[m.key] != null && (view[m.key] as number) >= 0)
                .map(m => <ViewDropdown title={m.displayName} options={m.filteredTypes ? filteredItems(m.filteredTypes) : items} view={tmpView} updateView={setTmpView} property={m.key} key={m.key} icon={m.icon} />)
        }
        <Divider orientation="horizontal" />
        <div className="flex flex-wrap gap-2" style={{ justifyContent: "space-around" }}>
            <div className="w-full">Add Property</div>
            {
                VIEW_MODES.filter(p => view[p.key] == null || (view[p.key] as number) < 0)
                    .map(p => <Button key={p.key} variant="bordered" style={{ height: 100, width: 100, borderStyle: "dashed", flexWrap: "wrap" }} onClick={() => addMode(p)}>{p.icon}<span>{p.displayName}</span></Button>)
            }
        </div>
    </React.Fragment>
}

function ViewDropdown(props: { title: string, options: { label: string, key: number, type: string | null }[], view: ViewDef, updateView: (view: ViewDef) => void, property: keyof ViewDef, icon: any }) {
    if (props.view[props.property] == null || props.view[props.property] as number < 0) {
        return null;
    }
    return <div className="flex items-end gap-1"><Select
        label={props.title}
        placeholder="None"
        selectionMode="single"
        // className="max-w-xs"
        startContent={props.icon}
        selectedKeys={[props.view[props.property] + ""]}
        onChange={e => props.updateView({ ...props.view, [props.property]: parseInt(e.target.value) })}
        variant="flat"
        labelPlacement="outside"
    >
        {props.options.map((item) => (
            <SelectItem key={item.key}>
                {item.label}
            </SelectItem>
        ))}
    </Select>
        <Button isIconOnly={true} variant="flat">{ICONS.edit}</Button>
    </div>
}