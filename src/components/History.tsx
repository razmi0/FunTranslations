import { Component, For, ParentComponent, Show, VoidComponent } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";

type HistoryProps = {
  history: HistoryType;
};
const History: VoidComponent<HistoryProps> = (props) => {
  return (
    <div class="history">
      <Show when={props.history.past.length > 0} fallback={<div class="m-3 pl-3">No history yet</div>}>
        <h3 class="my-3">History : </h3>
        <ul>
          <For each={props.history.past}>
            {(item) => (
              <li class="my-1">
                {item.translation.toLocaleUpperCase()} : {item.text} {"=>"}{" "}
                <LinkToGoogle searchParam={item.text}>{item.translated}</LinkToGoogle>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default History;
