/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

import { Icon } from 'components/shared';

import { TCheckboxProps } from './Checkbox.types';

const { sanitize } = dompurify;

const InputCheckbox = ({
  name,
  labelValue,
  labelElement,
  defaultValue,
  onChange,
  classes,
  error,
}: TCheckboxProps) => {
  // Set input to render below
  return (
    <div className={`wmnds-fe-group ${error?.message ? 'wmnds-fe-group--error' : ''} ${classes}`}>
      {error && error?.message && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{
            __html: sanitize(error.message),
          }}
        />
      )}

      <label className="wmnds-fe-checkboxes__container">
        {labelElement !== null && labelElement}
        {!labelElement && labelValue && (
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(labelValue),
            }}
          />
        )}
        <input
          className="wmnds-fe-checkboxes__input"
          checked={defaultValue || false}
          onChange={onChange}
          name={name}
          type="checkbox"
          aria-label={name}
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
        </span>
      </label>
    </div>
  );
};

InputCheckbox.propTypes = {
  labelValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  labelElement: PropTypes.element,
  defaultValue: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

InputCheckbox.defaultProps = {
  labelValue: null,
  labelElement: null,
  classes: null,
  error: null,
  defaultValue: false,
};

export default InputCheckbox;
