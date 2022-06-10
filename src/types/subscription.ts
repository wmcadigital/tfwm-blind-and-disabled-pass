import PropTypes from 'prop-types';

import { Nullable } from './helpers';
import { TError } from './validation';

export type TSubscriptionReturn<T> = {
  savedValue: T | null;
  hasSavedValue: boolean;
  currentValue: T | null;
  hasCurrentValue: boolean;
  error: Nullable<TError>;
  hasError: boolean;
  set: (newValue: T | null) => void;
  save: () => boolean;
  clearSavedValue: () => void;
  validate: () => boolean;
};

export const subscriptionPropTypes = {
  savedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.instanceOf(File),
    PropTypes.instanceOf(Date),
  ]),
  hasSavedValue: PropTypes.bool.isRequired,
  currentValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.instanceOf(File),
  ]),
  hasCurrentValue: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  set: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  clearSavedValue: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
};
