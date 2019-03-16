import { getDefaultState, buildReducer } from './state.js';
import { scoreQuiz } from './selectors.js'

test('state changes through a few games', () => {
    let state = getDefaultState();
    const historicalQASize = 3;
    const quizHistorySize = 2;
    const isGameOver = (mode, quizQAs) => quizQAs.length === (mode === 'moses' ? 3 : 2);
    let answerVerse = 0;
    const getQuestion = (quiz, historicalQAs) => [0, 0, answerVerse++];
    let reducer = buildReducer(quizHistorySize, historicalQASize, isGameOver, getQuestion, scoreQuiz);

    state = reducer(state, {type: 'SELECT_QUIZ', quiz: 'q1'});
    expect(scoreQuiz(state.mode, state.quizQAs)).toBe(0);
    expect(isGameOver(state.mode, state.quizQAs)).toBe(false);
    expect(state.historicalQAs.length).toBe(0);
    expect(state.historicalQAsIndex).toBe(0);

    // PLAY FIRST GAME; perfect score
    state = reducer(state, {type: 'ANSWER', answer: [0]});
    expect(answerVerse).toBe(1);
    expect(scoreQuiz(state.mode, state.quizQAs)).toBe(10);
    expect(isGameOver(state.mode, state.quizQAs)).toBe(false);
    expect(state.historicalQAs.length).toBe(1);
    expect(state.historicalQAsIndex).toBe(0);
    state = reducer(state, {type: 'NEXT'});

    state = reducer(state, {type: 'ANSWER', answer: [0]});
    expect(answerVerse).toBe(2);
    expect(scoreQuiz(state.mode, state.quizQAs)).toBe(20);
    expect(isGameOver(state.mode, state.quizQAs)).toBe(true);
    expect(state.historicalQAs.length).toBe(2);
    expect(state.historicalQAsIndex).toBe(0);
    expect(state.quizHistory['basic']['q1'].length).toBe(1);
    expect(state.quizHistory['basic']['q1'][0][0]).toBe(20);
    state = reducer(state, {type: 'NEXT'});

    // CHOOSE TO PLAY AGAIN; terrible score
    state = reducer(state, {type: 'SELECT_QUIZ', quiz: 'q1'});
    state = reducer(state, {type: 'ANSWER', answer: [1]});
    expect(answerVerse).toBe(3);
    expect(state.historicalQAs.length).toBe(3);
    expect(state.historicalQAsIndex).toBe(0);
    state = reducer(state, {type: 'NEXT'});

    state = reducer(state, {type: 'ANSWER', answer: [1]});
    expect(answerVerse).toBe(4);
    expect(state.historicalQAs.length).toBe(3);
    expect(state.historicalQAsIndex).toBe(1);
    expect(state.historicalQAs).toEqual([
        [[0, 0, 3], [1]],  // most recent (from game 2)
        [[0, 0, 1], [0]],  // oldest (second response from game 1)
        [[0, 0, 2], [1]],  // oldest (first response from game 2)
    ]);
    expect(state.quizHistory['basic']['q1'].length).toBe(2);
    expect(state.quizHistory['basic']['q1'][0][0]).toBe(20);
    expect(state.quizHistory['basic']['q1'][1][0]).toBe(0);
    state = reducer(state, {type: 'NEXT'});

    // PLAY AGAIN; middle score should push out terrible
    state = reducer(state, {type: 'SELECT_QUIZ', quiz: 'q1'});
    state = reducer(state, {type: 'ANSWER', answer: [0]});
    state = reducer(state, {type: 'NEXT'});
    state = reducer(state, {type: 'ANSWER', answer: [1]});
    state = reducer(state, {type: 'NEXT'});
    expect(state.quizHistory['latest'][0]).toBe(10);
    expect(state.quizHistory['basic']['q1'].length).toBe(2);
    expect(state.quizHistory['basic']['q1'][0][0]).toBe(20);
    expect(state.quizHistory['basic']['q1'][1][0]).toBe(10);

    // GO BACK TO MENU
    state = reducer(state, {type: 'SELECT_QUIZ', quiz: null});

    // PLAY a different quiz
    state = reducer(state, {type: 'SELECT_QUIZ', quiz: 'q2'});
    state = reducer(state, {type: 'ANSWER', answer: [0]});
    state = reducer(state, {type: 'NEXT'});
    state = reducer(state, {type: 'ANSWER', answer: [1]});
    state = reducer(state, {type: 'NEXT'});
    expect(state.quizHistory['latest'][0]).toBe(10);
    expect(state.quizHistory['basic']['q1'].length).toBe(2);
    expect(state.quizHistory['basic']['q1'][0][0]).toBe(20);
    expect(state.quizHistory['basic']['q1'][1][0]).toBe(10);
    expect(state.quizHistory['basic']['q2'].length).toBe(1);
    expect(state.quizHistory['basic']['q2'][0][0]).toBe(10);

    // GO BACK TO MENU
    state = reducer(state, {type: 'SELECT_QUIZ', quiz: null});

    // CHANGE TO MOSES MODE
    state = reducer(state, {type: 'SELECT_MODE', mode: 'moses'});
    state = reducer(state, {type: 'SELECT_QUIZ', quiz: 'q1'});
    state = reducer(state, {type: 'ANSWER', answer: [0, 0]});
    expect(scoreQuiz(state.mode, state.quizQAs)).toBe(100);
    state = reducer(state, {type: 'NEXT'});
    state = reducer(state, {type: 'ANSWER', answer: [0, 1]});
    expect(scoreQuiz(state.mode, state.quizQAs)).toBe(160);
    state = reducer(state, {type: 'NEXT'});
    state = reducer(state, {type: 'ANSWER', answer: [0, 2]});
    expect(answerVerse).toBe(11);
    expect(scoreQuiz(state.mode, state.quizQAs)).toBe(210);
    expect(state.historicalQAs).toEqual([
        [[0, 0, 9], [0, 1]],  // second most recent (from latest game)
        [[0, 0, 10], [0, 2]],  // most recent (from latest game)
        [[0, 0, 8], [0, 0]],  // third most recent  (from latest game)
    ]);
    state = reducer(state, {type: 'NEXT'});
});
