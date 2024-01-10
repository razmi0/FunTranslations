import { createEffect, createResource, createSignal, onMount, untrack } from "solid-js";
import { mastersList, sentencesList } from "../data/data";
import { fetchTranslation } from "../services/fetchTranslation";
import { createStore, produce } from "solid-js/store";
import { urlifyText } from "../helpers";
import { clearKey, load, save } from "../services/localStorage";
import type { Resource } from "solid-js";

export type TranslationStoreType = {
  chooseMaster: (master: Master) => void;
  master: () => Master;
  chooseSentence: (sentence: string) => void;
  sentence: () => string;
  randomSentence: () => string;
  translate: () => void;
  randomizeAll: () => void;
  content: Resource<ContentType>;
  history: HistoryType;
  clearHistory: () => void;
};
export const translationStore = (): TranslationStoreType => {
  /**
   * Translation
   */

  const [master, setMaster] = createSignal(mastersList[0]);
  const [sentence, setSentence] = createSignal(sentencesList[0]);
  const [urlParam, setUrlParam] = createSignal<string>();
  const [content] = createResource(urlParam, fetchTranslation);

  createEffect(() => {
    console.log("error", content.error);
    console.log("loading", content.loading);
    console.log("state", content.state);
  });

  const translate = () => {
    setUrlParam(`${master()}?text=${urlifyText(sentence())}`);
  };

  const chooseMaster = (master: Master) => {
    setMaster(master);
  };

  const chooseSentence = (sentence: string) => {
    setSentence(sentence);
  };

  /**
   * History
   */

  const [history, setHistory] = createStore<HistoryType>({ past: [] });

  const clearHistory = () => {
    setHistory("past", []);
    clearKey("history");
  };

  const saveHistory = () => {
    save("history", history.past);
  };

  const addHistory = () => {
    if (!content()) return;
    setHistory(produce((draft) => draft.past.push(content()!)));
  };

  const onContentChange = () => {
    /**
     * Here untrack break chain of effect when clearing history
     */
    untrack(() => {
      addHistory();
      saveHistory();
    });
  };

  /**
   * Randomize
   */

  const [randomSentence, setRandomSentence] = createSignal(sentence());

  const randomizeSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentencesList.length);
    setSentence(sentencesList[randomIndex]);
  };

  const randomizeMaster = () => {
    const randomIndex = Math.floor(Math.random() * mastersList.length);
    setMaster(mastersList[randomIndex]);
  };

  const randomizeAll = () => {
    randomizeMaster();
    randomizeSentence();
    setRandomSentence(sentence());
  };

  /**
   * Cycle
   */

  onMount(() => setHistory("past", load("history") || []));

  /**
   * Effects
   */

  createEffect(() => {
    const val = content();
    if (val) {
      onContentChange();
    }
  });

  return {
    chooseMaster,
    master,
    chooseSentence,
    sentence,
    randomSentence,
    translate,
    randomizeAll,
    content,
    history,
    clearHistory,
  };
};
