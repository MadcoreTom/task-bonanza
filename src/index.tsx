import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "./state/store";
import { Button, Flex, Text, Table, Box, Tabs } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { DataTable } from "./components/datatable";
import ColumnModal from "./components/colummodal";
import { Graph } from "./components/graph";
import { GraphNodes } from "./components/graph.node";
import { NodeModal } from "./components/node.modal";



function App() {
  const columnModalIdx = useSelector((state: RootState) => state.main.columnModalIdx);
  const nodeModalIdx = useSelector((state: RootState) => state.main.nodeModalIdx);
  const [activeMode, setActiveMode] = React.useState(0);

  return <Flex direction="column" height="100vh" justifyContent="start">
    <Flex alignContent="center" justifyContent="between" alignItems="baseline">
      <Text size="400" weight="bold"><span className="title">Task Bonanza</span>
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
    <div style={{ height: "2px", backgroundColor: "var(--g-colorGray100)" }}></div>
    {activeMode == 1 && <DataTable />}
    {activeMode == 0 && <Graph nodes={<GraphNodes />}/>}
    {
      columnModalIdx == null ? null : <ColumnModal />
    }
    {
      nodeModalIdx != null && <NodeModal idx={nodeModalIdx}/>
    }
  </Flex>
}


createRoot(document.querySelector("#root") as HTMLElement)
  .render(<Provider store={store}><App /></Provider>,);


