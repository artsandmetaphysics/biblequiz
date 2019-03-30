import {expandTabsAndNewLines} from './util.js'

test('expandTabsAndNewLines', () => {
    expect(expandTabsAndNewLines('’ ”')).toBe('’”')
});
