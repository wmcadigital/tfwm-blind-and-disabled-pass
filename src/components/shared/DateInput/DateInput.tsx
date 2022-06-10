import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isValidDateNumber } from 'helpers/validation';

// Import components
import SingleDateInput from './SingleDateInput.js/SingleDateInput';
import { TDateInputProps } from './DateInput.types';

const DateInputs = ({ name, defaultDate, onChange, hasError, hint }: TDateInputProps) => {
  const dateToDestructure = defaultDate
    ? [defaultDate.getDate(), defaultDate.getMonth() + 1, defaultDate.getFullYear()]
    : [null, null, null];
  const [initialDay, initialMonth, initialYear] = dateToDestructure;

  const [month, setMonth] = useState(initialMonth?.toString() || '');
  const isMonthValid = isValidDateNumber(month, 1, 12);

  const [year, setYear] = useState(initialYear?.toString() || '');
  const isYearValid = isValidDateNumber(year, 1900, new Date().getFullYear());

  // get the days in a given month, in a given year, using "new Date(YEAR, MONTH, 0).getDate()"
  const daysInMonth = new Date(parseInt(year, 10), parseInt(month, 10), 0).getDate();
  const [day, setDay] = useState(initialDay?.toString() || '');
  const isDayValid = isValidDateNumber(day, 1, Number.isNaN(daysInMonth) ? 31 : daysInMonth);

  const dateErrorArray = []; // Used to tell the user which input has an error
  if (!isDayValid) dateErrorArray.push('day');
  if (!isMonthValid) dateErrorArray.push('month');
  if (!isYearValid) dateErrorArray.push('year');

  const errorMessage = `Please check the following field${
    dateErrorArray.length > 1 ? 's' : ''
  }: ${dateErrorArray.join(', ')} `;

  const [shouldUpdateDate, setShouldUpdateDate] = useState(false);

  useEffect(() => {
    setShouldUpdateDate(true);
  }, [day, month, year]);

  const updateDate = useCallback(() => {
    if (!isDayValid || !isMonthValid || !isYearValid) {
      onChange(null);
    } else {
      const yearInt = parseInt(year, 10);
      const monthInt = parseInt(month, 10) - 1; // month is zero-indexed
      const dayInt = parseInt(day, 10);
      const newDate = new Date(yearInt, monthInt, dayInt);
      const fullDateIsValid = newDate.toString() !== 'Invalid Date';
      onChange(fullDateIsValid ? newDate : null);
    }
    setShouldUpdateDate(false);
  }, [day, isDayValid, isMonthValid, isYearValid, month, onChange, year]);

  useEffect(() => {
    if (shouldUpdateDate) updateDate();
  }, [shouldUpdateDate, updateDate]);

  return (
    <>
      {hint && <div>{hint}</div>}

      {/* If there is an error, show here */}
      {hasError && <span className="wmnds-fe-error-message">{errorMessage}</span>}

      <div className={`wmnds-fe-group ${hasError ? 'wmnds-fe-group--error' : ''}`}>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <SingleDateInput
            maxLength={2}
            dateType="Day"
            defaultValue={day}
            name={name}
            onChange={setDay}
            hasError={hasError && !isDayValid}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <SingleDateInput
            maxLength={2}
            dateType="Month"
            defaultValue={month}
            name={name}
            onChange={setMonth}
            hasError={hasError && !isMonthValid}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-8">
          <SingleDateInput
            maxLength={4}
            dateType="Year"
            defaultValue={year}
            name={name}
            onChange={setYear}
            hasError={hasError && !isYearValid}
          />
        </div>
      </div>
    </>
  );
};

DateInputs.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  defaultDate: PropTypes.instanceOf(Date),
};

DateInputs.defaultProps = {
  defaultDate: null,
  error: null,
};

export default DateInputs;
