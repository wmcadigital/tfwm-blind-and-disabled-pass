import { useGlobalContext } from 'state/globalState';
import Question from 'components/shared/Question/Question';
import { Input } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import card from 'assets/images/ENCTSCard.png';

import { TSharedStepProps } from 'types/step';
import { ChangeEvent } from 'react';

const CurrentPassStep = ({ handleNavigation, question }: TSharedStepProps) => {
  const passNumber = useFormDataSubscription('passNumber');
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;
  const handleContinue = () => {
    const isPassNumber = passNumber.save();
    if (!isPassNumber) return;
    if (isEditing) globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    handleNavigation();
  };
  const handleNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^(\d{0,6})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = event.target.value.replace(/[^\d]/g, '');
    const filtered = onlyNumbers.replace(regex, (_regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter((group) => !!group).join(' '),
    );
    return passNumber.set(filtered);
  };

  return (
    <Question question={question} handleContinue={handleContinue} showError={passNumber.hasError}>
      <p>This is the long number on the front of the card.</p>
      <img className="wmnds-img wmnds-col-auto" src={card} alt="Passcard example" />

      <Input
        groupClassName="wmnds-m-b-lg"
        name="passNumber"
        inputmode="numeric"
        label={<>Pass number</>}
        type="text"
        pattern="[0-9]*"
        maxLength={21}
        className="wmnds-col-1 wmnds-col-md-1-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumber(e)}
        defaultValue={passNumber.currentValue as string}
      />
    </Question>
  );
};

export default CurrentPassStep;
