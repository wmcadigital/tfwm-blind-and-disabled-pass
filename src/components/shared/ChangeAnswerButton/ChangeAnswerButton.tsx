import { getSectionAndStep } from 'helpers/sectionAndStep';
import { useGlobalContext } from 'state/globalState/context';
import { TProps, propTypes, defaultProps } from './ChangeAnswerButton.types';

const ChangeAnswerButton = ({ from, to }: TProps) => {
  const [, globalStateDispatch] = useGlobalContext();

  const handleClick = () => {
    const fromStep = getSectionAndStep(from);
    const toStep = to ? getSectionAndStep(to) : null;

    globalStateDispatch({
      type: 'EDIT_FORM',
      payload: toStep ? { from: fromStep, to: toStep } : fromStep,
    });
  };

  return (
    <button type="button" className="wmnds-btn wmnds-btn--link" onClick={handleClick}>
      Change
    </button>
  );
};

ChangeAnswerButton.propTypes = propTypes;
ChangeAnswerButton.defaultProps = defaultProps;

export default ChangeAnswerButton;
