import type { Component } from "solid-js";
import Header from "./components/Header";
import Main from "./components/Main";

const headerText = ["Welcome to Translator", "The only purpose is to do fun translation", "Fun translation is fun"];
const mainTitle = "Translations from another world";

const App: Component = () => {
  return (
    <>
      <div class="container flex flex-col h-full">
        <Header segOne={headerText[0]} segTwo={headerText[1]} segThree={headerText[2]} />
        <Main title={mainTitle} />
      </div>
      <footer class="footer border">🌈🍩 & code & coffee</footer>
    </>
  );
};

export default App;
