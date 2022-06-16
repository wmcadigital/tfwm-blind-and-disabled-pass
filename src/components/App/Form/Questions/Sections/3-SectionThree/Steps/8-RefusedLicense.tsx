import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios, InsetText } from 'components/shared';

const RefusedLicense = () => {
  const { goToNextStep } = useNavigationLogic('DrivingLicense', 'Drive');
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const refusedDrivingLicense = useFormDataSubscription('refusedDrivingLicense');

  const handleContinue = () => {
    if (!refusedDrivingLicense.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      refusedDrivingLicense.savedValue !== null &&
      refusedDrivingLicense.currentValue !== refusedDrivingLicense.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
    }
    refusedDrivingLicense.save();
    goToNextStep();
  };
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    refusedDrivingLicense.set(e.target.value.toLowerCase() === 'true');
  };
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const question = applicationForMe.savedValue
    ? 'Have you ever applied for a Driving License but were refused due to your condition?'
    : `Has ${ApplicantFirstName.currentValue} ever applied for a Driving License but were refused due to their condition?`;
  let extraInfo;
  if (!applicationForMe.savedValue && refusedDrivingLicense.currentValue) {
    extraInfo = (
      <InsetText
        classes="wmnds-m-b-lg"
        content={`${ApplicantFirstName.currentValue} can still apply for a disabled person’s pass even if they have a driving licence.
        After you have submitted ${ApplicantFirstName.currentValue}'s application, you need to provide certificate of revocation from the Driver and Vehicle Licensing Agency (DVLA) indicating refusal or withdrawal of their licence.
        You’ll need to tell the DVLA about your medical condition to get ${ApplicantFirstName.currentValue}’s driving licence revoked.`}
      />
    );
  }
  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={refusedDrivingLicense.hasError}
    >
      <Radios
        name="refusedDrivingLicense"
        onChange={setCurrentValue}
        classes={extraInfo ? 'wmnds-m-b-sm' : ''}
        currentValue={refusedDrivingLicense.currentValue}
        error={refusedDrivingLicense.error}
        radios={[
          { text: 'Yes', html: null, value: true, info: null },
          { text: 'No', html: null, value: false, info: null },
        ]}
      />
      {extraInfo}
    </Question>
  );
};

export default RefusedLicense;
