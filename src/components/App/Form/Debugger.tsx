import { useGlobalContext } from 'state/globalState';
import { TSectionAndStep } from 'types/navigation';
import { sectionAndStepAreEqual } from 'helpers/sectionAndStep';
import { formPath } from './Questions/Sections';

const Debugger = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  const defaultValue =
    currentSection === 0 || currentStep === 0
      ? '0'
      : JSON.stringify({ section: currentSection, step: currentStep });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSectionAndStep = JSON.parse(e.target.value) as TSectionAndStep;
    globalStateDispatch({ type: 'GO_TO_SECTION_AND_STEP', payload: newSectionAndStep });
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select name="debugging" id="debugging" onChange={handleChange} defaultValue={defaultValue}>
      <option disabled value="0">
        Go to step
      </option>
      {formPath.map((sections, sectionIndex) => {
        return sections.map((stepName, stepIndex) => {
          const section = sectionIndex + 1;
          const step = stepIndex + 1;
          const isDisabled = sectionAndStepAreEqual(
            { section, step },
            { section: currentSection, step: currentStep },
          );

          return (
            <option value={JSON.stringify({ section, step })} key={stepName} disabled={isDisabled}>
              {`${section}.${step}. ${stepName}`}
            </option>
          );
        });
      })}
    </select>
  );
};

export default Debugger;
