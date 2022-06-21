import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Drive = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const categories = disabilityCategories || [];

  const index = categories.indexOf('Drive');
  const next =
    index >= 0 && index < categories.length - 1
      ? formPath[2].find((i) => i === categories[index + 1])
      : 'Summary';

  const prevStep = 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question = `Proof of disability - cannot drive a car because ${
    applicationForMe.currentValue ? 'I' : 'they'
  } have a medical condition`;
  const canApply = true;
  const pronoun = applicationForMe.currentValue ? 'you' : 'they';
  const pronounOwn = applicationForMe.currentValue ? 'your' : 'their';
  const pronounPre = applicationForMe.currentValue ? 'yourself' : 'themself';

  const application = () => {
    return (
      <>
        <ul>
          <li>
            if {pronoun} would be refused a driving licence because of {pronounOwn} medical
            condition
          </li>
          <li>if {pronoun} are over 16.</li>
        </ul>
        <p>
          {pronoun} <strong>may</strong> get a pass if {pronoun} have one of these conditions
        </p>
        <ul>
          <li>have fits {pronoun} cannot control (epilepsy)</li>
          <li>have severe mental health issues</li>
          <li>may suddenly faint or black out</li>
          <li>any disability that makes it dangerous for {pronoun} to drive.</li>
        </ul>
        <p>
          We might need more proof or a healthcare assessment to understand how severe {pronounOwn}
          condition is.
        </p>
      </>
    );
  };
  const applicationNot = () => {
    return (
      <>
        <ul>
          <li>if {pronoun} have a driving licence</li>
          <li>if {pronounOwn} medical condition is due to alcohol or drugs</li>
        </ul>
      </>
    );
  };
  const documentsList = () => {
    return (
      <ul>
        <li>Proof of any medicine {pronoun} have taken in the last six months</li>
        <li>A medical letter about {pronounOwn} epilepsy or seizure</li>
        <li>
          A letter from the Driving and Vehicle Licensing Agency (DVLA), less than 12 months old,
          that says {pronounOwn} driving licence has been refused or taken away
        </li>
        <li>
          A letter from {pronounOwn} GP, CPN, Epilepsy specialist, Occupational Health therapist or
          Psychiatrist, that:
          <ul>
            <li>
              Says {pronoun} would not get a driving licence if {pronoun} applied
            </li>
            <li>
              says {pronoun} would be a danger to {pronounPre} or others if {pronoun} did drive
            </li>
            <li>confirms {pronounOwn} condition</li>
          </ul>
        </li>
      </ul>
    );
  };

  return (
    <DisabilityProofStep
      handleNavigation={goToNextStep}
      question={question}
      documentsList={documentsList}
      application={application}
      canApply={canApply}
      applicationNot={applicationNot}
      dataCategoryPrefix="Drive"
      alternateEvidence={false}
    />
  );
};

export default Drive;
