!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=1,a=4e3,c=100,o=function(e,t,n,r,a){return function(c,o){if("SELECT_QUIZ"===o.type)c.currentAnswer=null,c.quiz=o.quiz,null===c.currentQuestion&&null!==c.quiz&&(c.currentQuestion=r(c.quiz,c.historicalQAs)),gtag("event","quiz-start",{event_category:c.quiz,value:1}),c.quizQAs=[];else if("SELECT_MODE"===o.type){if(null!==c.quiz)throw new Error("mode change during quiz");c.mode=o.mode}else if("ANSWER"===o.type){if(gtag("event","quiz-answer",{event_category:c.quiz,value:1}),null!==c.currentAnswer)throw new Error("there is an answer already");c.currentAnswer=o.answer;var l=[c.currentQuestion,c.currentAnswer];if(c.quizQAs.push(l),c.historicalQAs.length<t?c.historicalQAs.push(l):(c.historicalQAs[c.historicalQAsIndex]=l,c.historicalQAsIndex=(c.historicalQAsIndex+1)%t),n(c.mode,c.quizQAs)){var i=[a(c.mode,c.quizQAs),(new Date).toLocaleString()];c.gameHistory=function(e,t,n,r,a){e.latest=r,void 0===e[t][n]&&(e[t][n]=[]);e[t][n].push(r),e[t][n].sort(function(e,t){return t[0]-e[0]}),e[t][n].length>a&&e[t][n].pop();return e}(c.gameHistory,c.mode,c.quiz,i,e),gtag("event","quiz-finish",{event_category:c.quiz,value:5})}}else"NEXT"===o.type&&(c.currentAnswer=null,n(c.mode,c.quizQAs)?c.currentQuestion=null:c.currentQuestion=r(c.quiz,c.historicalQAs));return c}};function l(){var e;try{(e=function(e,t){try{return JSON.parse(localStorage.getItem(e))}catch(e){return null}}("state")).version!==r&&(e=function(e){throw new Error("not implemented")}())}catch(t){e={version:r,quiz:null,mode:"basic",quizQAs:[],currentQuestion:null,currentAnswer:null,gameHistory:{basic:{},moses:{},jesus:{}},historicalQAs:[],historicalQAsIndex:0}}return e}function i(e){var t,n;t="state",n=e,localStorage.setItem(t,JSON.stringify(n))}var u=function(e,t){void 0===t&&(t=e,e=0);for(var n=[],r=e;r<t;r++)n.push(r);return n};function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var m=function(e,t){return 10===t.length},f=function(e,t){return t.reduce(function(t,n){return t+p(e,n)},0)},p=function(e,t){var n=0,r=s(t,2),a=r[0],c=r[1],o=s(a,3),l=o[0],i=o[1],u=o[2],m=s(c,3),f=m[0],p=m[1],h=m[2];if(l===f&&(n+=10,void 0!==p)){var d=Math.abs(p-i);if(0===d){if(n+=90,void 0!==h){var v=Math.abs(h-u);0===v?n+=900:v<=5&&(n+=600-100*v)}}else d<=5&&(n+=60-10*d)}return n},h=function(e,t){var n=p(e,t);return"basic"===e?10===n?"correct":"incorrect":"moses"===e?100===n?"correct":n>0?"close":"incorrect":"jesus"===e?1e3===n?"correct":n>0?"close":"incorrect":void 0},d={pentateuch:{label:"Pentateuch",books:u(5)},historical:{label:"Historical",books:u(5,17)},poetryandwisdom:{label:"Poetic & Wisdom",books:u(17,22)},prophecy:{label:"Prophecy",books:u(22,39)},oldtestament:{label:"Old Testament",books:u(0,39)},gospels:{label:"Gospels",books:u(39,43)},epistlesetc:{label:"Epistles Etc.",books:u(43,66)},newtestament:{label:"New Testament",books:u(39,66)}},v=function(e){return d[e].label},E=function(e){return d[e].books},y={basic:90,moses:900,jesus:9e3},R=function(e,t){var n=y[t],r=e[t];return w(r,n,["pentateuch","historical","poetryandwisdom","prophecy"])},b=function(e,t){var n=y[t],r=e[t];return w(r,n,["gospels","epistlesetc"])},g=function(e,t){var n={moses:"basic",jesus:"moses"}[t],r=e[n];return w(r,y[n],["pentateuch","historical","poetryandwisdom","prophecy","oldtestament","gosepels","epistlesetc","newtestament"])},w=function(e,t,n){var r=n.map(function(n){return z(e[n],t)});return[r.reduce(function(e,t){return t?e+1:e},0),r.length]},q=function(e,t,n){var r=e[t][n];return z(r,y[t])},z=function(e,t){return void 0!==e&&e[0][0]>=t};function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function _(e,t){var n=e.map(k),r=e[function(e){var t=x(e.reduce(function(e,t){return e+t})),n=0,r=e[n];for(;t>=r;)r+=e[n+=1];return n}(n)],a=BOOK_META[r].chapters,c=x(a.length),o=x(a[c]),l=[r,c,o];return 41===r&&16===c&&35===o?_(e,t):l}function k(e){return BOOK_META[e].chapters.length}function N(e,t){return BOOK_META[e].chapters[t]}function S(e){var t=A(e,3),n=t[0],r=t[1],a=t[2];return void 0!==a?C(n)+" "+(r+1)+"."+(a+1):void 0!==r?C(n)+" "+(r+1):C(n)}function C(e){return BOOK_META[e].label}function x(e){return Math.floor(Math.random()*Math.floor(e))}function O(e){var t=A(e,3),n=t[0],r=t[1],a=t[2],c=BIBLE[n][r][a];if(void 0!==c)return c;throw new Error("invalid verse "+e)}function Q(e){var t=A(e,3),n=t[0],r=t[1],a=t[2];if(0===r&&0===a)return null;if(0===a){var c=r-1;return[n,c,N(n,c)-1]}return[n,r,a-1]}function T(e){var t=A(e,3),n=t[0],r=t[1],a=t[2],c=a+1===N(n,r);return r+1===k(n)&&c?null:c?[n,r+1,0]:[n,r,a+1]}n(0);function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function M(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function H(e,t,n){return t&&B(e.prototype,t),n&&B(e,n),e}function V(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?D(e):t}function D(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function W(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Z=window.gtag||function(){},K=function(e){function t(e){var n;return P(this,t),(n=V(this,L(t).call(this,e))).state={error:!1},n}return W(t,React.Component),H(t,[{key:"componentDidCatch",value:function(e,t){console.error(e,t),Z("event","error",{event_category:e.toString()})}},{key:"render",value:function(){return this.state.error?React.createElement("div",{className:"app"},React.createElement(G,null),React.createElement(fe,null),React.createElement(te,null)):React.createElement(F,null)}}],[{key:"getDerivedStateFromError",value:function(e){return{error:!0}}}]),t}(),F=function(e){function t(e){var n;P(this,t);return(n=V(this,L(t).call(this,e))).reducer=o(c,a,m,function(e,t){return _(E(e),t)},f),n.state=l(),n.dispatch=n.dispatch.bind(D(n)),n}return W(t,React.Component),H(t,[{key:"dispatch",value:function(e){var t=this;this.setState(function(n){var r=t.reducer(n,e);return setTimeout(function(){return i(r)},0),r})}},{key:"render",value:function(){var e,t,n,r,a,c,o=(e=this.state,t=m,null===e.quiz?"home":null!==e.currentAnswer?"review":t(e.mode,e.quizQAs)?"score":"prompt"),l=this.state,i=l.gameHistory,u=l.mode,s=l.quiz;if("home"===o)n=React.createElement(G,null),r=null,a=React.createElement(pe,{gameHistory:i,mode:u,dispatch:this.dispatch}),c=React.createElement(te,null);else{var p=this.state.currentQuestion,h=this.state.currentAnswer,d=this.state.quizQAs,v=f(u,d),E=d.length/10;if(n=React.createElement(X,{quiz:s,mode:u,score:v,completePercent:E,dispatch:this.dispatch}),r=React.createElement($,{show:"review"===o,question:p}),"prompt"===o)a=React.createElement(ue,{question:p}),c=React.createElement(re,{mode:u,quiz:s,question:p,dispatch:this.dispatch});else if("review"===o){var y=m(u,d);a=React.createElement(se,{question:p}),c=React.createElement(ae,{mode:u,question:p,answer:h,dispatch:this.dispatch,gameOver:y})}else if("score"===o){var R=i[u][s],b=i.latest;a=React.createElement(me,{quizHistory:R,latest:b}),c=React.createElement(ce,{quiz:s,dispatch:this.dispatch})}}return React.createElement("div",{className:"app"},n,r,a,c)}}]),t}();function J(e){var t=e.children;return React.createElement("div",{className:"header"},t)}function X(e){var t=e.quiz,n=(e.mode,e.score),r=e.completePercent,a=e.dispatch;return React.createElement(J,null,React.createElement("h2",{className:"header__quiz-name",onClick:function(){return a({type:"SELECT_QUIZ",quiz:null})}},v(t)),React.createElement("h2",{className:"header__score"},n),React.createElement(Y,{completePercent:r}))}function G(){return React.createElement(J,null,React.createElement("h1",{className:"header__home"},"HardBibleQuiz",React.createElement("span",{className:"text-muted"},".com")))}function Y(e){var t=e.completePercent;return React.createElement("div",{className:"header__progress-bar",style:{width:100*t+"%"}})}function $(e){var t=e.show,n=e.question,r=t?"answer-panel answer-panel--show":"answer-panel",a=t?S(n):"";return React.createElement("div",{className:r},a)}function ee(e){var t=e.children;return React.createElement("div",{className:"footer"},t)}function te(){return React.createElement(ee,null,React.createElement("p",{className:"home__footer"},React.createElement(ne,null,"Contact Info"),". Verses taken from the ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/World_English_Bible"},"WEB translation"),"."))}function ne(e){var t=e.children;return React.createElement("a",{href:"mailto:artsandmetaphysics@gmail.com"},t)}var re=function(e){function t(e){var n;return P(this,t),(n=V(this,L(t).call(this,e))).state={partialAnswer:[]},n.back=n.back.bind(D(n)),n.choose=n.choose.bind(D(n)),n.getChoices=n.getChoices.bind(D(n)),n}return W(t,React.Component),H(t,[{key:"choose",value:function(e){var t=this.props,n=t.mode,r=t.dispatch,a={basic:1,moses:2,jesus:3}[n],c=[].concat(M(this.state.partialAnswer),[e]);c.length===a?r({type:"ANSWER",answer:c}):this.setState({partialAnswer:c})}},{key:"back",value:function(){this.setState(function(e){var t=M(e.oldPartialAnswer);return t.pop(),{partialAnswer:t}})}},{key:"getChoices",value:function(){var e=this.props.quiz,t=j(this.state.partialAnswer,2),n=t[0],r=t[1],a=function(e){return{value:e,label:String(e+1)}};return r?u(N(n,r)).map(a):n?u(k(n)).map(a):E(e).map(function(e){return{value:e,label:C(e)}})}},{key:"render",value:function(){var e=this,t=this.props,n=(t.mode,t.quiz,t.question,t.dispatch,this.state.partialAnswer.length>0),r=this.getChoices();return React.createElement(ee,null,React.createElement(le,null,"Which book is this",React.createElement("span",{className:"text-highlight"}," random verse "),"found in?"),React.createElement(oe,null,r.map(function(t){return React.createElement(Ee,{key:t.value,onClick:function(){return e.choose(t.value)}},t.label)}),n?React.createElement(Ee,{state:"secondary",onClick:this.back},"Back"):null))}}]),t}();function ae(e){var t,n,r=e.mode,a=e.question,c=e.answer,o=e.gameOver,l=e.dispatch,i=h(r,[a,c]),u=p(r,[a,c]),s={correct:"success",close:"secondary",incorrect:"error"}[i],m=o?"Continue":"Next Verse";return"correct"===i?t=React.createElement("span",{className:"text-success"},"CORRECT! +",u):"close"===i?(n=S(c),t=React.createElement("span",{className:"text-muted"},"Close, you selected ",React.createElement("span",{className:"text-highlight"},n)," +",u)):"incorrect"===i&&(n=S(c),t=React.createElement("span",{className:"text-error"},"Not quite, you selected ",React.createElement("span",{className:"text-highlight"},n))),React.createElement(ee,null,React.createElement(le,null,t),React.createElement(oe,null,React.createElement(Ee,{state:s,onClick:function(){return l({type:"NEXT"})}},m)))}function ce(e){var t=e.quiz,n=e.dispatch;return React.createElement(ee,null,React.createElement(le,null,"Thank you for playing!"),React.createElement(oe,null,React.createElement(Ee,{state:"secondary",onClick:function(){return n({type:"SELECT_QUIZ",quiz:null})}},"Switch Quiz"),React.createElement(Ee,{onClick:function(){return n({type:"SELECT_QUIZ",quiz:t})}},"Play Again")))}function oe(e){var t=e.children;return React.createElement("div",{className:"footer__btn-set"},t)}function le(e){var t=e.children;return React.createElement("p",{className:"footer__prompt text-muted"},t)}function ie(e){var t=e.children;return React.createElement("div",{className:"body"},t)}function ue(e){var t=e.question;return React.createElement(ie,null,React.createElement(ye,{verse:t,context:1}))}function se(e){var t=e.question;return React.createElement(ie,null,React.createElement(ye,{verse:t,context:1e3}))}function me(e){var t=e.quizHistory,n=e.latest;return React.createElement("div",{className:"body"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Score"),React.createElement("th",null,"Date"))),React.createElement("tbody",null,t.map(function(e,r){var a;e[1]===n[1]?a={color:1===t.length?"#341F89":r===t.length-1?"#EB5757":"#28891F"}:a={};return React.createElement("tr",{key:r,style:a},React.createElement("td",null,r+1),React.createElement("td",{style:{textAlign:"right"}},e[0]),React.createElement("td",null,e[1]))}))))}function fe(){return React.createElement(ie,null,React.createElement("h2",{className:"text-error"},"Application Error"),React.createElement("p",{className:"text-muted"},"We apologize, but something unexpected occured.  Try refreshing the page.  If the error continues to occur, please ",React.createElement(ne,null,"let us know"),"."))}function pe(e){var t=e.gameHistory,n=e.mode,r=e.dispatch,a=function(e){var a=e.quiz,c=e.status,o=void 0===c?null:c;return React.createElement(he,{gameHistory:t,mode:n,quiz:a,dispatch:r,status:o})};return React.createElement(ie,null,React.createElement("p",{className:"text-muted"},"A fun and challenging way to read the Bible."),React.createElement("div",{className:"body__quiz-set"},React.createElement(a,{quiz:"pentateuch"}),React.createElement(a,{quiz:"historical"}),React.createElement(a,{quiz:"poetryandwisdom"}),React.createElement(a,{quiz:"prophecy"}),React.createElement(a,{quiz:"oldtestament",status:R(t,n)})),React.createElement("div",{className:"body__quiz-set"},React.createElement(a,{quiz:"gospels"}),React.createElement(a,{quiz:"epistlesetc"}),React.createElement(a,{quiz:"newtestament",status:b(t,n)})),React.createElement("div",{className:"body__quiz-set"},React.createElement(ve,{mode:n,dispatch:r,status:g(t,"moses")})))}function he(e){var t=e.gameHistory,n=e.mode,r=e.quiz,a=e.dispatch,c=e.status,o=c&&c[0]!==c[1],l=o?function(){}:function(){return a({type:"SELECT_QUIZ",quiz:r})},i=q(t,n,r),u=o?"disabled":i?"success":"primary",s=t[n][r],m=void 0!==s?s[0][0]:null;return React.createElement(Ee,{onClick:l,state:u},React.createElement("span",{className:"vertical-center"},React.createElement("span",{className:"top-score"},o?React.createElement(de,null):m),React.createElement("h2",null,v(r))),o?React.createElement("span",null,c[0]+"/"+c[1]):React.createElement("span",null))}function de(){return React.createElement("svg",{width:"11",height:"17",viewBox:"0 0 11 17",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M2.5 7.63416V3.73172C2.5 0.089432 8.5 0.0894241 8.5 3.73172V7.63416",stroke:"white","stroke-width":"2"}),React.createElement("path",{d:"M0 8.11383C0 7.56155 0.447715 7.11383 1 7.11383H10C10.5523 7.11383 11 7.56155 11 8.11383V16C11 16.5523 10.5523 17 10 17H1C0.447715 17 0 16.5523 0 16V8.11383Z",fill:"white"}))}function ve(e){var t=e.nextMode,n=e.dispatch,r=e.status,a=void 0===t,c=a?function(){}:n({type:"SELECT_MODE",mode:t}),o=a?"disabled":"primary";return React.createElement(Ee,{onClick:c,state:o},React.createElement("span",{className:"vertical-center"},React.createElement("span",{className:"top-score"},a?React.createElement(de,null):""),React.createElement("h2",null,"Moses Mode")),a?React.createElement("span",null,r[0]+"/"+r[1]):React.createElement("span",null))}function Ee(e){var t=e.children,n=e.onClick,r=void 0===n?function(){}:n,a=e.state,c=void 0===a?"primary":a;return React.createElement("div",{className:"btn btn--"+c,onClick:r},t)}var ye=function(e){function t(e){return P(this,t),V(this,L(t).call(this,e))}return W(t,React.Component),H(t,[{key:"componentDidMount",value:function(){this.scrollToVerse()}},{key:"componentDidUpdate",value:function(){this.scrollToVerse()}},{key:"scrollToVerse",value:function(){document.getElementById("current-verse").scrollIntoView({behavior:"auto",block:"center",inline:"center"})}},{key:"render",value:function(){for(var e=this.props,t=e.verse,n=e.context,r=[],a=[],c=t,o=0;o<n&&null!==(c=Q(c));o++)r.unshift(O(c));c=t;for(var l=0;l<n&&null!==(c=T(c));l++)a.push(O(c));var i=O(t);return React.createElement("p",{className:"body__verses"},React.createElement("span",{className:"text-muted"},Re(r.join(" "))),React.createElement("span",{id:"current-verse",className:"text-main"}," ",Re(i)," "),React.createElement("span",{className:"text-muted"},Re(a.join(" "))))}}]),t}();function Re(e){var t=e.split("\n");return t.map(function(e,n){var r=n!==t.length-1;return React.createElement("span",{key:n},e.replace(/\t/g,"    "),r?React.createElement("br",null):null)})}ReactDOM.render(React.createElement(K,null),document.getElementById("app"))}]);