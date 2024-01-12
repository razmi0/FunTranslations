import type { ParentComponent } from "solid-js";

type SelectSectionProps = {
  title: string;
};
export const SelectSection: ParentComponent<SelectSectionProps> = (props) => {
  return (
    <div class="my-3">
      <h2>{props.title} : </h2>
      <div class="flex pl-2 gap-2 mt-1 flex-wrap">{props.children}</div>
    </div>
  );
};

export const InputWrapper: ParentComponent = (props) => {
  return (
    <div class="container flex flex-col">
      <section class="pt-3">
        <div class="border-r-2">{props.children}</div>
      </section>
    </div>
  );
};
