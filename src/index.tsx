import * as React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import { ViewSidebar } from "./components/view.sidebar";
import { SheetView } from "./components/sheet.view";
import { ColumnSidebar } from "./components/column.sidebar";
import { RootState, STORE } from "./state/store";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Graph } from "./graph/graph";
import { NodeSidebar } from "./components/node.sidebar";
import { Ribbon } from "./components/ribbon/ribbon";
import { parseCsv, formatCsv } from "./csv";


function App() {
  const tab = useSelector((state: RootState) => state.main.tab);
  console.log("💲 ROOT RERENDER", tab)

  let content = tab == -1 ? <SheetView /> : <Graph viewIdx={tab} />;


  return <div className="flex w-full flex-row" id="main">
    <div className="flex-1 flex flex-col">
      <Ribbon />
      {content}

    </div>
    <Side />
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
      return <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md" id="sidepanel"><ViewSidebar /></div>
    case "column":
      return <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md" id="sidepanel"><ColumnSidebar /></div>
    case "node":
      return <div className="flex-initial w-80 flex gap-3 flex-col p-2 shadow-md" id="sidepanel"><NodeSidebar /></div>
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

const TESTCSV =`name,age,height
a,b,c
Tom,35,"6ft"
"Cat""Dog",test,123
Jim "Tiny" smith,48,210
"billy,,test","23",111
This has a newline,"start
end",123`;

const EXPECTED = `name|age|height
a|b|c
Tom|35|6ft
Cat"Dog|test|123
Jim "Tiny" smith|48|210
billy,,test|23|111
This has a newline|start
end|123`;

console.log(TESTCSV)

const b = parseCsv(TESTCSV);
  console.log(b.map(x=>x.join("|")).join("\n"))

  console.log(EXPECTED)
  

  console.log(b.map(x=>x.join("|")).join("\n") == EXPECTED)

  console.log("?",formatCsv([
    ["a","b","c"],
    ["Tom",35,"6ft"],
    ['Cat"Dog',"test",123],
    ["billy,,test","23",111],
    ["This has a newline", "start\nend",123]
  ]))