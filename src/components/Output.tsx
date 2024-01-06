import { Show } from "solid-js";
import type { Resource, VoidComponent } from "solid-js";

type OutputProps = {
  result: Resource<FunTranslationResponse["contents"] | undefined>;
};
const Output: VoidComponent<OutputProps> = (props) => {
  return (
    <>
      <Show when={props.result.loading}>
        <div class="w-full min-h-10 three-points-animation">Loading</div>
      </Show>
      <Show when={!!props.result.error}>
        <div class="w-full min-h-10">No 💋 </div>
      </Show>
      <Show when={props.result()}>
        <output class="w-full min-h-10">
          {"> "}
          {props.result()?.translated}
        </output>
      </Show>
    </>
  );
};

export default Output;
