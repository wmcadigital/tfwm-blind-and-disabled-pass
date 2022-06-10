import PropTypes from 'prop-types';

export type TProps = {
  filesConfig: {
    title: string;
    file: File;
  }[];
};

export const propTypes = {
  filesConfig: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      file: PropTypes.instanceOf(File).isRequired,
    }).isRequired,
  ),
};
