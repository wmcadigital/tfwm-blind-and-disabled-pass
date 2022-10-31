import PropTypes from 'prop-types';
import { useGlobalContext } from 'state/globalState/context';
import { Button, GenericError } from 'components/shared';
import { TQuestionProps } from './Question.types';
import s from './Question.module.scss';

const Question = ({ question, handleContinue, children, showError, isLoading }: TQuestionProps) => {
  const [globalState] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;
  const eligible = currentSection === 2 && (currentStep === 12 || currentStep === 13);

  return (
    <>
      {showError && <GenericError />}
      <h2 className={`wmnds-m-t-lg wmnds-m-b-lg ${s.header}`}>{question}</h2>
      {children}
      {!eligible && (
        <div className="wmnds-col-1">
          <Button
            type="button"
            text="Continue"
            onClick={handleContinue}
            isFetching={isLoading}
            disabled={isLoading}
          />
        </div>
      )}
    </>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  handleContinue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

Question.defaultProps = {
  showError: false,
  isLoading: false,
};

export default Question;
