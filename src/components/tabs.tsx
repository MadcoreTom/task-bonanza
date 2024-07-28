import * as React from "react";
import { Tabs, Card, Tab } from "@nextui-org/react";

export function AppTabs(props: { onChange: (value: number) => void }) {
  let tabs = [
    {
      idx: 0,
      label: "Data",
      
    },
    {
      idx:1,
      label: "View 1",
    },
    {
      idx: 2,
      label: "View 2",
    }
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs} onSelectionChange={e => props.onChange(e as number)}>
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