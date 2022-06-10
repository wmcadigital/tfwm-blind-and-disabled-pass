import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const PayerAddress = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.currentValue
    ? 'What is your address?'
    : "What is the payer's address?";

  const dataNamePrefix = applicationForMe.currentValue ? 'Applicant' : 'Behalf';

  const { goToNextStep } = useNavigationLogic('DrivingLicense');

  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerAddress;
