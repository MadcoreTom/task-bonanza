import { Column } from '../state/column.types';
import { State } from '../state/state';
import * as Papa from 'papaparse'

export function writeCsv(state: State) {
    let csv = "";

    // Headings
    csv += `HEADINGS,${state.headings.length}\n`;
    csv += "Name,Type,Meta\n"
    csv += Papa.unparse(state.headings.map(h => writeHeading(h))) + "\n"

    // View config
    csv += `VIEW,1\n`;
    csv += Papa.unparse([
        ["textColumn", "colourColumn", "emojiColumn"],
        [state.view.textColumn, state.view.colourColumn, state.view.emojiColumn]
    ]) + "\n";

    // Data
    csv += `DATA,${state.data.length}\n`
    // -- headers
    csv += Papa.unparse([state.headings.map(h => h.name)]) + "\n";
    // -- data
    state.data.forEach(row => csv += Papa.unparse([row]) + "\n");


    console.log(csv);
    download("graph.csv",csv);
}

export function writeCsvDataOnly(state: State) {
    let csv = "";

    const headings: (Column & { idx: number })[] = state.headings
        .map((h, idx) => { return { ...h, idx } })
        .filter(h => h.type != "X" && h.type != "Y");


    // headers
    csv += Papa.unparse([headings.map(h => h.name)]) + "\n";
    // data
    state.data.forEach(row => csv += Papa.unparse([writeRowByOffset(row, headings)]) + "\n");

    console.log(csv);
    download("data.csv",csv);
}

function writeRowByOffset(data: string[], offset: { idx: number }[]): string[] {
    return offset.map(o => data[o.idx]);
}

function writeHeading(col: Column): string[] {
    const tmp = { ...col } as any;
    delete tmp.name;
    delete tmp.type;
    return [
        col.name,
        col.type,
        JSON.stringify(tmp)
    ]
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}