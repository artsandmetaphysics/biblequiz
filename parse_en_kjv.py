import simplejson as json
import sys
import re

BOOKS = [
    'Genesis',  # 0
    'Exodus',
    'Leviticus',
    'Numbers',
    'Deuteronomy',

    'Joshua',  # 5
    'Judges',
    'Ruth',
    '1 Samuel',
    '2 Samuel',
    '1 Kings',
    '2 Kings',
    '1 Chronicles',
    '2 Chronicles',
    'Ezra',
    'Nehemiah',
    'Esther',

    'Job', # 17
    'Psalms',
    'Proverbs',
    'Ecclesiastes',
    'Song of Solomon',

    'Isaiah',  # 22
    'Jeremiah',
    'Lamentations',
    'Ezekiel',
    'Daniel',
    'Hosea',
    'Joel',
    'Amos',
    'Obadiah',
    'Jonah',
    'Micah',
    'Nahum',
    'Habakkuk',
    'Zephaniah',
    'Haggai',
    'Zechariah',
    'Malachi',

    'Matthew', # 39
    'Mark',
    'Luke',
    'John',

    'Acts',  # 43
    'Romans',
    '1 Corinthians',
    '2 Corinthians',
    'Galatians',
    'Ephesians',
    'Philippians',
    'Colossians',
    '1 Thessalonians',
    '2 Thessalonians',
    '1 Timothy',
    '2 Timothy',
    'Titus',
    'Philemon',
    'Hebrews',
    'James',
    '1 Peter',
    '2 Peter',
    '1 John',
    '2 John',
    '3 John',
    'Jude',
    'Revelation', # 65
]

def clean_verse(verse):
    verse = re.sub(r'\{([^\{\}]*:[^\{\}]*)\}\ ', r'', verse)
    verse = re.sub(r'\{([^\{\}]*:[^\{\}]*)\}', r'', verse)
    verse = re.sub(r'\ \{([^\{\}]*:[^\{\}]*)\}$', r'', verse)
    verse = re.sub(r'\{(.*)\}', r'\1', verse)
    verse = re.sub(r'\{', r'', verse)
    verse = re.sub(r'\}', r'', verse)
    return verse.strip()


if __name__ == "__main__":
    print('loading from ' + sys.argv[1])
    with open(sys.argv[1], 'r') as f:
        data = f.readline()
        bible = json.loads(data)

    BOOK_META = []
    BIBLE = []
    for label, book in zip(BOOKS, bible['bible']):
        BOOK_META.append({
            'label': label,
            'chapters': [len(c) for c in book['chapters']],
        })
        BIBLE.append([[clean_verse(v) for v in c] for c in book['chapters']])
    with open('./dist/bible.js', 'w') as f:
        f.write('var BIBLE = ');
        f.write(json.dumps(BIBLE))
    # with open('./dist/book_meta.json', 'w') as f:
        # json.dump(BOOK_META, f, indent=2)
