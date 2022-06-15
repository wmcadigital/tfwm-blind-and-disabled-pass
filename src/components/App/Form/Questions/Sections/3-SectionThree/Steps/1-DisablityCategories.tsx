import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { CategoriesStep } from 'components/sharedSteps';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const DisablityCategories = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const filteredCategories = disabilityCategories.filter((x) => x !== '');
  const next = formPath[2].find((i) => i === filteredCategories[0]);
  const prevStep = applicationForMe.currentValue ? 'ApplicantContactDetails' : 'CurrentPass';
  const { goToNextStep } = useNavigationLogic(prevStep, next);

  const question = applicationForMe.currentValue
    ? 'Which of the following categories apply to you?'
    : 'Which of the following categories apply to them?';

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
