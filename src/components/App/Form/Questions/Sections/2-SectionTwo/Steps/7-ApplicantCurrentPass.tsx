import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';
import { useGlobalContext } from 'state/globalState';

const CurrentPass = () => {
  const currentDisabledPass = useFormDataSubscription('currentDisabledPass');
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const prevStep = 'ApplicantContactDetails';
  const nextStep = currentDisabledPass.savedValue ? 'CurrentPassNumber' : 'ApplicantPhoto';
  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);
  const [, globalStateDispatch] = useGlobalContext();

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentDisabledPass.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    currentDisabledPass.save();
    // If user changes this step we need to delete any saved data
    if (currentDisabledPass.currentValue) {
      globalStateDispatch({
        type: 'GO_TO_SECTION_AND_STEP',
        payload: { section: 2, step: 9 },
      });
    }
    goToNextStep();
  };

  const question = applicationForMe.currentValue
    ? `Do you already have a disabled person's pass?`
    : `Do they already have a disabled person's pass?`;

  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={currentDisabledPass.hasError}
    >
      <Radios
        name="currentDisabledPass"
        onChange={setCurrentValue}
        currentValue={currentDisabledPass.currentValue}
        error={currentDisabledPass.error}
        radios={[
          { text: 'Yes', html: null, value: true, info: null },
          { text: 'No', html: null, value: false, info: null },
        ]}
      />
    </Question>
  );
};

export default CurrentPass;
