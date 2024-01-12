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
    <>
      <li class="list-history-element justify-between w-full">
        <div class="flex flex-row h-7">
          <button class="w-6 text-xl" onClick={props.deleteItem}>
            {deleteIcon}
          </button>
          <span>{props.item.translation?.toLocaleUpperCase()} : </span>
        </div>
        <span>{props.item.text}</span>
        <LinkToGoogle classes="ml-2" searchParam={props.item.text}>
          {props.item.translated}
        </LinkToGoogle>
        <hr class="list-history-separator mt-1" />
      </li>
    </>
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
  <section class="history w-full">
    <Show when={props.when} fallback={<div class="m-3 pl-3">No history yet</div>}>
      {props.children}
    </Show>
  </section>
);

export default History;
