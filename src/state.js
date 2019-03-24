import {gtag} from './util.js';

// The current version of the javascript state;
// if we change the structure of the state, we need to migrate any data left in
// local storage that uses an older version.
const CURRENT_VERSION = 1;

// the max number of questions and answers to store (these are useful for
// suggesting books to study and/or avoiding verses that people have already
// seen)
export const HISTORICAL_QA_MAX_SIZE = 4000;

// the max number of historical scores to save for each mode, quiz combo
export const MAX_QUIZ_HISTORY_SIZE = 100;

// note: we don't bother creating copies of the whole state each time
// also note: we pass in the getQuestion to make the reducer "pure" and
// avoid randomness being directly placed in the reducer; this makes testing
// easier
export const buildReducer = (quizHistorySize, historicalQASize, isGameOver, getQuestion, scoreQuiz) => {
    return (state, action) => {
        if (action.type === 'SELECT_QUIZ') {
            if (state.quiz !== null && action.quiz === null) {
                state.currentAnswer = null;
                state.currentQuestion = null;
            }
            state.quiz = action.quiz;
            if (state.currentQuestion === null && state.quiz !== null) {
                state.currentQuestion = getQuestion(state.quiz, state.historicalQAs);
            }

            gtag('event', 'quiz-start', {
                'event_category': state.quiz,
                'value': 1,
            });
            state.quizQAs = [];
        } else if (action.type === 'SELECT_MODE') {
            if (state.quiz === null) {
                state.mode = action.mode;
            } else {
                throw new Error('mode change during quiz');
            }
        } else if (action.type === 'ANSWER') {
            gtag('event', 'quiz-answer', {
                'event_category': state.quiz,
                'value': 1,
            });
            if (state.currentAnswer !== null) {
                throw new Error('there is an answer already');
            }
            state.currentAnswer = action.answer;
            const QA = [state.currentQuestion, state.currentAnswer];
            state.quizQAs.push(QA);
            if (state.historicalQAs.length < historicalQASize) {
                state.historicalQAs.push(QA);
            } else {
                state.historicalQAs[state.historicalQAsIndex] = QA;
                state.historicalQAsIndex = (state.historicalQAsIndex + 1) % historicalQASize;
            }
            if (isGameOver(state.mode, state.quizQAs)) {
                const score = scoreQuiz(state.mode, state.quizQAs)
                const now = new Date().toLocaleString();
                const entry = [score, now];
                state.gameHistory = archiveQuizHistory(
                        state.gameHistory,
                        state.mode,
                        state.quiz,
                        entry,
                        quizHistorySize);

                gtag('event', 'quiz-finish', {
                    'event_category': state.quiz,
                    'value': 5,
                });
            }
        } else if (action.type === 'NEXT') {
            state.currentAnswer = null;
            // avoid getting a new question on the last NEXT call that
            // progresses you to the score page; small performance win (who
            // cares); but makes tests simpler
            if (!isGameOver(state.mode, state.quizQAs)) {
                state.currentQuestion = getQuestion(state.quiz, state.historicalQAs);
            } else {
                state.currentQuestion = null;
            }
        }
        return state;
    }
}

export function archiveQuizHistory(gameHistory, mode, quiz, entry, quizHistorySize) {
    gameHistory.latest = entry;
    if (gameHistory[mode][quiz] === undefined) {
        gameHistory[mode][quiz] = []
    }

    gameHistory[mode][quiz].push(entry);
    gameHistory[mode][quiz].sort((h1, h2) => h2[0] - h1[0]);
    if (gameHistory[mode][quiz].length > quizHistorySize) {
        gameHistory[mode][quiz].pop();
    }
    return gameHistory
}

export function loadState() {
    let state;
    try {
        state = localLoad('state');
        if (state.version !== CURRENT_VERSION) {
            state = migrateState(state);
        }
    } catch {
        state = getDefaultState();
    }
    return state;
}

export function saveState(state) {
    localSave('state', state);
}

export function getDefaultState() {
    return {
        version: CURRENT_VERSION,
        quiz: null,
        mode: 'basic',
        quizQAs: [],
        currentQuestion: null,
        currentAnswer: null,
        gameHistory: {basic: {}, moses: {}, jesus: {}},
        historicalQAs: [],
        historicalQAsIndex: 0,
    }
}

function migrateState(oldState) {
    throw new Error('not implemented');
}

function localSave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function localLoad(key, data) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return null;
    }
}
