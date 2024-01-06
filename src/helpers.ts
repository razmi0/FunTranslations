/**
 * Converts unicode to emoji by removing "&#x" and ";" and converting the remaining hex to a code point
 * &#x1F44D; -> 👍
 */
export const convertUniToEmoji = (unicode: string) => {
  const hex = unicode.slice(3, -1); // Remove "&#x" and ";"
  return String.fromCodePoint(parseInt(hex, 16));
};

export const convertStrIfEmoji = (str: string) => {
  const regex = /&#x[0-9A-Fa-f]+;/g;
  const matches = str.match(regex) || [];
  const treated = str.replace(regex, convertUniToEmoji(matches[0] || ""));
  return treated;
};
export const emojize = (text: string) => {
  return convertStrIfEmoji(text);
};
export const urlifyText = (text: string) => {
  return text.replace(/\s/g, "%20");
};

export const hasEmoji = (text: string): boolean => {
  const regex = /&#x[0-9A-Fa-f]+;/g;
  const matches = text.match(regex) || [];
  return !!matches[0];
};
