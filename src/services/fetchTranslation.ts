import { emojize, hasEmoji } from "../helpers";

const baseUrl = "https://api.funtranslations.com/translate/";

// const defaultContent = {
//   translated: "",
//   text: "",
//   translation: "",
// };

export const fetchTranslation = async (urlParams: string) => {
  try {
    console.log("fetch");
    const response = await fetch(baseUrl + urlParams);
    const data: FunTranslationResponse = await response.json();

    if (data.contents && hasEmoji(data.contents.translated)) {
      data.contents.translated = emojize(data.contents.translated);
    }

    return data.contents as ContentType;
  } catch (error) {
    throw error;
  }
};
