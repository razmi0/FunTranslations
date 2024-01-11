import { JSX, ParentComponent, createEffect, createSignal } from "solid-js";

const Translation: ParentComponent<{ children: JSX.Element }> = (props) => {
  return (
    <div class="flex flex-col ">
      <div class="flex flex-row gap-2">{props.children}</div>
    </div>
  );
};

type TranslationHeaderProps = {
  children: string;
};
export const TranslationHeader: ParentComponent<TranslationHeaderProps> = (props) => {
  const [childSize, setChildSize] = createSignal(props.children.length);

  createEffect(() => {
    setChildSize(props.children.length);
  });

  const wordBig = () => childSize() >= 19;

  return (
    <div class="main-box text-5xl max-w-60 text-wrap" classList={{ ["break-all"]: wordBig() }}>
      {props.children}
    </div>
  );
};

export default Translation;
