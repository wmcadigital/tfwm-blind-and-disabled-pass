import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const ApplicantAddress = () => {
  const ApplicantCurrentPostcode = useFormDataSubscription('ApplicantCurrentPostcode').savedValue;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const postcodeLetter =
    ApplicantCurrentPostcode && ApplicantCurrentPostcode.substring(0, 3).toUpperCase();
  const postcodeWV =
    ApplicantCurrentPostcode && ApplicantCurrentPostcode.substring(0, 2).toUpperCase();
  const postcodeB =
    ApplicantCurrentPostcode && ApplicantCurrentPostcode.substring(0, 1).toUpperCase();
  const postcodeNumber = ApplicantCurrentPostcode ? ApplicantCurrentPostcode.substring(1, 2) : '';
  const isDigit = (n: string) => /\d+/.test(n);

  const exceptions =
    postcodeLetter === 'CV8' || postcodeLetter === 'B46' || postcodeLetter === 'WV5';
  const postcodeSort =
    postcodeWV === 'WV' ||
    postcodeWV === 'CV' ||
    postcodeWV === 'DY' ||
    postcodeWV === 'WS' ||
    (postcodeB === 'B' && isDigit(postcodeNumber));
  const nextStep = postcodeSort && !exceptions ? 'ApplicantEthnicity' : 'NotEligiblePostCode';
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
