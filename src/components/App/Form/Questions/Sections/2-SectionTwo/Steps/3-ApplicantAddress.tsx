import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const { goToNextStep } = useNavigationLogic('ApplicantBirthDate', 'ApplicantEthnicity');
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${pronoun} address?`}
    />
  );
};

export default ApplicantAddress;
