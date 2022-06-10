import PropTypes from 'prop-types';

export type TProps = {
  btnClass?: string;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isActive?: boolean;
  isFetching?: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  title?: string;
  type: 'button' | 'submit' | 'reset';
};

export const propTypes = {
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  isActive: PropTypes.bool,
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export const defaultProps = {
  btnClass: '',
  disabled: false,
  iconLeft: '',
  iconRight: '',
  isActive: false,
  isFetching: false,
  title: '',
  type: 'button',
};
