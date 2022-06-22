import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios, Input } from 'components/shared';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Distance = () => {
  const [formDataState] = useFormDataContext();

  const { disabilityCategories } = formDataState;
  const categories = disabilityCategories || [];

  const index = categories.indexOf('Walk');
  const next =
    index >= 0 && index < categories.length - 1
      ? formPath[2].find((i) => i === categories[index + 1])
      : 'Summary';
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const distance = useFormDataSubscription(`distance`);
  const distanceMetric = useFormDataSubscription(`distanceMetric`);
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const { goToNextStep } = useNavigationLogic('Walk', next);
  const question = applicationForMe.savedValue
    ? 'How far can you walk?'
    : `How far can ${ApplicantFirstName.currentValue} walk?`;

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    distanceMetric.set(e.target.value.toLowerCase() === 'true');
  };
  const title = applicationForMe.savedValue ? 'Before you' : 'Before they';
  const handleContinue = () => {
    if (!distanceMetric.validate()) return;
    distance.save();
    distanceMetric.save();
    goToNextStep();
  };
  const label = `${
    applicationForMe.savedValue ? 'Your' : `${ApplicantFirstName.currentValue}'s`
  } distance in ${distanceMetric.currentValue ? 'metres' : 'feet'}`;
  const pronoun = applicationForMe.savedValue ? 'you' : `${ApplicantFirstName.currentValue}`;
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
      <p>You can choose to enter how far {pronoun} can walk in metres or feet</p>
      <Radios
        classes="wmnds-m-b-none"
        name="distanceMetric"
        onChange={setCurrentValue}
        currentValue={distanceMetric.currentValue}
        error={distanceMetric.error}
        radios={[{ text: 'Metres', html: null, value: true, info: null }]}
      />
      {distanceMetric.currentValue && (
        <div className="wmnds-m-l-lg">
          <Input
            groupClassName="wmnds-m-b-lg wmnds-m-l-lg"
            name="distance"
            inputmode="text"
            label={label}
            type="number"
            className="wmnds-col-1 wmnds-col-md-2-3"
            defaultValue={distance.currentValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => distance.set(e.target.value)}
          />
        </div>
      )}
      <Radios
        classes="wmnds-m-b-none"
        name="distanceMetric"
        onChange={setCurrentValue}
        currentValue={distanceMetric.currentValue}
        error={distanceMetric.error}
        radios={[{ text: 'Feet', html: null, value: false, info: null }]}
      />
      {distanceMetric.currentValue !== null && !distanceMetric.currentValue && (
        <div className="wmnds-m-l-lg">
          <Input
            groupClassName="wmnds-m-b-lg wmnds-m-l-lg"
            name="distance"
            inputmode="text"
            label={label}
            type="number"
            className="wmnds-col-1 wmnds-col-md-2-3"
            defaultValue={distance.currentValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => distance.set(e.target.value)}
          />
        </div>
      )}
      <p> </p>
    </Question>
  );
};

export default Distance;
