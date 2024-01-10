import { Show } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";
import type { Resource, VoidComponent } from "solid-js";

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
        <div class="w-full min-h-10 three-dots-animation">Loading</div>
      </Show>
      <Show when={props.result.latest}>
        <output class="w-full min-h-10 translated-text">
          <Show when={hasError()}>
            <span class="translated-error">{`> ${translated()} `}</span>
            <span> 😬</span>
          </Show>
          <Show when={!hasError()}>
            <LinkToGoogle searchParam={text()}>{`> ${translated()}`}</LinkToGoogle>
          </Show>
        </output>
      </Show>
    </>
  );
};

export default Output;
