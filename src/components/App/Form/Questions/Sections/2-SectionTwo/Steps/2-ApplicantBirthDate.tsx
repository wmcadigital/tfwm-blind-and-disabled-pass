import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { BirthDateStep } from 'components/sharedSteps';

const ApplicantBirthDate = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const dob = useFormDataSubscription('ApplicantDateOfBirth');
  const birthDated = dob.savedValue ? dob.savedValue : Date.now();
  const birthDate = new Date(birthDated).toISOString().slice(0, 10);
  const now = new Date().toISOString().slice(0, 10);
  const getMonthDifference = (
    startDate: { getTime: () => number; getFullYear: () => number },
    endDate: { getTime: () => number; getFullYear: () => number },
  ) => {
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  };
  const months = getMonthDifference(new Date(birthDate), new Date(now));
  const next = months > 1826 ? 'ApplicantAddress' : 'NotEligible';
  const { goToNextStep } = useNavigationLogic('ApplicantName', next);

  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${pronoun} date of birth?`}
    />
  );
};

export default ApplicantBirthDate;
