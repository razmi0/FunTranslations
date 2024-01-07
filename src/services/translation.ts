import { emojize, hasEmoji } from "../helpers";

const baseUrl = "https://api.funtranslations.com/translate/";

export const fetchTranslation = async (url: string) => {
  const response = await fetch(baseUrl + url);
  const data: FunTranslationResponse = await response.json();

  if (hasEmoji(data.contents.translated)) {
    data.contents.translated = emojize(data.contents.translated);
  }

  return data.contents as FunTranslationResponse["contents"];
};
