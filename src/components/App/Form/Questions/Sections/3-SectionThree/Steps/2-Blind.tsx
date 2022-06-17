import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Blind = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const index = disabilityCategories.indexOf('Blind');
  const next =
    index >= 0 && index < disabilityCategories.length - 1
      ? formPath[2].find((i) => i === disabilityCategories[index + 1])
      : 'Summary';
  const { goToNextStep } = useNavigationLogic('DisablityCategories', next);

  const question = 'Proof of disability - blind or partially sighted in both eyes';
  const application = () => {
    return undefined;
  };
  const canApply = false;
  const pronoun = applicationForMe.currentValue ? 'your' : 'their';

  const documentsList = () => {
    return (
      <ul>
        <li>A registration card from {pronoun} local council</li>
        <li>Certificate of Vision Impairment (a CVI, which used to be called a BD8)</li>
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
      dataCategoryPrefix="Blind"
      alternateEvidence={false}
    />
  );
};

export default Blind;
