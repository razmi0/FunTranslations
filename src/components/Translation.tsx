import { JSX, ParentComponent } from "solid-js";

const Translation: ParentComponent<{ children: JSX.Element }> = (props) => {
  return (
    <div class="flex flex-col">
      <div class="flex flex-row gap-2">{props.children}</div>
    </div>
  );
};

export const TranslationHeader: ParentComponent = (props) => <div class="main-box text-5xl">{props.children}</div>;

export default Translation;
