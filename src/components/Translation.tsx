import { Component, Resource, Show, createSignal } from "solid-js";
// import type { Master } from "../data";

type TranslationProps = {
  handleClick: (master: Master, text: string) => void;
  result: Resource<string | undefined>;
  master: Master;
};
const Translation = (props: TranslationProps) => {
  const [text, setText] = createSignal<string>("");

  const translate = () => {
    props.handleClick(props.master, text());
  };

  return (
    <div class="flex flex-col">
      <div class="flex flex-row">
        <div class="main-box text-5xl">{props.master.toLocaleUpperCase()}</div>
        <div class="main-box">
          <input
            type="text"
            class="input w-full mr-2"
            name="text"
            placeholder="Text to translate"
            onInput={(e: Event) => {
              setText((e.target as HTMLInputElement).value);
            }}
          />
        </div>
        <button onClick={translate}>
          <span>Translate</span>
        </button>
      </div>
      <Output result={props.result} />
    </div>
  );
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
        <output class="w-full min-h-10">{props.result()}</output>
      </Show>
    </>
  );
};

export default Translation;
