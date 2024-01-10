import { ParentComponent } from "solid-js";
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
      <div class="border-r-2">
        {/* */}

        <MainHeader title={props.title}>
          <Select masters={mastersList} onSelected={chooseMaster} selected={master} />
          <Button onClick={randomizeAll} classes="h-12">
            Random
          </Button>
        </MainHeader>

        {/* */}

        <Translation>
          <TranslationHeader>{heading()}</TranslationHeader>
          <SentenceInput setText={chooseSentence} text={sentence()} />
          <Button onClick={translate} classes="h-12">
            Translate
          </Button>
        </Translation>
      </div>

      {/*  */}

      <Output result={content} />
      <History when={hasHistory()}>
        <HistoryHeader historyLength={history.past.length}>
          <Button classes="h-6" onClick={clearHistory}>
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
  // flex
  return (
    <div class="my-3 MainHeader">
      <h2>{props.title} : </h2>
      <div class="flex pl-2 gap-2 mt-1">{props.children}</div>
    </div>
  );
};

// <History history={history} clearHistory={clearHistory} />
export default Main;
