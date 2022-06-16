import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const DrivingLicense = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const hasDrivingLicense = useFormDataSubscription('hasDrivingLicense');
  const nextStep = hasDrivingLicense.currentValue ? 'Drive' : 'RefusedLicense';
  const { goToNextStep } = useNavigationLogic('DisablityCategories', nextStep);
  const handleContinue = () => {
    if (!hasDrivingLicense.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      hasDrivingLicense.savedValue !== null &&
      hasDrivingLicense.currentValue !== hasDrivingLicense.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
    }
    hasDrivingLicense.save();
    goToNextStep();
  };
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasDrivingLicense.set(e.target.value.toLowerCase() === 'true');
  };
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'you' : `${ApplicantFirstName.currentValue}`;

  return (
    <Question
      question={`Do ${pronoun} have a driving license?`}
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
