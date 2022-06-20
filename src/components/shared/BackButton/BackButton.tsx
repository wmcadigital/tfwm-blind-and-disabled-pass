import { useGlobalContext } from 'state/globalState/context';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

const BackButton = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { previousSection, previousStep, isEditing } = globalState.form;

  const shouldGoToQuestion = previousSection > 0 && previousStep > 0;
  const alternateStart = useFormDataSubscription('alternateStart');

  const onClick = () => {
    if (shouldGoToQuestion) globalStateDispatch({ type: 'GO_BACK' });
    else if (!shouldGoToQuestion && isEditing) {
      globalStateDispatch({ type: 'CLEAR_TEMP_FORM_DATA' });
      globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    } else {
      globalStateDispatch({ type: 'SHOW_START_PAGE' });
      alternateStart.set(false);
      alternateStart.save();
    }
  };

  return (
    <button className="wmnds-btn wmnds-btn--link" type="button" onClick={onClick}>
      <span>&lt; Back</span>
    </button>
  );
};

export default BackButton;
