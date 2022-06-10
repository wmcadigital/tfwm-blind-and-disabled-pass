import { TProps, propTypes, defaultProps } from './DateCell.types';

const DateCell = ({ date, showDay }: TProps) => {
  const dateToShow =
    showDay && date
      ? date.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : date && date.toLocaleDateString();

  return <span>{dateToShow}</span>;
};

DateCell.propTypes = propTypes;
DateCell.defaultProps = defaultProps;

export default DateCell;
