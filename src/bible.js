export function getRandomVerse(books, historicalQAs) {
    const chaptersPerBook = books.map(getChaptersPerBook);
    const bookIndex = books[getRandomIntWeighted(chaptersPerBook)];
    const chapters = BOOK_META[bookIndex].chapters;
    const chapterIndex = getRandomInt(chapters.length);
    const numVerses = chapters[chapterIndex];
    const verseIndex = getRandomInt(numVerses)
    const verse = [bookIndex, chapterIndex, verseIndex];

    // Luke 17.36, Acts 8.37, 15.34, and 24.7 are not included in WEB bibles
    if (bookIndex === 41 && chapterIndex === (17 - 1) && verseIndex === (36 - 1)) {
        return getRandomVerse(books, historicalQAs)
    } else if (bookIndex === 43 && chapterIndex === (8 - 1) && verseIndex === (37 - 1)) {
        return getRandomVerse(books, historicalQAs)
    } else if (bookIndex === 43 && chapterIndex === (15 - 1) && verseIndex === (34 - 1)) {
        return getRandomVerse(books, historicalQAs)
    } else if (bookIndex === 43 && chapterIndex === (24 - 1) && verseIndex === (7 - 1)) {
        return getRandomVerse(books, historicalQAs)
    } else {
        return verse;
    }
}

export function getChaptersPerBook(book) {
    return BOOK_META[book].chapters.length;
}

export function getVersesPerChapter(book, chapter) {
    return BOOK_META[book].chapters[chapter];
}

export function verseToLabel(verseArray) {
    let [bookIndex, chapterIndex, verseIndex] = verseArray;
    if (verseIndex !== undefined) {
        return bookLabel(bookIndex) + ' ' + (chapterIndex + 1) + '.' + (verseIndex + 1);
    } else if (chapterIndex !== undefined) {
        return bookLabel(bookIndex) + ' ' + (chapterIndex + 1);
    } else {
        return bookLabel(bookIndex);
    }
}

export function bookLabel(book) {
    return BOOK_META[book].label;
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

export function getVerseText(verse, showNumbers) {
    const [bookIndex, chapterIndex, verseIndex] = verse;
    let verseText = BIBLE[bookIndex][chapterIndex][verseIndex];
    if (showNumbers) {
        verseText = insertVerseNum(verseText, verseIndex + 1)
    }
    if (verseText === undefined) {
        throw new Error('invalid verse ' + verse);
    } else if (showNumbers && verseIndex === 0) {
        const chapterNum = chapterIndex + 1
        if (verseText[0] === '\n') {
            return `\n\nCHAPTER ${chapterNum}\n${verseText}`
        } else {
            return `\n\nCHAPTER ${chapterNum}\n\n${verseText}`
        }
    } else {
        return verseText
    }
}

export function superscript (stringWithNumerals) {
  return stringWithNumerals.replace(/[0-9]/gi, c => {
    return {
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
      '0': '⁰',
    }[c];
  });
};

export function insertVerseNum(verseText, num) {
    const numSuperscript = superscript(String(num))
    if (verseText === '') {
        return ''
    } else if (verseText[0] === '\t') {
        return `\t${numSuperscript}\u00A0${verseText.substring(1)}`
    } else {
        return `${numSuperscript}\u00A0${verseText}`
    }
}

export function getPrevVerse(verse) {
    const [bookIndex, chapterIndex, verseIndex] = verse;
    if (chapterIndex === 0 && verseIndex === 0) {
        // don't cross book boundaries
        return null;
    } else if (verseIndex === 0) {
        const newChapterIndex = chapterIndex - 1;
        const newVerseIndex = getVersesPerChapter(bookIndex, newChapterIndex) - 1;
        return [bookIndex, newChapterIndex, newVerseIndex];
    } else {
        return [bookIndex, chapterIndex, verseIndex - 1];
    }
}

export function getNextVerse(verse) {
    const [bookIndex, chapterIndex, verseIndex] = verse;
    const lastVerse = (verseIndex + 1) === getVersesPerChapter(bookIndex, chapterIndex);
    const lastChapter = (chapterIndex + 1) === getChaptersPerBook(bookIndex);
    if (lastChapter && lastVerse) {
        return null
    } else if (lastVerse) {
        return [bookIndex, chapterIndex + 1, 0];
    } else {
        return [bookIndex, chapterIndex, verseIndex + 1];
    }
}
