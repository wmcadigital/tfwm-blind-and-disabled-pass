import PropTypes from 'prop-types';

export type TSectionAndStep = {
  section: number;
  step: number;
};

export type TStepNavigation = {
  goToNextStep: () => void;
  skipToStep: (newStep: number) => void;
  skipToSection: (newStep: number) => void;
  goToSummary: () => void;
};

export const stepNavigationPropTypes = {
  goToNextStep: PropTypes.func.isRequired,
  skipToStep: PropTypes.func.isRequired,
  skipToSection: PropTypes.func.isRequired,
  goToSummary: PropTypes.func.isRequired,
};
