import { createSignal, createResource, createEffect, For, Show, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Select from "./Select";
import Translation from "./Translation";
import History from "./History";
import { masters } from "../data";
import { emojize, hasEmoji, urlifyText } from "../helpers";

const baseUrl = "https://api.funtranslations.com/translate/";
const defaultMaster = "Yoda";
const defaultText = "How do you suck so hard at this";

const fetchTranslation = async (url: string) => {
  const response = await fetch(url);
  const data: FunTranslationResponse = await response.json();

  if (hasEmoji(data.contents.translated)) {
    data.contents.translated = emojize(data.contents.translated);
  }
  return data.contents as FunTranslationResponse["contents"];
};

const buildUrl = (master: string = defaultMaster, text: string = defaultText) => {
  return `${baseUrl}${master}?text=${urlifyText(text)}`;
};

const Main = (props: MainProps) => {
  const [url, setUrl] = createSignal<string>();
  const [master, setMaster] = createSignal<Master>(defaultMaster);
  const [content /*{ mutate, refetch }*/] = createResource(url, fetchTranslation);
  const [history, setHistory] = createStore<HistoryType>({ past: [] });

  const buildAndSetUrl = (master: Master, text: string) => {
    setUrl(buildUrl(master, text));
  };

  createEffect(() => {
    const contentValue = content();
    if (contentValue) {
      setHistory(
        produce((draft) => {
          if (draft && Array.isArray(draft.past)) draft.past.push(contentValue);
        })
      );
    }
  });

  return (
    <main class="main">
      <div class="my-3">
        <h2 class="inline">{props.title} : </h2>
        <Select masters={masters} defaultMaster={defaultMaster as Master} onSelected={setMaster} />
      </div>
      <Translation handleClick={buildAndSetUrl} result={content} master={master()} />
      <History history={history} />
    </main>
  );
};

export default Main;
