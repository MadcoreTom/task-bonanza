// Ooh, let's user a namespace, remember those?

import { getUniqueValues } from "../components/column.keyword.sidebar";
import { getTransformerForView } from "../graph/graph.transformer";
import { State } from "./store";

export namespace LayoutHelpers {
    export function layout(state: State) {
        // TODO sort by  arrows
        const def = state.views[state.tab];
        if (def.swimlanes == undefined) {
            calcSwimlanes(state);
        }
        initLocations(state);
        reCentreFunc(state);
        def.dirty = false;
    }

    export function reCentreFunc(state: State) {
        const view = state.views[state.tab];
        if (view.data.length == 0) {
            return;
        }
        let minX = view.data[0].pos[0];
        let minY = view.data[0].pos[1];
        let maxX = minX;
        let maxY = minY;
        view.data.forEach(d => {
            minX = Math.min(minX, d.pos[0]);
            maxX = Math.max(maxX, d.pos[0]);
            minY = Math.min(minY, d.pos[1]);
            maxY = Math.max(maxY, d.pos[1]);
        });
        const centre: [number, number] = [
            -(minX + (maxX - minX) / 2),
            -(minY + (maxY - minY) / 2)
        ]
        console.log(">>", minX, minY, maxX, maxY, centre);
        const svg = document.querySelector("svg#graph") as SVGElement | undefined;
        if (svg) {
            centre[0] += svg.clientWidth / 2;
            centre[1] += svg.clientHeight / 2;
        }
        state.offset = centre; // TODO make it centre
    }


    export function calcSwimlanes(state: State) {
        const def = state.views[state.tab];
        def.swimlanes = getUniqueValues(state.records.map(r => r.columns[def.swimlane as number]));
    }
    function initLocations(state: State) {
        const view = state.views[state.tab];
        view.data = []
        if (view.swimlane == null) {
            state.records.forEach((r, i) => {
                view.data[i] = { pos: [(i * 250) % 1000, (Math.floor(i / 4) * 80)] }
            });
        } else {
            state.records.forEach((r, i) => {
                const x = view.swimlane != null && view.swimlanes ? view.swimlanes.indexOf(r.columns[view.swimlane]) * 250 : 0;
                view.data[i] = { pos: [x, (i * 80 + 50)] }
            });
            const tracker: { [id: number]: number } = [];
            view.data.forEach(d => {
                let y = tracker[d.pos[0]];
                if (y == undefined) {
                    y = 50; // start offset
                } else {
                    y += 80; // gap
                }
                tracker[d.pos[0]] = y;
                d.pos[1] = y;
            })
        }
    }
}