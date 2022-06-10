import { useNavigationLogic } from 'customHooks';
import { DisabilityProofStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const Learn = () => {
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;

  const index = disabilityCategories.indexOf('Learn');
  const next =
    index >= 0 && index < disabilityCategories.length - 1
      ? formPath[2].find((i) => i === disabilityCategories[index + 1])
      : 'Summary';

  const prevStep = 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic(prevStep, next);
  const question =
    'Proof of disability - find it hard to learn and remember new information and live independently';
  const canApply = true;

  const application = () => {
    return (
      <>
        <p>
          We use the World Health Organisation (WHO) guidance which says that someone is learning
          disabled if <strong>all three statements</strong> apply:
        </p>

        <ul>
          <li>It is difficult to understand complex information or learn new skills</li>
          <li>it is difficult to live independently</li>
          it is difficult to live independently
          <li />
        </ul>
      </>
    );
  };
  const documentsList = () => {
    return (
      <ul>
        <li>A letter from your school about your learning ability</li>
        <li>
          The full statement of Special Educational Needs or Individual Education Plan and any
          reviews
        </li>
        <li>Your care plan or support plan</li>
        <li>
          A letter from social services or from a manager of a residential care home that says you
          meet the three statements above.
        </li>
        <li>
          A copy of your patient summary, confirming you have been diagnosed with a severe, moderate
          or mild learning disability. This can be obtained from your Doctors surgery.
        </li>
        <li>
          A letter from a medical professional such as a GP, that says you have a learning
          disability and whether it is mild, moderate or severe. A medical professional does not
          have to be your GP. For example, it can also include a CPN, learning disability
          specialist, Occupational Health therapist or a Psychiatrist.
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
      dataCategoryPrefix="Learn"
      alternateEvidence={false}
    />
  );
};

export default Learn;
