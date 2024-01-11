import { Component, For, JSX, ParentComponent, Show } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";

type HistoryHeaderProps = {
  historyLength: string | number;
  /** Button please */
  children?: JSX.Element;
};
export const HistoryHeader: ParentComponent<HistoryHeaderProps> = (props) => {
  return (
    <div class="flex flex-row gap-2 items-center mt-4">
      <h3 class="my-3">History ({props.historyLength}) :</h3>
      {props.children}
    </div>
  );
};

type HistoryItemProps = {
  item: ContentType;
  deleteItem: () => void;
};
const HistoryItem: Component<HistoryItemProps> = (props) => {
  const deleteIcon = "✖";
  return (
    <li class="list-history-element h-6">
      <button class="w-6 text-xl appearance-none" onClick={props.deleteItem}>
        {deleteIcon}
      </button>
      {props.item.translation?.toLocaleUpperCase()} : {props.item.text} {" => "}
      <LinkToGoogle classes="ml-2" searchParam={props.item.text}>
        {props.item.translated}
      </LinkToGoogle>
    </li>
  );
};

type HistoryListProps = {
  history: HistoryType;
  delete: (index: number) => void;
};
export const HistoryList: Component<HistoryListProps> = (props) => (
  <ul class="flex flex-col items-start">
    <For each={props.history.past}>
      {(item, i) => {
        const deleteItem = () => props.delete(i());
        return <HistoryItem deleteItem={deleteItem} item={item} />;
      }}
    </For>
  </ul>
);

type HistoryProps = {
  when: boolean;
};

const History: ParentComponent<HistoryProps> = (props) => (
  <div class="history w-full">
    <Show when={props.when} fallback={<div class="m-3 pl-3">No history yet</div>}>
      {props.children}
    </Show>
  </div>
);

export default History;
