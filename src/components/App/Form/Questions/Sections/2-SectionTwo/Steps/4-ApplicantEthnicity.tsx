import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { EthnicityStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  const ethnicity = useFormDataSubscription('ethnicity');
  const nextStep = applicationForMe.currentValue ? 'ApplicantContactDetails' : 'WhoToContact';
  const { goToNextStep } = useNavigationLogic(
    'ApplicantAddress',
    ethnicity.savedValue !== 'Prefer not to say' ? 'ApplicantEthnicityDetails' : nextStep,
  );

  return (
    <EthnicityStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${pronoun} ethnicity group?`}
    />
  );
};

export default ApplicantAddress;
