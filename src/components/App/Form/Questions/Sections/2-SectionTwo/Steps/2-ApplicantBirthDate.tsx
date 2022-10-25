import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { BirthDateStep } from 'components/sharedSteps';

const ApplicantBirthDate = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const dob = useFormDataSubscription('ApplicantDateOfBirth');
  const birthDate = dob.savedValue ? dob.savedValue : Date.now();
  // @ts-ignore
  const diff = Date.now() - birthDate;
  const age = new Date(diff);
  const years = Math.abs(age.getUTCFullYear() - 1970);

  const next = years > 5 ? 'ApplicantAddress' : 'NotEligible';
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
