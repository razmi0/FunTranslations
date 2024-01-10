import { Match, Show, Switch } from "solid-js";
import type { Resource, VoidComponent } from "solid-js";
import LinkToGoogle from "./LinkToGoogle";

type OutputProps = {
  result: Resource<ContentType | undefined>;
};

const Output: VoidComponent<OutputProps> = (props) => {
  const text = () => props.result()?.text || "";
  const translated = () => props.result()?.translated || "";

  return (
    <>
      <Switch>
        <Match when={props.result.loading}>
          <div class="w-full min-h-10 three-dots-animation">Loading</div>
        </Match>
        <Match when={props.result.error}>
          <div class="w-full min-h-10">No 💋 </div>
        </Match>
        <Match when={props.result.latest}>
          <output class="w-full min-h-10 translated-text">
            {"> "}
            <LinkToGoogle searchParam={text()}>{translated()}</LinkToGoogle>
          </output>
        </Match>
      </Switch>
    </>
  );
};

export default Output;
