import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "./state/store";
import { Button, Flex, Text, Table } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { DataTable } from "./components/datatable";



function App() {

  return <div className="main">
    Wello Horld
    <Flex>
      <Button
        accessibilityLabel="Import"
        size="lg"
        text="Import"
      />
    </Flex>
   <DataTable/>
  </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
  .render(<Provider store={store}><App /></Provider>,);