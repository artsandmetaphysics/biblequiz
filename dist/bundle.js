!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,c=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(o)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy"],f=[50,40,27,36,34],m=window.gtag||function(){};function h(){var e=function(e){var t=v(e.reduce(function(e,t){return e+t})),n=0,r=e[n];for(;t>=r;)r+=e[n+=1];return n}(f),t=PENTATEUCH[e].chapters,n=v(t.length);return[e+1,n+1,v(t[n].verses.length)+1]}function p(e){var t,n,r;if(3===e.length){var o=u(e,3);return t=o[0],n=o[1],r=o[2],y(t)+" "+n+"."+r}if(2===e.length){var c=u(e,2);return t=c[0],n=c[1],y(t)+" "+n}}function y(e){return s[e-1]}function v(e){return Math.floor(Math.random()*Math.floor(e))}function b(e,t,n){var r=0,o=u(n,3),c=o[0],a=o[1];o[2];if(e===c){r+=10;var l=Math.abs(t-a);0===l?r+=90:l<=5&&(r+=60-10*l)}return r}function d(e){var t=u(e,3),n=t[0],r=t[1],o=t[2],c=PENTATEUCH[n-1].chapters[r-1].verses[o-1];return void 0===c?null:c[String(o)]}var E=function(e){function t(e){var n,o,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(c=a(t).call(this,e))||"object"!==r(c)&&"function"!=typeof c?l(o):c).state={score:0,questionNum:0,verse:h(),bookChoice:null,chapterChoice:null,history:S(),showHistory:!1},n.pickBook=n.pickBook.bind(l(n)),n.undoBookChoice=n.undoBookChoice.bind(l(n)),n.pickChapter=n.pickChapter.bind(l(n)),n.nextQuestion=n.nextQuestion.bind(l(n)),n.nextQuiz=n.nextQuiz.bind(l(n)),n}var n,u,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(t,React.Component),n=t,(u=[{key:"pickBook",value:function(e){this.setState({bookChoice:e})}},{key:"undoBookChoice",value:function(){this.setState({bookChoice:null})}},{key:"pickChapter",value:function(e){this.setState(function(t){var n=b(t.bookChoice,e,t.verse);return m("event","selection",{event_category:"pentateuch",event_label:[verse[0],verse[1],verse[2],t.bookChoice,e,n].join(",")}),{chapterChoice:e,questionNum:t.questionNum+1,score:t.score+n}})}},{key:"nextQuestion",value:function(){this.setState(function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){o(e,t,n[t])})}return e}({},e,{verse:h(),bookChoice:null,chapterChoice:null});if(10===e.questionNum){var n=function(e){m("event","finish",{event_category:"pentateuch",event_label:"score",value:e});var t=(new Date).toLocaleString(),n=S(),r={dateTimeString:t,score:e};return n.push(r),o="history",c=n,localStorage.setItem(o,JSON.stringify(c)),r;var o,c}(e.score);t.history.push(n),t.score=0,t.questionNum=0,t.showHistory=!0}return t})}},{key:"nextQuiz",value:function(){this.setState({showHistory:!1})}},{key:"render",value:function(){var e,t,n=this.state,r=n.score,o=n.questionNum,c=n.verse,a=n.bookChoice,l=n.chapterChoice,i=n.showHistory,u=n.history;return i?e=this.nextQuiz:null===a?(e=this.pickBook,t=!1):null===l?(e=this.pickChapter,t=!1):(e=this.nextQuestion,t=!0),React.createElement("div",{className:"app"},React.createElement(R,{score:r,questionNum:o,questionsPerQuiz:10}),i?React.createElement(C,{history:u}):React.createElement(k,{showAnswer:t,verse:c,bookChoice:a,chapterChoice:l}),React.createElement(w,{bookChoice:a,chapterChoice:l,onClick:e,goBack:this.undoBookChoice,showHistory:i}))}}])&&c(n.prototype,u),s&&c(n,s),t}();function R(e){var t=e.score,n=e.questionNum,r=e.questionsPerQuiz;return React.createElement("div",{className:"header"},React.createElement("h2",null,"Pentateuch Quiz"),React.createElement("h2",{className:"glow"},"SCORE: ",t),React.createElement("h2",{className:"glow"},n,"/",r))}function k(e){var t=e.showAnswer,n=e.verse,r=e.bookChoice,o=e.chapterChoice;if(t){var c,a=p([r,o]),l=b(r,o,n);return c=n[0]===r&&n[1]===o?React.createElement("p",{className:"body__correct"},"CORRECT!",React.createElement("br",null),"+",l," points!"):n[0]===r?React.createElement("p",{className:"body__close"},"Close, you chose ",a,".",React.createElement("br",null),"+",l," points"):React.createElement("p",{className:"body__wrong"},"Wrong, you chose ",a),React.createElement("div",{className:"body"},React.createElement("h2",null,p(n)),React.createElement(g,{verseArray:n}),c)}return React.createElement("div",{className:"body"},React.createElement(g,{verseArray:n}))}function C(e){var t=function(e,t){return t.score-e.score},n=e.history.slice(),r=n.pop();n.sort(t);var o=n.slice(0,9);return o.push(r),o.sort(t),React.createElement("div",{className:"body"},React.createElement("p",null,"Thank you for playing!"),React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Score"),React.createElement("th",null,"Date"))),React.createElement("tbody",null,o.map(function(e,t){return React.createElement("tr",{key:t,style:(n=e,n.dateTimeString===r.dateTimeString?{color:"#23BD98"}:{})},React.createElement("td",null,t+1),React.createElement("td",{style:{textAlign:"right"}},e.score),React.createElement("td",null,e.dateTimeString));var n}))))}function g(e){var t=e.verseArray,n=function(e){var t=u(e,3),n=t[0],r=t[1],o=t[2];return 1===o?null:d([n,r,o-1])}(t),r=d(t),o=function(e){var t=u(e,3),n=t[0],r=t[1],o=t[2];return d([n,r,o+1])||null}(t);return React.createElement("p",null,n?React.createElement("span",{className:"body__context"},n+" "):null,React.createElement("span",null,r),o?React.createElement("span",{className:"body__context"}," "+o):null)}var N=["#EC6B34","#3C64DC","#55AEEE","#AE9BFB","#F59A2F"];function w(e){var t=e.bookChoice,n=e.chapterChoice,r=e.onClick,o=e.goBack;if(e.showHistory)return React.createElement("div",{className:"footer"},React.createElement("p",{className:"footer__help"},"Please share with friends!",React.createElement("br",null),"More quizzes will come if there is interest.  Verses choosen randomly. ",React.createElement("a",{href:"mailto:artsandmetaphysics@gmail.com"},"Contact Creator")),React.createElement(_,{color:"#5D4DC3",onClick:r},"Start New Quiz"));if(null===t)return React.createElement("div",{className:"footer"},React.createElement("p",{className:"footer__help"},"Which book is the randomly selected ",React.createElement("span",{style:{color:"#333"}},"black")," verse in?"),React.createElement(_,{color:N[0],onClick:function(){return r(1)}},"Genesis"),React.createElement(_,{color:N[1],onClick:function(){return r(2)}},"Exodus"),React.createElement(_,{color:N[2],onClick:function(){return r(3)}},"Leviticus"),React.createElement(_,{color:N[3],onClick:function(){return r(4)}},"Numbers"),React.createElement(_,{color:N[4],onClick:function(){return r(5)}},"Deut."));if(null===n){var c=f[t-1],a=Array.apply(null,{length:c}).map(Number.call,Number),l=N[t-1];return React.createElement("div",{className:"footer"},React.createElement("p",{className:"footer__help"},"And which chapter?"),a.map(function(e){return React.createElement(_,{color:l,key:e,onClick:function(){return r(e+1)}},e+1)}),React.createElement(_,{color:"#999",onClick:o},"Back"))}return React.createElement("div",{className:"footer"},React.createElement(_,{color:"#5D4DC3",onClick:r},"Next Question"))}function _(e){var t=e.children,n=e.onClick,r=e.color;return m("event","click",{event_category:"pentateuch",event_label:String(t)}),React.createElement("div",{style:{backgroundColor:r},className:"button",onClick:n},t)}function S(){var e=function(e,t){try{return JSON.parse(localStorage.getItem("history"))}catch(e){return null}}();return null===e&&(e=[]),e}ReactDOM.render(React.createElement(E,{name:"Taylor"}),document.getElementById("app"))},function(e,t,n){}]);