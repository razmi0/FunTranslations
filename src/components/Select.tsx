import { For } from "solid-js";
import type { Setter, VoidComponent } from "solid-js";

type SelectProps = {
  masters: Master[];
  defaultMaster: Master;
  onSelected: Setter<Master>;
};
const Select: VoidComponent<SelectProps> = (props) => {
  const handleSelectMaster = (e: Event) => {
    const master = (e.target as HTMLInputElement).value as Master;
    props.onSelected(master);
  };

  return (
    <select name="master" class="text-gray-900 input" onChange={(e) => handleSelectMaster(e)}>
      <option value={props.defaultMaster} selected>
        {props.defaultMaster}
      </option>
      <For each={props.masters}>{(master) => <option value={master}>{master}</option>}</For>
    </select>
  );
};

export default Select;
