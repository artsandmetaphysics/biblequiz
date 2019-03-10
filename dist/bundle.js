!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,c=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy"],f=[50,40,27,36,34];function p(){var e=b(PENTATEUCH.length),t=PENTATEUCH[e].chapters,n=b(t.length);return[e+1,n+1,b(t[n].verses.length)+1]}function m(e){var t,n,r;if(3===e.length){var o=l(e,3);return t=o[0],n=o[1],r=o[2],h(t)+" "+n+"."+r}if(2===e.length){var c=l(e,2);return t=c[0],n=c[1],h(t)+" "+n}}function h(e){return s[e-1]}function b(e){return Math.floor(Math.random()*Math.floor(e))}var y=function(e){function t(e){var n,o,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(c=u(t).call(this,e))||"object"!==r(c)&&"function"!=typeof c?a(o):c).state={score:0,questionNum:0,verse:p(),bookChoice:null,chapterChoice:null},n.pickBook=n.pickBook.bind(a(n)),n.pickChapter=n.pickChapter.bind(a(n)),n.nextQuestion=n.nextQuestion.bind(a(n)),n}var n,s,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(t,React.Component),n=t,(s=[{key:"pickBook",value:function(e){this.setState({bookChoice:e})}},{key:"pickChapter",value:function(e){this.setState(function(t){var n=function(e,t,n){var r=0,o=l(n,3),c=o[0],u=o[1];return o[2],e===c&&(r+=10),t===u&&(r+=20),r}(t.bookChoice,e,t.verse);return{chapterChoice:e,questionNum:t.questionNum+1,score:t.score+n}})}},{key:"nextQuestion",value:function(){this.setState(function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){o(e,t,n[t])})}return e}({},e,{verse:p(),bookChoice:null,chapterChoice:null});return 20===e.questionNum&&(t.score=0,t.questionNum=0),t})}},{key:"render",value:function(){var e,t,n=this.state,r=n.score,o=n.questionNum,c=n.verse,u=n.bookChoice,a=n.chapterChoice;return null===u?(e=this.pickBook,t=!1):null===a?(e=this.pickChapter,t=!1):(e=this.nextQuestion,t=!0),React.createElement("div",{className:"app"},React.createElement(v,{score:r,questionNum:o,questionsPerQuiz:20}),React.createElement(d,{showAnswer:t,verse:c,bookChoice:u,chapterChoice:a}),React.createElement(C,{bookChoice:u,chapterChoice:a,onClick:e}))}}])&&c(n.prototype,s),f&&c(n,f),t}();function v(e){var t=e.score,n=e.questionNum,r=e.questionsPerQuiz;return React.createElement("div",{className:"header"},React.createElement("h1",null,"Pentateuch Quiz"),React.createElement("h1",{className:"glow"},t),React.createElement("h1",{className:"glow"},n,"/",r))}function d(e){var t,n,r,o,c,u=e.showAnswer,a=e.verse,i=e.bookChoice,s=e.chapterChoice,f=(t=l(a,3),n=t[0],r=t[1],o=t[2],PENTATEUCH[n-1].chapters[r-1].verses[o-1][String(o)]);return u?(c=a[0]===i&&a[1]===s?React.createElement("p",{className:"body__correct"},"CORRECT, +30 points!"):a[0]===i?React.createElement("p",{className:"body__close"},"Close, you chose ",m([i,s]),"! +10 points for getting the book correct"):React.createElement("p",{className:"body__wrong"},"Wrong, you chose ",m([i,s])),React.createElement("div",{className:"body"},React.createElement("h2",null,"Answer: ",m(a)),c,React.createElement("p",null,f))):React.createElement("div",{className:"body"},React.createElement("p",null,f))}var E=["#EC6B34","#EAC74B","#55AEEE","#AE9BFB","#F59A2F"];function C(e){var t=e.bookChoice,n=e.chapterChoice,r=e.onClick;if(null===t)return React.createElement("div",{className:"footer"},React.createElement(k,{color:E[0],onClick:function(){return r(1)}},"Genesis"),React.createElement(k,{color:E[1],onClick:function(){return r(2)}},"Exodus"),React.createElement(k,{color:E[2],onClick:function(){return r(3)}},"Leviticus"),React.createElement(k,{color:E[3],onClick:function(){return r(4)}},"Numbers"),React.createElement(k,{color:E[4],onClick:function(){return r(5)}},"Deut."));if(null===n){var o=f[t-1],c=Array.apply(null,{length:o}).map(Number.call,Number),u=E[t-1];return React.createElement("div",{className:"footer"},c.map(function(e){return React.createElement(k,{color:u,key:e,onClick:function(){return r(e+1)}},e+1)}))}return React.createElement("div",{className:"footer"},React.createElement(k,{color:"#5D4DC3",onClick:function(){return r()}},"Next Question"))}function k(e){var t=e.children,n=e.onClick,r=e.color;return React.createElement("div",{style:{backgroundColor:r},className:"button",onClick:n},t)}ReactDOM.render(React.createElement(y,{name:"Taylor"}),document.getElementById("app"))},function(e,t,n){}]);