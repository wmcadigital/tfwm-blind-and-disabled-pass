import PropTypes from 'prop-types';
import { TFormStep, formPathFlat } from 'components/App/Form/Questions/Sections';

export type TProps = {
  from: TFormStep;
  to?: TFormStep;
};

export const propTypes = {
  from: PropTypes.oneOf(formPathFlat).isRequired,
  to: PropTypes.oneOf(formPathFlat),
};

export const defaultProps = {
  to: null,
};
