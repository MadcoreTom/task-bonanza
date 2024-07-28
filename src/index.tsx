import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import { AppTabs } from "./components/tabs";
import { ViewSidebar } from "./components/view.sidebar";
import { SheetView } from "./components/sheet.view";
import { STATE } from "./state";
import { Selection } from "./model/view.model";
import { ColumnSidebar } from "./components/column.sidebar";
import { RootState, setSelection, STORE } from "./state/store";
import { Provider, useDispatch, useSelector } from 'react-redux'


function App() {
  const [tabIdx, setTabIdx] = React.useState("data");
  const dispatch = useDispatch();

  let content: any = undefined;

  switch (tabIdx) {
    case "data":
      content = <SheetView data={STATE.records} />
      break;
    default:
      content = undefined;
  }

  return <div className="flex w-full flex-row" id="main">
    <div className="flex-1">
      <div className="flex gap-3 p-2 items-baseline" style={{alignItems:"baseline"}}>
        <h1>Task&nbsp;Bonanza</h1>
        <AppTabs onChange={v => { setTabIdx(v), dispatch(setSelection({ type: "view", name: "view" + v })) }} />
      </div>
      {content}

    </div>

    <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md shadow-danger" id="sidepanel">
      {tabIdx}
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
      return <ColumnSidebar column={selected.name} />
    default:
      return <span>err</span>
  }
}

createRoot(document.querySelector("#root") as HTMLElement)
  .render(
    <NextUIProvider>
      <Provider store={STORE}>
        <App />
      </Provider>
    </NextUIProvider>);


