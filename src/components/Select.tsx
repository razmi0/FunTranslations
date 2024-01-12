import { For, Accessor, createSignal, Show, onMount, onCleanup } from "solid-js";
import type { Component, JSX, ParentComponent, VoidComponent } from "solid-js";

const icon = "«";

type SelectProps = {
  masters: Master[];
  onSelected: (master: Master) => void;
  selected: Accessor<Master>;
};
const Select: VoidComponent<SelectProps> = (props) => {
  const [isListOpen, setIsListOpen] = createSignal(false);

  const handleToggleSelect = () => setIsListOpen((p) => !p);

  let ref = null as HTMLDivElement | null;

  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref && !ref.contains(e.target as Node)) {
        setIsListOpen(false);
        console.log("click outside");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("mousedown", (e) => e);
  });

  return (
    <SelectInput classes="text-gray-900 input cursor-pointer" ref={(el: HTMLDivElement) => (ref = el)}>
      <SelectTrigger onClick={handleToggleSelect} isOpen={isListOpen()}>
        {props.selected()}
      </SelectTrigger>
      <OptionList when={isListOpen()} onClick={handleToggleSelect}>
        <For each={props.masters}>
          {(master) => {
            const handleSelectMaster = () => props.onSelected(master);
            const isSelected = props.selected() === master;
            return (
              <Option onClick={handleSelectMaster} selected={isSelected}>
                {master}
              </Option>
            );
          }}
        </For>
      </OptionList>
    </SelectInput>
  );
};

type OptionListProps = {
  children: JSX.Element;
  when: boolean;
  onClick?: () => void;
};
const OptionList: Component<OptionListProps> = (props) => {
  return (
    <>
      <Show when={props.when}>
        <div onClick={props.onClick} class="absolute overflow-y-scroll max-h-96 mt-5 z-30">
          {props.children}
        </div>
      </Show>
    </>
  );
};

type SelectInputProps = {
  classes?: string;
  children: JSX.Element;
  onClick?: (() => void) | ((e: MouseEvent) => void);
  ref?: (el: HTMLDivElement) => void;
};
const SelectInput: ParentComponent<SelectInputProps> = (props) => {
  return (
    <div class={props.classes} onClick={props.onClick} ref={props.ref}>
      {props.children}
    </div>
  );
};

type OptionProps = {
  selected?: boolean;
  children: JSX.Element | string;
  onClick?: () => void;
};
const Option: Component<OptionProps> = (props) => {
  return (
    <div
      class="hover:bg-slate-400 text-gray-900 input outline-none  opacity-100 flex justify-between"
      classList={{ ["bg-slate-400"]: props.selected }}
      onClick={props.onClick}
    >
      {props.children}
      <Show when={props.selected}>
        <span class="text-xl">{icon}</span>
      </Show>
    </div>
  );
};

type SelectTriggerProps = {
  children: JSX.Element;
  onClick: () => void;
  isOpen?: boolean;
};
const SelectTrigger: Component<SelectTriggerProps> = (props) => {
  return (
    <button class="min-w-60 text-left ml-2 h-6 flex" onClick={props.onClick}>
      {props.children}
      <Spacer />
      <span class="text-lg" classList={{ ["-rotate-90"]: props.isOpen }}>
        {icon}
      </span>
    </button>
  );
};

const Spacer = () => <div class="flex-grow" />;
export default Select;
