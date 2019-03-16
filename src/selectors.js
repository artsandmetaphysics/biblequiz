export const scoreQuiz = (mode, quizQAs) => {
    return quizQAs.reduce((sum, QA) => { return sum + scoreQA(mode, QA)}, 0);
}

export const scoreQA = (mode, QA) => {
    let score = 0;
    const [question, answer] = QA;
    if (mode === 'basic') {
        if (question[0] === answer[0]) {
            score = 10;
        }
    } else if (mode === 'moses') {
        if (answer[0] === question[0]) {
            score += 10;
            const chaptersOff = Math.abs(answer[1] - question[1]);
            if (chaptersOff === 0) {
                score += 90;
            } else if (chaptersOff <= 5) {
                score += (60 - 10*chaptersOff)
            }
        }
    } else if (mode === 'jesus') {
        throw new Error('not implemented');
    }
    return score;
}
