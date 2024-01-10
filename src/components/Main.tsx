import { ErrorBoundary } from "solid-js";
import Translation, { TranslationHeader } from "./Translation";
import SentenceInput from "./Input";
import History, { HistoryHeader, HistoryList } from "./History";
import Select from "./Select";
import Button from "./Button";
import { mastersList } from "../data/data";
import type { ParentComponent } from "solid-js";
import type { TranslationStoreType } from "../stores/translationStore";

type MainProps = {
  title: string;
  store: TranslationStoreType;
};

const Main = (props: MainProps) => {
  const heading = () => props.store.master().toLocaleUpperCase();
  const hasHistory = () => props.store.history.past.length > 0;

  return (
    <main class="main">
      <div class="border-r-2">
        {/* */}

        <MainHeader title={props.title}>
          <Select masters={mastersList} onSelected={props.store.chooseMaster} selected={props.store.master} />
          <Button onClick={props.store.randomizeAll} classes="h-12">
            Random
          </Button>
        </MainHeader>

        {/* */}

        <ErrorBoundary fallback={<div>WROOOOOONG</div>}>
          <Translation>
            <TranslationHeader>{heading()}</TranslationHeader>
            <SentenceInput
              setText={props.store.chooseSentence}
              text={props.store.sentence()}
              placeholder={props.store.randomSentence()}
              onEnter={props.store.translate}
            />
            <Button onClick={props.store.translate} classes="h-12">
              Translate
            </Button>
          </Translation>
        </ErrorBoundary>
      </div>

      {/*  */}

      <History when={hasHistory()}>
        <HistoryHeader historyLength={props.store.history.past.length}>
          <Button classes="h-6" onClick={props.store.clearHistory}>
            Clear
          </Button>
        </HistoryHeader>
        <HistoryList history={props.store.history} />
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
