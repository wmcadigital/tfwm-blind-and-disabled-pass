import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { EthnicityDetailsStep } from 'components/sharedSteps';

const EthnicityDetails = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  console.log('ppp', applicationForMe);
  const nextStep = applicationForMe.currentValue ? 'ApplicantContactDetails' : 'WhoToContact';

  const { goToNextStep } = useNavigationLogic('ApplicantEthnicity', nextStep);
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  return (
    <EthnicityDetailsStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`Which of the following described ${ApplicantFirstName.currentValue}'s background?`}
    />
  );
};

export default EthnicityDetails;
