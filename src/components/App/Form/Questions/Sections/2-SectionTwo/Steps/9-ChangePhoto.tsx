import { useGlobalContext } from 'state/globalState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';
import { useFormDataContext } from 'state/formDataState/context';

const CurrentPass = () => {
  const changePhoto = useFormDataSubscription('changePhoto');
  const [formDataState] = useFormDataContext();
  const { alternateStart } = formDataState;
  const nextOne = alternateStart ? 'RightCategories' : 'DisablityCategories';
  const nextStep = changePhoto.savedValue ? 'ApplicantPhoto' : nextOne;
  const { goToNextStep } = useNavigationLogic('CurrentPassNumber', nextStep);
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const handleContinue = () => {
    if (!changePhoto.validate()) return;
    // If user changes this step we need to delete any saved data
    if (changePhoto.savedValue !== null && changePhoto.currentValue !== changePhoto.savedValue) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
    }
    changePhoto.save();
    goToNextStep();
  };
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePhoto.set(e.target.value.toLowerCase() === 'true');
  };

  return (
    <Question
      question="Do you want to change the photo on your card?"
      handleContinue={handleContinue}
      showError={changePhoto.hasError}
    >
      <Radios
        name="ischangePhoto"
        onChange={setCurrentValue}
        currentValue={changePhoto.currentValue}
        error={changePhoto.error}
        radios={[
          { text: 'Yes', html: null, value: true, info: null },
          { text: 'No', html: null, value: false, info: null },
        ]}
      />
    </Question>
  );
};

export default CurrentPass;
