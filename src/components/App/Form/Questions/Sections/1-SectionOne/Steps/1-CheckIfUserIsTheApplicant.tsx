import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const CheckIfUserIsTheApplicant = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const [, formDataDispatch] = useFormDataContext();

  const applicationForMe = useFormDataSubscription('applicationForMe');

  const prevStep = 'StartPage';

  const nextStep = applicationForMe.currentValue ? 'ApplicantName' : 'ApplicantName';
  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    applicationForMe.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    if (!applicationForMe.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      applicationForMe.savedValue !== null &&
      applicationForMe.currentValue !== applicationForMe.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
      else {
        formDataDispatch({ type: 'CLEAR_TICKET_HOLDER_DATA' });
        formDataDispatch({ type: 'CLEAR_PAYER_DATA' });
      }
    }
    applicationForMe.save();
    goToNextStep();
  };

  return (
    <Question
      question="Are you applying for your own pass?"
      handleContinue={handleContinue}
      showError={applicationForMe.hasError}
    >
      <Radios
        name="isApplicationForMe"
        onChange={setCurrentValue}
        currentValue={applicationForMe.currentValue}
        error={applicationForMe.error}
        radios={[
          { text: 'Yes', html: null, value: true, info: null },
          { text: 'No', html: null, value: false, info: null },
        ]}
      />
    </Question>
  );
};

export default CheckIfUserIsTheApplicant;
