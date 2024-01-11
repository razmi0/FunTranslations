import Button from "./components/Button";
import History, { HistoryHeader, HistoryList } from "./components/History";
import Main from "./components/Main";
import Output from "./components/Output";
import { translationStore } from "./stores/translationStore";
import type { Component, ParentComponent } from "solid-js";

const mainTitle = "Translations from another world";

const App: Component = () => {
  const store = translationStore();
  return (
    <>
      <MainContainer>
        <Main title={mainTitle} store={store} />
      </MainContainer>
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

const MainContainer: ParentComponent = (props) => {
  return <div class="container w- flex flex-col">{props.children}</div>;
};

export default App;
