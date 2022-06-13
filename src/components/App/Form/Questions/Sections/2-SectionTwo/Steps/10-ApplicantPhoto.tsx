import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { PhotoUploadStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';

const ApplicantPhoto = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? '' : `of ${ApplicantFirstName.currentValue}`;
  const [formDataState] = useFormDataContext();
  const { alternateStart } = formDataState;
  const next = alternateStart ? 'RightCategories' : 'DisablityCategories';
  const prevStep = 'ApplicantContactDetails';

  const nextStep = applicationForMe.savedValue ? next : 'Name';
  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);

  return <PhotoUploadStep handleNavigation={goToNextStep} question={`Upload a photo ${pronoun}`} />;
};

export default ApplicantPhoto;
