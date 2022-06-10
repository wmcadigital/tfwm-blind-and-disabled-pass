import { useNavigationLogic } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Drive = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;

  const index = disabilityCategories.indexOf('Drive');
  const next =
    index >= 0 && index < disabilityCategories.length - 1
      ? formPath[2].find((i) => i === disabilityCategories[index + 1])
      : 'Summary';

  const prevStep = 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question = 'Proof of disability - cannot drive a car because I have a medical condition';
  const canApply = true;

  const application = () => {
    return (
      <>
        <ul>
          <li>if you would be refused a driving licence because of your medical condition</li>
          <li>if you are over 16.</li>
        </ul>
        <p>You may get a pass if you have one of these conditions</p>
        <ul>
          <li>have fits you cannot control (epilepsy)</li>
          <li>have severe mental health issues</li>
          <li>may suddenly faint or black out</li>
          <li>any disability that makes it dangerous for you to drive.</li>
        </ul>
      </>
    );
  };
  const applicationNot = () => {
    return (
      <>
        <ul>
          <li>if you have a driving licence</li>
          <li>if your medical condition is due to alcohol or drugs</li>
        </ul>
      </>
    );
  };
  const documentsList = () => {
    return (
      <ul>
        <li>Proof of any medicine you have taken in the last six months</li>
        <li>A medical letter about your epilepsy or seizure</li>
        <li>
          A letter from the Driving and Vehicle Licensing Agency (DVLA), less than 12 months old,
          that says your driving licence has been refused or taken away
        </li>
        <li>
          A letter from your GP, CPN, Epilepsy specialist, Occupational Health therapist or
          Psychiatrist, that:
          <ul>
            <li>Says you would not get a driving licence if you applied</li>
            <li>says you would be a danger to yourself or others if you did drive</li>
            <li>confirms your condition</li>
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
