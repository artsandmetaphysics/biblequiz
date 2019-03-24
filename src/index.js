import {buildReducer, HISTORICAL_QA_MAX_SIZE, MAX_QUIZ_HISTORY_SIZE, loadState, saveState} from './state.js';
import {isGameOver, scoreQuiz, getUiState, quizBooks, quizLabel, QUESTIONS_PER_QUIZ, newTestamentStatus, oldTestamentStatus, modeStatus, qaStatus, scoreQA, isGameDone} from './selectors.js';
import {getRandomVerse, bookLabel, getChaptersPerBook, getVersesPerChapter, getPrevVerse, getNextVerse, getVerseText, verseToLabel} from './bible.js';
import {range, gtag} from './util.js';
import './index.scss';

class AppErrorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: false};
    }
    static getDerivedStateFromError(error) {
        return {error: true};
    }
    componentDidCatch(error, info) {
        console.error(error, info);
        gtag('event', 'error', {
            'event_category': error.toString(),
        });
    }
    render() {
        if (!this.state.error) {
            return <App />
        } else {
            return (
                <div className="app">
                    <HomeHeader />
                    <ErrorBody />
                    <HomeFooter />
                </div>
            );
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const getQuestion = (quiz, historicalQAs) => {
            return getRandomVerse(quizBooks(quiz), historicalQAs);
        };
        this.reducer = buildReducer(
            MAX_QUIZ_HISTORY_SIZE,
            HISTORICAL_QA_MAX_SIZE,
            isGameOver,
            getQuestion,
            scoreQuiz);
        this.state = loadState();
        this.dispatch = this.dispatch.bind(this);
    }

    dispatch(action) {
        this.setState((oldState) => {
            const updatedState = this.reducer(oldState, action);
            // Save to local state so refreshing the page doesn't drop the quiz.
            // There may be a performance issue with this once the historicalQAs get
            // very long; avoid blocking UI actions by queuing at the back of
            // the event loop
            setTimeout(() => saveState(updatedState), 0);
            return updatedState;
        });
    }

    render() {
        const uiState = getUiState(this.state, isGameOver);
        const {gameHistory, mode, quiz} = this.state;
        let header, answerPanel, body, footer;
        if (uiState === 'home') {
            header = <HomeHeader />
            answerPanel = null
            body = <HomeBody gameHistory={gameHistory} mode={mode} dispatch={this.dispatch} />
            footer = <HomeFooter />
        } else {
            const question = this.state.currentQuestion;
            const answer = this.state.currentAnswer;
            const {quizQAs} = this.state;
            const score = scoreQuiz(mode, quizQAs);
            const questionNum = quizQAs.length;
            const completePercent = questionNum/QUESTIONS_PER_QUIZ;
            header = <GameHeader quiz={quiz} mode={mode} score={score}
                    completePercent={completePercent} dispatch={this.dispatch} />
            answerPanel = <AnswerPanel show={uiState === 'review'} question={question} />;
            if (uiState === 'prompt') {
                body = <PromptBody question={question} />
                footer = <PromptFooter mode={mode} quiz={quiz} question={question} 
                        dispatch={this.dispatch} />
            } else if (uiState === 'review') {
                const gameOver = isGameOver(mode, quizQAs);
                body = <ReviewBody question={question} />
                footer = <ReviewFooter mode={mode} question={question} 
                        answer={answer} dispatch={this.dispatch} gameOver={gameOver}/>
            } else if (uiState === 'score') {
                const quizHistory = gameHistory[mode][quiz];
                const latest = gameHistory.latest;
                body = <ScoreBody quizHistory={quizHistory} latest={latest} />
                footer = <ScoreFooter quiz={quiz} dispatch={this.dispatch} />
            }
        }
        return (
            <div className="app">
                {header}
                {answerPanel}
                {body}
                {footer}
            </div>
        );
    }
}

function Header ({children}) {
    return <div className="header">{children}</div>
}

function GameHeader ({quiz, mode, score, completePercent, dispatch}) {
    // TODO: make look fancier when in higher modes
    const switchQuiz = () => dispatch({type: 'SELECT_QUIZ', quiz: null});
    return (
        <Header>
            <h2 className="header__quiz-name" onClick={switchQuiz}>{quizLabel(quiz)}</h2>
            <h2 className="header__score">{score}</h2>
            <ProgressBar completePercent={completePercent} />
        </Header>
    );
}

function HomeHeader () {
    return (
        <Header>
            <h1 className="header__home">
                HardBibleQuiz
                <span className="text-muted">.com</span>
            </h1>
        </Header>
    );
}

function ProgressBar ({completePercent}) {
    return <div className="header__progress-bar" style={{width: 100*completePercent + '%'}} />
}

function AnswerPanel({show, question}) {
    const className = show ? 'answer-panel answer-panel--show' : 'answer-panel'
    const text = show ? verseToLabel(question) : '';
    return <div className={className}>{text}</div>
}

function Footer ({children}) {
    return <div className="footer">{children}</div>
}

function HomeFooter () {
    return <Footer />
    //return (
        //<Footer>
            //<p className="home__footer">
                //<ContactUs>Contact Info</ContactUs>.
                //Verses taken from the <a href="https://en.wikipedia.org/wiki/World_English_Bible">WEB translation</a>.
            //</p>
        //</Footer>
    //);
}

function FooterLinks () {
    return (
        <ul className="footer__links">
            <li><a>Terms</a></li>
            <li><a>About</a></li>
            <li><ContactUs>Contact</ContactUs></li>
        </ul>
    );
}

function ContactUs ({children}) {
    return <a href="mailto:artsandmetaphysics@gmail.com">{children}</a>
}

class PromptFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {partialAnswer: []};
        this.back = this.back.bind(this);
        this.choose = this.choose.bind(this);
        this.getChoices = this.getChoices.bind(this);
    }
    choose(number) {
        const {mode, dispatch} = this.props;
        const finalLevel = {basic: 1, moses: 2, jesus: 3}[mode];
        const answer = [...this.state.partialAnswer, number];
        if (answer.length === finalLevel) {
            dispatch({type: 'ANSWER', answer});
        } else {
            this.setState({partialAnswer: answer});
        }
    }
    back() {
        this.setState(({oldPartialAnswer}) => {
            const newAnswer = [...oldPartialAnswer];
            newAnswer.pop();
            return {partialAnswer: newAnswer};
        });
    }
    getChoices() {
        const {quiz} = this.props;
        const [book, chapter] = this.state.partialAnswer;
        const numToChoice = (c) => ({value: c, label: String(c + 1)});

        let choices;
        if (chapter) {
            choices = range(getVersesPerChapter(book, chapter)).map(numToChoice);
        } else if (book) {
            choices = range(getChaptersPerBook(book)).map(numToChoice);
        } else {
            choices = quizBooks(quiz).map(b => ({value: b, label: bookLabel(b)}));
        }
        return choices;
    }
    render() {
        const {mode, quiz, question, dispatch} = this.props;
        const showBackBtn = this.state.partialAnswer.length > 0;
        const choices = this.getChoices();
        return (
            <Footer>
                <FooterText>
                    Which book is this 
                    <span className="text-highlight"> random verse </span>
                    found in?
                </FooterText>
                <BtnSet>
                    {choices.map((c) => {
                    return <Btn key={c.value} onClick={() => this.choose(c.value)}>{c.label}</Btn>
                    })}
                    {showBackBtn ? <Btn state="secondary" onClick={this.back}>Back</Btn> : null}
                </BtnSet>
            </Footer>
        );
    }
}

function ReviewFooter ({mode, question, answer, gameOver, dispatch}) {
    const status = qaStatus(mode, [question, answer]);
    const points = scoreQA(mode, [question, answer]);
    const btnState = {
        correct: 'success',
        close: 'secondary',
        incorrect: 'error',
    }[status];
    const onClick = () => dispatch({type: 'NEXT'});
    const btnText = gameOver ? 'Continue' : 'Next Verse';
    let prompt, choiceText;
    if (status === 'correct') {
        prompt = <span className='text-success'>CORRECT! +{points}</span>
    } else if (status === 'close') {
        choiceText = verseToLabel(answer);
        prompt = <span className='text-muted'>Close, you selected <span className='text-highlight'>{choiceText}</span> +{points}</span>;
    } else if (status === 'incorrect') {
        choiceText = verseToLabel(answer);
        prompt = <span className='text-error'>Not quite, you selected <span className='text-highlight'>{choiceText}</span></span>;
    }
    return (
        <Footer>
            <FooterText>{prompt}</FooterText>
            <BtnSet>
                <Btn state={btnState} onClick={onClick}>{btnText}</Btn>
            </BtnSet>
        </Footer>
    );
}

function ScoreFooter ({quiz, dispatch}) {
    const switchQuiz = () => dispatch({type: 'SELECT_QUIZ', quiz: null});
    const playAgain = () => dispatch({type: 'SELECT_QUIZ', quiz});
    return (
        <Footer>
            <FooterText>Thank you for playing!</FooterText>
            <BtnSet>
                <Btn state="secondary" onClick={switchQuiz}>Switch Quiz</Btn>
                <Btn onClick={playAgain}>Play Again</Btn>
            </BtnSet>
        </Footer>
    );
}

function BtnSet({children}) {
    return <div className='footer__btn-set'>{children}</div>
}

function FooterText ({children})  {
    return <p className="footer__prompt text-muted">{children}</p>
}

function ButtonSet ({children}) {
    return <div className="footer__button-set">{children}</div>
}

function Body ({children}) {
    return <div className="body">{children}</div>
}

function PromptBody ({question}) {
    return <Body><Verses verse={question} context={1}/></Body>
}

function ReviewBody ({question}) {
    return <Body><Verses verse={question} context={1000} /></Body>
}

function ScoreBody ({quizHistory, latest}) {
    const isCurrent = (a) => a[1] === latest[1];
    return (
        <div className="body">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {quizHistory.map((item, i) => {
                        let style;
                        if (isCurrent(item)) {
                            let color;
                            if (quizHistory.length === 1) {
                                color = '#341F89'; // primary
                            } else if (i === (quizHistory.length - 1)) {
                                color = '#EB5757';
                            } else {
                                color = '#28891F';
                            }
                            style = {color};
                        } else {
                            style = {};
                        }
                        return (
                            <tr key={i} style={style}>
                                <td>{i + 1}</td>
                                <td style={{textAlign: 'right'}}>{item[0]}</td>
                                <td>{item[1]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function ErrorBody () {
    return (
        <Body>
            <h2 className="text-error">Application Error</h2>
            <p className="text-muted">
                We apologize, but something unexpected occured.  Try refreshing the
                page.  If the error continues to occur, please <ContactUs>let us
                know</ContactUs>.
            </p>
        </Body>
    );
}

function HomeBody ({gameHistory, mode, dispatch}) {
    const BoundQuizBtn = ({quiz, status = null}) => {
        return <QuizBtn gameHistory={gameHistory} mode={mode} quiz={quiz} dispatch={dispatch} status={status} />
    }
    return (
        <Body>
            <p className="text-muted">A fun and challenging way to read the Bible.</p>
            <div className="body__quiz-set">
                <BoundQuizBtn quiz='pentateuch' />
                <BoundQuizBtn quiz='historical' />
                <BoundQuizBtn quiz='poetryandwisdom' />
                <BoundQuizBtn quiz='prophecy' />
                <BoundQuizBtn quiz='oldtestament' status={oldTestamentStatus(gameHistory, mode)}/>
            </div>
            <div className="body__quiz-set">
                <BoundQuizBtn quiz='gospels' />
                <BoundQuizBtn quiz='epistlesetc' />
                <BoundQuizBtn quiz='newtestament' status={newTestamentStatus(gameHistory, mode)}/>
            </div>
            <div className="body__quiz-set">
                <ModeBtn mode={mode} dispatch={dispatch} status={modeStatus(gameHistory, 'moses')}/>
            </div>
        </Body>
    );
}

function QuizBtn ({gameHistory, mode, quiz, dispatch, status}) {
    const locked = status && status[0] !== status[1];
    const startQuiz = () => dispatch({type: 'SELECT_QUIZ', quiz});
    const onClick = locked ? () => {} : startQuiz;
    const gameDone = isGameDone(gameHistory, mode, quiz);
    const state = locked ? 'disabled' : (gameDone ? 'success' : 'primary');
    const quizHistory = gameHistory[mode][quiz];
    const topScore = quizHistory !== undefined ? quizHistory[0][0] : null;
    // NOTE: duplicattion between here and ModeBtn
    return (
        <Btn onClick={onClick} state={state}>
            <span className="vertical-center">
                <span className="top-score">{locked ? <Lock /> : topScore}</span>
                <h2>{quizLabel(quiz)}</h2>
            </span>
            {locked ? <span>{status[0] + '/' + status[1]}</span> : <span />}
        </Btn>
    );
}

function Lock () {
    return (
        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 7.63416V3.73172C2.5 0.089432 8.5 0.0894241 8.5 3.73172V7.63416" stroke="white" stroke-width="2"/>
            <path d="M0 8.11383C0 7.56155 0.447715 7.11383 1 7.11383H10C10.5523 7.11383 11 7.56155 11 8.11383V16C11 16.5523 10.5523 17 10 17H1C0.447715 17 0 16.5523 0 16V8.11383Z" fill="white"/>
        </svg>
    );
}

function ModeBtn ({nextMode, dispatch, status}) {
    const locked = nextMode === undefined;
    const onClick = locked ? () => {} : dispatch({type: 'SELECT_MODE', mode: nextMode});
    const state = locked ? 'disabled' : 'primary';
    // NOTE: duplicattion between here and QuizBtn
    return (
        <Btn onClick={onClick} state={state}>
            <span className="vertical-center">
                <span className="top-score">{locked ? <Lock /> : ''}</span>
                <h2>Moses Mode</h2>
            </span>
            {locked ? <span>{status[0] + '/' + status[1]}</span> : <span />}
        </Btn>
    );
}

function Btn ({children, onClick = () => {}, state = 'primary'}) {
    return (
        <div className={"btn btn--" + state} onClick={onClick}>
            {children}
        </div>
    );
}

class Verses extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.scrollToVerse();
    }
    componentDidUpdate() {
        this.scrollToVerse();
    }
    scrollToVerse() {
        const current = document.getElementById('current-verse');
        current.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
    render() {
        const {verse, context} = this.props;
        const prevVerses = [];
        const postVerses = [];

        let currentVerse = verse;
        for (let i = 0; i < context; i++) {
            currentVerse = getPrevVerse(currentVerse);
            if (currentVerse === null) {
                break;
            }
            prevVerses.unshift(getVerseText(currentVerse));
        }

        currentVerse = verse;
        for (let i = 0; i < context; i++) {
            currentVerse = getNextVerse(currentVerse);
            if (currentVerse === null) {
                break;
            }
            postVerses.push(getVerseText(currentVerse));
        }
        const verseText = getVerseText(verse);
        return (
            <p className="body__verses">
                <span className="text-muted">{expandTabsAndNewLines(prevVerses.join(' '))}</span>
                <span id={'current-verse'}className="text-main">{' '}{expandTabsAndNewLines(verseText)}{' '}</span>
                <span className="text-muted">{expandTabsAndNewLines(postVerses.join(' '))}</span>
            </p>
        );
    }
}

function expandTabsAndNewLines(text) {
  const sections = text.split('\n')
  return sections.map(function(item, key) {
      const lastSection = key !== sections.length - 1;
      return (
        <span key={key}>
          {item.replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0')}
          {lastSection ? <br/> : null}
        </span>
      )
  })
}

ReactDOM.render(
  <AppErrorContainer />,
  document.getElementById('app')
);
