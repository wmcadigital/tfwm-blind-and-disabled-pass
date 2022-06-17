import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Walk = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const categories = disabilityCategories || [];

  const index = categories.indexOf('Walk');
  const next =
    index >= 0 && index < categories.length - 1
      ? formPath[2].find((i) => i === categories[index + 1])
      : 'Summary';

  const prevStep = 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question = 'Proof of disability - cannot walk or find it difficult to walk short distances';
  const application = () => {
    return (
      <>
        <p>Their impairment is the same as someone who gets</p>

        <ul>
          <li>high rate mobility component of the Disability Living Allowance (DLA)</li>
          <li>
            Standard or enhanced rate of the mobility component of Personal Independence Payments
            (PIP).
          </li>
        </ul>
      </>
    );
  };
  const canApply = true;
  const pronoun = applicationForMe.currentValue ? 'you' : 'they';
  const pronounOwn = applicationForMe.currentValue ? 'your' : 'their';
  const documentsList = () => {
    return (
      <ul>
        <li>
          A letter from Department of Works and Pensions (DWP) less than 12 months old that says{' '}
          {pronoun}
          get the High Rate Mobility Component of the Disability Living Allowance
        </li>
        <li>
          A letter from Department of Works and Pensions (DWP) less than 12 months old that says{' '}
          {pronoun}
          get a Personal Independence Payment (PIP) with a score of 8 or more in the &apos;Moving
          around&apos; activity
        </li>
        <li>
          A letter from the Service Personnel &amp; Veterans Agency (SPA) that says {pronoun} get a
          War Pensions Mobility Supplement (WPMS)
        </li>
        <li>
          A copy of both sides of {pronounOwn} Disabled Persons&apos; Parking permit (Blue badge).
          This must be one of the new style plastic permits.
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
      dataCategoryPrefix="Walk"
      alternateEvidence
    />
  );
};

export default Walk;
