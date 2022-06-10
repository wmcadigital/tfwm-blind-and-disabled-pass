import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Input } from 'components/shared';
import { useFormDataContext } from 'state/formDataState/context';

const Distance = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const relationshipToApplicant = useFormDataSubscription(`relationshipToApplicant`);
  const [formDataState] = useFormDataContext();
  const { alternateStart } = formDataState;
  const next = alternateStart ? 'RightCategories' : 'DisablityCategories';
  const { goToNextStep } = useNavigationLogic('Name', next);
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const handleContinue = () => {
    relationshipToApplicant.save();
    goToNextStep();
  };

  return (
    <Question
      question={`What is your relationship to ${ApplicantFirstName.currentValue}`}
      handleContinue={handleContinue}
      showError={applicationForMe.hasError}
    >
      <Input
        groupClassName="wmnds-m-b-lg"
        name="distance"
        inputmode="text"
        label="Relationship to applicant"
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        defaultValue={relationshipToApplicant.currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          relationshipToApplicant.set(e.target.value)
        }
      />
    </Question>
  );
};

export default Distance;
