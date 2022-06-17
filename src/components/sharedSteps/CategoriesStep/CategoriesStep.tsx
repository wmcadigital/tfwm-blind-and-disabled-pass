import { useState } from 'react';
import Question from 'components/shared/Question/Question';
import { Checkbox } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TError } from 'types/validation';
import { Nullable } from 'types/helpers';

import { TCategoriesStepProps } from 'types/step';

const CategoriesStep = ({ handleNavigation, question, categories }: TCategoriesStepProps) => {
  const disabilityCategories = useFormDataSubscription('disabilityCategories');
  const [hasDisability, setHasDisability] = useState(categories || []);
  const [, setHasError] = useState<Nullable<TError>>(null);
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const toggleCheckboxValue = (
    setErrorState?: React.Dispatch<React.SetStateAction<Nullable<TError>>>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setErrorState) setErrorState(null);
      const arr = hasDisability || [];
      const item = e.target.name;
      const addOrRemove = () =>
        arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
      setHasDisability(addOrRemove());
      disabilityCategories.set(addOrRemove());
    };
  };

  const handleContinue = async () => {
    const isValid = disabilityCategories.save();
    if (!isValid) return;
    disabilityCategories.save();
    handleNavigation();
  };
  const own = applicationForMe.savedValue ? 'You' : `They`;
  const pronoun = applicationForMe.savedValue ? 'I' : `They`;
  const pronounSmall = applicationForMe.savedValue ? 'I' : `they`;
  const pronounOwn = applicationForMe.savedValue ? 'my' : `their`;
  const prep = applicationForMe.savedValue ? 'am' : `are`;

  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={disabilityCategories.hasError}
    >
      <p className="wmnds-m-b-lg">{own} can apply for more than one category</p>
      <div className="wmnds-m-b-lg">
        <Checkbox
          name="Blind"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Blind')}
          labelElement={
            <span>
              {pronoun} {prep} blind or partially sighted in both eyes
            </span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Deaf"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Deaf')}
          labelElement={
            <span>
              {pronoun} {prep} very deaf or only able to hear a little sound in both ears
            </span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Language"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Language')}
          labelElement={<span>{pronoun} cannot speak at all in any language</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Walk"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Walk')}
          labelElement={
            <span>{pronoun} cannot walk or find it difficult to walk short distances</span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Arms"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Arms')}
          labelElement={
            <span>
              {pronoun} {prep} unable to use both arms
            </span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Learn"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Learn')}
          labelElement={
            <span>
              {pronoun} find it hard to learn, remember new information and live on {pronounOwn} own
            </span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="DrivingLicense"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('DrivingLicense')}
          labelElement={
            <span>
              {pronoun} cannot drive a car because {pronounSmall} have a medical condition
            </span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
      </div>
    </Question>
  );
};

export default CategoriesStep;
