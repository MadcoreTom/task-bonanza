const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export function measureText(text: string, font?: string): TextMetrics {
    console.log("💲 measure text");
    if (font) {
        ctx.font = font;
    }
    return ctx.measureText("text");
}