import { Resource, createSignal } from "solid-js";
import Output from "./Output";

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

export default Translation;
