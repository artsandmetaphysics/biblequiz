from parse_en_web import clean_verses

def test_clean_web_verses():
    verses = [
	{
		"type": "paragraph start"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 1,
		"sectionNumber": 1,
		"value": "First Verse"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 2,
		"sectionNumber": 1,
		"value": "Second Verse",
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 3,
		"sectionNumber": 1,
		"value": "Third Verse",
	},
	{
		"type": "paragraph end"
	},
    ]

    expected = [[
        '\tFirst Verse',
        'Second Verse',
        'Third Verse\n',
    ]]

    assert clean_verses(verses) == expected


def test_clean_web_verses_two_chapters():
    verses = [
	{
		"type": "paragraph start"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 1,
		"sectionNumber": 1,
		"value": "First Verse"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 2,
		"sectionNumber": 1,
		"value": "Second Verse",
	},
	{
		"type": "paragraph end"
	},
	{
		"type": "paragraph start"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 2,
		"verseNumber": 1,
		"sectionNumber": 1,
		"value": "Chapter Two",
	},
	{
		"type": "paragraph end"
	},
    ]

    expected = [[
        '\tFirst Verse',
        'Second Verse\n',
    ], [
        '\tChapter Two\n',
    ]]

    assert clean_verses(verses) == expected


def test_clean_web_verses_combine_sections():
    verses = [
	{
		"type": "paragraph start"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 1,
		"sectionNumber": 1,
		"value": "First Verse"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 2,
		"sectionNumber": 1,
		"value": "Second Verse",
	},
	{
		"type": "paragraph end"
	},
	{
		"type": "paragraph start"
	},
	{
		"type": "paragraph text",
		"chapterNumber": 1,
		"verseNumber": 2,
		"sectionNumber": 2,
		"value": "Second Verse Part Two",
	},
	{
		"type": "paragraph end"
	},
    ]

    expected = [[
        '\tFirst Verse',
        'Second Verse\n\tSecond Verse Part Two\n',
    ]]
