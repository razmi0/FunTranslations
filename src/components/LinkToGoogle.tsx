import { Component } from "solid-js";

type LinkToGoogleProps = {
  children: string;
  searchParam?: string;
  classes?: string;
};
const LinkToGoogle: Component<LinkToGoogleProps> = (props) => {
  return (
    <a
      href={`https://www.google.com/search?q=${props.searchParam ? props.searchParam : props.children}`}
      target="_blank"
      class={`${props.classes || ""}`}
    >
      <span class="translated-text typed-out">{props.children}</span>
    </a>
  );
};

export default LinkToGoogle;
