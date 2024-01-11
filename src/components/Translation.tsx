import { JSX, ParentComponent } from "solid-js";

const TranslationSection: ParentComponent<{ children: JSX.Element }> = (props) => {
  return (
    <div class="flex flex-col ">
      <div class="flex flex-row gap-2 flex-wrap">{props.children}</div>
    </div>
  );
};

type TranslationHeaderProps = {
  children: string;
};
export const TranslationHeader: ParentComponent<TranslationHeaderProps> = (props) => {
  return <div class="text-5xl text-wrap">{props.children}</div>;
};

export default TranslationSection;
