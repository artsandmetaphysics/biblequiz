import "./index.scss";

const QUESTIONS_PER_QUIZ = 10;

const BOOKS = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'];

const CHAPTERS_PER_BOOK = [50, 40, 27, 36, 34];

let gtag = window.gtag || function() {};

function getRandomVerse() {
    const bookIndex = getRandomIntWeighted(CHAPTERS_PER_BOOK);
    const chapters = PENTATEUCH[bookIndex].chapters;
    const chapterIndex = getRandomInt(chapters.length);
    const verses = chapters[chapterIndex].verses;
    const verseIndex = getRandomInt(verses.length)
    const verse = [bookIndex + 1, chapterIndex + 1, verseIndex + 1];
    return verse;
}

function verseToLabel(verseArray) {
    let bookNum, chapter, verse;
    if (verseArray.length === 3) {
        [bookNum, chapter, verse] = verseArray;
        return bookNumToLabel(bookNum) + ' ' + chapter + '.' + verse;
    } else if (verseArray.length === 2) {
        [bookNum, chapter] = verseArray;
        return bookNumToLabel(bookNum) + ' ' + chapter;
    }
}

function bookNumToLabel(bookNum) {
    return BOOKS[bookNum - 1];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntWeighted(lengths) {
    // used to weight books of bible by chapter length
    const sum = lengths.reduce((partial_sum, a) => partial_sum + a);
    const i = getRandomInt(sum);
    let index = 0;
    let runningSum = lengths[index];
    while (i >= runningSum) {
        index += 1;
        runningSum += lengths[index];
    }
    return index;
}

function getPoints(bookChoice, chapterChoice, answerVerseArray) {
    let points = 0;
    const [bookAnswer, chapterAnswer, _] = answerVerseArray;
    if (bookChoice === bookAnswer) {
        points += 10;
        const chaptersOff = Math.abs(chapterChoice - chapterAnswer);
        if (chaptersOff === 0) {
            points += 90;
        } else if (chaptersOff <= 5) {
            points += (60 - 10*chaptersOff)
        }
    }
    return points;
}

function getVerseText(verseArray) {
    const [bookNum, chapterNum, verseNum] = verseArray;
    const book = PENTATEUCH[bookNum - 1];
    const chapter = book.chapters[chapterNum - 1]
    const verse = chapter.verses[verseNum - 1];
    if (verse === undefined) {
        return null;
    } else {
        return verse[String(verseNum)];
    }
}

function flatArraysEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            questionNum: 0,
            verse: getRandomVerse(),
            bookChoice: null,
            chapterChoice: null,
            history: loadHistory(),
            showHistory: false,
        };
        this.pickBook = this.pickBook.bind(this);
        this.undoBookChoice = this.undoBookChoice.bind(this);
        this.pickChapter = this.pickChapter.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.nextQuiz = this.nextQuiz.bind(this);
    }

    pickBook(bookChoice) {
        this.setState({bookChoice});
    }

    undoBookChoice() {
        this.setState({bookChoice: null});
    }

    pickChapter(chapterChoice) {
        this.setState((state) => {
            const points = getPoints(state.bookChoice, chapterChoice, state.verse)
            gtag('event', 'question', {
                'event_category': 'pentateuch',
                'event_value': 1,
            })
            return {
                chapterChoice,
                questionNum: state.questionNum + 1,
                score: state.score + points,
            };
        });
    }

    nextQuestion() {
        this.setState((state) => {
            const newState = {
                ...state,
                verse: getRandomVerse(),
                bookChoice: null,
                chapterChoice: null,
            };
            if (state.questionNum === QUESTIONS_PER_QUIZ) {
                let dataPoint = recordHistoricalScore(state.score);
                newState.history.push(dataPoint);
                newState.score = 0;
                newState.questionNum = 0;
                newState.showHistory = true;
            }
            return newState;
        });
    }

    nextQuiz() {
        this.setState({showHistory: false});
    }

    render() {
        const {score, questionNum, verse, bookChoice, chapterChoice, showHistory, history} = this.state;
        let onClick;
        let showAnswer;
        if (showHistory) {
            onClick = this.nextQuiz;
        } else if (bookChoice === null) {
            onClick = this.pickBook;
            showAnswer = false;
        } else if (chapterChoice === null) {
            onClick = this.pickChapter;
            showAnswer = false;
        } else {
            onClick = this.nextQuestion;
            showAnswer = true;
        }
        return (
            <div className="app">
                <Header score={score} questionNum={questionNum} questionsPerQuiz={QUESTIONS_PER_QUIZ} />
                {showHistory ?
                    <ScoreBody history={history} /> :
                    <Body showAnswer={showAnswer}
                            verse={verse}
                            bookChoice={bookChoice}
                            chapterChoice={chapterChoice} />
                }
                <Footer bookChoice={bookChoice}
                        chapterChoice={chapterChoice}
                        onClick={onClick}
                        goBack={this.undoBookChoice}
                        showHistory={showHistory} />
            </div>
        );
    }
}

function Header ({score, questionNum, questionsPerQuiz}) {
    // TODO: get glow animation to retrigger
    return (
        <div className="header">
            <h2>Pentateuch Quiz</h2>
            <h2 className="glow">SCORE: {score}</h2>
            <h2 className="glow">{questionNum}/{questionsPerQuiz}</h2>
        </div>
    );
}


function Body ({showAnswer, verse, bookChoice, chapterChoice}) {
    if (showAnswer) {
        let resultLabel;
        const choice = verseToLabel([bookChoice, chapterChoice]);
        const points = getPoints(bookChoice, chapterChoice, verse);
        if (verse[0] === bookChoice && verse[1] === chapterChoice) {
            resultLabel = <p className="body__correct">CORRECT!<br />+{points} points!</p>;
        } else if (verse[0] === bookChoice) {
            resultLabel = <p className="body__close">Close, you chose {choice}.<br />+{points} points</p>;
        } else {
            resultLabel = <p className="body__wrong">Wrong, you chose {choice}</p>;
        }
        return (
            <div className="body">
                <h2>{verseToLabel(verse)}</h2>
                <Verses verseArray={verse} />
                {resultLabel}
            </div>
        );
    } else {
        return (
            <div className="body">
                <Verses verseArray={verse} />
            </div>
        );
    }
}

function ScoreBody ({history}) {
    const byScore = (a, b) => b.score - a.score;
    const previousScores = history.slice();
    const current = previousScores.pop();  // current score is on end
    const isCurrent = (a) => a.dateTimeString === current.dateTimeString;
    previousScores.sort(byScore);
    const topTen = previousScores.slice(0, 9);
    topTen.push(current);
    topTen.sort(byScore);
    return (
        <div className="body">
            <p>Thank you for playing!</p>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {topTen.map((item, i) => {
                        return (
                            <tr key={i} style={isCurrent(item) ? {color: '#23BD98'}: {}}>
                                <td>{i + 1}</td>
                                <td style={{textAlign: 'right'}}>{item.score}</td>
                                <td>{item.dateTimeString}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function Verses({verseArray}) {
    const prevVerseText = getPrevVerse(verseArray);
    const verseText = getVerseText(verseArray);
    const nextVerseText = getNextVerse(verseArray);
    return (
        <p>
            {prevVerseText ? <span className="body__context">{prevVerseText + ' '}</span> : null}
            <span>{verseText}</span>
            {nextVerseText ? <span className="body__context">{' ' + nextVerseText}</span> : null}
        </p>
    );
}

function getPrevVerse(verseArray) {
    const [bookNum, chapterNum, verseNum] = verseArray;
    if (verseNum === 1) {
        return null;
    } else {
        return getVerseText([bookNum, chapterNum, verseNum - 1]);
    }
}

function getNextVerse(verseArray) {
    const [bookNum, chapterNum, verseNum] = verseArray;
    // relies on `getVerseText` return undefined if it is the last verse in a chapter
    return getVerseText([bookNum, chapterNum, verseNum + 1]) || null;
}

const BOOK_COLORS = ['#EC6B34', '#3C64DC', '#55AEEE', '#AE9BFB', '#F59A2F'];

function Footer ({bookChoice, chapterChoice, onClick, goBack, showHistory}) {
    if (showHistory) {
        return (
            <div className="footer">
                <p className="footer__help">Please share with friends!<br />More quizzes will come if there is interest.  Verses choosen randomly. <a href="mailto:artsandmetaphysics@gmail.com">Contact Creator</a></p>
                <Btn color={'#5D4DC3'} onClick={onClick}>Start New Quiz</Btn>
            </div>
        );
    } else if (bookChoice === null) {
        return (
            <div className="footer">
                <p className="footer__help">Which book is the randomly selected <span style={{color: '#333'}}>black</span> verse in?</p>
                <Btn color={BOOK_COLORS[0]} onClick={() => onClick(1)}>Genesis</Btn>
                <Btn color={BOOK_COLORS[1]} onClick={() => onClick(2)}>Exodus</Btn>
                <Btn color={BOOK_COLORS[2]} onClick={() => onClick(3)}>Leviticus</Btn>
                <Btn color={BOOK_COLORS[3]} onClick={() => onClick(4)}>Numbers</Btn>
                <Btn color={BOOK_COLORS[4]} onClick={() => onClick(5)}>Deut.</Btn>
            </div>
        );
    } else if (chapterChoice === null) {
        const numChapters = CHAPTERS_PER_BOOK[bookChoice - 1];
        const chapters = Array.apply(null, {length: numChapters}).map(Number.call, Number);
        const color = BOOK_COLORS[bookChoice - 1];
        return (
            <div className="footer">
                <p className="footer__help">And which chapter?</p>
                {chapters.map(i => <Btn color={color} key={i} onClick={() => onClick(i + 1)}>{i + 1}</Btn>)}
                <Btn color={"#999"} onClick={goBack}>Back</Btn>
            </div>
        );
    } else {
        return (
            <div className="footer">
                <Btn color={'#5D4DC3'} onClick={onClick}>Next Question</Btn>
            </div>
        );
    }
}

function Btn ({children, onClick, color}) {
    gtag('event', 'click', {
        'event_category': 'pentateuch',
        'event_label': String(children)
    });
    return <div style={{backgroundColor: color}} className="button" onClick={onClick}>{children}</div>
}

function recordHistoricalScore(score) {
    gtag('event', 'finish', {
        'event_category': 'pentateuch',
        'event_label': 'score',
        'value': score,
    });
    const dateTimeString = new Date().toLocaleString();
    const scores = loadHistory();
    const dataPoint = {dateTimeString, score};
    scores.push(dataPoint);
    localSave('history', scores);
    return dataPoint;
}

function loadHistory() {
    let scores = localLoad('history');
    if (scores === null) {
        scores = [];
    }
    return scores;
}

function localSave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function localLoad(key, data) {
    try {
        return JSON.parse(localStorage.getItem('history'));
    } catch {
        return null;
    }
}

ReactDOM.render(
  <App name="Taylor" />,
  document.getElementById('app')
);
