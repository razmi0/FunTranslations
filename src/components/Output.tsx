import { Show } from "solid-js";
import type { Resource, VoidComponent } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";

type OutputProps = {
  result: Resource<FunTranslationResponse["contents"] | undefined>;
};
const Output: VoidComponent<OutputProps> = (props) => {
  return (
    <>
      <Show when={props.result.loading}>
        <div class="w-full min-h-10 three-dots-animation">Loading</div>
      </Show>
      <Show when={!!props.result.error}>
        <div class="w-full min-h-10">No 💋 </div>
      </Show>
      <Show when={props.result()}>
        <output class="w-full min-h-10 translated-text">
          {"> "}
          <LinkToGoogle searchParam={props.result()?.text || ""}>{props.result()?.translated || ""}</LinkToGoogle>
        </output>
      </Show>
    </>
  );
};

export default Output;
