import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import CheckIfUserIsTheApplicant from './Steps/1-CheckIfUserIsTheApplicant';

const SectionOne = ({ totalSections }: TSectionProps) => {
  return <Section totalSections={totalSections} title="" steps={[CheckIfUserIsTheApplicant]} />;
};

SectionOne.propTypes = sectionPropTypes;

export default SectionOne;
