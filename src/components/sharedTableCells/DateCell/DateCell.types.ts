import PropTypes from 'prop-types';

export type TProps = {
  date: Date;
  showDay?: boolean;
};

export const propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  showDay: PropTypes.bool,
};

export const defaultProps = {
  showDay: false,
};
