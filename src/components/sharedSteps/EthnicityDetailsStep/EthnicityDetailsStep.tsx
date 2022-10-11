import { useGlobalContext } from 'state/globalState';
import { Question, Radios } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from 'types/step';

const EthnicityDetailsStep = ({ handleNavigation, question }: TSharedStepProps) => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const ethnicity = useFormDataSubscription('ethnicity');
  const ethnicityDetails = useFormDataSubscription('ethnicityDetails');

  const handleContinue = () => {
    if (!ethnicityDetails.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      ethnicityDetails.savedValue !== null &&
      ethnicityDetails.currentValue !== ethnicityDetails.savedValue
    ) {
      globalStateDispatch({ type: 'UPDATE_EDIT_FORM_TO', payload: 'ApplicantPhoto' });
      if (isEditing) globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    }
    ethnicityDetails.save();
    handleNavigation();
  };

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    ethnicityDetails.set(e.target.value);
  };
  const white = [
    { text: 'British', html: null, value: 'British', info: null },
    { text: 'Irish', html: null, value: 'Irish', info: null },
    {
      text: 'Any other White background',
      html: null,
      value: 'Any other White background',
      info: null,
    },
  ];
  const mixed = [
    {
      text: 'White and Black Caribbean',
      html: null,
      value: 'White and Black Caribbean',
      info: null,
    },
    { text: 'White and Black African', html: null, value: 'White and Black African', info: null },
    { text: 'White and Asian', html: null, value: 'White and Asian', info: null },
    {
      text: 'Any other Mixed or Multiple ethnic background',
      html: null,
      value: 'Any other Mixed or Multiple ethnic background',
      info: null,
    },
  ];
  const asian = [
    { text: 'Indian', html: null, value: 'Indian', info: null },
    { text: 'Pakistani', html: null, value: 'Pakistani', info: null },
    { text: 'Bangladeshi', html: null, value: 'Bangladeshi', info: null },
    { text: 'Chinese', html: null, value: 'Chinese', info: null },
    {
      text: 'Any other asian background',
      html: null,
      value: 'Any other asian background',
      info: null,
    },
  ];
  const black = [
    { text: 'African', html: null, value: 'African', info: null },
    { text: 'Caribbean', html: null, value: 'Caribbean', info: null },
    {
      text: 'Any other Black, African or Caribbean',
      html: null,
      value: 'Any other Black, African or Caribbean',
      info: null,
    },
  ];
  const other = [
    { text: 'Arab', html: null, value: 'Arab', info: null },
    { text: 'Any other ethnic group', html: null, value: 'Any other ethnic group', info: null },
  ];
  const radioOptions = () => {
    const x = ethnicity.savedValue?.toLowerCase();
    switch (x) {
      case 'white':
        return white;
        break;
      case 'mixed':
        return mixed;
        break;
      case 'asian':
        return asian;
        break;
      case 'black':
        return black;
        break;
      default:
        return other;
    }
  };
  const showError = !!ethnicityDetails.error;
  return (
    <Question question={question} handleContinue={handleContinue} showError={showError}>
      <p className="wmnds-m-b-lg">
        This information helps TfWM monitor whether the people who claim discounted travel tickets
        through the Blind and Disabled Scheme are reflective of regional diversity.
      </p>
      <Radios
        name="ethnicity"
        radios={radioOptions()}
        onChange={setCurrentValue}
        classes="wmnds-m-b-sm"
        currentValue={ethnicityDetails.currentValue}
        required
      />
      <p>Or</p>
      <Radios
        name="preferNotToSay"
        onChange={setCurrentValue}
        currentValue={ethnicityDetails.currentValue}
        radios={[{ text: 'Prefer not to say', html: null, value: 'Prefer not to say', info: null }]}
        required
      />
    </Question>
  );
};

export default EthnicityDetailsStep;
