import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { EthnicityDetailsStep } from 'components/sharedSteps';

const EthnicityDetails = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const ethnicity = useFormDataSubscription('ethnicity');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  const options = () => {
    const x = ethnicity.savedValue?.toLowerCase();
    switch (x) {
      case 'white':
        return 'White';
        break;
      case 'mixed':
        return 'Mixed or Multiple ethnic groups';
        break;
      case 'asian':
        return 'Asian or Asian British';
        break;
      case 'black':
        return 'Black, African, Caribbean or Black British';
        break;
      default:
        return '';
    }
  };
  const ethnicityHeader = options();
  const nextStep = applicationForMe.currentValue ? 'ApplicantContactDetails' : 'WhoToContact';

  const { goToNextStep } = useNavigationLogic('ApplicantEthnicity', nextStep);

  return (
    <EthnicityDetailsStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`Which of the following described ${pronoun} ${ethnicityHeader} background?`}
    />
  );
};

export default EthnicityDetails;
