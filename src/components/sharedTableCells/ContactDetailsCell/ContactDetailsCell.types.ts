import PropTypes from 'prop-types';

export type TProps = {
  phoneNumber: string;
  emailAddress: string;
};

export const propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
};
