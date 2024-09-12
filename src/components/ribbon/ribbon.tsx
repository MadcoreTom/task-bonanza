import { Button, ButtonGroup, Card, Checkbox, Divider, Input, Tab, Tabs, Tooltip } from "@nextui-org/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICONS } from "../icons";
import { addView, RootState, setFilename, setTab } from "../../state/store";
import { DataControls } from "./data.controls";
import { ViewControls } from "./view.controls";

export function Ribbon() {
    const dispatch = useDispatch();
    return <div className="flex flex-col content-start rounded-b-md p-1" style={{ zIndex: 100 }}>
        <div className="p-2 gap-2 flex flex-row" style={{ height: 55 }} >
            <span className="text-xl" id="title" style={{ alignSelf: "center" }}>Task&nbsp;Bonanza</span>
            <FileControls />
            <Divider orientation="vertical" />
            <Controls />
        </div>
        <div className="flex gap-3 p-2 justify-center" style={{ alignItems: "baseline" }}>
            <ViewTabs />
            <Button isIconOnly title="Add View" size="sm" color="success" onClick={() => dispatch(addView())}>{ICONS.add}</Button>
        </div>
    </div>
}

function FileControls() {
    const filename = useSelector((state: RootState) => state.main.filename);
    const dispatch = useDispatch();

    return <React.Fragment>
        <ButtonGroup>
            <Input value={filename} onChange={e => dispatch(setFilename({ filename: e.target.value }))} className="max-w-xs" radius="none" variant="bordered" />
            <Tooltip showArrow={true} content="Save">
                <Button value={filename} color="primary" variant="flat" isIconOnly aria-label="Save or Load" onClick={() => dispatch(setFilename({ dialogue: { save: {} } }))}>{ICONS.file}</Button>
            </Tooltip>
            <Tooltip showArrow={true} content="Load">
                <Button value={filename} color="primary" variant="flat" isIconOnly aria-label="Save or Load" onClick={() => dispatch(setFilename({ dialogue: { load: {} } }))}>load</Button>
            </Tooltip>
        </ButtonGroup>
        <Checkbox defaultSelected>Autosave</Checkbox>
    </React.Fragment>
}

function Controls() {
    const tab = useSelector((state: RootState) => state.main.tab);
    return tab == -1 ? <DataControls /> : <ViewControls />;
}

function ViewTabs() {
    const tab = useSelector((state: RootState) => state.main.tab);
    const dispatch = useDispatch();
    const tabs = useSelector((state: RootState) => state.main.views).map((v, i) => {
        return {
            idx: i,
            label: <div className="flex items-center space-x-2">
                {ICONS.graph}
                <span>{v.name}</span>
            </div>,
        }
    });

    tabs.unshift({
        idx: -1,
        label: <div className="flex items-center space-x-2">
            {ICONS.table}
            <span>Data</span>
        </div>,
    })


    return (<Tabs aria-label="View tabs" items={tabs} color="secondary" variant="underlined"
        onSelectionChange={e => dispatch(setTab(e as number))} selectedKey={"" + tab}>
        {(item) => (
            <Tab key={item.idx} title={item.label} value={item.idx}>
                {/* Usually cards would go in here, but I'm not using that */}
            </Tab>
        )}
    </Tabs>
    );
}