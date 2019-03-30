import {quizStatus, scoreQA} from './selectors.js'

// note: for these tests the datetime associated with the scores are
// conveniently omitted
describe('quizStatus', () => {
    test('oldtestament blank', () => {
        const gameHistory = {
            basic: {},
            moses: {},
            jesus: {},
        };
        expect(quizStatus(gameHistory, 'basic', 'oldtestament')).toEqual([0, 4]);
        expect(quizStatus(gameHistory, 'moses', 'oldtestament')).toEqual([0, 4 + 1 + 4]);
    });
    test('oldtestament one complete', () => {
        const gameHistory = {
            basic: {pentateuch: [[90]]},
            moses: {},
            jesus: {},
        };
        expect(quizStatus(gameHistory, 'basic', 'oldtestament')).toEqual([1, 4]);
        expect(quizStatus(gameHistory, 'moses', 'oldtestament')).toEqual([1, 4 + 1 + 4]);
    });
    test('oldtestament one complete jesus', () => {
        const gameHistory = {
            basic: {
                pentateuch: [[90]],
                historical: [[90]],
                poetryandwisdom: [[90]],
                prophecy: [[90]],
                oldtestament: [[90]],
            },
            moses: {
                pentateuch: [[900]],
                historical: [[900]],
                poetryandwisdom: [[900]],
                prophecy: [[900]],
                oldtestament: [[900]],
            },
            jesus: {},
        };
        expect(quizStatus(gameHistory, 'basic', 'oldtestament')).toEqual([4, 4]);
        expect(quizStatus(gameHistory, 'moses', 'oldtestament')).toEqual([9, 4 + 1 + 4]);
    });
    test('oldtestament one complete unrelated', () => {
        const gameHistory = {
            basic: {unrelated: [[90]]},
            moses: {},
            jesus: {},
        };
        expect(quizStatus(gameHistory, 'basic', 'oldtestament')).toEqual([0, 4]);
    });
    test('pentateuch blank', () => {
        const gameHistory = {
            basic: {},
            moses: {},
            jesus: {},
        };
        expect(quizStatus(gameHistory, 'basic', 'pentateuch')).toEqual([0, 0]);
        expect(quizStatus(gameHistory, 'moses', 'pentateuch')).toEqual([0, 1]);
    });
    test('pentateuch blank', () => {
        const gameHistory = {
            basic: {pentateuch: [[100]]},
            moses: {},
            jesus: {},
        };
        expect(quizStatus(gameHistory, 'basic', 'pentateuch')).toEqual([0, 0]);
        expect(quizStatus(gameHistory, 'moses', 'pentateuch')).toEqual([1, 1]);
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
