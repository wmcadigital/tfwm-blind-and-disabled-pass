import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { FullNameStep } from 'components/sharedSteps';

const ApplicantName = () => {
  const { goToNextStep } = useNavigationLogic('CheckIfUserIsTheApplicant', 'Relationship');
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.savedValue ? 'What is your name?' : 'What is your name?';

  return (
    <FullNameStep handleNavigation={goToNextStep} dataNamePrefix="Behalf" question={question} />
  );
};

export default ApplicantName;
