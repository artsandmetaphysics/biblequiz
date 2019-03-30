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

export const expandTabsAndNewLines = (text) => {
    let tabsExpanded = text.replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0');
    let quotesCondensed = tabsExpanded.replace(/\u2019[ ]\u201D/g, '\u2019\u201D').replace(/\u201C[ ]\u2018/g, '\u201C\u2018')
    return quotesCondensed
}
