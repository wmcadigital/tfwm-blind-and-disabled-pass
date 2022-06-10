/* eslint-disable */
import { Input, Question } from 'components/shared';
import { useFormDataSubscription } from 'customHooks';
import { Nullable } from 'types/helpers';
import { TSharedStepSimpleProps } from 'types/step';

const EmployerStep = ({ question, handleNavigation }: TSharedStepSimpleProps) => {
  const employerName = useFormDataSubscription('employerName');
  const employerPostcode = useFormDataSubscription('employerPostcode');

  const handleDataChange = (changeFunc: (value: Nullable<string>) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      changeFunc(e.target.value);
    };
  };
  const handleContinue = () => {
    const isEmployerNameIsValid = employerName.save();
    const isEmployerPostcodeIsValid = employerPostcode.save();
    if (!isEmployerNameIsValid || !isEmployerPostcodeIsValid) return;
    handleNavigation();
  };

  return (
    <Question
      question={question}
      showError={employerName.hasError || employerPostcode.hasError}
      handleContinue={handleContinue}
    >
      <Input
        name="employerName"
        type="text"
        error={employerName.error}
        defaultValue={employerName.currentValue as string}
        label="Employer name"
        onChange={handleDataChange(employerName.set)}
      />
      <Input
        name="employerPostcode"
        type="text"
        error={employerPostcode.error}
        label="Employer postcode"
        defaultValue={employerPostcode.currentValue as string}
        onChange={handleDataChange(employerPostcode.set)}
      />
    </Question>
  );
};

export default EmployerStep;
