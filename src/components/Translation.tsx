import { JSX, ParentComponent } from "solid-js";

const Translation: ParentComponent<{ children: JSX.Element }> = (props) => {
  return (
    <div class="flex flex-col Translation">
      <div class="flex flex-row gap-2">{props.children}</div>
    </div>
  );
};

export const TranslationHeader: ParentComponent = (props) => <div class="main-box text-5xl">{props.children}</div>;

type SentenceInputProps = {
  setText: (text: string) => void;
  text: string;
};
export const SentenceInput: ParentComponent<SentenceInputProps> = (props) => {
  return (
    <>
      <div class="main-box">
        <input
          type="text"
          class="input w-full"
          name="text"
          value={props.text}
          placeholder={props.text}
          onInput={(e: Event) => {
            props.setText((e.target as HTMLInputElement).value);
          }}
        />
      </div>
    </>
  );
};
export default Translation;
