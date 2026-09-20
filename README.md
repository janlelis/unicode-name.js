# unicode-name.js [![[ci]](https://github.com/janlelis/unicode-name.js/workflows/Test/badge.svg)](https://github.com/janlelis/unicode-name.js/actions?query=workflow%3ATest)

Get the name of any Unicode character or Emoji in JavaScript! The purpose of this library is to return a useful name or label for any character/codepoint, even if it is special, unusual, or invalid. Also works with named characters constructed from multiple codepoints, like many Emoji characters.

Unicode version: **18.0.0** (September 2026)

## Install

Use npm or your favorite package manager to install this module:

```sh
npm install unicode-name
```

Or use the ESM module directly in your browser.

## Usage

### `unicodeName(char)`

Returns the best name of the character or known codepoint sequence:

```js
import { unicodeName } from "unicode-name";

// Return name of a character
unicodeName("A"); // "LATIN CAPITAL LETTER A"
unicodeName("🚡"); // "AERIAL TRAMWAY"
unicodeName("丁"); // "CJK UNIFIED IDEOGRAPH-4E01"
unicodeName("한"); // "HANGUL SYLLABLE HAN"

// Supports Unicode 18 (September 2026)
unicodeName("𝉷"); // "MUSICAL SYMBOL G CLEF OTTAVA BASSA WITH C CLEF"

// Supports Unicode 17 (September 2025)
unicodeName("𑶰"); // "TOLONG SIKI LETTER I"

// Can be used with integers representing codepoint values
unicodeName(48); // "DIGIT ZERO"
unicodeName(9450); // "CIRCLED DIGIT ZERO"

// Returns useful alias for control characters
unicodeName("\0"); // "NULL"
unicodeName("\t"); // "CHARACTER TABULATION"

// Applies Unicode's name corrections
unicodeName("Ƣ"); // "LATIN CAPITAL LETTER GHA", not "LATIN CAPITAL LETTER OI"

// Uses codepoint labels for special / unassigned areas of the codepoint spectrum
unicodeName("󿿿"); // "<noncharacter-FFFFF>"
unicodeName("𐱐"); // "<reserved-10C50>"
unicodeName("󿿽"); // "<private-use-FFFFD>"
unicodeName(String.fromCodePoint(55296)); // "<surrogate-D800>"

// Supports characters made from codepoint sequences
unicodeName("‼︎"); // "DOUBLE EXCLAMATION MARK (text style)"
unicodeName("㓟︀"); // "CJK COMPATIBILITY IDEOGRAPH-2F81F"
unicodeName("င︀"); // "MYANMAR LETTER NGA (dotted form)"
unicodeName("நி"); // "TAMIL SYLLABLE NI"
unicodeName("🇺🇳"); // "FLAG: UNITED NATIONS"
unicodeName("🏴󠁧󠁢󠁳󠁣󠁴󠁿"); // "SCOTLAND"
unicodeName("🧑‍🦱"); // "PERSON: CURLY HAIR"
unicodeName("👨‍🍼"); // "MAN FEEDING BABY"
unicodeName("❤️‍🔥"); // "HEART ON FIRE"
unicodeName("🫱🏻‍🫲🏾"); // "HANDSHAKE: LIGHT SKIN TONE, MEDIUM-DARK SKIN TONE"
unicodeName("🐦‍⬛"); // "BLACK BIRD"
unicodeName("🙂‍↔️"); // "HEAD SHAKING HORIZONTALLY"
unicodeName("‘︁"); // "LEFT SINGLE QUOTATION MARK (right-justified fullwidth form)"
```

Please note: Supports single characters the Unicode standard recognizes (which can be composed out of one ore more codpoints). The return value for string with more than one character is always `undefined`.

### `unicode […] Name(char)` Functions

Additional, more specfic name functions (e.g. getting aliases for a codepoint) are available too, see [DOCS](/docs/unicode-name.md) or [SPECS](/test/unicode-name.test.js) for more info.

## Also see

- https://character.construction/name/ - "Name That Character" implemented using this library
- https://github.com/janlelis/uniscribe/ - CLI utility that displays names of codepoints and more
- https://github.com/janlelis/unicoder/ - Creates the indexes this library is based on

## MIT License

- Copyright (c) 2024-2026 Jan Lelis <https://janlelis.com>. Released under the MIT license.
- Unicode data: https://www.unicode.org/copyright.html#Exhibit1
