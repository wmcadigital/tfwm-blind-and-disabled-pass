import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { BirthDateStep } from 'components/sharedSteps';

const ApplicantBirthDate = () => {
  const { goToNextStep } = useNavigationLogic('ApplicantName', 'ApplicantAddress');
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${pronoun} date of birth?`}
    />
  );
};

export default ApplicantBirthDate;
