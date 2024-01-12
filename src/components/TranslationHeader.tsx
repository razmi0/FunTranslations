import { ParentComponent } from "solid-js";

type TranslationHeaderProps = {
  children: string;
};
export const TranslationHeader: ParentComponent<TranslationHeaderProps> = (props) => {
  return <div class="text-5xl text-wrap">{props.children}</div>;
};

export default TranslationHeader;
