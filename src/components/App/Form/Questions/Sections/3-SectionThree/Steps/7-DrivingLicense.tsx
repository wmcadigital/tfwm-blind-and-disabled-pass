import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const DrivingLicense = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const hasDrivingLicense = useFormDataSubscription('hasDrivingLicense');
  const nextStep = hasDrivingLicense.currentValue ? 'Drive' : 'RefusedLicense';
  const { goToNextStep } = useNavigationLogic('DisablityCategories', nextStep);
  const handleContinue = () => {
    if (!hasDrivingLicense.validate()) return;
    hasDrivingLicense.save();
    goToNextStep();
  };
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasDrivingLicense.set(e.target.value.toLowerCase() === 'true');
  };
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue
    ? 'Do you'
    : `Does ${ApplicantFirstName.currentValue}`;

  return (
    <Question
      question={`${pronoun} have a driving license?`}
      handleContinue={handleContinue}
      showError={hasDrivingLicense.hasError}
    >
      <>
        <p>Full or provisional</p>
        <Radios
          name="drivingLicense"
          onChange={setCurrentValue}
          currentValue={hasDrivingLicense.currentValue}
          error={hasDrivingLicense.error}
          radios={[
            { text: 'Yes', html: null, value: true, info: null },
            { text: 'No', html: null, value: false, info: null },
          ]}
        />
      </>
    </Question>
  );
};

export default DrivingLicense;
