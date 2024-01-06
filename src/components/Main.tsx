import { createSignal, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import Select from "./Select";
import Translation from "./Translation";
import { masters } from "../data";

const baseUrl = "https://api.funtranslations.com/translate/";
const defaultMaster = "Yoda";
const defaultText = "How do you suck so hard at this";

const urlifyText = (text: string) => {
  return text.replace(/\s/g, "%20");
};

const fetchTranslation = async (url: string) => {
  console.log("FETCHING");
  const response = await fetch(url);
  const data: FunTranslationResponse = await response.json();
  return data?.contents.translated;
};

const buildUrl = (master: string = defaultMaster, text: string = defaultText) => {
  return `${baseUrl}${master}?text=${urlifyText(text)}`;
};

const Main = (props: MainProps) => {
  const [url, setUrl] = createSignal<string>();
  const [master, setMaster] = createSignal<Master>(defaultMaster);
  /* result is fetched when url is refreshed by user activity */
  const [result /*{ mutate, refetch }*/] = createResource(url, fetchTranslation);

  const buildAndSetUrl = (master: Master, text: string) => {
    setUrl(buildUrl(master, text));
  };

  return (
    <main class="main">
      <div class="my-3">
        <h2 class="inline">{props.title} : </h2>
        <Select masters={masters} defaultMaster={defaultMaster as Master} onSelected={setMaster} />
      </div>
      <Translation handleClick={buildAndSetUrl} result={result} master={master()} />
    </main>
  );
};

export default Main;
