!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=1)}([function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=1,a=4e3,c=100,l=function(e,t,r,n,a){return function(c,l){if("SELECT_QUIZ"===l.type){if(null!==c.currentAnswer)throw new Error("start quiz when current answer not cleared");c.quiz=l.quiz,null===c.currentQuestion&&null!==c.quiz&&(c.currentQuestion=n(c.quiz,c.historicalQAs)),c.quizQAs=[]}else if("SELECT_MODE"===l.type){if(null!==c.quiz)throw new Error("mode change during quiz");c.mode=l.mode}else if("ANSWER"===l.type){if(null!==c.currentAnswer)throw new Error("there is an answer already");c.currentAnswer=l.answer;var o=[c.currentQuestion,c.currentAnswer];if(c.quizQAs.push(o),c.historicalQAs.length<t?c.historicalQAs.push(o):(c.historicalQAs[c.historicalQAsIndex]=o,c.historicalQAsIndex=(c.historicalQAsIndex+1)%t),r(c.mode,c.quizQAs)){var s=[a(c.mode,c.quizQAs),(new Date).toLocaleString()];c.gameHistory=function(e,t,r,n,a){e.latest=n,void 0===e[t][r]&&(e[t][r]=[]);e[t][r].push(n),e[t][r].sort(function(e,t){return t[0]-e[0]}),e[t][r].length>a&&e[t][r].pop();return e}(c.gameHistory,c.mode,c.quiz,s,e)}}else"NEXT"===l.type&&(c.currentAnswer=null,r(c.mode,c.quizQAs)?c.currentQuestion=null:c.currentQuestion=n(c.quiz,c.historicalQAs));return c}};function o(){var e;try{(e=function(e,t){try{return JSON.parse(localStorage.getItem(e))}catch(e){return null}}("state")).version!==n&&(e=function(e){throw new Error("not implemented")}())}catch(t){e={version:n,quiz:null,mode:"basic",quizQAs:[],currentQuestion:null,currentAnswer:null,gameHistory:{basic:{},moses:{},jesus:{}},historicalQAs:[],historicalQAsIndex:0}}return e}function s(e){var t,r;t="state",r=e,localStorage.setItem(t,JSON.stringify(r))}var i=function(e,t){void 0===t&&(t=e,e=0);for(var r=[],n=e;n<t;n++)r.push(n);return r};function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,c=void 0;try{for(var l,o=e[Symbol.iterator]();!(n=(l=o.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw c}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var h=function(e,t){return 10===t.length},m=function(e,t){return t.reduce(function(t,r){return t+p(e,r)},0)},p=function(e,t){var r=0,n=u(t,2),a=n[0],c=n[1],l=u(a,3),o=l[0],s=l[1],i=l[2],h=u(c,3),m=h[0],p=h[1],f=h[2];if(o===m&&(r+=10,void 0!==p)){var d=Math.abs(p-s);if(0===d){if(r+=90,void 0!==f){var b=Math.abs(f-i);0===b?r+=900:b<=5&&(r+=600-100*b)}}else d<=5&&(r+=60-10*d)}return r},f=function(e,t){var r=p(e,t);return"basic"===e?10===r?"correct":"incorrect":"moses"===e?100===r?"correct":r>0?"close":"incorrect":"jesus"===e?1e3===r?"correct":r>0?"close":"incorrect":void 0},d={pentateuch:{label:"Pentateuch",books:i(5)},historical:{label:"Historical",books:i(5,17)},poetryandwisdom:{label:"Poetic & Wisdom",books:i(17,22)},prophecy:{label:"Prophecy",books:i(22,39)},oldtestament:{label:"Old Testament",books:i(0,39)},gospels:{label:"Gospels",books:i(39,43)},epistlesetc:{label:"Epistles Etc.",books:i(43,66)},newtestament:{label:"New Testament",books:i(39,66)}},b=function(e){return d[e].label},v=function(e){return d[e].books},E={basic:90,moses:900,jesus:9e3},y=function(e,t){var r=E[t],n=e[t];return g(n,r,["pentateuch","historical","poetryandwisdom","prophecy"])},R=function(e,t){var r=E[t],n=e[t];return g(n,r,["gospels","epistlesetc"])},w=function(e,t){var r={moses:"basic",jesus:"moses"}[t],n=e[r];return g(n,E[r],["pentateuch","historical","poetryandwisdom","prophecy","oldtestament","gosepels","epistlesetc","newtestament"])},g=function(e,t,r){var n=r.map(function(r){return k(e[r],t)});return[n.reduce(function(e,t){return t?e+1:e},0),n.length]},q=function(e,t,r){var n=e[t][r];return k(n,E[t])},k=function(e,t){return void 0!==e&&e[0][0]>=t};function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,c=void 0;try{for(var l,o=e[Symbol.iterator]();!(n=(l=o.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw c}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function A(e,t){var r=e.map(N),n=e[function(e){var t=x(e.reduce(function(e,t){return e+t})),r=0,n=e[r];for(;t>=n;)n+=e[r+=1];return r}(r)],a=P[n].chapters,c=x(a.length);return[n,c,x(a[c])]}function N(e){return P[e].chapters.length}function _(e,t){return P[e].chapters[t]}function C(e){var t=z(e,3),r=t[0],n=t[1],a=t[2];return void 0!==a?S(r)+" "+(n+1)+"."+(a+1):void 0!==n?S(r)+" "+(n+1):S(r)}function S(e){return P[e].label}function x(e){return Math.floor(Math.random()*Math.floor(e))}function Q(e){var t=z(e,3),r=t[0],n=t[1],a=t[2],c=BIBLE[r][n][a];if(void 0!==c)return c;throw new Error("invalid verse "+e)}function T(e){var t=z(e,3),r=t[0],n=t[1],a=t[2];if(0===n&&0===a)return null;if(0===a){var c=n-1;return[r,c,_(r,c)-1]}return[r,n,a-1]}function O(e){var t=z(e,3),r=t[0],n=t[1],a=t[2],c=a+1===_(r,n);return n+1===N(r)&&c?null:c?[r,n+1,0]:[r,n,a+1]}var P=[{label:"Genesis",chapters:[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]},{label:"Exodus",chapters:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]},{label:"Leviticus",chapters:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]},{label:"Numbers",chapters:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]},{label:"Deuteronomy",chapters:[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]},{label:"Joshua",chapters:[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]},{label:"Judges",chapters:[36,23,31,24,32,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]},{label:"Ruth",chapters:[22,23,18,22]},{label:"1 Samuel",chapters:[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,43,15,23,29,22,44,25,12,25,11,31,13]},{label:"2 Samuel",chapters:[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]},{label:"1 Kings",chapters:[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,54]},{label:"2 Kings",chapters:[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]},{label:"1 Chronicles",chapters:[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]},{label:"2 Chronicles",chapters:[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]},{label:"Ezra",chapters:[11,70,13,24,17,22,28,36,15,44]},{label:"Nehemiah",chapters:[11,20,32,23,19,19,73,18,38,39,36,47,31]},{label:"Esther",chapters:[22,23,15,17,14,14,10,17,32,3]},{label:"Job",chapters:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]},{label:"Psalms",chapters:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]},{label:"Proverbs",chapters:[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]},{label:"Ecclesiastes",chapters:[18,26,22,16,20,12,29,17,18,20,10,14]},{label:"Song of Solomon",chapters:[17,17,11,16,16,13,13,14]},{label:"Isaiah",chapters:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]},{label:"Jeremiah",chapters:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]},{label:"Lamentations",chapters:[22,22,66,22,22]},{label:"Ezekiel",chapters:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]},{label:"Daniel",chapters:[21,49,30,37,31,28,28,27,27,21,45,13]},{label:"Hosea",chapters:[11,23,5,19,15,11,16,14,17,15,12,14,16,9]},{label:"Joel",chapters:[20,32,21]},{label:"Amos",chapters:[15,16,15,13,27,14,17,14,15]},{label:"Obadiah",chapters:[21]},{label:"Jonah",chapters:[17,10,10,11]},{label:"Micah",chapters:[16,13,12,13,15,16,20]},{label:"Nahum",chapters:[15,13,19]},{label:"Habakkuk",chapters:[17,20,19]},{label:"Zephaniah",chapters:[18,15,20]},{label:"Haggai",chapters:[15,23]},{label:"Zechariah",chapters:[21,13,10,14,11,15,14,23,17,12,17,14,9,21]},{label:"Malachi",chapters:[14,17,18,6]},{label:"Matthew",chapters:[25,22,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,45,39,51,46,74,66,20]},{label:"Mark",chapters:[45,28,35,40,43,56,36,37,50,52,33,44,37,72,47,20]},{label:"Luke",chapters:[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]},{label:"John",chapters:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]},{label:"Acts",chapters:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]},{label:"Romans",chapters:[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]},{label:"1 Corinthians",chapters:[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]},{label:"2 Corinthians",chapters:[24,17,18,18,21,18,16,24,15,18,33,21,14]},{label:"Galatians",chapters:[24,21,29,31,26,18]},{label:"Ephesians",chapters:[23,22,21,32,33,24]},{label:"Philippians",chapters:[30,30,21,23]},{label:"Colossians",chapters:[29,23,25,18]},{label:"1 Thessalonians",chapters:[10,20,13,18,28]},{label:"2 Thessalonians",chapters:[12,17,18]},{label:"1 Timothy",chapters:[20,15,16,16,25,21]},{label:"2 Timothy",chapters:[18,26,17,22]},{label:"Titus",chapters:[16,15,15]},{label:"Philemon",chapters:[25]},{label:"Hebrews",chapters:[14,18,19,16,14,20,28,13,28,39,40,29,25]},{label:"James",chapters:[27,26,18,17,20]},{label:"1 Peter",chapters:[25,25,22,19,14]},{label:"2 Peter",chapters:[21,22,18]},{label:"1 John",chapters:[10,29,24,21,21]},{label:"2 John",chapters:[13]},{label:"3 John",chapters:[15]},{label:"Jude",chapters:[25]},{label:"Revelation",chapters:[20,29,22,11,14,17,17,13,21,11,19,18,18,20,8,21,18,24,21,15,27,21]}];r(0);function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,c=void 0;try{for(var l,o=e[Symbol.iterator]();!(n=(l=o.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw c}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function M(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function J(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function V(e,t,r){return t&&J(e.prototype,t),r&&J(e,r),e}function D(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?L(e):t}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Z(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}window.gtag;var W=function(e){function t(e){var r;return H(this,t),(r=D(this,B(t).call(this,e))).state={error:!1},r}return Z(t,React.Component),V(t,[{key:"componentDidCatch",value:function(e,t){console.error(e,t)}},{key:"render",value:function(){return this.state.error?React.createElement("div",{className:"app"},React.createElement(X,null),React.createElement(me,null),React.createElement(te,null)):React.createElement(K,null)}}],[{key:"getDerivedStateFromError",value:function(e){return{error:!0}}}]),t}(),K=function(e){function t(e){var r;H(this,t);return(r=D(this,B(t).call(this,e))).reducer=l(c,a,h,function(e,t){return A(v(e))},m),r.state=o(),r.dispatch=r.dispatch.bind(L(r)),r}return Z(t,React.Component),V(t,[{key:"dispatch",value:function(e){var t=this;this.setState(function(r){var n=t.reducer(r,e);return setTimeout(function(){return s(n)},0),n})}},{key:"render",value:function(){var e,t,r,n,a,c,l=(e=this.state,t=h,null===e.quiz?"home":null!==e.currentAnswer?"review":t(e.mode,e.quizQAs)?"score":"prompt"),o=this.state,s=o.gameHistory,i=o.mode,u=o.quiz;if("home"===l)r=React.createElement(X,null),n=null,a=React.createElement(pe,{gameHistory:s,mode:i,dispatch:this.dispatch}),c=React.createElement(te,null);else{var p=this.state.currentQuestion,f=this.state.currentAnswer,d=this.state.quizQAs,b=m(i,d),v=d.length/10;if(r=React.createElement(G,{quiz:u,mode:i,score:b,completePercent:v}),n=React.createElement($,{show:"review"===l,question:p}),"prompt"===l)a=React.createElement(ie,{question:p}),c=React.createElement(ne,{mode:i,quiz:u,question:p,dispatch:this.dispatch});else if("review"===l){var E=h(i,d);a=React.createElement(ue,{question:p}),c=React.createElement(ae,{mode:i,question:p,answer:f,dispatch:this.dispatch,gameOver:E})}else if("score"===l){var y=s[i][u],R=s.latest;a=React.createElement(he,{quizHistory:y,latest:R}),c=React.createElement(ce,{quiz:u,dispatch:this.dispatch})}}return React.createElement("div",{className:"app"},r,n,a,c)}}]),t}();function F(e){var t=e.children;return React.createElement("div",{className:"header"},t)}function G(e){var t=e.quiz,r=(e.mode,e.score),n=e.completePercent;return React.createElement(F,null,React.createElement("h2",{className:"header__quiz-name"},b(t)),React.createElement("h2",{className:"header__score"},r),React.createElement(Y,{completePercent:n}))}function X(){return React.createElement(F,null,React.createElement("h1",{className:"header__home"},"HardBibleQuiz",React.createElement("span",{className:"text-muted"},".com")))}function Y(e){var t=e.completePercent;return React.createElement("div",{className:"header__progress-bar",style:{width:100*t+"%"}})}function $(e){var t=e.show,r=e.question,n=t?"answer-panel answer-panel--show":"answer-panel",a=t?C(r):"";return React.createElement("div",{className:n},a)}function ee(e){var t=e.children;return React.createElement("div",{className:"footer"},t)}function te(){return React.createElement(ee,null,React.createElement("p",{className:"home__footer"},React.createElement(re,null,"Contact Info"),". Verses taken from ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/King_James_Version"},"KJV"),"."))}function re(e){var t=e.children;return React.createElement("a",{href:"mailto:artsandmetaphysics@gmail.com"},t)}var ne=function(e){function t(e){var r;return H(this,t),(r=D(this,B(t).call(this,e))).state={partialAnswer:[]},r.back=r.back.bind(L(r)),r.choose=r.choose.bind(L(r)),r.getChoices=r.getChoices.bind(L(r)),r}return Z(t,React.Component),V(t,[{key:"choose",value:function(e){var t=this.props,r=t.mode,n=t.dispatch,a={basic:1,moses:2,jesus:3}[r],c=[].concat(M(this.state.partialAnswer),[e]);c.length===a?n({type:"ANSWER",answer:c}):this.setState({partialAnswer:c})}},{key:"back",value:function(){this.setState(function(e){var t=M(e.oldPartialAnswer);return t.pop(),{partialAnswer:t}})}},{key:"getChoices",value:function(){var e=this.props.quiz,t=j(this.state.partialAnswer,2),r=t[0],n=t[1],a=function(e){return{value:e,label:String(e+1)}};return n?i(_(r,n)).map(a):r?i(N(r)).map(a):v(e).map(function(e){return{value:e,label:S(e)}})}},{key:"render",value:function(){var e=this,t=this.props,r=(t.mode,t.quiz,t.question,t.dispatch,this.state.partialAnswer.length>0),n=this.getChoices();return React.createElement(ee,null,React.createElement(oe,null,"Which book is this",React.createElement("span",{className:"text-highlight"}," random verse "),"found in?"),React.createElement(le,null,n.map(function(t){return React.createElement(ve,{key:t.value,onClick:function(){return e.choose(t.value)}},t.label)}),r?React.createElement(ve,{state:"secondary",onClick:this.back},"Back"):null))}}]),t}();function ae(e){var t,r,n=e.mode,a=e.question,c=e.answer,l=e.gameOver,o=e.dispatch,s=f(n,[a,c]),i=p(n,[a,c]),u={correct:"success",close:"secondary",incorrect:"error"}[s],h=l?"Continue":"Next Verse";return"correct"===s?t=React.createElement("span",{className:"text-success"},"CORRECT! +",i):"close"===s?(r=C(c),t=React.createElement("span",{className:"text-muted"},"Close, you selected ",React.createElement("span",{className:"text-highlight"},r)," +",i)):"incorrect"===s&&(r=C(c),t=React.createElement("span",{className:"text-error"},"Not quite, you selected ",React.createElement("span",{className:"text-highlight"},r))),React.createElement(ee,null,React.createElement(oe,null,t),React.createElement(le,null,React.createElement(ve,{state:u,onClick:function(){return o({type:"NEXT"})}},h)))}function ce(e){var t=e.quiz,r=e.dispatch;return React.createElement(ee,null,React.createElement(oe,null,"Thank you for playing!"),React.createElement(le,null,React.createElement(ve,{state:"secondary",onClick:function(){return r({type:"SELECT_QUIZ",quiz:null})}},"Switch Quiz"),React.createElement(ve,{onClick:function(){return r({type:"SELECT_QUIZ",quiz:t})}},"Play Again")))}function le(e){var t=e.children;return React.createElement("div",{className:"footer__btn-set"},t)}function oe(e){var t=e.children;return React.createElement("p",{className:"footer__prompt text-muted"},t)}function se(e){var t=e.children;return React.createElement("div",{className:"body"},t)}function ie(e){var t=e.question;return React.createElement(se,null,React.createElement(Ee,{verse:t,context:1}))}function ue(e){var t=e.question;return React.createElement(se,null,React.createElement(Ee,{verse:t,context:1e3}))}function he(e){var t=e.quizHistory,r=e.latest;return React.createElement("div",{className:"body"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Score"),React.createElement("th",null,"Date"))),React.createElement("tbody",null,t.map(function(e,n){var a;e[1]===r[1]?a={color:1===t.length?"#341F89":n===t.length-1?"#EB5757":"#28891F"}:a={};return React.createElement("tr",{key:n,style:a},React.createElement("td",null,n+1),React.createElement("td",{style:{textAlign:"right"}},e[0]),React.createElement("td",null,e[1]))}))))}function me(){return React.createElement(se,null,React.createElement("h2",{className:"text-error"},"Application Error"),React.createElement("p",{className:"text-muted"},"We apologize, but something unexpected occured.  Try refreshing the page.  If the error continues to occur, please ",React.createElement(re,null,"let us know"),"."))}function pe(e){var t=e.gameHistory,r=e.mode,n=e.dispatch,a=function(e){var a=e.quiz,c=e.status,l=void 0===c?null:c;return React.createElement(fe,{gameHistory:t,mode:r,quiz:a,dispatch:n,status:l})};return React.createElement(se,null,React.createElement("p",{className:"text-muted"},"A fun and challenging way to read the Bible."),React.createElement("div",{className:"body__quiz-set"},React.createElement(a,{quiz:"pentateuch"}),React.createElement(a,{quiz:"historical"}),React.createElement(a,{quiz:"poetryandwisdom"}),React.createElement(a,{quiz:"prophecy"}),React.createElement(a,{quiz:"oldtestament",status:y(t,r)})),React.createElement("div",{className:"body__quiz-set"},React.createElement(a,{quiz:"gospels"}),React.createElement(a,{quiz:"epistlesetc"}),React.createElement(a,{quiz:"newtestament",status:R(t,r)})),React.createElement("div",{className:"body__quiz-set"},React.createElement(be,{mode:r,dispatch:n,status:w(t,"moses")})))}function fe(e){var t=e.gameHistory,r=e.mode,n=e.quiz,a=e.dispatch,c=e.status,l=c&&c[0]!==c[1],o=l?function(){}:function(){return a({type:"SELECT_QUIZ",quiz:n})},s=q(t,r,n),i=l?"disabled":s?"success":"primary",u=t[r][n],h=void 0!==u?u[0][0]:null;return React.createElement(ve,{onClick:o,state:i},React.createElement("span",{className:"vertical-center"},React.createElement("span",{className:"top-score"},l?React.createElement(de,null):h),React.createElement("h2",null,b(n))),l?React.createElement("span",null,c[0]+"/"+c[1]):React.createElement("span",null))}function de(){return React.createElement("svg",{width:"11",height:"17",viewBox:"0 0 11 17",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M2.5 7.63416V3.73172C2.5 0.089432 8.5 0.0894241 8.5 3.73172V7.63416",stroke:"white","stroke-width":"2"}),React.createElement("path",{d:"M0 8.11383C0 7.56155 0.447715 7.11383 1 7.11383H10C10.5523 7.11383 11 7.56155 11 8.11383V16C11 16.5523 10.5523 17 10 17H1C0.447715 17 0 16.5523 0 16V8.11383Z",fill:"white"}))}function be(e){var t=e.nextMode,r=e.dispatch,n=e.status,a=void 0===t,c=a?function(){}:r({type:"SELECT_MODE",mode:t}),l=a?"disabled":"primary";return React.createElement(ve,{onClick:c,state:l},React.createElement("span",{className:"vertical-center"},React.createElement("span",{className:"top-score"},a?React.createElement(de,null):""),React.createElement("h2",null,"Moses Mode")),a?React.createElement("span",null,n[0]+"/"+n[1]):React.createElement("span",null))}function ve(e){var t=e.children,r=e.onClick,n=void 0===r?function(){}:r,a=e.state,c=void 0===a?"primary":a;return React.createElement("div",{className:"btn btn--"+c,onClick:n},t)}var Ee=function(e){function t(e){return H(this,t),D(this,B(t).call(this,e))}return Z(t,React.Component),V(t,[{key:"componentDidMount",value:function(){this.scrollToVerse()}},{key:"componentDidUpdate",value:function(){this.scrollToVerse()}},{key:"scrollToVerse",value:function(){document.getElementById("current-verse").scrollIntoView({behavior:"auto",block:"center",inline:"center"})}},{key:"render",value:function(){for(var e=this.props,t=e.verse,r=e.context,n=[],a=[],c=t,l=0;l<r&&null!==(c=T(c));l++)n.unshift(Q(c));c=t;for(var o=0;o<r&&null!==(c=O(c));o++)a.push(Q(c));var s=Q(t);return React.createElement("p",{className:"body__verses"},React.createElement("span",{className:"text-muted"},n.join(" ")),React.createElement("span",{id:"current-verse",className:"text-main"}," "+s+" "),React.createElement("span",{className:"text-muted"},a.join(" ")))}}]),t}();ReactDOM.render(React.createElement(W,null),document.getElementById("app"))}]);