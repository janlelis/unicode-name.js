import UNICODE_DATA_TYPE from "./type.js";
import UNICODE_DATA_NAME from "./name.js";
import UNICODE_DATA_SEQUENCE_NAME from "./sequence_name.js";

const { TYPES, TYPE_NAMES, OFFSETS } = UNICODE_DATA_TYPE;
const { NAMES, ALIASES, CJK, JAMO } = UNICODE_DATA_NAME;
const { SEQUENCES, SEQUENCES_NOT_QUALIFIED } = UNICODE_DATA_SEQUENCE_NAME;

const HANGUL_START = 44032;
const HANGUL_END = 55203;
const HANGUL_MEDIAL_MAX = 588;
const HANGUL_FINAL_MAX = 28;

/**
 * Generate name of Hangul syllables, see
 * https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_syllables_block
 * @private
 */
function hangulDecomposition(codepoint) {
  const base = codepoint - HANGUL_START;
  const final = base % HANGUL_FINAL_MAX;
  const medial = Math.floor((base % HANGUL_MEDIAL_MAX) / HANGUL_FINAL_MAX);
  const initial = Math.floor(base / HANGUL_MEDIAL_MAX);

  return `${JAMO.INITIAL[initial]}${JAMO.MEDIAL[medial]}${JAMO.FINAL[final]}`;
}

/**
 * Returns number in hexadecimal with at least four digits
 * @private
 */
function codepointHex(n) {
  return n.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Use codepoints instead of characters if preferred
 * @private
 */
function codepointToChar(codepoinOrNot) {
  if (Number.isInteger(codepoinOrNot)) {
    return String.fromCodePoint(codepoinOrNot);
  } else {
    return codepoinOrNot;
  }
}

/**
 * Returns the name that has been assigned to a Unicode codepoint.
 *
 * Please note:
 * Some common codepoints do not have a name (e.g. C0 control characters like \n)
 *
 * Also see:
 * - unicodeCorrectName(char) - Checks if there is a corrected name first, if not,
 *                              fallbacks to this method
 * - unicodeReadableName(char) - Displays correct name or an applicable alias
 *
 * @param char Single character string or codepoint
 * @returns Name of character or undefined
 */
export function unicodeBaseName(char) {
  char = codepointToChar(char);

  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  }

  const res = NAMES[char];

  if (res) {
    return res;
  }

  if ([...char][1]) {
    return undefined;
  }

  const codepoint = char.codePointAt(0);

  if (
    CJK.some(
      (cjk_range) => codepoint >= cjk_range[0] && codepoint <= cjk_range[1]
    )
  ) {
    return `CJK UNIFIED IDEOGRAPH-${codepointHex(codepoint)}`;
  }

  if (codepoint >= HANGUL_START && codepoint <= HANGUL_END) {
    return `HANGUL SYLLABLE ${hangulDecomposition(codepoint)}`;
  }

  return undefined;
}

/**
 * Returns the name that has been assigned to a Unicode codepoint, but if the codepoint
 * has a correction alias, use this instead.
 *
 * Please note:
 * Some common codepoints do not have a name (e.g. C0 control characters like \n)
 *
 * Also see:
 * - unicodeReadableName(char) - Displays correct name or an applicable alias
 *
 * @param char Single character string or codepoint
 * @returns Corrected name of character or undefined
 */
export function unicodeCorrectName(char) {
  char = codepointToChar(char);

  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  }

  const allCorrections = ALIASES[char]?.correction;
  const correction =
    allCorrections && allCorrections[allCorrections.length - 1];
  if (correction) {
    return correction;
  }

  return unicodeBaseName(char);
}

/**
 * Returns the aliases that have been assigned to a Unicode codepoint.
 *
 * Aliases can be of these categories (multiple aliases possible):
 *
 * - correction
 * - control
 * - figment
 * - alternate
 * - abbreviation
 *
 * @param char Single character string or codepoint
 * @returns Object containing aliases for this Unicode codepoint
 */
export function unicodeAliases(char) {
  char = codepointToChar(char);

  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  }

  return ALIASES[char];
}

/**
 * Determine the basic type of codepoints. Required to be able to get the
 * Unicode label of a codepoint. This can be one of:
 *
 * - Graphic
 * - Format
 * - Control
 * - Private-use
 * - Surrogate
 * - Noncharacter
 * - Reserved
 *
 * @param char Single character string or codepoint
 * @returns Codepoint type
 */
export function unicodeType(char) {
  char = codepointToChar(char);

  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  }

  let codepoint_depth_offset = char.codePointAt(0);
  let index_or_value = TYPES;
  for (const depth of OFFSETS) {
    index_or_value = index_or_value[Math.floor(codepoint_depth_offset / depth)];
    codepoint_depth_offset = codepoint_depth_offset % depth;
    if (!Array.isArray(index_or_value)) {
      return TYPE_NAMES[index_or_value || 0];
    }
  }
  return TYPE_NAMES[index_or_value[codepoint_depth_offset] || 0];
}

/**
 * Returns a label of a codepoint in the following format:
 * <type-hex>, e.g. <control-0009> for the tab character or
 * <noncharacter-FFFFF> for U+FFFFF
 *
 * It is only assigned to codepoints of a type other than
 * "Graphic" or "Format"
 *
 * @param char Single character string or codepoint
 * @returns A generic label for this codepoint
 */
export function unicodeLabel(char) {
  char = codepointToChar(char);

  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  } else if ([...char][1]) {
    return undefined;
  }

  const charType = unicodeType(char);
  if (charType === "Graphic" || charType === "Format") {
    return undefined;
  }

  return `<${charType.toLowerCase()}-${codepointHex(char.codePointAt(0))}>`;
}

/**
 * Returns the best readable representation of a codepoint.
 *
 * 1) It is the corrected name of a the codepoint (if one exists)
 * 2) or it is an appropriate aliase (if one exists)
 * 3) or it is the codepoint label
 *
 * @param char Single character string or codepoint
 * @returns Unicode name, alias, or label for this character
 */
export function unicodeReadableName(char) {
  const correctName = unicodeCorrectName(char);
  if (correctName) {
    return correctName;
  }

  const aliases = unicodeAliases(char);
  if (aliases) {
    return (
      (aliases.control && aliases.control[0]) ||
      (aliases.figment && aliases.figment[0]) ||
      (aliases.alternate && aliases.alternate[0]) ||
      (aliases.abbreviation && aliases.abbreviation[0])
    );
  }

  return unicodeLabel(char);
}

/**
 * Returns the name of a character that is made of a codepoint sequence (= more than
 * one codepoint involved), if one exists.
 *
 * @param char Single character string made of multiple codepoints
 * @returns Unicode sequence name
 */
export function unicodeSequenceName(char) {
  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  }

  return SEQUENCES[char] || SEQUENCES_NOT_QUALIFIED[char];
}

/**
 * Returns the name of a character that is made of a codepoint sequence (= more than
 * one codepoint involved), if one exists.
 *
 * Differently from unicodeSequenceName(char), it will only consider Emoji ZWJ sequences
 * that are fully qualified, meaning they all required variation selectors (VS16) in place
 *
 * @param char Single character string made of multiple codepoints
 * @returns Unicode sequence name
 */
export function unicodeQualifiedSequenceName(char) {
  if ((typeof char !== "string" && !(char instanceof String)) || char === "") {
    return undefined;
  }

  return SEQUENCES[char];
}

/**
 * Returns the best name for the Unicode character (codepoint or codepoint sequence).
 *
 * At first, it will check if the codepoint sequence has a name, e.g. for
 * Emoji that are build up using multiple codepoints using unicodeSequenceName(char)
 *
 * If none is found, will use the unicodeReadableName(char) function to retrieve
 * the best name for that codepoint.
 *
 * @param char Single character string or codepoint
 * @returns Name of character
 */
export function unicodeName(char) {
  return unicodeSequenceName(char) || unicodeReadableName(char);
}
