import * as React from "react";
import { Tabs, Card, Tab } from "@nextui-org/react";

export function AppTabs(props: { onChange: (value: string) => void }) {
  let tabs = [
    {
      id: "data",
      label: "Data",
    },
    {
      id: "v1",
      label: "View 1",
    },
    {
      id: "v2",
      label: "View 2",
    }
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs} onSelectionChange={e => props.onChange(e as string)}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
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