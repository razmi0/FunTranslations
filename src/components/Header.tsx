import { Component, ComponentProps } from "solid-js";

type HeaderProps = {
  segOne: string;
  segTwo: string;
  segThree: string;
};
const Header = (props: HeaderProps) => {
  return (
    <header class="header">
      <div class="header-box">{props.segOne}</div>
      <div class="header-bigger-box">{props.segTwo}</div>
      <div class="header-box">{props.segThree}</div>
    </header>
  );
};

export default Header;
