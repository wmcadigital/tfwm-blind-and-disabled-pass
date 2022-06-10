import { Input, Question } from 'components/shared';
import { useFormDataSubscription } from 'customHooks';
import { Nullable } from 'types/helpers';
import { TSharedStepSimpleProps } from 'types/step';

const SchoolOrCollegeStep = ({ question, handleNavigation }: TSharedStepSimpleProps) => {
  const schoolName = useFormDataSubscription('schoolName');
  const schoolPostcode = useFormDataSubscription('schoolPostcode');

  const handleDataChange = (changeFunc: (value: Nullable<string>) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      changeFunc(e.target.value);
    };
  };

  const handleContinue = () => {
    const isSchoolNameIsValid = schoolName.save();
    const isSchoolPostcodeIsValid = schoolPostcode.save();
    if (!isSchoolNameIsValid || !isSchoolPostcodeIsValid) return;
    handleNavigation();
  };

  return (
    <Question
      question={question}
      showError={schoolName.hasError || schoolPostcode.hasError}
      handleContinue={handleContinue}
    >
      <Input
        name="schoolName"
        type="text"
        error={schoolName.error}
        label="School or college name"
        defaultValue={schoolName.currentValue as string}
        onChange={handleDataChange(schoolName.set)}
      />
      <Input
        name="schoolPostcode"
        type="text"
        error={schoolPostcode.error}
        label="School or college postcode"
        defaultValue={schoolPostcode.currentValue as string}
        onChange={handleDataChange(schoolPostcode.set)}
      />
    </Question>
  );
};

export default SchoolOrCollegeStep;
