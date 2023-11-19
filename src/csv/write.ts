import { Column } from '../state/column.types';
import { State } from '../state/state';
import * as Papa from 'papaparse'

export function writeCsv(state: State) {
    let csv = "";

    // Headings
    csv += `HEADINGS,${state.headings.length}\n`;
    csv += "Name,Type,Meta\n"
    csv += Papa.unparse(state.headings.map(h=>writeHeading(h))) + "\n"

    // View config
    csv += `VIEW,1\n`;
    csv+= Papa.unparse([
        ["textColumn","colourColumn","emojiColumn"],
        [state.view.textColumn,state.view.colourColumn,state.view.emojiColumn]
    ]) + "\n";

    // Data
    csv += `DATA,${state.data.length}\n`
    // -- headers
    csv += Papa.unparse([state.headings.map(h => h.name)]) + "\n";
    // -- data
    state.data.forEach(row => csv += Papa.unparse([row]) + "\n");
    
    
    console.log(csv);
}

function writeHeading(col:Column):string[]{
    const tmp = {...col} as any;
    delete tmp.name;
    delete tmp.type;
    return [
        col.name,
        col.type,
        JSON.stringify(tmp)
    ]
}