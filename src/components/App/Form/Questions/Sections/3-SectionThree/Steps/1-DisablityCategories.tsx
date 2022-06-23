import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { CategoriesStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const DisablityCategories = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const [formDataState] = useFormDataContext();
  const { disabilityCategories, alternateStart } = formDataState;
  const filteredCategories = disabilityCategories
    ? disabilityCategories.filter((x) => x !== '')
    : [];
  const arr = [
    'Blind',
    'Deaf',
    'Language',
    'Walk',
    'Distance',
    'Arms',
    'Learn',
    'DrivingLicense',
    'RefusedLicense',
    'Drive',
  ];
  filteredCategories.sort((a, b) => arr.indexOf(a) - arr.indexOf(b));
  const next = formPath[2].find((i) => i === filteredCategories[0]);
  const prevStep = alternateStart ? 'RightCategories' : 'CurrentPass';
  const { goToNextStep } = useNavigationLogic(prevStep, next);

  const question = applicationForMe.currentValue
    ? 'Which of the following categories apply to you?'
    : `Which of the following categories apply to ${ApplicantFirstName.currentValue}?`;

  const dataNamePrefix = applicationForMe.currentValue ? 'Applicant' : 'Behalf';

  return (
    <CategoriesStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
      categories={disabilityCategories}
    />
  );
};

export default DisablityCategories;
