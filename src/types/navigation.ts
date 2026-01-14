import PropTypes from 'prop-types';

/**
 * TSectionAndStep
 * Represents a position in the multi-step form by section and step numbers.
 * - section: numeric identifier for the current section
 * - step: numeric identifier for the step within the section
 */
export type TSectionAndStep = {
  section: number;
  step: number;
};

/**
 * TStepNavigation
 * Signatures for functions that control navigation through the form.
 * Implementations should perform the appropriate UI transitions when called.
 */
export type TStepNavigation = {
  // Move to the next logical step in the current flow
  goToNextStep: () => void;
  // Jump to a specific step index within the current section or flow
  skipToStep: (newStep: number) => void;
  // Jump to the first step of a different section
  skipToSection: (newStep: number) => void;
  // Navigate directly to the summary screen
  goToSummary: () => void;
};

/**
 * stepNavigationPropTypes
 * Runtime PropTypes for React components that expect a TStepNavigation-like prop.
 * Useful for JS files that still rely on PropTypes for validation.
 */
export const stepNavigationPropTypes = {
  goToNextStep: PropTypes.func.isRequired,
  skipToStep: PropTypes.func.isRequired,
  skipToSection: PropTypes.func.isRequired,
  goToSummary: PropTypes.func.isRequired,
};
