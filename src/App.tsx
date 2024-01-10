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
      <Output result={store.content} />
    </>
  );
};

const MainContainer: ParentComponent = (props) => {
  return <div class="container flex flex-col h-full">{props.children}</div>;
};

export default App;
