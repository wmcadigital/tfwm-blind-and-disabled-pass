import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const ApplicantCurrentPostcode = useFormDataSubscription('ApplicantCurrentPostcode').savedValue;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const postcodeWV =
    ApplicantCurrentPostcode && ApplicantCurrentPostcode.substring(0, 2).toUpperCase();
  const postcodeB =
    ApplicantCurrentPostcode && ApplicantCurrentPostcode.substring(0, 1).toUpperCase();
  const postcodeNumber = ApplicantCurrentPostcode ? ApplicantCurrentPostcode.substring(1, 2) : '';
  const isDigit = (n: string) => /\d+/.test(n);
  const nextStep =
    postcodeWV === 'WV' ||
    postcodeWV === 'CV' ||
    postcodeWV === 'DY' ||
    postcodeWV === 'WS' ||
    (postcodeB === 'B' && isDigit(postcodeNumber))
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
