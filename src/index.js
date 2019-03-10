import "./index.scss";

const QUESTIONS_PER_QUIZ = 20;

const BOOKS = ['Genesis', 'Exodous', 'Leviticus', 'Numbers', 'Deuteronomy'];

const CHAPTERS_PER_BOOK = [50, 40, 27, 36, 34];

function getRandomVerse() {
    // TODO: review to make sure we don't have off-by-one errors
    const bookIndex = getRandomInt(PENTATEUCH.length);
    const chapters = PENTATEUCH[bookIndex].chapters;
    const chapterIndex = getRandomInt(chapters.length);
    const verses = chapters[chapterIndex].verses;
    const verseIndex = getRandomInt(verses.length)
    return [bookIndex + 1, chapterIndex + 1, verseIndex + 1]
}

function verseToLabel(verseArray) {
    const [bookNum, chapter, verse] = verseArray;
    return bookNumToLabel(bookNum) + ' ' + chapter + '.' + verse;
}

function bookNumToLabel(bookNum) {
    return BOOKS[bookNum + 1];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getPoints(bookChoice, chapterChoice, answer) {
    let points = 0;
    const [bookAnswer, chapterAnswer, verseAnswer] = answer;
    if (bookChoice === bookAnswer) {
        points += 10;
    }
    if (chapterChoice === chapterAnswer) {
        points += 20;
    }
    return points;
}

function getVerseText(verseArray) {
    const [bookNum, chapterNum, verseNum] = verseArray;
    const book = PENTATEUCH[bookNum - 1];
    const chapter = book.chapters[chapterNum - 1]
    return chapter.verses[verseNum - 1][String(verseNum)];
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
        };
        this.pickBook = this.pickBook.bind(this);
        this.pickChapter = this.pickChapter.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    pickBook(bookChoice) {
        this.setState({bookChoice});
    }

    pickChapter(chapterChoice) {
        this.setState((state) => {
            const points = getPoints(state.bookChoice, chapterChoice, state.verse)
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
                newState.score = 0;
                newState.questionNum = 0;
            }
            return newState;
        });
    }
    
    render() {
        const {score, questionNum, verse, bookChoice, chapterChoice} = this.state;
        let onClick;
        if (bookChoice === null) {
            onClick = this.pickBook;
        } else if (chapterChoice === null) {
            onClick = this.pickChapter;
        } else {
            onClick = this.nextQuestion;
        }
        const verseText = getVerseText(verse);
        return (
            <div className="app">
                <Header score={score} questionNum={questionNum} questionsPerQuiz={QUESTIONS_PER_QUIZ} />
                <Body>{verseText}</Body>
                <Footer bookChoice={bookChoice} chapterChoice={chapterChoice} onClick={onClick} />
            </div>
        );
    }
}

function Header ({score, questionNum, questionsPerQuiz}) {
    // TODO: get glow animation to retrigger
    return (
        <div className="header">
            <h1>Pentateuch Quiz</h1>
            <h1 className="glow">{score}</h1>
            <h1 className="glow">{questionNum}/{questionsPerQuiz}</h1>
        </div>
    );
}


function Body ({children}) {
    return (
        <div className="body">
            <p>{children}</p>
        </div>
    );
}

function Footer ({bookChoice, chapterChoice, onClick}) {
    if (bookChoice === null) {
        return (
            <div className="footer">
                <Btn onClick={() => onClick(1)}>Genesis</Btn>
                <Btn onClick={() => onClick(2)}>Exodus</Btn>
                <Btn onClick={() => onClick(3)}>Leviticus</Btn>
                <Btn onClick={() => onClick(4)}>Numbers</Btn>
                <Btn onClick={() => onClick(5)}>Deut.</Btn>
            </div>
        );
    } else if (chapterChoice === null) {
        const numChapters = CHAPTERS_PER_BOOK[bookChoice - 1];
        const chapters = Array.apply(null, {length: numChapters}).map(Number.call, Number);
        return (
            <div className="footer">{chapters.map(i => <Btn key={i} onClick={() => onClick(i + 1)}>{i + 1}</Btn>)}
            </div>
        );
    } else {
        return (
            <div className="footer">
                <Btn onClick={() => onClick()}>Next Question</Btn>
            </div>
        );
    }
}

function Btn ({children, onClick}) {
    return <div className="button" onClick={onClick}>{children}</div>
}

ReactDOM.render(
  <App name="Taylor" />,
  document.getElementById('app')
);
