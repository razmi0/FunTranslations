import Button from "./components/Button";
import History, { HistoryHeader, HistoryList } from "./components/History";
import { SelectSection, InputWrapper, TranslationSection } from "./components/Wrappers";
import Output from "./components/Output";
import { translationStore } from "./stores/translationStore";
import Select from "./components/Select";
import TranslationHeader from "./components/TranslationHeader";
import SentenceInput from "./components/Input";
import { mastersList } from "./stores/data";
import type { Component } from "solid-js";

const mainTitle = "Translations from another world";

const App: Component = () => {
  const store = translationStore();
  const heading = () => store.master().toLocaleUpperCase().replace(/[-_]/g, " ");
  return (
    <>
      <InputWrapper>
        <SelectSection title={mainTitle}>
          <Select masters={mastersList} onSelected={store.chooseMaster} selected={store.master} />
          <Button onClick={store.randomizeAll} classes="h-12 slider-btn-ctn">
            Random
          </Button>
        </SelectSection>

        {/* */}

        <TranslationSection>
          <TranslationHeader>{heading()}</TranslationHeader>
          <SentenceInput
            setText={store.chooseSentence}
            text={store.sentence()}
            placeholder={store.randomSentence()}
            onEnter={store.translate}
          />
          <Button onClick={store.translate} classes="h-12">
            Translate
          </Button>
        </TranslationSection>
      </InputWrapper>

      {/* */}

      <History when={store.hasHistory()}>
        <HistoryHeader historyLength={store.history.past.length}>
          <Button classes="h-6" onClick={store.clearHistory}>
            Clear
          </Button>
        </HistoryHeader>
        <HistoryList history={store.history} delete={store.deleteHistory} />
      </History>

      {/* */}

      <Output result={store.content} />
    </>
  );
};

export default App;
