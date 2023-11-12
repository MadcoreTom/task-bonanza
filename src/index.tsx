import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "./state/store";
import { Button, Flex, Text, Table, Box, Tabs } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { DataTable } from "./components/datatable";
import ColumnModal from "./components/colummodal";



function App() {
  const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);
  const [activeMode, setActiveMode] = React.useState(0);

  return <div className="main">
    <Flex height="100%" alignContent="center" justifyContent="between" alignItems="baseline">
      <Text size="400" weight="bold">Task Bonanza
      </Text>

      <Tabs
        activeTabIndex={activeMode}
        onChange={({ activeTabIndex }) => setActiveMode(activeTabIndex)}
        tabs={[
          { href: '#', text: 'Graph' },
          { href: '#', text: 'Table' },
        ]}
      />
      <Button
        accessibilityLabel="Import"
        size="lg"
        text="Import"
      />
    </Flex>
    <div style={{height: "2px", backgroundColor:"var(--g-colorGray100)"}}></div>
    {activeMode == 1 && <DataTable />}
    {activeMode == 0 && <Text>Graph</Text>}
    {
      columnModalIdx == null ? null : <ColumnModal />
    }
  </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
  .render(<Provider store={store}><App /></Provider>,);


