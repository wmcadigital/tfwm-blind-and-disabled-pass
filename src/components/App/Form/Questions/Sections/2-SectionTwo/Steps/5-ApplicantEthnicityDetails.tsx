import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { EthnicityDetailsStep } from 'components/sharedSteps';

const EthnicityDetails = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  const nextStep = applicationForMe.currentValue ? 'ApplicantContactDetails' : 'WhoToContact';

  const { goToNextStep } = useNavigationLogic('ApplicantEthnicity', nextStep);

  return (
    <EthnicityDetailsStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`Which of the following described ${pronoun} background?`}
    />
  );
};

export default EthnicityDetails;
