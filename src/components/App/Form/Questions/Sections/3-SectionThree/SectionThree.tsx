import { useFormDataContext } from 'state/formDataState/context';
import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import RightCategories from './Steps/0-RightCategories';
import DisablityCategories from './Steps/1-DisablityCategories';
import Blind from './Steps/2-Blind';
import Deaf from './Steps/3-Deaf';
import Language from './Steps/4-Language';
import Walk from './Steps/4-Walk';
import Arms from './Steps/5-Arms';
import Learn from './Steps/6-Learn';
import DrivingLicense from './Steps/7-DrivingLicense';
import RefusedLicense from './Steps/8-RefusedLicense';
import Distance from './Steps/4-HowFarWalk';
import Drive from './Steps/9-Drive';

const SectionThree = ({ totalSections }: TSectionProps) => {
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const title = applicationForMe ? 'Proof of disability' : 'Proof of disability';

  return (
    <Section
      totalSections={totalSections}
      title={title}
      steps={[
        RightCategories,
        DisablityCategories,
        Blind,
        Deaf,
        Language,
        Walk,
        Distance,
        Arms,
        Learn,
        DrivingLicense,
        RefusedLicense,
        Drive,
      ]}
    />
  );
};

SectionThree.propTypes = sectionPropTypes;

export default SectionThree;
