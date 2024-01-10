import { createSignal } from "solid-js";
import { emojize, hasEmoji } from "../helpers";

const baseUrl = "https://api.funtranslations.com/translate/";

export const fetchTranslation = async (urlParams: string) => {
  const response = await fetch(baseUrl + urlParams);
  const data: FunTranslationResponse = await response.json();
  console.log("fetch");

  if (data.contents && hasEmoji(data.contents.translated)) {
    data.contents.translated = emojize(data.contents.translated);
  }
  return data.contents as ContentType;
};
