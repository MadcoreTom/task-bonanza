import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import { ViewSidebar } from "./components/view.sidebar";
import { SheetView } from "./components/sheet.view";
import { ColumnSidebar } from "./components/column.sidebar";
import { RootState, STORE } from "./state/store";
import { Provider, useSelector } from 'react-redux'
import { Graph } from "./graph/graph";
import { NodeSidebar } from "./components/node.sidebar";
import { Ribbon } from "./components/ribbon/ribbon";
import { SaveLoadModal } from "./components/saveLoad.modal";


function App() {
  const tab = useSelector((state: RootState) => state.main.tab);
  console.log("💲 ROOT RERENDER", tab)

  let content = tab == -1 ? <SheetView /> : <Graph viewIdx={tab} />;


  return <div className="flex w-full flex-col" id="main">
    <Ribbon />
    <div className="flex-1 flex flex-row gap-2 p-2" id="main-container">
      {content}
      <Side />
    </div>
    <SaveLoadModal />
  </div>

}

// TODO move?
function Side() {
  const selected = useSelector((s: RootState) => s.main.selected)
  if (!selected) {
    return null;
  }

  switch (selected.type) {
    case "view":
      return <div className="flex-initial w-80 flex gap-3 flex-col p-2 rounded-small bg-white" id="sidepanel"><ViewSidebar /></div>
    case "column":
      return <div className="flex-initial w-80 flex gap-3 flex-col p-2 rounded-small bg-white" id="sidepanel"><ColumnSidebar /></div>
    case "node":
      return <div className="flex-initial w-80 flex gap-3 flex-col p-2 rounded-small bg-white" id="sidepanel"><NodeSidebar /></div>
    default:
      return null
  }
}

createRoot(document.querySelector("#root") as HTMLElement)
  .render(
    <NextUIProvider>
      <Provider store={STORE}>
        <App />
      </Provider>
    </NextUIProvider>);

