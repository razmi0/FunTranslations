import { Show } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";
import type { Component, Resource, VoidComponent } from "solid-js";

type OutputProps = {
  result: Resource<ContentType | undefined>;
};

const Output: VoidComponent<OutputProps> = (props) => {
  const text = () => props.result()?.text || "";
  const translated = () => props.result()?.translated || "";
  const hasError = () => props.result()?.isBad || false;

  return (
    <>
      <Show when={props.result.loading}>
        <LoadingOutput />
      </Show>
      <Show when={props.result.latest && !props.result.loading}>
        <Show when={hasError()}>
          <ErroredOutput text={translated()} />
        </Show>
        <Show when={!hasError()}>
          <TranslatedOutput text={text()} translated={translated()} />
        </Show>
      </Show>
    </>
  );
};

type ErroredOutputProps = {
  text: string;
};
const ErroredOutput: Component<ErroredOutputProps> = (props) => {
  return (
    <output class="min-h-10 mt-5 inline-flex w-fit">
      <div class="translated-error typed-out ">{`> ${props.text} `}</div>
      <span class="ml-2"> 😬</span>
    </output>
  );
};

const LoadingOutput: VoidComponent = () => {
  return <div class="min-h-10 mt-5 three-dots-animation">Loading</div>;
};

type TranslatedOutputProps = {
  text: string;
  translated: string;
};
const TranslatedOutput: Component<TranslatedOutputProps> = (props) => {
  return (
    <output class="min-h-10 mt-5 translated-text w-full">
      <LinkToGoogle classes="inline-flex w-fit" searchParam={props.text}>{`> ${props.translated}`}</LinkToGoogle>
    </output>
  );
};

export default Output;
