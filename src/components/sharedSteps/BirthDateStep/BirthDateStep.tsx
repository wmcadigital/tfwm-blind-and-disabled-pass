import Question from 'components/shared/Question/Question';
import DateInput from 'components/shared/DateInput/DateInput';
import { useGlobalContext } from 'state/globalState';
import { TSharedStepProps } from 'types/step';
import { useFormDataSubscription } from 'customHooks';

const BirthDateStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const birthDate = useFormDataSubscription(`${dataNamePrefix}DateOfBirth`);
  const birthDated = birthDate.currentValue ? birthDate.currentValue : Date.now();
  const birthDates = new Date(birthDated).toISOString().slice(0, 10);
  const now = new Date().toISOString().slice(0, 10);
  const getMonthDifference = (
    startDate: { getTime: () => number; getFullYear: () => number },
    endDate: { getTime: () => number; getFullYear: () => number },
  ) => {
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  };
  const months = getMonthDifference(new Date(birthDates), new Date(now));
  const next = months > 1826;
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;
  const handleContinue = () => {
    if (!birthDate.save()) return;
    if (isEditing && next) globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    if (isEditing && !next)
      globalStateDispatch({
        type: 'GO_TO_SECTION_AND_STEP',
        payload: { section: 2, step: 12 },
      });
    handleNavigation();
  };

  return (
    <Question question={question} handleContinue={handleContinue} showError={birthDate.hasError}>
      <DateInput
        hint={
          <>
            <p>For example, 3 7 1985</p>
          </>
        }
        name="DateOfBirth"
        defaultDate={birthDate.currentValue}
        onChange={birthDate.set}
        hasError={birthDate.hasError}
        aria-label="Date Of Birth"
      />
    </Question>
  );
};

export default BirthDateStep;
