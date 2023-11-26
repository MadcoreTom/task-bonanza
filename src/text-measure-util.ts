const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export function measureText(text: string, font?: string): TextMetrics {
    console.log("💲 measure text");
    if (font) {
        ctx.font = font;
    }
    return ctx.measureText(text);
}

export function calculateWrap(text:string, maxWidth:number, font?:string):string[]{
    if (font) {
        ctx.font = font;
    }
    if(measureText(text).width <= maxWidth){
        return [text];
    }
    const output:string[] = [];
    const words = text.split(/\s+/);

    let lastLine = "";
    while (words.length > 0) {
        const cur: string = words.shift() as string;
        if (measureText(lastLine + " " + cur).width > maxWidth) {
            output.push(lastLine.trim());
            lastLine = cur;
        } else {
            lastLine += " " + cur;
        }
    }
    if(lastLine.trim().length > 0){
        output.push(lastLine.trim());
    }
    return output;
}