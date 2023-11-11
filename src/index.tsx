import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "./state/store";
import { Button, Flex, Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';



function App() {
    // const viewMode = useSelector((state: RootState) => state.main.viewMode);

    return <div className="main">
        Wello Horld
        <Flex>
            <Button
                accessibilityLabel="Import"
                size="lg"
                text="Import"
            />
        </Flex>
    </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
    .render(<Provider store={store}><App /></Provider>,);