import { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <footer class="footer">
      <SvgIcon name="github" width="50px" height="50px" link="https://github.com/razmi0" />
    </footer>
  );
};
type SvgIconProps = {
  name: string;
  width: string;
  height: string;
  link?: string;
};
const SvgIcon: Component<SvgIconProps> = (props) => {
  return (
    <a href={props.link}>
      <svg width={props.width} height={props.height}>
        <use href={`/src/assets/sprite.svg#${props.name}`} />
      </svg>
    </a>
  );
};

export default Footer;
