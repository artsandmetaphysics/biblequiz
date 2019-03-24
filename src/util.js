export let gtag = window.gtag || function() {};

export const range = (start, stop) => {
    if (stop === undefined) {
        stop = start;
        start = 0;
    }
    let out = [];
    for (let i = start; i < stop; i++) {
        out.push(i);
    }
    return out;
}
