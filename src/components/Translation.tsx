import { ParentComponent, Resource, children, createEffect, createSignal } from "solid-js";
import Output from "./Output";
import SentenceInput from "./SentenceInput";

type TranslationProps = {
  handleClick: (master: Master, text: string) => void;
  master: Master;
  randomSentence: string;
};
const Translation: ParentComponent<TranslationProps> = (props) => {
  const [text, setText] = createSignal<string>(props.randomSentence);

  const translate = () => {
    props.handleClick(props.master, text());
  };

  createEffect(() => {
    setText(props.randomSentence);
  });

  return (
    <div class="flex flex-col">
      <div class="flex flex-row bordered">
        <SentenceInput setText={setText} text={text} randomSentence={props.randomSentence}>
          {props.children}
        </SentenceInput>
        <button onClick={translate}>
          <span>Translate</span>
        </button>
      </div>
    </div>
  );
};

export default Translation;
