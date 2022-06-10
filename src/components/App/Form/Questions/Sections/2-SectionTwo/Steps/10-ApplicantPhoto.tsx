import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { PhotoUploadStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';

const ApplicantPhoto = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const [formDataState] = useFormDataContext();
  const { alternateStart } = formDataState;
  const next = alternateStart ? 'RightCategories' : 'DisablityCategories';
  const prevStep = 'ApplicantContactDetails';

  const nextStep = applicationForMe ? next : 'Name';
  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  return (
    <PhotoUploadStep
      handleNavigation={goToNextStep}
      question={`Upload a photo of ${ApplicantFirstName.currentValue}`}
    />
  );
};

export default ApplicantPhoto;
