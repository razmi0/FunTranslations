import { Accessor, ParentComponent, VoidComponent } from "solid-js";

type SentenceInputProps = {
  setText: (text: string) => void;
  text: Accessor<string>;
  randomSentence: string;
};
const SentenceInput: ParentComponent<SentenceInputProps> = (props) => {
  return (
    <>
      {props.children}
      <div class="main-box">
        <input
          type="text"
          class="input w-full mr-2"
          name="text"
          value={props.randomSentence}
          placeholder={props.randomSentence}
          onInput={(e: Event) => {
            props.setText((e.target as HTMLInputElement).value);
          }}
        />
      </div>
    </>
  );
};

export default SentenceInput;
