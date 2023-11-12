import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "./state/store";
import { Button, Flex, Text, Table, Box } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { DataTable } from "./components/datatable";
import ColumnModal from "./components/colummodal";



function App() {
  const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);


  return <div className="main">
    <Box borderStyle="raisedBottomShadow">
      <Text>Task Bonanza
        <Button
          accessibilityLabel="Import"
          size="lg"
          text="Import"
        />
      </Text>
    </Box>
    <DataTable />
    {
      columnModalIdx == null ? null : <ColumnModal />
    }
  </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
  .render(<Provider store={store}><App /></Provider>,);