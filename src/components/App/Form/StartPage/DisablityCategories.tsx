import { useState, useEffect } from 'react';
import Question from 'components/shared/Question/Question';
import { Checkbox } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TError } from 'types/validation';
import { Nullable } from 'types/helpers';
import { useFormDataContext } from 'state/formDataState/context';

const DisablityCategories = () => {
  const disabilityCategories1 = useFormDataSubscription('disabilityCategories');
  const alternateStart = useFormDataSubscription('alternateStart');
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const [hasDisability, setHasDisability] = useState(disabilityCategories || []);
  const [, setHasError] = useState<Nullable<TError>>(null);

  const toggleCheckboxValue = (
    setErrorState?: React.Dispatch<React.SetStateAction<Nullable<TError>>>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setErrorState) setErrorState(null);
      const arr = hasDisability;
      const item = e.target.name;
      const addOrRemove = () =>
        arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
      setHasDisability(addOrRemove());
      disabilityCategories1.set(addOrRemove());
      alternateStart.set(true);
    };
  };
  useEffect(() => {
    alternateStart.set(true);
  });
  const handleContinue = () => {
    disabilityCategories1.save();
    const isValid = disabilityCategories1.save();
    if (!isValid) return;
    alternateStart.set(true);
    alternateStart.save();
  };
  const question = 'Which of the following categories apply to you?';
  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={disabilityCategories1.hasError}
    >
      <p className="wmnds-m-b-lg">You can apply for more than one category</p>
      <div className="wmnds-m-b-lg">
        <Checkbox
          name="Blind"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Blind')}
          labelElement={<span>I am blind or partially sighted in both eyes</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Deaf"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Deaf')}
          labelElement={<span>I am deaf or only able to hear a little sound in both ears</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Language"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Language')}
          labelElement={<span>I cannot speak at all in any language</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Walk"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Walk')}
          labelElement={<span>I cannot walk or find it difficult to walk short distances</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Arms"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Arms')}
          labelElement={<span>I am unable to use both arms</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="Learn"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('Learn')}
          labelElement={
            <span>
              I find it hard to learn or remember new information, or I would or do find it hard to live on my own
            </span>
          }
          onChange={toggleCheckboxValue(setHasError)}
        />
        <Checkbox
          name="DrivingLicense"
          classes="wmnds-m-b-md"
          defaultValue={hasDisability.includes('DrivingLicense')}
          labelElement={<span>I cannot drive a car because I have a medical condition</span>}
          onChange={toggleCheckboxValue(setHasError)}
        />
      </div>
    </Question>
  );
};

export default DisablityCategories;
