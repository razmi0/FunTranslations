import { ParentComponent } from "solid-js";

const Footer: ParentComponent = (props) => {
  return <footer class="footer border">{props.children}</footer>;
};

export default Footer;
