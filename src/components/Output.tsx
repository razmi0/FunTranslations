import { Show } from "solid-js";
import type { Resource } from "solid-js";

/**
 * Converts unicode to emoji by removing "&#x" and ";" and converting the remaining hex to a code point
 * &#x1F44D; -> 👍
 */
const convertUniToEmoji = (unicode: string) => {
  const hex = unicode.slice(3, -1); // Remove "&#x" and ";"
  return String.fromCodePoint(parseInt(hex, 16));
};

const convertStrIfEmoji = (str: string) => {
  const regex = /&#x[0-9A-Fa-f]+;/g;
  const matches = str.match(regex) || [];
  const treated = str.replace(regex, convertUniToEmoji(matches[0] || ""));
  return treated;
};

const hasEmoji = (text: string): boolean => {
  const regex = /&#x[0-9A-Fa-f]+;/g;
  const matches = text.match(regex) || [];
  return !!matches[0];
};

const Output = (props: { result: Resource<string | undefined> }) => {
  return (
    <>
      <Show when={props.result.loading}>
        <div class="w-full min-h-10">Loading...</div>
      </Show>
      <Show when={props.result.error}>
        <div class="w-full min-h-10">No 💋 : {props.result.error}</div>
      </Show>
      <Show when={props.result()}>
        <output class="w-full min-h-10">
          {hasEmoji(props.result() as string) ? convertStrIfEmoji(props.result() as string) : props.result()}
        </output>
      </Show>
    </>
  );
};

export default Output;
