import { HSL, interpolateHsl, textToHsl } from "../colour";
import { Record } from "../model/data";
import { ColumnDef, ViewDef } from "../model/view.model";


export type NodeViewTransformer = {
    getTitle: (record: Record) => string,
    getText: (record: Record) => string,
    getColour: (record: Record) => [number, number, number],
    getX: (record: Record) => null | number
}

export function getTransformerForView(view: ViewDef, columns: ColumnDef[]): NodeViewTransformer {

    const colourColumn = view.colour == null ? null : columns[view.colour];

    function transformColour(record: Record): HSL {
        if (!colourColumn || view.colour == null) {
            return [0, 0, 0];
        }
        const val = record.columns[view.colour];
        switch (colourColumn.type) {
            case "Number":
                return interpolateHsl(val, colourColumn.minColour, colourColumn.maxColour, colourColumn.minVal, colourColumn.maxVal);
            case "Keyword":
                return colourColumn.map[val]?.colour ? colourColumn.map[val].colour : textToHsl(val);
            case "Alphabetical":
            default:
                return textToHsl(val);
        }
    }

    const transformer: NodeViewTransformer = {
        getColour: transformColour,
        getTitle: (record) => view.title != null ? record.columns[view.title] : "null",
        getText: (record) => view.text != null ? record.columns[view.text] : "",
        getX: view.swimlane == null ? (() => null) : ((record) => view.swimlanes?.map((s, i) => [s, i * 250 + 10]).filter(s => s[0] == record.columns[view.swimlane as number]).map(s => s[1])[0] as number)
    }

    return transformer;
}