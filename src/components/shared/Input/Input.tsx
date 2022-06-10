import PropTypes from 'prop-types';
import dompurify from 'dompurify';

import { TInputProps } from './Input.types';

const { sanitize } = dompurify;

const Input = ({
  autocomplete,
  className,
  groupClassName,
  fieldValidation,
  inputmode,
  label,
  name,
  defaultValue,
  spellcheck,
  type,
  error,
  onChange,
  maxLength,
  pattern,
}: TInputProps) => {
  // Set input to render below
  const input = (
    <>
      <input
        autoComplete={autocomplete}
        className={`wmnds-fe-input ${error ? 'wmnds-fe-input--error' : ''}`}
        value={defaultValue || ''}
        id={name}
        inputMode={inputmode}
        name={name}
        ref={fieldValidation}
        spellCheck={spellcheck}
        type={type}
        onChange={onChange}
        pattern={pattern}
        maxLength={maxLength}
        aria-label={name}
      />
    </>
  );
  return (
    <div
      className={`wmnds-fe-group ${groupClassName} ${
        error?.message ? 'wmnds-fe-group--error' : ''
      }`}
    >
      {label && typeof label === 'string' && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          className="wmnds-fe-label"
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: sanitize(label) }}
        />
      )}

      {label && typeof label !== 'string' && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="wmnds-fe-label" htmlFor={name}>
          {label}
        </label>
      )}

      {error?.message && typeof error.message === 'string' && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{ __html: sanitize(error.message) }}
        />
      )}

      {/* If className then wrap just input with the className else, just show input as usual */}
      {className ? <div className={className}>{input}</div> : input}
    </div>
  );
};

Input.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  groupClassName: PropTypes.string,
  fieldValidation: PropTypes.func,
  inputmode: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

Input.defaultProps = {
  autocomplete: null,
  className: '',
  groupClassName: '',
  fieldValidation: null,
  inputmode: 'text',
  defaultValue: '',
  spellcheck: false,
  type: 'text',
  error: null,
  onChange: null,
  maxLength: null,
};

export default Input;
