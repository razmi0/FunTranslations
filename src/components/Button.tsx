type ButtonProps = {
  classes?: string;
  onClick: (args: any) => void;
  children: string;
};
const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} class={`${props.classes} slider-btn`}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
