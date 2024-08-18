
export function parseCsv(text: string): string[][] {
    let cell: string = "";
    let line: string[] = [];
    let data: string[][] = [];
    let nextComma = 0;
    let isQuoted = false;
    let quoteCount=0;
    let nextNewline = text.match(/[\r\n]+/)?.index;
    let isNewLine: boolean = false;
    let pos = 0;
    let done = false;
    while (!done) {
        nextComma = text.indexOf(',', pos);
        isNewLine = !!(nextNewline && nextNewline < nextComma);
        console.log("N",isNewLine, nextNewline, nextComma, cell, text.substring(pos,nextComma), text.substring(pos, nextNewline))
        nextComma = (isNewLine ? nextNewline : nextComma) as number;
        if (nextComma < 0) { 
            // end of file
            nextComma = text.length;        
            data.push(line);
            done = true;
        }
        cell += text.substring(pos, nextComma);
        isQuoted = cell.startsWith('"');
        if(isQuoted){
            quoteCount = countCharacter(cell,'"');
            if(isNewLine){
                console.log(">>>",cell,quoteCount,isNewLine)
            }
            cell += isNewLine ? '\n' : ',';
        }
  

        // Quotes are complete or newline
        if(!isQuoted || quoteCount % 2 == 0){
            if(isQuoted){
                cell = cell.substring(1,cell.length-2);
                cell = cell.replace(/""/g,'"');
            }
            line.push(cell);
            cell = "";
            isQuoted = false;
            isNewLine = isNewLine &&  quoteCount%2==0;
        }


        pos = nextComma + 1;
        if(isNewLine){
            console.log("NEWLINE", line)
            // end of line
            data.push(line);
            line=[];
            nextNewline = text.substring(pos).match(/[\r\n]+/)?.index;
            nextNewline = nextNewline ? nextNewline+pos : undefined;
        }
    }

    return data;
}

function countCharacter(input:string, char:string):number {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === char) {
            count++;
        }
    }
    return count;
}

export function formatCsv(data:(string|number)[][]):string{
    return data.map(row=>
        row.map(c=>formatCsvcell(c)).join(",")
    ).join("\n")
}

function formatCsvcell(cell:string | number):string{
    if(typeof cell == "number"){
        return ""+cell;
    }
    if(cell.indexOf('"') >=0 || cell.indexOf(',') >=0){
       return '"' + cell.replace(/"/g,'""') + '"';        
    }
    return cell;
}