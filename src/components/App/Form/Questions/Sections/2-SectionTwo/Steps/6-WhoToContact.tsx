import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const WhoToContact = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const { goToNextStep } = useNavigationLogic(
    'ApplicantEthnicityDetails',
    'ApplicantContactDetails',
  );

  const contactPerson = useFormDataSubscription('contactPerson');

  const handleContinue = () => {
    if (!contactPerson.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      contactPerson.savedValue !== null &&
      contactPerson.currentValue !== contactPerson.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
    }
    contactPerson.save();
    goToNextStep();
  };
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    contactPerson.set(e.target.value.toLowerCase() === 'true');
  };
  const applicant = ApplicantFirstName.currentValue || '';

  return (
    <Question
      question="Who should we contact about this application?"
      handleContinue={handleContinue}
      showError={contactPerson.hasError}
    >
      <Radios
        name="contactPerson"
        onChange={setCurrentValue}
        currentValue={contactPerson.currentValue}
        error={contactPerson.error}
        radios={[
          { text: 'Me', html: null, value: true, info: null },
          { text: applicant, html: null, value: false, info: null },
        ]}
      />
    </Question>
  );
};

export default WhoToContact;
