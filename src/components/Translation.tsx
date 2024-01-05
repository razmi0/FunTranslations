import { Component } from "solid-js";

type TranslationProps = {
  handleCLick: () => void;
  type: string; // MasterType (yoda, pirate, etc.)
  result: string;
};
const Translation = (props: TranslationProps) => {
  return (
    <div class="flex flex-col">
      <div class="flex flex-row">
        <div class="main-box text-5xl">{props.type.toLocaleUpperCase()}</div>
        <div class="main-box">
          <input type="text" class="input w-full mr-2" name="text" placeholder="Text to translate" />
        </div>
        <button onClick={props.handleCLick}>
          <span>Translate</span>
        </button>
      </div>
      <output class="w-full border min-h-10">{props.result}</output>
    </div>
  );
};

export default Translation;
