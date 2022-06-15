import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios, Input } from 'components/shared';

const Distance = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const distance = useFormDataSubscription(`distance`);
  const distanceMetric = useFormDataSubscription(`distanceMetric`);
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const { goToNextStep } = useNavigationLogic('Walk', 'Summary');
  const question = applicationForMe
    ? 'How far can you walk?'
    : `How far can ${ApplicantFirstName.currentValue} walk?`;

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    distanceMetric.set(e.target.value.toLowerCase() === 'true');
  };
  const title = applicationForMe.savedValue ? 'Before you' : 'Before they';
  const handleContinue = () => {
    if (!distanceMetric.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      distanceMetric.savedValue !== null &&
      distanceMetric.currentValue !== distanceMetric.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
    }
    distance.save();
    distanceMetric.save();
    goToNextStep();
  };
  const label = `Distance in ${distanceMetric.currentValue ? 'metres' : 'feet'}`;
  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={applicationForMe.hasError}
    >
      <p>{title}</p>
      <ul>
        <li>Need to stop</li>
        <li>Get in a lot of pain</li>
        <li>Need help from another person</li>
      </ul>
      <p>You can choose to enter how far they can walk in metres or feet</p>
      <Radios
        name="distanceMetric"
        onChange={setCurrentValue}
        currentValue={distanceMetric.currentValue}
        error={distanceMetric.error}
        radios={[
          { text: 'Metres', html: null, value: true, info: null },
          { text: 'Feet', html: null, value: false, info: null },
        ]}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        name="distance"
        inputmode="text"
        label={label}
        type="number"
        className="wmnds-col-1 wmnds-col-md-2-3"
        defaultValue={distance.currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => distance.set(e.target.value)}
      />
    </Question>
  );
};

export default Distance;
