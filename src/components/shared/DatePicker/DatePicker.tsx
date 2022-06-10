import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

import { InsetText } from 'components/shared';

import { TDatePickerProps } from './DatePicker.types';

// Import styles
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.scss';

const DatePickerInput = ({
  startDate,
  setStartDate,
  availableDates,
  inline = true,
}: TDatePickerProps) => {
  const minDate = availableDates[0];
  const selectedDate = startDate || minDate;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleChange = (date: Date) => {
    setIsOpen(false);
    setStartDate(date);
  };

  const options: {
    weekday: 'long' | 'short' | 'narrow' | undefined;
    month: 'long' | 'short' | 'narrow' | undefined;
    day: 'numeric' | undefined;
  } = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);

  // Fix 'en-GB' locale console warnings
  useEffect(() => {
    registerLocale('en-GB', enGB);
  }, []);

  return (
    <div className="wmnds-fe-group">
      <p>
        The soonest your new ticket can start is {dateTimeFormat.format(minDate)}. This is to give
        your bank enough time to set up the Direct Debit.
      </p>
      <label className="wmnds-fe-label" htmlFor="date">
        For example, {`${minDate.getDate()}/${minDate.getMonth() + 1}/${minDate.getFullYear()}`}
      </label>
      <input
        onFocus={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="wmnds-fe-input wmnds-fe-input-datepicker"
        id="date"
        inputMode="text"
        name="date"
        type="text"
        value={`${selectedDate.getDate()}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getFullYear()}`}
        readOnly
        onClick={handleClick}
      />
      {isOpen && (
        <DatePicker
          dateFormat="dd/MM/yyyy"
          onChange={handleChange}
          selected={selectedDate}
          calendarClassName="disruptions-date-picker"
          inline={inline}
          includeDates={[...availableDates]}
          locale="en-GB"
        />
      )}
      <InsetText
        classes="wmnds-m-t-md wmnds-col-1"
        content="The Direct Debit will be paid the day after your ticket starts"
      />
    </div>
  );
};

DatePickerInput.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  inline: PropTypes.bool,
};

DatePickerInput.defaultProps = {
  startDate: new Date(),
  inline: true,
};

export default DatePickerInput;
