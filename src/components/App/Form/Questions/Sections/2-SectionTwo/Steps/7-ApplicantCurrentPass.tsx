import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const CurrentPass = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const [, formDataDispatch] = useFormDataContext();

  const currentDisabledPass = useFormDataSubscription('currentDisabledPass');
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const prevStep = 'ApplicantContactDetails';
  const next = applicationForMe.currentValue ? 'DisablityCategories' : 'Name';
  const nextStep = currentDisabledPass.savedValue ? 'CurrentPassNumber' : next;
  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentDisabledPass.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    if (!currentDisabledPass.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      currentDisabledPass.savedValue !== null &&
      currentDisabledPass.currentValue !== currentDisabledPass.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
      else {
        formDataDispatch({ type: 'CLEAR_TICKET_HOLDER_DATA' });
        formDataDispatch({ type: 'CLEAR_PAYER_DATA' });
      }
    }
    currentDisabledPass.save();
    goToNextStep();
  };

  const question = applicationForMe.currentValue
    ? `Do you already have a disabled person's pass?`
    : `Do you already have a disabled person's pass?`;

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
