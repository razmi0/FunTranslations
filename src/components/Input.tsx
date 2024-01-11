import { Component, ParentComponent, createSignal } from "solid-js";

type SentenceInputProps = {
  setText: (text: string) => void;
  placeholder?: string;
  text: string;
  onEnter?: () => void;
  onTab?: () => void;
};
export const SentenceInput: ParentComponent<SentenceInputProps> = (props) => {
  const [isReset, setIsReset] = createSignal(false);

  const autoCompletion = () => {
    if (!props.placeholder || !isReset()) return;
    setIsReset(false);
    props.setText(props.placeholder);
  };

  const handleResetInput = () => {
    if (isReset()) return;
    setIsReset(true);
    props.setText("");
  };

  const handleOnInput = (e: InputEvent) => {
    props.setText((e.target as HTMLInputElement).value);
  };

  const handleTabKey = () => {
    props.onTab ? props.onTab() : autoCompletion();
  };

  const handleBackspaceKey = () => {
    handleResetInput();
  };

  return (
    <div class="min-w-64 ml-1">
      <Input
        value={props.text}
        onInput={handleOnInput}
        onEnter={props.onEnter}
        onTab={handleTabKey}
        onBackspace={handleBackspaceKey}
        placeholder={props.placeholder}
      />
    </div>
  );
};

type InputProps = {
  value: string;
  placeholder?: string;
  onInput: (e: InputEvent) => void;
  onEnter?: () => void;
  onTab?: () => void;
  onBackspace?: () => void;
};

export const Input: Component<InputProps> = (props) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();
    const k = e.key;
    switch (k) {
      case "Enter":
        !!props.onEnter && props.onEnter();
        break;

      case "Tab":
        !!props.onTab && props.onTab();
        break;

      case "Backspace":
        !!props.onBackspace && props.onBackspace();
        break;

      default:
        break;
    }
  };

  return (
    <input
      type="text"
      class="input w-full"
      name="sentence"
      value={props.value}
      placeholder={props.placeholder || "Enter a sentence..."}
      onInput={props.onInput}
      onKeyDown={handleKeyDown}
      maxLength={70}
      minLength={1}
    />
  );
};

export default SentenceInput;
