import simplejson as json
import sys
import re

from utils import BOOKS, clean_verse, save_bible_dist


def parse_kjv_bible(filepath):
    print('loading from ' + filepath)
    with open(filepath, 'r') as f:
        data = f.readline()
        bible = json.loads(data)

    parsed_bible = []
    for book in bible['bible']:
        parsed_bible.append([[clean_verse(v) for v in c] for c in book['chapters']])
    return parsed_bible


if __name__ == "__main__":
    filepath = sys.argv[1]
    outpath = sys.argv[2]
    kjv_bible = parse_kjv_bible(filepath)
    save_bible_dist(outpath, kjv_bible)
