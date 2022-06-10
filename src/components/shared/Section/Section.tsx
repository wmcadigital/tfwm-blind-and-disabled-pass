import { useGlobalContext } from 'state/globalState/context';
import { TProps, propTypes } from './Section.types';

const Section = ({ totalSections, title, steps }: TProps) => {
  const [globalState] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  const StepToShow = steps[currentStep - 1];

  return (
    <div>
      <p className="wmnds-m-b-none">{`Section ${currentSection} of ${totalSections}`}</p>
      <strong>{title}</strong>
      <StepToShow />
    </div>
  );
};

Section.propTypes = propTypes;

export default Section;
