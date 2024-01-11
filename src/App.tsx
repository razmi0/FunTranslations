import Button from "./components/Button";
import History, { HistoryHeader, HistoryList } from "./components/History";
import InputSection from "./components/Main";
import Output from "./components/Output";
import { translationStore } from "./stores/translationStore";
import type { Component, ParentComponent } from "solid-js";

const mainTitle = "Translations from another world";

const App: Component = () => {
  const store = translationStore();
  return (
    <>
      <InputWrapper>
        <InputSection title={mainTitle} store={store} />
      </InputWrapper>
      <History when={store.hasHistory()}>
        <HistoryHeader historyLength={store.history.past.length}>
          <Button classes="h-6" onClick={store.clearHistory}>
            Clear
          </Button>
        </HistoryHeader>
        <HistoryList history={store.history} delete={store.deleteHistory} />
      </History>
      <Output result={store.content} />
    </>
  );
};

const InputWrapper: ParentComponent = (props) => {
  return <div class="container flex flex-col">{props.children}</div>;
};

export default App;
