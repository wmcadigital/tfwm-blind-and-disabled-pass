import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const ApplicantCurrentDistrict = useFormDataSubscription('ApplicantCurrentDistrict').savedValue;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const districtCheck = ApplicantCurrentDistrict !== null ? ApplicantCurrentDistrict : '';
  const districsAllowed = [
    'Birmingham',
    'Coventry',
    'Dudley',
    'Sandwell',
    'Solihull',
    'Walsall' || 'Wolverhampton',
  ];
  const nextStep = districsAllowed.includes(districtCheck)
    ? 'ApplicantEthnicity'
    : 'NotEligiblePostCode';
  const { goToNextStep } = useNavigationLogic('ApplicantBirthDate', nextStep);
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');
  const pronoun = applicationForMe.savedValue ? 'your' : `${ApplicantFirstName.currentValue}'s`;
  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix="Applicant"
      question={`What is ${pronoun} address?`}
    />
  );
};

export default ApplicantAddress;
