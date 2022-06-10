import PropTypes from 'prop-types';

export type TProps = {
  totalSections: number;
  title: string;
  steps: Array<() => JSX.Element>;
};

export const propTypes = {
  totalSections: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.elementType.isRequired).isRequired,
};
