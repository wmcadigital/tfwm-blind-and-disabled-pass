import PropTypes from 'prop-types';

import { Button, GenericError } from 'components/shared';

import { TQuestionProps } from './Question.types';

const Question = ({ question, handleContinue, children, showError, isLoading }: TQuestionProps) => {
  return (
    <>
      {showError && <GenericError />}
      <h2 className="wmnds-m-t-lg wmnds-m-b-lg">{question}</h2>
      {children}
      <div className="wmnds-col-1">
        <Button
          type="button"
          text="Continue"
          onClick={handleContinue}
          isFetching={isLoading}
          disabled={isLoading}
        />
      </div>
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
