import simplejson as json
import sys
import os

from utils import BOOKS, clean_verse, save_bible_dist


def clean_verses(verses, current_book=None):
    '''
    Clean verses in a particular book of the bible, taken from:

    https://github.com/TehShrike/world-english-bible
    '''
    clean_verses = []
    current_chapter = None
    current_verse = None
    paragraph_start = False
    for item in verses:
        if item['type'] in ['paragraph end', 'line break', 'stanza end']:
            clean_verses[-1][-1] += '\n'
        elif item['type'] == 'paragraph start':
            paragraph_start = True
        elif item['type'] in ['paragraph text', 'line text']:
            verse_text = item['value'].strip()

            # there are a number of empty verses, which appear to be caused by
            # a bug in the parsing algorithm; there are also a few verses in
            # the new testament that are actually empty
            if current_book == 'Luke' and current_chapter == 17 and item['verseNumber'] == 36:
                pass
            elif current_book == 'Acts' and current_chapter == 8 and item['verseNumber'] == 37:
                pass
            elif current_book == 'Acts' and current_chapter == 15 and item['verseNumber'] == 34:
                pass
            elif current_book == 'Acts' and current_chapter == 24 and item['verseNumber'] == 7:
                pass
            elif verse_text == '':
                continue

            if item['chapterNumber'] != current_chapter:
                current_chapter = item['chapterNumber']
                current_verse = None
                clean_verses.append([])

            if item['verseNumber'] != current_verse:
                current_verse = item['verseNumber']
                clean_verses[-1].append('')

            if item['sectionNumber'] > 1 and not clean_verses[-1][-1].endswith('\n'):
                clean_verses[-1][-1] += ' '

            if paragraph_start:
                clean_verses[-1][-1] += '\t'
                paragraph_start = False

            clean_verses[-1][-1] += verse_text

            # if current_book == 'Luke' and current_chapter == 17 and current_verse == 37:
                # for i, ii in enumerate(clean_verses[-1]):
                    # print(str(i + 1) + ' ' + ii, end='')
    return clean_verses


def parse_web_bible(base_dir):
    print('loading from ' + base_dir)
    bible = []
    for current_book in BOOKS:
        book_filename = current_book.replace(' ', '').lower() + '.json'
        book_path = os.path.join(base_dir, book_filename)
        with open(book_path, 'r') as f:
            book = json.load(f)
        bible.append(clean_verses(book, current_book))
    return bible


if __name__ == "__main__":
    base_dir = sys.argv[1]
    outpath = sys.argv[2]
    web_bible = parse_web_bible(base_dir)
    save_bible_dist(outpath, web_bible)
