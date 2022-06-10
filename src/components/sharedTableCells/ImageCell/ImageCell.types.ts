import PropTypes from 'prop-types';

export type TProps = {
  image: File;
};

export const propTypes = {
  image: PropTypes.instanceOf(File).isRequired,
};
