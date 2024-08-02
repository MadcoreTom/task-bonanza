import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import { AppTabs } from "./components/tabs";
import { ViewSidebar } from "./components/view.sidebar";
import { SheetView } from "./components/sheet.view";
import { ColumnSidebar } from "./components/column.sidebar";
import { RootState, setSelection, setTab, STORE } from "./state/store";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Graph } from "./graph/graph";
import { NodeSidebar } from "./components/node.sidebar";


function App() {
  const tab = useSelector((state: RootState) => state.main.tab);
  const dispatch = useDispatch();
  console.log("ROOT RERENDER", tab)

  let content: any;

  // TODO no more switch
  if (tab == -1) {
    content = <SheetView />

  } else {
    content = <Graph viewIdx={tab} />;

  }

  return <div className="flex w-full flex-row" id="main">
    <div className="flex-1 flex flex-col">
      <div className="flex gap-3 p-2 items-baseline" style={{ alignItems: "center", borderBottom: "2px solid hsl(var(--nextui-secondary))" }}>
        <span className="text-xl" id="title">Task&nbsp;Bonanza</span>
        <AppTabs onChange={v => {
          console.log("TAB", v)
          dispatch(setTab(v));
          dispatch(setSelection({ type: "view", idx: v }));
        }} />
        {tab}
      </div>
      {content}

    </div>

    <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md shadow-danger" id="sidepanel">
      <Side />
    </div>
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
      return <ViewSidebar />
    case "column":
      return <ColumnSidebar />
    case "node":
      return <NodeSidebar />
    default:
      return <span>Unknown selection</span>
  }
}

createRoot(document.querySelector("#root") as HTMLElement)
  .render(
    <NextUIProvider>
      <Provider store={STORE}>
        <App />
      </Provider>
    </NextUIProvider>);


