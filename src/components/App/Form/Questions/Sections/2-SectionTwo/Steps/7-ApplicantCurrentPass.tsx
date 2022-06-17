import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const CurrentPass = () => {
  const currentDisabledPass = useFormDataSubscription('currentDisabledPass');
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const prevStep = 'ApplicantContactDetails';
  const next = applicationForMe.savedValue ? 'DisablityCategories' : 'Name';
  const nextStep = currentDisabledPass.savedValue ? 'CurrentPassNumber' : next;
  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentDisabledPass.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    currentDisabledPass.save();
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
