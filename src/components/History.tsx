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
};
const HistoryItem: Component<HistoryItemProps> = (props) => (
  <li class="mb-1 leading-5">
    {props.item.translation?.toLocaleUpperCase()} : {props.item.text} {"=>"}{" "}
    <LinkToGoogle searchParam={props.item.text}>{props.item.translated}</LinkToGoogle>
  </li>
);

type HistoryListProps = {
  history: HistoryType;
};
export const HistoryList: Component<HistoryListProps> = (props) => (
  <ul class="flex flex-col">
    <For each={props.history.past}>{(item) => <HistoryItem item={item} />}</For>
  </ul>
);

type HistoryProps = {
  when: boolean;
};
const History: ParentComponent<HistoryProps> = (props) => (
  <div class="history">
    <Show when={props.when} fallback={<div class="m-3 pl-3">No history yet</div>}>
      {props.children}
    </Show>
  </div>
);

export default History;
