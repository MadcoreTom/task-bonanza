import * as React from "react";
import { Tabs, Card, Tab } from "@nextui-org/react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

export function AppTabs(props: { onChange: (value: number) => void }) {

  const tabs = useSelector((state:RootState)=>state.main.views).map((v,i)=>{
    return {
      idx: i,
      label: v.name
    }
  });

  tabs.unshift({
    idx:-1,
    label: "Data"
  })


  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Mode tabs" items={tabs} color="primary" onSelectionChange={e => props.onChange(e as number)}>
        {(item) => (
          <Tab key={item.idx} title={item.label} value={item.idx}>
            {/* <Card>
             <CardBody>
                  The same thing for all of them
                </CardBody> 
            </Card> */}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}