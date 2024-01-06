import { Component, createSignal } from "solid-js";

type TranslationProps = {
  handleCLick: (master: string, text: string) => void;
  result: string;
  master: string;
};
const Translation = (props: TranslationProps) => {
  const [text, setText] = createSignal<string>("");

  const translate = () => {
    props.handleCLick(props.master, text());
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
      <output class="w-full min-h-10">{props.result}</output>
    </div>
  );
};

export default Translation;
