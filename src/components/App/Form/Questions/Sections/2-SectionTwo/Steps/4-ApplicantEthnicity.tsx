import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { EthnicityStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const ethnicity = useFormDataSubscription('ethnicity');
  const { goToNextStep } = useNavigationLogic(
    'ApplicantBirthDate',
    ethnicity ? 'ApplicantEthnicityDetails' : 'ApplicantContactDetails',
  );

  return (
    <EthnicityStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${ApplicantFirstName.currentValue}'s ethnicity?`}
    />
  );
};

export default ApplicantAddress;
