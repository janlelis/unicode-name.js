## Functions

<dl>
<dt><a href="#hangulDecomposition">hangulDecomposition()</a></dt>
<dd><p>Generate name of Hangul syllables, see
<a href="https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_syllables_block">https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_syllables_block</a></p>
</dd>
<dt><a href="#codepointHex">codepointHex()</a></dt>
<dd><p>Returns number in hexadecimal with at least four digits</p>
</dd>
<dt><a href="#unicodeBaseName">unicodeBaseName(Single)</a> ⇒</dt>
<dd><p>Returns the name that has been assigned to a Unicode codepoint.</p>
<p>Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)</p>
<p>Also see:</p>
<ul>
<li>unicodeCorrectName(char) - Checks if there is a corrected name first, if not,
                       fallbacks to this method</li>
<li>unicodeReadableName(char) - Displays correct name or an applicable alias</li>
</ul>
</dd>
<dt><a href="#unicodeCorrectName">unicodeCorrectName(Single)</a> ⇒</dt>
<dd><p>Returns the name that has been assigned to a Unicode codepoint, but if the codepoint
has a correction alias, use this instead.</p>
<p>Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)</p>
<p>Also see:</p>
<ul>
<li>unicodeReadableName(char) - Displays correct name or an applicable alias</li>
</ul>
</dd>
<dt><a href="#unicodeAliases">unicodeAliases(Single)</a> ⇒</dt>
<dd><p>Returns the aliases that have been assigned to a Unicode codepoint.</p>
<p>Aliases can be of these categories (multiple aliases possible):</p>
<ul>
<li>correction</li>
<li>control</li>
<li>figment</li>
<li>alternate</li>
<li>abbreviation</li>
</ul>
</dd>
<dt><a href="#unicodeType">unicodeType()</a></dt>
<dd><p>Determine the basic type of codepoints. Required to be able to get the
Unicode label of a codepoint. This can be one of:</p>
<ul>
<li>Graphic</li>
<li>Format</li>
<li>Control</li>
<li>Private-use</li>
<li>Surrogate</li>
<li>Noncharacter</li>
<li>Reserved</li>
</ul>
</dd>
<dt><a href="#unicodeLabel">unicodeLabel(Single)</a> ⇒</dt>
<dd><p>Returns a label of a codepoint in the following format:
<type-hex>, e.g. <control-0009> for the tab character or
<noncharacter-FFFFF> for U+FFFFF</p>
<p>It is only assigned to codepoints of a type other than
&quot;Graphic&quot; or &quot;Format&quot;</p>
</dd>
<dt><a href="#unicodeReadableName">unicodeReadableName(Single)</a> ⇒</dt>
<dd><p>Returns the best readable representation of a codepoint.</p>
<ol>
<li>It is the corrected name of a the codepoint (if one exists)</li>
<li>or it is an appropriate aliase (if one exists)</li>
<li>or it is the codepoint label</li>
</ol>
</dd>
<dt><a href="#unicodeSequenceName">unicodeSequenceName()</a></dt>
<dd><p>Returns the name of a character that is made of a codepoint sequence (= more than
one codepoint involved), if one exists.</p>
</dd>
<dt><a href="#unicodeName">unicodeName()</a></dt>
<dd><p>Returns the best name for the Unicode character (codepoint or codepoint sequence).</p>
<p>At first, it will check if the codepoint sequence has a name, e.g. for
Emoji that are build up using multiple codepoints using unicodeSequenceName(char)</p>
<p>If none is found, will use the unicodeReadableName(char) function to retrieve
the best name for that codepoint.</p>
</dd>
</dl>

<a name="hangulDecomposition"></a>

## hangulDecomposition()
Generate name of Hangul syllables, see
https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_syllables_block

**Kind**: global function  
<a name="codepointHex"></a>

## codepointHex()
Returns number in hexadecimal with at least four digits

**Kind**: global function  
<a name="unicodeBaseName"></a>

## unicodeBaseName(Single) ⇒
Returns the name that has been assigned to a Unicode codepoint.

Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)

Also see:
- unicodeCorrectName(char) - Checks if there is a corrected name first, if not,
                             fallbacks to this method
- unicodeReadableName(char) - Displays correct name or an applicable alias

**Kind**: global function  
**Returns**: Name of character or undefined  

| Param | Description |
| --- | --- |
| Single | character string |

<a name="unicodeCorrectName"></a>

## unicodeCorrectName(Single) ⇒
Returns the name that has been assigned to a Unicode codepoint, but if the codepoint
has a correction alias, use this instead.

Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)

Also see:
- unicodeReadableName(char) - Displays correct name or an applicable alias

**Kind**: global function  
**Returns**: Corrected name of character or undefined  

| Param | Description |
| --- | --- |
| Single | character string |

<a name="unicodeAliases"></a>

## unicodeAliases(Single) ⇒
Returns the aliases that have been assigned to a Unicode codepoint.

Aliases can be of these categories (multiple aliases possible):

- correction
- control
- figment
- alternate
- abbreviation

**Kind**: global function  
**Returns**: Object containing aliases for this Unicode codepoint  

| Param | Description |
| --- | --- |
| Single | character string |

<a name="unicodeType"></a>

## unicodeType()
Determine the basic type of codepoints. Required to be able to get the
Unicode label of a codepoint. This can be one of:

- Graphic
- Format
- Control
- Private-use
- Surrogate
- Noncharacter
- Reserved

**Kind**: global function  
<a name="unicodeLabel"></a>

## unicodeLabel(Single) ⇒
Returns a label of a codepoint in the following format:
<type-hex>, e.g. <control-0009> for the tab character or
<noncharacter-FFFFF> for U+FFFFF

It is only assigned to codepoints of a type other than
"Graphic" or "Format"

**Kind**: global function  
**Returns**: A generic label for this codepoint  

| Param | Description |
| --- | --- |
| Single | character string |

<a name="unicodeReadableName"></a>

## unicodeReadableName(Single) ⇒
Returns the best readable representation of a codepoint.

1) It is the corrected name of a the codepoint (if one exists)
2) or it is an appropriate aliase (if one exists)
3) or it is the codepoint label

**Kind**: global function  
**Returns**: Unicode name, alias, or label for this character  

| Param | Description |
| --- | --- |
| Single | character string |

<a name="unicodeSequenceName"></a>

## unicodeSequenceName()
Returns the name of a character that is made of a codepoint sequence (= more than
one codepoint involved), if one exists.

**Kind**: global function  
<a name="unicodeName"></a>

## unicodeName()
Returns the best name for the Unicode character (codepoint or codepoint sequence).

At first, it will check if the codepoint sequence has a name, e.g. for
Emoji that are build up using multiple codepoints using unicodeSequenceName(char)

If none is found, will use the unicodeReadableName(char) function to retrieve
the best name for that codepoint.

**Kind**: global function  
