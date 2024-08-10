import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICONS } from "../icons";
import { RootState, setTab } from "../../state/store";
import { DataControls } from "./data.controls";
import { ViewControls } from "./view.controls";

export function Ribbon() {
    return <div className="flex flex-col content-start" style={{ borderBottom: "2px solid hsl(var(--nextui-secondary))" }}>
        <div className="flex gap-3 p-2 justify-start" style={{ alignItems: "baseline" }}>
            <span className="text-xl" id="title" style={{ alignSelf: "center" }}>Task&nbsp;Bonanza</span>
            <ViewTabs />
            <Button isIconOnly title="Add View" size="sm" color="success">{ICONS.add}</Button>
        </div>
        <div className="p-2">
            <Card className="shadow-md rounded-b-md p-2 flex gap-2 flex flex-row" style={{height:55}} >
                <Controls />
            </Card>
        </div>
    </div>
}

function Controls() {
    const tab = useSelector((state: RootState) => state.main.tab);
    console.log("TAB", tab)

    return tab == -1 ? <DataControls /> : <ViewControls/>;
}

function ViewTabs() {
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


    return (<Tabs aria-label="View tabs" items={tabs} color="secondary" variant="light"
        onSelectionChange={e => dispatch(setTab(e as number))}>
        {(item) => (
            <Tab key={item.idx} title={item.label} value={item.idx}>
                {/* Usually cards would go in here, but I'm not using that */}
            </Tab>
        )}
    </Tabs>
    );
}