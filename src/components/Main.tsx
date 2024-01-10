import { ParentComponent, createEffect, createMemo } from "solid-js";
import Translation, { TranslationHeader, SentenceInput } from "./Translation";
import History, { HistoryHeader, HistoryList } from "./History";
import Select from "./Select";
import Output from "./Output";
import Button from "./Button";
import { mastersList } from "../data";
import { translationStore } from "../services/stores";

const Main = (props: MainProps) => {
  const { chooseMaster, master, chooseSentence, sentence, translate, randomizeAll, content, history, clearHistory } =
    translationStore();

  const heading = () => master().toLocaleUpperCase();
  const hasHistory = () => history.past.length > 0;

  return (
    <main class="main">
      {/* FIRST SECTION */}

      <MainHeader title={props.title}>
        <Select masters={mastersList} onSelected={chooseMaster} selected={master} />
        <Button onClick={randomizeAll} classes="btn">
          Random
        </Button>
      </MainHeader>

      {/* SECOND SECTION */}

      <Translation>
        <TranslationHeader>{heading()}</TranslationHeader>
        <SentenceInput setText={chooseSentence} text={sentence()} />
        <Button onClick={translate}>Translate</Button>
      </Translation>

      {/* THIRD SECTION */}

      <Output result={content} />
      <History when={hasHistory()}>
        <HistoryHeader historyLength={history.past.length}>
          <Button classes="h-8" onClick={clearHistory}>
            Clear
          </Button>
        </HistoryHeader>
        <HistoryList history={history} />
      </History>
    </main>
  );
};
type MainHeaderProps = {
  title: string;
};
const MainHeader: ParentComponent<MainHeaderProps> = (props) => {
  return (
    <div class="my-3 flex">
      <h2>{props.title} : </h2>
      {props.children}
    </div>
  );
};

// <History history={history} clearHistory={clearHistory} />
export default Main;
