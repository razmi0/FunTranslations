import TranslationSection, { TranslationHeader } from "./Translation";
import SentenceInput from "./Input";
import Select from "./Select";
import Button from "./Button";
import { mastersList } from "../stores/data";
import type { ParentComponent } from "solid-js";
import type { TranslationStoreType } from "../stores/translationStore";

type MainProps = {
  title: string;
  store: TranslationStoreType;
};

const InputSection = (props: MainProps) => {
  const heading = () => props.store.master().toLocaleUpperCase().replace(/[-_]/g, " ");

  return (
    <section class="pt-3">
      <div class="border-r-2">
        {/* */}

        <SelectSection title={props.title}>
          <Select masters={mastersList} onSelected={props.store.chooseMaster} selected={props.store.master} />
          <Button onClick={props.store.randomizeAll} classes="h-12 slider-btn-ctn">
            Random
          </Button>
        </SelectSection>

        {/* */}

        <TranslationSection>
          <TranslationHeader>{heading()}</TranslationHeader>
          <SentenceInput
            setText={props.store.chooseSentence}
            text={props.store.sentence()}
            placeholder={props.store.randomSentence()}
            onEnter={props.store.translate}
          />
          <Button onClick={props.store.translate} classes="h-12">
            Translate
          </Button>
        </TranslationSection>
      </div>
    </section>
  );
};
type SelectSectionProps = {
  title: string;
};
const SelectSection: ParentComponent<SelectSectionProps> = (props) => {
  return (
    <div class="my-3">
      <h2>{props.title} : </h2>
      <div class="flex pl-2 gap-2 mt-1 flex-wrap heeere">{props.children}</div>
    </div>
  );
};

export default InputSection;
