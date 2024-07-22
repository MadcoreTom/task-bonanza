import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider, Button } from "@nextui-org/react";
import { AppTabs } from "./components/tabs";
import { ViewSidebar } from "./components/view.sidebar";
import { SheetView } from "./components/sheet.view";
import { STATE } from "./state";
import Spreadsheet from "react-spreadsheet";



function App() {
  const [tabIdx, setTabIdx] = React.useState("data");

  let content:any = undefined;

  switch(tabIdx){
    case "data":
      content = <SheetView data={STATE.records} />
      break;
      default:
        content = undefined;
  }

  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  return <div className="flex w-full flex-row" id="main">
    <div className="flex-1">
      <h1>Task Bonanza</h1>
      <AppTabs onChange={setTabIdx}/>
      {content}

 <Spreadsheet data={data} />;
    </div>

    <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md shadow-danger" id="sidepanel">
  <ViewSidebar/>
      {tabIdx}
    </div>
  </div>

}


createRoot(document.querySelector("#root") as HTMLElement)
  .render(
    <NextUIProvider><App /></NextUIProvider>);


