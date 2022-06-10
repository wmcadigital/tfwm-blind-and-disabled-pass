import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const { goToNextStep } = useNavigationLogic('ApplicantBirthDate', 'ApplicantEthnicity');
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${ApplicantFirstName.currentValue}'s address?`}
    />
  );
};

export default ApplicantAddress;
