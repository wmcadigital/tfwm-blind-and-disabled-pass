import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import Name from './Steps/1-Name';
import Relationship from './Steps/2-Relationship';

const SectionFour = ({ totalSections }: TSectionProps) => {
  const title = 'About you';

  return <Section totalSections={totalSections} title={title} steps={[Name, Relationship]} />;
};

SectionFour.propTypes = sectionPropTypes;

export default SectionFour;
