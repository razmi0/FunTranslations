import type { Component } from "solid-js";
import Main from "./components/Main";

const mainTitle = "Translations from another world";

const App: Component = () => {
  return (
    <>
      <div class="container flex flex-col h-full">
        <Main title={mainTitle} />
      </div>
      <footer class="footer border">🌈🍩 coffeeCode</footer>
    </>
  );
};

export default App;
