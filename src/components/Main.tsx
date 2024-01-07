import { createSignal, createResource, createEffect, ParentComponent } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Select from "./Select";
import Translation from "./Translation";
import History from "./History";
import RandomButton from "./RandomButton";
import { masters, sentences } from "../data";
import { urlifyText } from "../helpers";
import { fetchTranslation } from "../services/translation";
import Output from "./Output";

const buildUrlParam = (master: string = masters[0], text: string = sentences[0]) => {
  return `${master}?text=${urlifyText(text)}`;
};

const Main = (props: MainProps) => {
  const [urlParam, setUrlParam] = createSignal<string>();
  const [defaultMaster, setDefaultMaster] = createSignal<Master>("Yoda");
  const [master, setMaster] = createSignal<Master>(masters[0]);
  const [randomSentence, setRandomSentence] = createSignal<string>(sentences[0]);
  const [content /*{ mutate, refetch }*/] = createResource(urlParam, fetchTranslation);
  const [history, setHistory] = createStore<HistoryType>({ past: [] });

  const buildAndSetUrlParam = (master: Master, text: string) => {
    setUrlParam(buildUrlParam(master, text));
  };

  const Heading: ParentComponent = (props) => {
    return <div class="main-box text-5xl">{props.children}</div>;
  };

  createEffect(() => {
    if (content()) {
      setHistory(
        produce((draft) => {
          if (draft && Array.isArray(draft.past)) draft.past.push(content()!);
        })
      );
    }
  });

  return (
    <main class="main">
      <div class="my-3 flex gap-2">
        <h2 class="inline">{props.title} : </h2>
        <Select masters={masters} defaultMaster={defaultMaster()} onSelected={setMaster} />
        <RandomButton
          masters={masters}
          setMaster={setMaster}
          setDefaultMaster={setDefaultMaster}
          setSentence={setRandomSentence}
        >
          Random
        </RandomButton>
      </div>
      <Translation handleClick={buildAndSetUrlParam} master={master()} randomSentence={randomSentence()}>
        <Heading>{master().toLocaleUpperCase()}</Heading>
      </Translation>
      <Output result={content} />
      <History history={history} />
    </main>
  );
};

export default Main;
