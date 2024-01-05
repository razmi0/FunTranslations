import { createSignal } from "solid-js";
import { masters } from "../data";
import Translation from "./Translation";

const baseUrl = "https://api.funtranslations.com/translate/";
const defaultMaster = "yoda";
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
  const [master, setMaster] = createSignal<string>(defaultMaster);

  const urlifyText = (text: string) => {
    return text.replace(/\s/g, "%20");
  };

  const handleSelectMaster = (e: Event) => {
    const master = (e.target as HTMLInputElement).value;
    setMaster(master);
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
        <select name="master" id="master" class="text-gray-900" onInput={(e) => handleSelectMaster(e)}>
          <option disabled selected>
            Select a master
          </option>
          {masters.map((master) => (
            <option value={master}>{master}</option>
          ))}
        </select>
      </div>

      <Translation handleCLick={handleCLick} result={result()} master={master()} />
    </main>
  );
};

export default Main;
