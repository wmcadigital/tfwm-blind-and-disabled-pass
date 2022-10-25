import { useNavigationLogic } from 'customHooks';
import { Question } from 'components/shared';

const NotEligible = () => {
  const { goToNextStep } = useNavigationLogic('ApplicantBirthDate', 'Summary');
  const handleContinue = () => {
    goToNextStep();
  };
  return (
    <div>
      <Question question="Sorry, you're not eligible" handleContinue={handleContinue}>
        <p>To be eligible for a disabled person&apos;s pass you must: </p>
        <ul>
          <li>be at least 5 years old</li>
          <li>live in the West Midlands</li>
          <li>have an eligible disability that&apos;s expected to last at least 12 months</li>
        </ul>
      </Question>
    </div>
  );
};

export default NotEligible;
