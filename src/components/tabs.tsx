import * as React from "react";
import { Tabs, Card, Tab } from "@nextui-org/react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { ICONS } from "./icons";

export function AppTabs(props: { onChange: (value: number) => void }) {

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


  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Mode tabs" items={tabs} color="secondary" onSelectionChange={e => props.onChange(e as number)}>
        {(item) => (
          <Tab key={item.idx} title={item.label} value={item.idx}>
            {/* Usually cards would go in here, but I'm not using that */}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}