import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Deaf = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const categories = disabilityCategories || [];

  const index = categories.indexOf('Deaf');
  const next =
    index >= 0 && index < categories.length - 1
      ? formPath[2].find((i) => i === categories[index + 1])
      : 'Summary';
  const previous =
    index >= 0 ? formPath[2].find((i) => i === categories[index - 1]) : 'DisablityCategories';
  const prevStep = previous || 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question =
    'Proof of disability - very deaf or only able to hear a little sound in both ears';
  const application = () => {
    return undefined;
  };
  const canApply = false;
  const pronoun = applicationForMe.currentValue ? 'you' : 'they';
  const pronounOwn = applicationForMe.currentValue ? 'your' : 'their';

  const documentsList = () => {
    return (
      <ul>
        <li>
          Proof {pronoun} are registered with {pronounOwn} local social services department as deaf
        </li>
        <li>Audiogram from a specialist saying {pronoun} cannot hear very well</li>
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
