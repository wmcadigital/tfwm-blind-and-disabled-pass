import { Question, Radios } from 'components/shared';
import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from 'types/step';

const EthnicityStep = ({ handleNavigation, question }: TSharedStepProps) => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const [, formDataDispatch] = useFormDataContext();
  const ethnicity = useFormDataSubscription('ethnicity');

  const handleContinue = () => {
    if (!ethnicity.validate()) return;
    // If user changes this step we need to delete any saved data
    if (ethnicity.savedValue !== null && ethnicity.currentValue !== ethnicity.savedValue) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA' });
      else {
        formDataDispatch({ type: 'CLEAR_TICKET_HOLDER_DATA' });
        formDataDispatch({ type: 'CLEAR_PAYER_DATA' });
      }
    }
    ethnicity.save();
    handleNavigation();
  };

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    ethnicity.set(e.target.value);
  };
  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={ethnicity.currentValue === ''}
    >
      <p className="wmnds-m-b-lg">
        This information helps TfWM monitor whether the people who claim discounted travel tickets
        through the Blind and Disabled Scheme are reflective of regional diversity.
      </p>
      <Radios
        name="ethnicity"
        onChange={setCurrentValue}
        currentValue={ethnicity.currentValue}
        radios={[
          { text: 'White', html: null, value: 'White', info: null },
          { text: 'Mixed or multiple ethnic groups', html: null, value: 'Mixed', info: null },
          { text: 'Asian or Asian british', html: null, value: 'Asian', info: null },
          {
            text: 'Black, African, Caribbean or Black British',
            html: null,
            value: 'Black',
            info: null,
          },
          { text: 'Other ethnic group', html: null, value: 'Other', info: null },
        ]}
        required
      />
      Or
      <Radios
        name="preferNotToSay"
        onChange={setCurrentValue}
        currentValue={ethnicity.currentValue}
        radios={[{ text: 'Prefer not to say', html: null, value: 'Prefer not to say', info: null }]}
        required
      />
    </Question>
  );
};

export default EthnicityStep;
