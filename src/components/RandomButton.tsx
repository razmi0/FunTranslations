/**
 *         <RandomButton masters={masters} onSelected={setMaster} />

 */

import { Component, batch } from "solid-js";
import { sentences } from "../data";

type RandMasterProps = {
  masters: Master[];
  setMaster: (master: Master) => void;
  setDefaultMaster: (master: Master) => void;
  setSentence: (sentence: string) => void;
  children: string;
};
const RandomButton: Component<RandMasterProps> = (props) => {
  const { masters, setMaster, setDefaultMaster, setSentence } = props;

  const handleClick = () => {
    const randomIndexMaster = Math.floor(Math.random() * masters.length);
    const randomIndexSentence = Math.floor(Math.random() * sentences.length);

    batch(() => {
      setMaster(masters[randomIndexMaster]);
      setDefaultMaster(masters[randomIndexMaster]);
      setSentence(sentences[randomIndexSentence]);
    });
  };

  return (
    <button class="btn" onClick={handleClick}>
      <span> {props.children} </span>
    </button>
  );
};

export default RandomButton;
