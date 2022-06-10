import { useNavigationLogic } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Deaf = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;

  const index = disabilityCategories.indexOf('Deaf');
  const next =
    index >= 0 && index < disabilityCategories.length - 1
      ? formPath[2].find((i) => i === disabilityCategories[index + 1])
      : 'Summary';

  const prevStep = 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question =
    'Proof of disability - very deaf or only able to hear a little sound in both ears';
  const application = () => {
    return undefined;
  };
  const canApply = false;

  const documentsList = () => {
    return (
      <ul>
        <li>Proof you are registered with your local social services department as deaf</li>
        <li>Audiogram from a specialist saying you cannot hear very well</li>
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
      dataCategoryPrefix="Deaf"
      alternateEvidence={false}
    />
  );
};

export default Deaf;
