import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { FullNameStep } from 'components/sharedSteps';

const ApplicantName = () => {
  const { goToNextStep } = useNavigationLogic('CheckIfUserIsTheApplicant', 'ApplicantBirthDate');
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.savedValue
    ? 'What is your name?'
    : 'Who are you registering for?';

  return (
    <FullNameStep handleNavigation={goToNextStep} dataNamePrefix="Applicant" question={question} />
  );
};

export default ApplicantName;
