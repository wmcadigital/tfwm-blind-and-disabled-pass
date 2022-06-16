import dompurify from 'dompurify';
import PropTypes from 'prop-types';

import { TRadiosProps } from './Radios.types';
import Radio from './Radio/Radio';

const { sanitize } = dompurify;

const Radios = ({
  name,
  hint,
  classes,
  error,
  radios,
  onChange,
  currentValue,
  required,
}: TRadiosProps) => {
  return (
    <div className={`wmnds-fe-group ${classes}`}>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          {hint && typeof hint === 'string' && <p>{hint}</p>}
          {hint && typeof hint !== 'string' && hint}
        </legend>
        <div className={`wmnds-fe-radios${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          {/* Loop through radios and display each radio button */}
          {radios.map(({ text, html, value, info }) => (
            <Radio
              key={text}
              name={name}
              text={html || text}
              value={value}
              onChange={onChange}
              checked={value === currentValue}
              info={info}
              required={required}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.node,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  required: PropTypes.bool,
};

Radios.defaultProps = {
  error: null,
  hint: null,
  currentValue: null,
  required: false,
};

export default Radios;
