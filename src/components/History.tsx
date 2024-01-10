import { Component, For, JSX, ParentComponent, Show } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";

// type HistoryProps = {
//   history: HistoryType;
//   clearHistory: () => void;
// };
// const History: VoidComponent<HistoryProps> = (props) => {
//   return (
//     <div class="history">
//       <Show when={props.history.past.length > 0} fallback={<div class="m-3 pl-3">No history yet</div>}>
//         <div class="flex flex-row gap-2 items-center">
//           <h3 class="my-3">History ({props.history.past.length}) : </h3>
//           <button class="btn h-5 w-fit" onClick={props.clearHistory}>
//             <span>Clear</span>
//           </button>
//         </div>
//         <ul>
//           <For each={props.history.past}>
//             {(item) => (
//               <li class="my-1">
//                 {item?.translation.toLocaleUpperCase()} : {item?.text} {"=>"}{" "}
//                 <LinkToGoogle searchParam={item?.text}>{item?.translated}</LinkToGoogle>
//               </li>
//             )}
//           </For>
//         </ul>
//       </Show>
//     </div>
//   );
// };

type HistoryHeaderProps = {
  historyLength: string | number;
  /** Button please */
  children?: JSX.Element;
};
export const HistoryHeader: ParentComponent<HistoryHeaderProps> = (props) => {
  return (
    <div class="flex flex-row gap-2 items-center">
      <h3 class="my-3">History ({props.historyLength}) :</h3>
      {props.children}
    </div>
  );
};

type HistoryItemProps = {
  item: ContentType;
};
const HistoryItem: Component<HistoryItemProps> = (props) => (
  <li class="my-1">
    {props.item.translation?.toLocaleUpperCase()} : {props.item.text} {"=>"}{" "}
    <LinkToGoogle searchParam={props.item.text}>{props.item.translated}</LinkToGoogle>
  </li>
);

type HistoryListProps = {
  history: HistoryType;
};
export const HistoryList: Component<HistoryListProps> = (props) => (
  <ul>
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
