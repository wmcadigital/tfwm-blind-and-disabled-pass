import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription } from 'customHooks';

// Sections
import SectionOne from './Sections/1-SectionOne/SectionOne';
import SectionTwo from './Sections/2-SectionTwo/SectionTwo';
import SectionThree from './Sections/3-SectionThree/SectionThree';
import SectionFour from './Sections/4-SectionFour/SectionFour';

const Form = () => {
  const [globalState] = useGlobalContext();
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const { form } = globalState;
  const sections = applicationForMe.savedValue
    ? [SectionOne, SectionTwo, SectionThree]
    : [SectionOne, SectionTwo, SectionThree, SectionFour];

  const totalSections = sections.length;

  const SectionToShow = sections[form.currentSection - 1];

  return <SectionToShow totalSections={totalSections} />;
};

export default Form;
