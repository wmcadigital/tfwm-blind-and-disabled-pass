import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { BirthDateStep } from 'components/sharedSteps';

const ApplicantBirthDate = () => {
  const { goToNextStep } = useNavigationLogic('ApplicantName', 'ApplicantAddress');
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${ApplicantFirstName.currentValue}'s date of birth?`}
    />
  );
};

export default ApplicantBirthDate;
