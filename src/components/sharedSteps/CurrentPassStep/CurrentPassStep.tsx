import Question from 'components/shared/Question/Question';
import { Input } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import card from 'assets/images/ENCTSCard.png';

import { TSharedStepProps } from 'types/step';

const CurrentPassStep = ({ handleNavigation, question }: TSharedStepProps) => {
  const passNumber = useFormDataSubscription('passNumber');
  const handleContinue = () => {
    const isPassNumber = passNumber.save();
    if (!isPassNumber) return;
    handleNavigation();
  };

  return (
    <Question question={question} handleContinue={handleContinue} showError={passNumber.hasError}>
      <p>This is the long number on the front of the card.</p>
      <img className="wmnds-img wmnds-col-auto" src={card} alt="Direct debit logo" />

      <Input
        groupClassName="wmnds-m-b-lg"
        name="passNumber"
        inputmode="numeric"
        label={<>Pass number</>}
        type="text"
        pattern="[0-9]*"
        maxLength={18}
        className="wmnds-col-1 wmnds-col-md-1-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => passNumber.set(e.target.value)}
        defaultValue={passNumber.currentValue as string}
      />
    </Question>
  );
};

export default CurrentPassStep;
