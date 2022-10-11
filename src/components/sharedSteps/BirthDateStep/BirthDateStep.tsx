import Question from 'components/shared/Question/Question';
import DateInput from 'components/shared/DateInput/DateInput';
import { useGlobalContext } from 'state/globalState';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TSharedStepProps } from 'types/step';

const BirthDateStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const birthDate = useFormDataSubscription(`${dataNamePrefix}DateOfBirth`);
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;
  const handleContinue = () => {
    if (!birthDate.save()) return;
    if (isEditing) globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
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
