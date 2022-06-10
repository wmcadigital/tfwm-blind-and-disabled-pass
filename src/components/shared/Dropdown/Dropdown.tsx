/* eslint-disable jsx-a11y/no-onchange */
import dompurify from 'dompurify';

import { DropdownProps } from './Dropdown.types';

const { sanitize } = dompurify;

const Dropdown = ({
  name,
  hint,
  label,
  error,
  className,
  options,
  defaultValue,
  disabledOptionText,
  onChange,
  onBlur,
}: DropdownProps) => {
  // const [formState] = useFormContext(); // Get the state/dispatch of form data from FormContext
  // const defaultSelectValue = defaultValue || (formState.ticketInfo[name] as string | number); // cast to acceptable types for a select element
  const defaultSelectValue = defaultValue;
  return (
    <div className={`wmnds-fe-group wmnds-m-b-md ${className}`}>
      <fieldset className="wmnds-fe-fieldset">
        <p>{hint}</p>
        <div className={`wmnds-fe-dropdown${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          <label className="wmnds-fe-label" htmlFor={name}>
            {label}
          </label>
          <select
            className="wmnds-fe-dropdown__select"
            id={name}
            name={name}
            defaultValue={defaultSelectValue || ''}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="" disabled>
              {disabledOptionText || 'Choose from list'}
            </option>
            {options.map((option) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
};

export default Dropdown;
