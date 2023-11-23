import { AVAILABLE_EMOJI } from "../../components/emojipicker";
import { State } from "../state";
import * as Papa from 'papaparse'

export const importReducer = (state: State, action: { payload: { data: string } }): State => {
    const data = action.payload.data;
    const results: { data: any[][], errors: any[], meta: any } = Papa.parse(data);

    state.data = [];
    state.headings = [];

    const header = results.data.shift();
    if (header) {
        state.headings = header.map(h => {
            return {
                name: h,
                type: "FREE_TEXT"
            }
        });
    }

    const colValues: Set<string>[]= [];
    state.headings.forEach(h=>colValues.push(new Set()));

    results.data.forEach(row => {
        let newRow = row.map(item => "" + item);
        if (newRow.filter(a => a && a.trim().length > 0).length > 0) {
            while (newRow.length < state.headings.length) {
                newRow.push("");
            }
            newRow = newRow.slice(0, state.headings.length);
            newRow.forEach((cell,i)=>colValues[i].add(cell));
            state.data.push(newRow);
        }
    });

    // add some standard headings
    state.headings.push({ name: "X", type: "X" });
    state.headings.push({ name: "Y", type: "Y" });
    state.data.forEach((row,i)=>{
        row.push(""+(i*50));
        row.push(""+(i*50));
    });

    const keywordColumns :string[] = [];

    // determine column types
    colValues.forEach((uniqueValues,idx)=>{
        // TODO check all numbers
        if(uniqueValues.size < state.data.length && (uniqueValues.size < 15 || uniqueValues.size < state.data.length/2)){
            const mapping  = [...uniqueValues.values()].reduce((agg, cur)=>{agg[cur] = {colour:randomColour(), emoji:pickRandom(AVAILABLE_EMOJI)};return agg},{});
            state.headings[idx] = {
                name: state.headings[idx].name,
                type: "KEYWORD",
                mapping
            }
            keywordColumns.push(state.headings[idx].name);
        }
    });

    // reset view
    state.view.textColumn = state.headings.filter(h=>h.type == "FREE_TEXT")[0].name;
    state.view.emojiColumn= keywordColumns[0 % keywordColumns.length];
    state.view.colourColumn = keywordColumns[1 % keywordColumns.length];

    // const mapping  = unique(state.data.map(row=>row[0])).reduce((agg, cur)=>{agg[cur] = {colour:randomColour()};return agg},{});
    // console.log("MAPPING",mapping)
    // state.headings[0] = {
    //     name:state.headings[0].name,
    //     type:"KEYWORD",
    //     mapping
    // };

    return state;
}

// TODO move to some sort of array tools

function unique<T>(arr: T[]): T[] {
    return arr
        .sort()
        .reduce((agg, cur) => {
            cur != agg[0] && agg.unshift(cur);
            return agg;
        }, [] as T[]);
}

function randomColour(): string {
    const hex = "0123456789ABCDEF".split("");
    return ["#",
        pickRandom(hex),
        pickRandom(hex),
        pickRandom(hex),
        pickRandom(hex),
        pickRandom(hex),
        pickRandom(hex),
    ].join("")
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}