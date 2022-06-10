import { DrivingLicenseStep } from 'components/sharedSteps';
import { useNavigationLogic } from 'customHooks';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

const DrivingLicense = () => {
  const { goToNextStep } = useNavigationLogic('DisablityCategories', 'Drive');
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = `Do you have a Driving License?`;
  const dataNamePrefix = applicationForMe.currentValue ? 'Applicant' : 'Behalf';

  return (
    <DrivingLicenseStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default DrivingLicense;
