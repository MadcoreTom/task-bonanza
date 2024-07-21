import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider, Button } from "@nextui-org/react";
import { AppTabs } from "./components/tabs";
import { ViewSidebar } from "./components/view.sidebar";

function App() {
  const [tabIdx, setTabIdx] = React.useState("data");

  return <div className="flex w-full flex-row" id="main">
    <div className="flex-1 bg-stripe-gradient">
      <h1>Task Bonanza</h1>
      <AppTabs onChange={setTabIdx}/>
    </div>

    <div className="flex-initial w-80 flex gap-3 flex-col p-2" id="sidepanel">
  <ViewSidebar/>
      {tabIdx}
    </div>
  </div>

}


createRoot(document.querySelector("#root") as HTMLElement)
  .render(
    <NextUIProvider><App /></NextUIProvider>);


