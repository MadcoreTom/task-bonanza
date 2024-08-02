export type HSL = [number, number, number];

export function textToHsl(text: string): HSL {

    // TODO AI generated, don't keep it in, its not even nice
    // Calculate a hash value for the input string
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Create the HTML color string
    return [hash, 80, 50];

}

export function hslToBorder(hsl: HSL): string {
    return `hsl(${hsl[0]}deg,${hsl[1]}%,${hsl[2]}%)`;
}
export function hslToFill(hsl: HSL): string {
    return `hsl(${hsl[0]}deg,${hsl[1]}%,${hsl[2] + 45}%)`;
}
