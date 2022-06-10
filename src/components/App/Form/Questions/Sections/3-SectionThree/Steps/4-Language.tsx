import { useNavigationLogic } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Language = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;

  const index = disabilityCategories.indexOf('Language');
  const next =
    index >= 0 && index < disabilityCategories.length - 1
      ? formPath[2].find((i) => i === disabilityCategories[index + 1])
      : 'Summary';

  const prevStep = 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const canApply = false;
  const question = 'Proof of disability - cannot speak at all in any language';
  const application = () => {
    return (
      <>
        <p>If their speech is slow or difficult to understand.</p>
      </>
    );
  };
  const documentsList = () => {
    return (
      <ul>
        <li>
          A letter from Department of Works and Pensions (DWP) less than 12 months old that says you
          get a Personal Independence Payment (PIP) with a score of 8 or more in the Communicating
          verbally activity.
        </li>
        <li>A medical report that says you do not have any speech</li>
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
      dataCategoryPrefix="Language"
      alternateEvidence={false}
    />
  );
};

export default Language;
