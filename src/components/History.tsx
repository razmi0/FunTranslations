import { For, Show, VoidComponent } from "solid-js";

type HistoryProps = {
  history: HistoryType;
};
const History: VoidComponent<HistoryProps> = (props) => {
  return (
    <div class="history">
      <Show when={props.history.past.length > 0} fallback={<div class="m-3 pl-3">No history yet</div>}>
        <h3 class="mb-3">History</h3>
        <ul>
          <For each={props.history.past}>
            {(item) => (
              <li>
                {item.translation.toLocaleUpperCase()} : {item.text} {"=>"} {item.translated}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default History;
