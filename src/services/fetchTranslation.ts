import { emojize, hasEmoji } from "../helpers";

const baseUrl = "https://api.funtranslations.com/translate/";

const error429: ContentType = {
  translation: "Server",
  translated: "Service overload. Try in a hour",
  text: "",
  error: 429,
  isBad: true,
};

const error401: ContentType = {
  translation: "Server",
  translated: "Unauthorized. Try again please",
  text: "",
  error: 401,
  isBad: true,
};

const error404: ContentType = {
  translation: "Server",
  translated: "Not found. Try again please",
  text: "",
  error: 404,
  isBad: true,
};

type ReturnTypeFetchTranslation = Promise<ContentType>;

export const fetchTranslation = async (urlParams: string): ReturnTypeFetchTranslation => {
  console.log("fetch");
  const response = await fetch(baseUrl + urlParams);
  if (response.status === 429) return error429;
  if (response.status === 401) return error401;
  if (response.status === 404) return error404;

  const data: FunTranslationResponse = await response.json();

  if (data.contents && hasEmoji(data.contents.translated)) {
    data.contents.translated = emojize(data.contents.translated);
  }

  return {
    ...data.contents,
    error: 200,
    isBad: false,
  };
};
