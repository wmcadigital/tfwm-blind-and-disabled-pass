import PropTypes from 'prop-types';
import { Nullable } from 'types/helpers';

export type TProps = {
  line1: string;
  line2: string;
  line3?: Nullable<string>;
  line4?: Nullable<string>;
  postcode: string;
};

export const propTypes = {
  line1: PropTypes.string.isRequired,
  line2: PropTypes.string.isRequired,
  line3: PropTypes.string,
  line4: PropTypes.string,
  postcode: PropTypes.string.isRequired,
};

export const defaultProps = {
  line3: '',
  line4: '',
};
