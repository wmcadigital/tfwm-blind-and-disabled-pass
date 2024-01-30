import PropTypes from 'prop-types';

export type TProps = {
  filesConfig: {
    title: string;
    files: File[];
  }[];
};

export const propTypes = {
  filesConfig: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
    }).isRequired,
  ),
};
