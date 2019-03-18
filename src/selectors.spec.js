import {newTestamentStatus, oldTestamentStatus, modeStatus, scoreQA} from './selectors.js'

// note: for these tests the datetime associated with the scores are
// conveniently omitted
describe('oldTestamentStatus', () => {
    test('blank', () => {
        const gameHistory = {
            basic: {},
            moses: {},
            jesus: {},
        };
        expect(oldTestamentStatus(gameHistory, 'basic')).toEqual([0, 4]);
    });
    test('one complete', () => {
        const gameHistory = {
            basic: {pentateuch: [[90]]},
            moses: {},
            jesus: {},
        };
        expect(oldTestamentStatus(gameHistory, 'basic')).toEqual([1, 4]);
        expect(oldTestamentStatus(gameHistory, 'moses')).toEqual([0, 4]);
    });
    test('one complete moses', () => {
        const gameHistory = {
            basic: {},
            moses: {pentateuch: [[9000]]},
            jesus: {},
        };
        expect(oldTestamentStatus(gameHistory, 'basic')).toEqual([0, 4]);
        expect(oldTestamentStatus(gameHistory, 'moses')).toEqual([1, 4]);
    });
    test('one complete jesus', () => {
        const gameHistory = {
            basic: {},
            moses: {},
            jesus: {pentateuch: [[90000]]},
        };
        expect(oldTestamentStatus(gameHistory, 'basic')).toEqual([0, 4]);
        expect(oldTestamentStatus(gameHistory, 'moses')).toEqual([0, 4]);
        expect(oldTestamentStatus(gameHistory, 'jesus')).toEqual([1, 4]);
    });
    test('one complete unrelated', () => {
        const gameHistory = {
            basic: {unrelated: [[90]]},
            moses: {},
            jesus: {},
        };
        expect(oldTestamentStatus(gameHistory, 'basic')).toEqual([0, 4]);
        expect(oldTestamentStatus(gameHistory, 'moses')).toEqual([0, 4]);
    });
});

describe('modeState', () => {
    test('blank', () => {
        const gameHistory = {
            basic: {},
            moses: {},
            jesus: {},
        };
        expect(modeStatus(gameHistory, 'moses')).toEqual([0, 8]);
    });
    test('complete', () => {
        const gameHistory = {
            basic: {
                pentateuch: [[100]],
                historical: [[100]],
                poetryandwisdom: [[100]],
                prophecy: [[100]],
                oldtestament: [[100]],
                gosepels: [[100]],
                epistlesetc: [[100]],
                newtestament: [[100]],
            },
            moses: {},
            jesus: {},
        };
        expect(modeStatus(gameHistory, 'moses')).toEqual([8, 8]);
    });
});

describe('scoreQA', () => {
    test('basic right', () => {
        expect(scoreQA('', [[0, 0, 0], [0]])).toEqual(10);
    });
    test('basic wrong', () => {
        expect(scoreQA('', [[0, 0, 0], [1]])).toEqual(0);
    });
    test('moses right', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 0]])).toEqual(100);
    });
    test('moses really close', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 1]])).toEqual(60);
    });
    test('moses close', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 2]])).toEqual(50);
    });
    test('moses wrong', () => {
        expect(scoreQA('', [[0, 0, 0], [1, 1]])).toEqual(0);
    });
    test('jesus right', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 0, 0]])).toEqual(1000);
    });
    test('jesus really close', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 0, 1]])).toEqual(600);
    });
    test('jesus close', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 0, 2]])).toEqual(500);
    });
    test('jesus somewhat close', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 1, 0]])).toEqual(60);
        expect(scoreQA('', [[0, 0, 0], [0, 1, 1]])).toEqual(60);
    });
    test('jesus barely close', () => {
        expect(scoreQA('', [[0, 0, 0], [0, 2, 0]])).toEqual(50);
        expect(scoreQA('', [[0, 0, 0], [0, 2, 1]])).toEqual(50);
    });
    test('jesus wrong', () => {
        expect(scoreQA('', [[0, 0, 0], [1, 1, 1]])).toEqual(0);
    });
});
