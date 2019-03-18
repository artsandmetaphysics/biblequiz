import {range} from './util.js';

export const QUESTIONS_PER_QUIZ = 10;

export const isGameOver = (mode, quizQAs) => {
    return quizQAs.length === QUESTIONS_PER_QUIZ;
}

export const getUiState = (state, isGameOver_) => {
    if (state.quiz === null) {
        return 'home';
    } else if (state.currentAnswer !== null) {
        return 'review';
    } else if (isGameOver_(state.mode, state.quizQAs)) {
        return 'score';
    } else {
        return 'prompt';
    }
}

export const scoreQuiz = (mode, quizQAs) => {
    return quizQAs.reduce((sum, QA) => { return sum + scoreQA(mode, QA)}, 0);
}

export const scoreQA = (mode, QA) => {
    let score = 0;
    const [question, answer] = QA;
    const [qbook, qchapter, qverse] = question;
    const [abook, achapter, averse] = answer;
    if (qbook === abook) {
        score += 10;
        if (achapter !== undefined) {
            const chaptersOff = Math.abs(achapter - qchapter);
            if (chaptersOff === 0) {
                score += 90;
                if (averse !== undefined) {
                    const versesOff = Math.abs(averse - qverse);
                    if (versesOff === 0) {
                        score += 900;
                    } else if (versesOff <= 5) {
                        score += (600 - 100*versesOff)
                    }
                }
            } else if (chaptersOff <= 5) {
                score += (60 - 10*chaptersOff)
            }
        }
    }
    return score;
}

export const qaStatus = (mode, QA) => {
    const score = scoreQA(mode, QA);
    if (mode === 'basic') {
        if (score === 10) {
            return 'correct';
        } else {
            return 'incorrect';
        }
    } else if (mode === 'moses') {
        if (score === 100) {
            return 'correct'
        } else if (score > 0) {
            return 'close'
        } else {
            return 'incorrect'
        }
    } else if (mode === 'jesus') {
        if (score === 1000) {
            return 'correct'
        } else if (score > 0) {
            return 'close'
        } else {
            return 'incorrect'
        }
    }
}

const QUIZZES = {
    pentateuch: {label: 'Pentateuch', books: range(5)},
    historical: {label: 'Historical', books: range(5, 17)},
    poetryandwisdom: {label: 'Poetic & Wisdom', books: range(17, 22)},
    prophecy: {label: 'Prophecy', books: range(22, 39)},
    oldtestament: {label: 'Old Testament', books: range(0, 39)},
    gospels: {label: 'Gospels', books: range(39, 43)},
    epistlesetc: {label: 'Epistles Etc.', books: range(43, 66)},
    newtestament: {label: 'New Testament', books: range(39, 66)},
}

export const quizLabel = (quiz) => {
    return QUIZZES[quiz].label; 
}

export const quizBooks = (quiz) => {
    return QUIZZES[quiz].books; 
}

const MODE_CUTOFFS = {basic: 90, moses: 900, jesus: 9000};

export const oldTestamentStatus = (gameHistory, mode) => {
    const cutoff = MODE_CUTOFFS[mode];
    const modeHistory = gameHistory[mode];
    return status(modeHistory, cutoff, [
        'pentateuch',
        'historical',
        'poetryandwisdom',
        'prophecy',
    ]);
}

export const newTestamentStatus = (gameHistory, mode) => {
    const cutoff = MODE_CUTOFFS[mode];
    const modeHistory = gameHistory[mode];
    return status(modeHistory, cutoff, [
        'gospels',
        'epistlesetc',
    ]);
}

export const modeStatus = (gameHistory, mode) => {
    const prevMode = {moses: 'basic', jesus: 'moses'}[mode];
    const modeHistory = gameHistory[prevMode];
    const cutoff = MODE_CUTOFFS[prevMode];
    return status(modeHistory, cutoff, [
        'pentateuch',
        'historical',
        'poetryandwisdom',
        'prophecy',
        'oldtestament',
        'gosepels',
        'epistlesetc',
        'newtestament',
    ]);
}

const status = (modeHistory, cutoff, quizzes) => {
    const results = quizzes.map(q => gameDone(modeHistory[q], cutoff));
    const completed = results.reduce((sum, r) => r ? sum + 1 : sum, 0);
    const required = results.length;
    return [completed, required]
}

export const isGameDone = (gameHistory, mode, quiz) => {
    const quizHistory = gameHistory[mode][quiz];
    const cutoff = MODE_CUTOFFS[mode];
    return gameDone(quizHistory, cutoff);
}

const gameDone = (quizHistory, cutoff) => {
    return quizHistory !== undefined && quizHistory[0][0] >= cutoff;
}
