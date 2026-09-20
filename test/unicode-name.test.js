import { describe, it, expect } from "vitest";
import {
  unicodeBaseName,
  unicodeCorrectName,
  unicodeAliases,
  unicodeType,
  unicodeLabel,
  unicodeReadableName,
  unicodeSequenceName,
  unicodeQualifiedSequenceName,
} from "../src/index.js";

describe("unicodeBaseName(char)", () => {
  it("will return name for that character", () => {
    expect(unicodeBaseName("A")).toBe("LATIN CAPITAL LETTER A");
    expect(unicodeBaseName("🚡")).toBe("AERIAL TRAMWAY");
    expect(unicodeBaseName("�")).toBe("REPLACEMENT CHARACTER");
    expect(unicodeBaseName("𞟣")).toBe("ETHIOPIC SYLLABLE HHYAA");
    expect(unicodeBaseName("𝋀")).toBe("KAKTOVIK NUMERAL ZERO"); // Unicode 15.0
    expect(unicodeBaseName("🝁")).toBe("ALCHEMICAL SYMBOL FOR QUICK LIME"); // Unicode 15.1
    expect(unicodeBaseName("𜱼")).toBe("SQUARE SPIRAL FROM TOP LEFT"); // Unicode 16.0
    expect(unicodeBaseName("𑶰")).toBe("TOLONG SIKI LETTER I"); // Unicode 17.0
    expect(unicodeBaseName("𝉷")).toBe("MUSICAL SYMBOL G CLEF OTTAVA BASSA WITH C CLEF"); // Unicode 18.0
  });

  it("works with CJK unified ideographs", () => {
    expect(unicodeBaseName("丁")).toBe("CJK UNIFIED IDEOGRAPH-4E01");
    expect(unicodeBaseName("🈶")).toBe("SQUARED CJK UNIFIED IDEOGRAPH-6709");
  });

  it("works with Hangul syllables", () => {
    expect(unicodeBaseName("한")).toBe("HANGUL SYLLABLE HAN");
    expect(unicodeBaseName("각")).toBe("HANGUL SYLLABLE GAG");
    expect(unicodeBaseName("개")).toBe("HANGUL SYLLABLE GAE");
    expect(unicodeBaseName("갱")).toBe("HANGUL SYLLABLE GAENG");
    expect(unicodeBaseName("돫")).toBe("HANGUL SYLLABLE DWALB");
  });

  it("works with some ranges that have the codepoint embedded", () => {
    expect(unicodeBaseName("𔏵")).toBe("EGYPTIAN HIEROGLYPH-143F5");
    expect(unicodeBaseName("𘰒")).toBe("KHITAN SMALL SCRIPT CHARACTER-18C12");
    expect(unicodeBaseName("𘴀")).toBe("TANGUT IDEOGRAPH-18D00");
    expect(unicodeBaseName("𛅱")).toBe("NUSHU CHARACTER-1B171");
    expect(unicodeBaseName("𧃒")).toBe("CJK COMPATIBILITY IDEOGRAPH-2F9B1");
    expect(unicodeBaseName("兩")).toBe("CJK COMPATIBILITY IDEOGRAPH-F978");
  });

  it("will return undefined for characters without name", () => {
    expect(unicodeBaseName(String.fromCodePoint(68688))).toBe(undefined);
    expect(unicodeBaseName("\0")).toBe(undefined);
  });
});

describe("unicodeCorrectName(char)", () => {
  it("usually just returns name", () => {
    expect(unicodeCorrectName("A")).toBe("LATIN CAPITAL LETTER A");
  });

  it("will return corrected name, if one exists", () => {
    expect(unicodeCorrectName("Ƣ")).toBe("LATIN CAPITAL LETTER GHA");
  });

  it("returns nothing if no name or correction alias exists", () => {
    expect(unicodeCorrectName("\0")).toBe(undefined);
  });
});

describe("unicodeAliases(char)", () => {
  it("will return undefined if no alias available", () => {
    expect(unicodeAliases("A")).toBe(undefined);
  });

  it("will return object if character has aliases", () => {
    expect(unicodeAliases("\0")).toBeTypeOf("object");
  });

  it("will return aliases grouped by type", () => {
    expect(unicodeAliases("\0").control).toEqual(["NULL"]);
    expect(unicodeAliases("\0").abbreviation).toEqual(["NUL"]);
  });
});

describe("unicodeType(char)", () => {
  it("will return type for that character", () => {
    expect(unicodeType("­")).toBe("Format");
  });

  it("will return Noncharacter for codepoints defined as noncharacter", () => {
    expect(unicodeType("􏿿")).toBe("Noncharacter");
  });

  it("will return Reserved for unassigned codepoints", () => {
    expect(unicodeType("𐱐")).toBe("Reserved");
    expect(unicodeType("󀎦")).toBe("Reserved");
  });

  it("will work with surrogate (which are invalid codepoints)", () => {
    expect(unicodeType(String.fromCodePoint(55296))).toBe("Surrogate");
  });
});

describe("unicodeLabel(char)", () => {
  it("will return undefined for usual (graphic) characters", () => {
    expect(unicodeLabel("A")).toBe(undefined);
  });

  it("will return undefined for multiple codepoints", () => {
    expect(unicodeLabel("\0\0")).toBe(undefined);
  });

  it("will return <control-hhhh> for control characters", () => {
    expect(unicodeLabel("\0")).toBe("<control-0000>");
  });

  it("will return <private-use> for private use characters", () => {
    expect(unicodeLabel("󿿽")).toBe("<private-use-FFFFD>");
  });

  it("will return <surrogate-hhhh> for codepoints in surrogate area", () => {
    expect(unicodeLabel(String.fromCodePoint(55296))).toBe("<surrogate-D800>");
  });

  it("will return <noncharacter-hhhh> for codepoints defined as noncharacter", () => {
    expect(unicodeLabel("󿿿")).toBe("<noncharacter-FFFFF>");
  });

  it("will return <reserved-hhhh> for unassigned codepoints", () => {
    expect(unicodeLabel("𐱐")).toBe("<reserved-10C50>");
  });
});

describe("unicodeReadableName(char)", () => {
  it("will return the best readable representation of a codepoint", () => {
    expect(unicodeReadableName("A")).toBe("LATIN CAPITAL LETTER A");
    expect(unicodeReadableName("\0")).toBe("NULL");
    expect(unicodeReadableName("󿿿")).toBe("<noncharacter-FFFFF>");
    expect(unicodeReadableName("𐱐")).toBe("<reserved-10C50>");
    expect(unicodeReadableName("󿿽")).toBe("<private-use-FFFFD>");
  });
});

describe("unicodeSequenceName(char)", () => {
  it("will return name for that sequence", () => {
    expect(unicodeSequenceName("‼︎")).toBe(
      "DOUBLE EXCLAMATION MARK (text style)"
    );
    expect(unicodeSequenceName("㓟︀")).toBe(
      "CJK COMPATIBILITY IDEOGRAPH-2F81F"
    );
    expect(unicodeSequenceName("င︀")).toBe("MYANMAR LETTER NGA (dotted form)");
    expect(unicodeSequenceName("நி")).toBe("TAMIL SYLLABLE NI");
    expect(unicodeSequenceName("🇺🇳")).toBe("FLAG: UNITED NATIONS");
    expect(unicodeSequenceName("🏴󠁧󠁢󠁳󠁣󠁴󠁿")).toBe("FLAG: SCOTLAND");
    expect(unicodeSequenceName("🇦🇽")).toBe("FLAG: ÅLAND ISLANDS");
    expect(unicodeSequenceName("🧑‍🦱")).toBe("PERSON: CURLY HAIR"); // Emoji 12.1
    expect(unicodeSequenceName("👨‍🍼")).toBe("MAN FEEDING BABY"); // Emoji 13.0
    expect(unicodeSequenceName("❤️‍🔥")).toBe("HEART ON FIRE"); // Emoji 13.1
    expect(unicodeSequenceName("🫱🏻‍🫲🏾")).toBe(
      "HANDSHAKE: LIGHT SKIN TONE, MEDIUM-DARK SKIN TONE"
    ); // Emoji 14.0
    expect(unicodeSequenceName("🐦‍⬛")).toBe("BLACK BIRD"); // Emoji 15.0
    expect(unicodeSequenceName("🙂‍↔️")).toBe("HEAD SHAKING HORIZONTALLY"); // Emoji 15.1
    expect(unicodeSequenceName("‘︁")).toBe(
      "LEFT SINGLE QUOTATION MARK (right-justified fullwidth form)"
    ); // Unicode 16.0
  });

  it("will return name for that sequence (not fully qualified: VS16 missing)", () => {
    expect(unicodeSequenceName("👩🏿‍❤‍👩🏽")).toBe(
      "COUPLE WITH HEART: WOMAN, WOMAN, DARK SKIN TONE, MEDIUM SKIN TONE"
    );
    expect(unicodeSequenceName("👨‍⚖")).toBe("MAN JUDGE");
    expect(unicodeSequenceName("⛹‍♀️")).toBe("WOMAN BOUNCING BALL"); // First VS16 missing
    expect(unicodeSequenceName("⛹️‍♀")).toBe("WOMAN BOUNCING BALL"); // Second VS16 missing
  });

  it("will return undefined for characters without name", () => {
    expect(unicodeSequenceName("ai")).toBe(undefined);
    expect(unicodeSequenceName("𐱐")).toBe(undefined);
  });

  it("will return undefined for single codepoints", () => {
    expect(unicodeSequenceName("⏳")).toBe(undefined);
  });
});

describe("unicodeQualifiedSequenceName(char)", () => {
  it("will return name for that sequence, like unicodeSequenceName(char)", () => {
    expect(unicodeQualifiedSequenceName("‼︎")).toBe(
      "DOUBLE EXCLAMATION MARK (text style)"
    );
    expect(unicodeQualifiedSequenceName("㓟︀")).toBe(
      "CJK COMPATIBILITY IDEOGRAPH-2F81F"
    );
    expect(unicodeQualifiedSequenceName("င︀")).toBe(
      "MYANMAR LETTER NGA (dotted form)"
    );
  });

  it("will *not* return name for that sequence (not fully qualified: VS16 missing)", () => {
    expect(unicodeQualifiedSequenceName("👩🏿‍❤‍👩🏽")).toBe(undefined);
    expect(unicodeQualifiedSequenceName("👨‍⚖")).toBe(undefined);
    expect(unicodeQualifiedSequenceName("⛹‍♀️")).toBe(undefined); // First VS16 missing
    expect(unicodeQualifiedSequenceName("⛹️‍♀")).toBe(undefined); // Second VS16 missing
  });
});
