import { Question, Radios } from 'components/shared';
import { useGlobalContext } from 'state/globalState';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from 'types/step';

const EthnicityStep = ({ handleNavigation, question }: TSharedStepProps) => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const ethnicity = useFormDataSubscription('ethnicity');
  const ethnicityDetails = useFormDataSubscription('ethnicityDetails');
  const handleContinue = () => {
    if (!ethnicity.validate()) return;
    // If user changes this step we need to delete any saved data
    if (isEditing && ethnicity.currentValue === 'Prefer not to say') {
      ethnicity.save();
      ethnicityDetails.set(null);
      globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    }
    ethnicity.save();
    handleNavigation();
  };

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    ethnicity.set(e.target.value);
  };
  const showError = !!ethnicity.error;
  return (
    <Question question={question} handleContinue={handleContinue} showError={showError}>
      <p className="wmnds-m-b-lg">
        This information helps TfWM monitor whether the people who claim discounted travel tickets
        through the Blind and Disabled Scheme are reflective of regional diversity.
      </p>
      <Radios
        name="ethnicity"
        onChange={setCurrentValue}
        classes="wmnds-m-b-sm"
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
      <p>Or</p>
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
