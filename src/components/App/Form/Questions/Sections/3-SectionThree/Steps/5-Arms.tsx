import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Arms = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const categories = disabilityCategories || [];

  const index = categories.indexOf('Arms');
  const next =
    index >= 0 && index < categories.length - 1
      ? formPath[2].find((i) => i === categories[index + 1])
      : 'Summary';

  const previous =
    index >= 0 ? formPath[2].find((i) => i === categories[index - 1]) : 'DisablityCategories';
  const prevStep = previous || 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question = 'Proof of disability - unable to use both arms';
  const canApply = true;
  const pronouns = applicationForMe.currentValue ? 'your' : 'their';

  const application = () => {
    return (
      <>
        <p>
          If {pronouns} disability has a big impact on daily activities such as paying a fare on a
          bus or train.
        </p>
      </>
    );
  };
  const pronoun = applicationForMe.currentValue ? 'you' : 'they';
  const documentsList = () => {
    return (
      <ul>
        <li>A medical report that says {pronoun} cannot use both arms for daily tasks</li>
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
      dataCategoryPrefix="Arms"
      alternateEvidence={false}
    />
  );
};

export default Arms;
