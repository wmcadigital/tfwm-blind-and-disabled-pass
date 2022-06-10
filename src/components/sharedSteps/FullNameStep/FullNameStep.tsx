import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { Input, Question, WarningText } from 'components/shared';
import { TFullNameStepProps } from './FullNameStep.types';

const FullNameStep = ({
  handleNavigation,
  question,
  dataNamePrefix,
  warningText,
}: TFullNameStepProps) => {
  const firstName = useFormDataSubscription(`${dataNamePrefix}FirstName`);
  const lastName = useFormDataSubscription(`${dataNamePrefix}LastName`);

  const handleContinue = () => {
    const firstNameValid = firstName.save();
    const lastNameValid = lastName.save();
    if (!firstNameValid || !lastNameValid) return;
    handleNavigation();
  };

  const showError = !!firstName.error && !!lastName.error;

  return (
    <Question question={question} handleContinue={handleContinue} showError={showError}>
      {warningText && <WarningText type="info" message={warningText} className="wmnds-m-b-lg" />}
      <Input
        groupClassName="wmnds-m-b-lg"
        name="firstName"
        inputmode="text"
        label="First Name"
        defaultValue={firstName.currentValue as string}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => firstName.set(e.target.value)}
        error={firstName.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        name="lastName"
        inputmode="text"
        label="Last Name"
        defaultValue={lastName.currentValue as string}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => lastName.set(e.target.value)}
        error={lastName.error}
      />
    </Question>
  );
};

export default FullNameStep;
