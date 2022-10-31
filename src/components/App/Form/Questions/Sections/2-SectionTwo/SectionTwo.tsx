import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import ApplicantName from './Steps/1-ApplicantName';
import ApplicantBirthDate from './Steps/2-ApplicantBirthDate';
import ApplicantAddress from './Steps/3-ApplicantAddress';
import ApplicantEthnicity from './Steps/4-ApplicantEthnicity';
import ApplicantEthnicityDetails from './Steps/5-ApplicantEthnicityDetails';
import WhoToContact from './Steps/6-WhoToContact';
import ApplicantContactDetails from './Steps/6-ApplicantContactDetails';
import CurrentPass from './Steps/7-ApplicantCurrentPass';
import CurrentPassNumber from './Steps/8-CurrentPassNumber';
import ChangePhoto from './Steps/9-ChangePhoto';
import ApplicantPhoto from './Steps/10-ApplicantPhoto';
import NotEligible from './Steps/11-NotEligible';
import NotEligiblePostCode from './Steps/11-NotEligiblePostCode';

import { useFormDataSubscription } from '../../../../../../customHooks';

const SectionTwo = ({ totalSections }: TSectionProps) => {
  const applicationForMe = useFormDataSubscription('applicationForMe');

  return (
    <Section
      totalSections={totalSections}
      title={applicationForMe.savedValue ? 'About you' : 'About the applicant'}
      steps={[
        ApplicantName,
        ApplicantBirthDate,
        ApplicantAddress,
        ApplicantEthnicity,
        ApplicantEthnicityDetails,
        WhoToContact,
        ApplicantContactDetails,
        CurrentPass,
        CurrentPassNumber,
        ChangePhoto,
        ApplicantPhoto,
        NotEligible,
        NotEligiblePostCode,
      ]}
    />
  );
};

SectionTwo.propTypes = sectionPropTypes;

export default SectionTwo;
