import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { ContactDetailsStep } from 'components/sharedSteps';

const ApplicantContactDetails = () => {
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const previousStep = applicationForMe.currentValue ? 'ApplicantEthnicityDetails' : 'WhoToContact';
  const { goToNextStep } = useNavigationLogic(previousStep, 'CurrentPass');
  const contactPerson = useFormDataSubscription('contactPerson');
  const contact = contactPerson.savedValue ? 'you' : ApplicantFirstName.savedValue;
  const question = applicationForMe.savedValue
    ? 'How would you like to be contacted about the application?'
    : `How would ${contact} like to be contacted about the application?`;

  const dataNamePrefix = applicationForMe.savedValue ? 'Applicant' : 'Behalf';

  return (
    <ContactDetailsStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default ApplicantContactDetails;
