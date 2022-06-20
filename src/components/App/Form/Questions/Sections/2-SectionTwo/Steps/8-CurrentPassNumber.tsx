import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { CurrentPassStep } from 'components/sharedSteps';

const CurrentPass = () => {
  const { goToNextStep } = useNavigationLogic('CurrentPass', 'ChangePhoto');
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.currentValue
    ? `What is your current disabled person's pass number?`
    : `What is ${ApplicantFirstName.currentValue}'s current disabled person's pass number?`;

  const dataNamePrefix = applicationForMe.currentValue ? 'Applicant' : 'Behalf';

  return (
    <CurrentPassStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default CurrentPass;
