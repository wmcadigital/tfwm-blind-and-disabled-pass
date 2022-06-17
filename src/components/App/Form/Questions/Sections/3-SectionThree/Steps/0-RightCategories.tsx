import { useState } from 'react';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Button } from 'components/shared';
import { useFormDataContext } from 'state/formDataState/context';
import { formPath } from 'components/App/Form/Questions/Sections';

const RightCategories = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const [formDataState] = useFormDataContext();
  const { disabilityCategories } = formDataState;
  const [changeCondition, setChangeCondition] = useState(false);

  const prevStep = applicationForMe.currentValue ? 'CheckIfUserIsTheApplicant' : 'CurrentPass';
  const index = disabilityCategories.indexOf('');
  const next =
    index >= 0 && index < disabilityCategories.length - 1
      ? formPath[2].find((i) => i === disabilityCategories[index + 1])
      : 'Summary';

  const nextStep = !changeCondition ? next : 'DisablityCategories';

  const { goToNextStep } = useNavigationLogic(prevStep, nextStep);

  const handleContinue = () => {
    goToNextStep();
  };

  const handleChange = () => {
    setChangeCondition(true);
    goToNextStep();
  };

  return (
    <Question
      question="Are these the right categories?"
      handleContinue={handleContinue}
      showError={applicationForMe.hasError}
    >
      <p>You told us earlier that you:</p>
      <ul>
        {disabilityCategories.includes('Blind') && (
          <li>are blind or partially sighted in both eyes</li>
        )}
        {disabilityCategories.includes('Deaf') && (
          <li>are very deaf or only able to hear a little sound in both ears</li>
        )}
        {disabilityCategories.includes('Walk') && (
          <li>cannot walk or find it difficult to walk short distances</li>
        )}
        {disabilityCategories.includes('Language') && <li>cannot speak at all in any language</li>}
        {disabilityCategories.includes('Learn') && (
          <li>find it hard to learn and remember new information and live independently</li>
        )}
        {disabilityCategories.includes('Arms') && <li>unable to use both arms</li>}
        {disabilityCategories.includes('DrivingLicense') && (
          <li>cannot drive a car because I have a medical condition</li>
        )}
      </ul>
      <Button
        text="Change conditions"
        btnClass="wmnds-btn wmnds-btn--secondary wmnds-m-b-lg"
        onClick={handleChange}
      />
    </Question>
  );
};

export default RightCategories;
