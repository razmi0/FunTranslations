import { For, Setter, createSignal, createResource } from "solid-js";
import { masters } from "../data";
import Translation from "./Translation";
import type { Master } from "../data";

const baseUrl = "https://api.funtranslations.com/translate/";
const defaultMaster = "Yoda";
const defaultText = "How do you suck so hard at this";
type FunTranslationResponse =
  | ({
      success: {
        total: number;
      };
      contents: {
        translated: string;
        text: string;
        translation: string;
      };
    } & {})
  | null;

type MainProps = {
  title: string;
};
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
  const [result] = createResource(url, fetchTranslation);

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

type SelectProps = {
  masters: Master[];
  defaultMaster: Master;
  onSelected: Setter<Master>;
};
const Select = (props: SelectProps) => {
  const handleSelectMaster = (e: Event) => {
    const master = (e.target as HTMLInputElement).value as Master;
    props.onSelected(master);
  };

  return (
    <select name="master" class="text-gray-900" onChange={(e) => handleSelectMaster(e)}>
      <option value={props.defaultMaster} disabled selected>
        {props.defaultMaster}
      </option>
      <For each={props.masters}>{(master) => <option value={master}>{master}</option>}</For>
    </select>
  );
};

export default Main;
