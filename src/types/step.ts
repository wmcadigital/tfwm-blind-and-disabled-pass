import PropTypes from 'prop-types';
import { TStepNavigation, stepNavigationPropTypes } from './navigation';

// Step props
export type TStepProps = {
  stepNavigation: TStepNavigation;
  currentSection?: number | null;
};

export const stepPropTypes = {
  stepNavigation: stepNavigationPropTypes,
  currentSection: PropTypes.number,
};

// Shared steps
export type TSharedStepProps = {
  handleNavigation: () => void;
  question: string;
  dataNamePrefix: 'Behalf' | 'Applicant';
};

export type TCategoriesStepProps = {
  handleNavigation: () => void;
  question: string;
  dataNamePrefix: 'Behalf' | 'Applicant';
  categories: Array<string>;
};

export type TSharedDocProps = {
  handleNavigation: () => void;
  question: string;
  canApply: boolean;
  documentsList: () => void;
  application: () => void;
  applicationNot?: () => void;
  dataNamePrefix: 'Behalf' | 'Applicant';
  dataCategoryPrefix: string;
  alternateEvidence: boolean;
};

export const sharedStepPropTypes = {
  handleNavigation: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  dataNamePrefix: PropTypes.oneOf(['Behalf', 'Applicant']),
};

export type TSharedStepSimpleProps = Pick<TSharedStepProps, 'handleNavigation' | 'question'>;

export const sharedStepSimplePropTypes = {
  handleNavigation: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
};

export type TSharedStepDocsProps = Pick<
  TSharedDocProps,
  | 'handleNavigation'
  | 'question'
  | 'documentsList'
  | 'application'
  | 'canApply'
  | 'dataCategoryPrefix'
  | 'alternateEvidence'
  | 'applicationNot'
>;
