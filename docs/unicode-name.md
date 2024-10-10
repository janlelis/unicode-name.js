## Functions

<dl>
<dt><a href="#unicodeBaseName">unicodeBaseName(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
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
<dt><a href="#unicodeCorrectName">unicodeCorrectName(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Returns the name that has been assigned to a Unicode codepoint, but if the codepoint
has a correction alias, use this instead.</p>
<p>Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)</p>
<p>Also see:</p>
<ul>
<li>unicodeReadableName(char) - Displays correct name or an applicable alias</li>
</ul>
</dd>
<dt><a href="#unicodeAliases">unicodeAliases(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
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
<dt><a href="#unicodeType">unicodeType(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
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
<dt><a href="#unicodeLabel">unicodeLabel(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Returns a label of a codepoint in the following format:
<type-hex>, e.g. <control-0009> for the tab character or
<noncharacter-FFFFF> for U+FFFFF</p>
<p>It is only assigned to codepoints of a type other than
&quot;Graphic&quot; or &quot;Format&quot;</p>
</dd>
<dt><a href="#unicodeReadableName">unicodeReadableName(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Returns the best readable representation of a codepoint.</p>
<ol>
<li>It is the corrected name of a the codepoint (if one exists)</li>
<li>or it is an appropriate aliase (if one exists)</li>
<li>or it is the codepoint label</li>
</ol>
</dd>
<dt><a href="#unicodeSequenceName">unicodeSequenceName(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Returns the name of a character that is made of a codepoint sequence (= more than
one codepoint involved), if one exists.</p>
</dd>
<dt><a href="#unicodeQualifiedSequenceName">unicodeQualifiedSequenceName(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Returns the name of a character that is made of a codepoint sequence (= more than
one codepoint involved), if one exists.</p>
<p>Differently from unicodeSequenceName(char), it will only consider Emoji ZWJ sequences
that are fully qualified, meaning they all required variation selectors (VS16) in place</p>
</dd>
<dt><a href="#unicodeName">unicodeName(char)</a> ⇒ <code>string</code> | <code>undefined</code></dt>
<dd><p>Returns the best name for the Unicode character (codepoint or codepoint sequence).</p>
<p>At first, it will check if the codepoint sequence has a name, e.g. for
Emoji that are build up using multiple codepoints using unicodeSequenceName(char)</p>
<p>If none is found, will use the unicodeReadableName(char) function to retrieve
the best name for that codepoint.</p>
</dd>
</dl>

<a name="unicodeBaseName"></a>

## unicodeBaseName(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the name that has been assigned to a Unicode codepoint.

Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)

Also see:
- unicodeCorrectName(char) - Checks if there is a corrected name first, if not,
                             fallbacks to this method
- unicodeReadableName(char) - Displays correct name or an applicable alias

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Name of character or undefined  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

<a name="unicodeCorrectName"></a>

## unicodeCorrectName(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the name that has been assigned to a Unicode codepoint, but if the codepoint
has a correction alias, use this instead.

Please note:
Some common codepoints do not have a name (e.g. C0 control characters like \n)

Also see:
- unicodeReadableName(char) - Displays correct name or an applicable alias

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Corrected name of character or undefined  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

<a name="unicodeAliases"></a>

## unicodeAliases(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the aliases that have been assigned to a Unicode codepoint.

Aliases can be of these categories (multiple aliases possible):

- correction
- control
- figment
- alternate
- abbreviation

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Object containing aliases for this Unicode codepoint  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

<a name="unicodeType"></a>

## unicodeType(char) ⇒ <code>string</code> \| <code>undefined</code>
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
**Returns**: <code>string</code> \| <code>undefined</code> - Codepoint type  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

<a name="unicodeLabel"></a>

## unicodeLabel(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns a label of a codepoint in the following format:
<type-hex>, e.g. <control-0009> for the tab character or
<noncharacter-FFFFF> for U+FFFFF

It is only assigned to codepoints of a type other than
"Graphic" or "Format"

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - A generic label for this codepoint  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

<a name="unicodeReadableName"></a>

## unicodeReadableName(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the best readable representation of a codepoint.

1) It is the corrected name of a the codepoint (if one exists)
2) or it is an appropriate aliase (if one exists)
3) or it is the codepoint label

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Unicode name, alias, or label for this character  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

<a name="unicodeSequenceName"></a>

## unicodeSequenceName(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of a character that is made of a codepoint sequence (= more than
one codepoint involved), if one exists.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Unicode sequence name  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> | Single character string made of multiple codepoints |

<a name="unicodeQualifiedSequenceName"></a>

## unicodeQualifiedSequenceName(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of a character that is made of a codepoint sequence (= more than
one codepoint involved), if one exists.

Differently from unicodeSequenceName(char), it will only consider Emoji ZWJ sequences
that are fully qualified, meaning they all required variation selectors (VS16) in place

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Unicode sequence name  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> | Single character string made of multiple codepoints |

<a name="unicodeName"></a>

## unicodeName(char) ⇒ <code>string</code> \| <code>undefined</code>
Returns the best name for the Unicode character (codepoint or codepoint sequence).

At first, it will check if the codepoint sequence has a name, e.g. for
Emoji that are build up using multiple codepoints using unicodeSequenceName(char)

If none is found, will use the unicodeReadableName(char) function to retrieve
the best name for that codepoint.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>undefined</code> - Name of character  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> \| <code>number</code> | Single character string or codepoint |

