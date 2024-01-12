import { For, Accessor } from "solid-js";
import type { VoidComponent } from "solid-js";

type SelectProps = {
  masters: Master[];
  onSelected: (master: Master) => void;
  selected: Accessor<Master>;
};
const Select: VoidComponent<SelectProps> = (props) => {
  const handleSelectMaster = (e: Event) => {
    const master = (e.target as HTMLInputElement).value as Master;
    props.onSelected(master);
  };

  return (
    <div class="flex items-center">
      <select name="master" class="text-gray-900 input" onChange={(e) => handleSelectMaster(e)}>
        <For each={props.masters}>
          {(master) => (
            <option value={master} selected={master === props.selected()}>
              {master}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};

export default Select;
