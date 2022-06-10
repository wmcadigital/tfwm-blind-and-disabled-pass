import PropTypes from 'prop-types';

import { TSingleDateInput } from './SingleDateInput.types';

const DateInput = ({
  dateType,
  maxLength,
  defaultValue,
  onChange,
  name,
  hasError,
}: TSingleDateInput) => {
  const inputName = name + dateType;
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <label className="wmnds-fe-label" htmlFor={inputName}>
        {dateType}
      </label>
      <input
        className={`wmnds-fe-input ${hasError ? 'wmnds-fe-input--error' : ''}`}
        value={defaultValue || ''}
        id={inputName}
        inputMode="numeric"
        onChange={setValue}
        name={inputName}
        type="text"
        maxLength={maxLength}
        pattern="[0-9]*"
      />
    </>
  );
};

DateInput.propTypes = {
  dateType: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
};

DateInput.defaultProps = {
  defaultValue: '',
  hasError: false,
};

export default DateInput;
