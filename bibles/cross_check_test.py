import os

from parse_en_web import parse_web_bible
from parse_en_kjv import parse_kjv_bible
from utils import BOOKS


def _flatten_to_counts(bible):
    return [[len(c) for c in book] for book in bible]


def test_cross_check_kjv_web_verse_counts():
    here = os.path.dirname(os.path.abspath(__file__))
    web_bible = parse_web_bible(os.path.join(here, './web'))
    kjv_bible = parse_kjv_bible(os.path.join(here, './en_kjv.json'))
    web_counts = _flatten_to_counts(web_bible)
    kjv_counts = _flatten_to_counts(kjv_bible)

    # the KJV have some incorrect verse counts; we are using the WEB version
    # moving forward, so these were just manually adjusted here to make the
    # test pass and to keep a record of the discrepancies
    kjv_counts[BOOKS.index('Judges')][5 - 1] -= 1

    kjv_counts[BOOKS.index('1 Samuel')][20 - 1] -= 1

    # My Jewish Study Bible also has 54 verses instead of 53 here
    kjv_counts[BOOKS.index('1 Kings')][22 - 1] -= 1

    kjv_counts[BOOKS.index('Matthew')][2 - 1] += 1
    kjv_counts[BOOKS.index('Matthew')][22 - 1] += 1
    kjv_counts[BOOKS.index('Matthew')][26 - 1] += 1

    kjv_counts[BOOKS.index('Mark')][4 - 1] += 1
    kjv_counts[BOOKS.index('Mark')][7 - 1] += 1
    kjv_counts[BOOKS.index('Mark')][8 - 1] += 1

    # There are a few different ways that translations handle the final verses
    # of Romans; the KJV and WEB handle this differently, so we make them align
    # for the test
    kjv_counts[BOOKS.index('Romans')][14 - 1] += 3
    kjv_counts[BOOKS.index('Romans')][16 - 1] -= 3

    # The KJV and WEB differ here
    kjv_counts[BOOKS.index('3 John')][1 - 1] -= 1

    # The KJV and WEB differ here
    kjv_counts[BOOKS.index('Revelation')][12 - 1] -= 1

    for web, kjv, book_name in zip(web_counts, kjv_counts, BOOKS):
        print(book_name)
        assert len(web) == len(kjv)
        assert web == kjv
