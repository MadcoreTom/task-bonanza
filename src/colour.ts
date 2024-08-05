export type HSL = [number, number, number];

export function textToHsl(text: string): HSL {

    // TODO AI generated, don't keep it in, its not even nice
    // Calculate a hash value for the input string
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Create the HTML color string
    return PALETTE[Math.floor(Math.abs(hash))%PALETTE.length];

}

export function interpolateHsl(value:string, min:HSL, max:HSL):HSL{
    const num = parseFloat(value);
    // TODO we need to know the range fo the field, we're hard-codeding it for now
    const mv = 0;
    const range = 21;
    const u = Math.max(0,Math.min(1,(num -mv)/range));
    const v = 1-u;
    return [
        min[0] * u + max[0]*v,
        min[1] * u + max[1]*v,
        min[2] * u + max[2]*v
    ]
}

export function hslToBorder(hsl: HSL): string {
    return `hsl(${hsl[0]}deg,${hsl[1]}%,${hsl[2]}%)`;
}
export function hslToFill(hsl: HSL): string {
    return `hsl(${hsl[0]}deg,${hsl[1]}%,${hsl[2] + 45}%)`;
}



export const PALETTE: HSL[] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2].map((a, i) => {
    return [(i / 5 * 360 + 50)%360, 80, 40 + a * 20];
})