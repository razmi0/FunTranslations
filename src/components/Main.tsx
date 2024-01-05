import { createSignal } from "solid-js";
import Translation from "./Translation";

const url = "https://api.funtranslations.com/translate/yoda.json?text=How%20do%20you%20suck%20so%20hard%20at%20this";
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

  const handleCLick = async () => {
    const response = await fetch(url);
    const data: FunTranslationResponse = await response.json();
    setResult(data?.contents.translated || "");
  };

  return (
    <main class="main">
      <h2 class="pb-3">{props.title}</h2>
      <Translation handleCLick={handleCLick} type="yoda" result={result()} />
    </main>
  );
};

export default Main;
