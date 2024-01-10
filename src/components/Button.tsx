type ButtonProps = {
  classes?: string;
  onClick: (args: any) => void;
  children: string;
};
const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} class={`btn ${props.classes}`}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
