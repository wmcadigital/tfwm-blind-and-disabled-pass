import { useGlobalContext } from 'state/globalState/context';
import { TProps, propTypes } from './Section.types';

const Section = ({ totalSections, title, steps }: TProps) => {
  const [globalState] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  const StepToShow = steps[currentStep - 1];
  const options = () => {
    if (currentSection === 3 && totalSections === 4) {
      return '3';
    }
    if (currentSection === 4 && totalSections === 4) {
      return '2';
    }
    if (currentSection === 3 && totalSections === 3) {
      return '2';
    }
    return '1';
  };
  return (
    <div>
      {currentSection !== 1 && (
        <p className="wmnds-m-b-none">{`Section ${options()} of ${totalSections - 1}`}</p>
      )}
      <strong>{title}</strong>
      <StepToShow />
    </div>
  );
};

Section.propTypes = propTypes;

export default Section;
