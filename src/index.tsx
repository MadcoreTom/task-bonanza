import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider, Button } from "@nextui-org/react";
import { AppTabs } from "./components/tabs";
import { ViewSidebar } from "./components/view.sidebar";
import { SheetView } from "./components/sheet.view";
import { STATE } from "./state";
import { Selection } from "./model/view.model";
import { ColumnSidebar } from "./components/column.sidebar";



function App() {
  const [tabIdx, setTabIdx] = React.useState("data");
  const [sel, setSel] = React.useState<Selection>({ type: "view", name: "nothing" });

  let content: any = undefined;
  // const aaa = React.useCallback(setSel, []);

  switch (tabIdx) {
    case "data":
      const MemoComponent = React.memo(SheetView);
      content = <MemoComponent data={STATE.records} onSelect={()=>{/* setSel should be here, but triggers re-renders */}} />
      break;
    default:
      content = undefined;
  }

  return <div className="flex w-full flex-row" id="main">
    <div className="flex-1">
      <div className="flex">
        <h1>Task&nbsp;Bonanza</h1>
        <AppTabs onChange={v => { setTabIdx(v), setSel({ type: "view", name: "view" + v }) }} />
      </div>
      {content}

    </div>

    <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md shadow-danger" id="sidepanel">
      {tabIdx}
      <Side sel={sel} />
    </div>
  </div>

}

function Side(props: { sel: Selection }) {
  const { sel } = props;

  switch (sel.type) {
    case "view":
      return <ViewSidebar />
    case "column":
      return <ColumnSidebar column={sel.name} />
    default:
      return <span>err</span>
  }
}

createRoot(document.querySelector("#root") as HTMLElement)
  .render(
    <NextUIProvider><App /></NextUIProvider>);


