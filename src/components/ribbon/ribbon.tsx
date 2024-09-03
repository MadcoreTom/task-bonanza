import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICONS } from "../icons";
import { addView, RootState, setTab } from "../../state/store";
import { DataControls } from "./data.controls";
import { ViewControls } from "./view.controls";

export function Ribbon() {
    const dispatch = useDispatch();
    return <div className="flex flex-col content-start shadow-md rounded-b-md p-1" style={{zIndex:100}}>
        <div className="flex gap-3 p-2 justify-start" style={{ alignItems: "baseline" }}>
            <span className="text-xl" id="title" style={{ alignSelf: "center" }}>Task&nbsp;Bonanza</span>
            <ViewTabs />
            <Button isIconOnly title="Add View" size="sm" color="success" onClick={()=>dispatch(addView())}>{ICONS.add}</Button>
        </div>
        <div className="p-2 gap-2 flex flex-row" style={{height:55}} >
            <Controls />
        </div>
    </div>
}

function Controls() {
    const tab = useSelector((state: RootState) => state.main.tab);
    return tab == -1 ? <DataControls /> : <ViewControls/>;
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