import type { JSX, ParentComponent } from "solid-js";

type SelectSectionProps = {
  title: string;
};
export const SelectSection: ParentComponent<SelectSectionProps> = (props) => {
  return (
    <div class="my-3">
      <h2>{props.title} : </h2>
      <div class="flex pl-2 gap-2 sm:gap-5 mt-1 flex-wrap">{props.children}</div>
    </div>
  );
};

export const TranslationSection: ParentComponent<{ children: JSX.Element }> = (props) => {
  return <div class="flex flex-row gap-2 sm:gap-5 flex-wrap">{props.children}</div>;
};

export const InputWrapper: ParentComponent = (props) => {
  return <section class="container flex flex-col pt-3 border-r-2 items-start">{props.children}</section>;
};
