import { For, Setter, createSignal } from "solid-js";
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

const Main = (props: MainProps) => {
  const [result, setResult] = createSignal<string>("");
  const [master, setMaster] = createSignal<Master>(defaultMaster);

  const urlifyText = (text: string) => {
    return text.replace(/\s/g, "%20");
  };

  const handleCLick = async (master: string, text: string = defaultText) => {
    const url = `${baseUrl}${master}?text=${urlifyText(text)}`;
    const response = await fetch(url);
    const data: FunTranslationResponse = await response.json();
    console.log(data);
    setResult(data?.contents.translated || "");
  };

  return (
    <main class="main">
      <div class="my-3">
        <h2 class="inline">{props.title} : </h2>
        <Select masters={masters} defaultMaster={defaultMaster as Master} onSelected={setMaster} />
      </div>
      <Translation handleCLick={handleCLick} result={result()} master={master()} />
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
    <select
      name="master"
      class="text-gray-900"
      onChange={(e) => {
        handleSelectMaster(e);
        console.log("HERE");
      }}
    >
      <option value={props.defaultMaster} class="text-gray-900" disabled selected>
        {props.defaultMaster}
      </option>
      <For each={props.masters}>{(master) => <option value={master}>{master}</option>}</For>
    </select>
  );
};

export default Main;
