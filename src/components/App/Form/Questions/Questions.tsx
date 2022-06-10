import { useGlobalContext } from 'state/globalState';

// Sections
import SectionOne from './Sections/1-SectionOne/SectionOne';
import SectionTwo from './Sections/2-SectionTwo/SectionTwo';
import SectionThree from './Sections/3-SectionThree/SectionThree';
import SectionFour from './Sections/4-SectionFour/SectionFour';

const sections = [SectionOne, SectionTwo, SectionThree, SectionFour];

const Form = () => {
  const [globalState] = useGlobalContext();
  const { form } = globalState;

  const totalSections = sections.length;
  const SectionToShow = sections[form.currentSection - 1];

  return <SectionToShow totalSections={totalSections} />;
};

export default Form;
