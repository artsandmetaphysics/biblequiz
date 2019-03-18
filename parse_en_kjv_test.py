from parse_en_kjv import clean_verse

def test_clean_verse():
    input_verse = "Gilead {is} a city of them that work iniquity, {and is} polluted with blood. {polluted: or, cunning for}"
    expected_out = "Gilead is a city of them that work iniquity, and is polluted with blood."
    assert clean_verse(input_verse) == expected_out
