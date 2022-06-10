import Question from 'components/shared/Question/Question';
import { Radios } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from 'types/step';

const DrivingLicenseStep = ({ handleNavigation, question }: TSharedStepProps) => {
  const howDidYouHearAboutCentroDirectDebit = useFormDataSubscription(
    'howDidYouHearAboutCentroDirectDebit',
  );

  const handleContinue = () => {
    handleNavigation();
  };

  return (
    <Question question={question} handleContinue={handleContinue}>
      <Radios
        name="drivingLicense"
        aria-label="Driving License"
        currentValue={howDidYouHearAboutCentroDirectDebit.currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          howDidYouHearAboutCentroDirectDebit.set(e.target.value)
        }
        radios={[
          { text: 'Yes', html: null, value: 'true', info: null },
          { text: 'No', html: null, value: 'false', info: null },
        ]}
        required
      />
    </Question>
  );
};

export default DrivingLicenseStep;
