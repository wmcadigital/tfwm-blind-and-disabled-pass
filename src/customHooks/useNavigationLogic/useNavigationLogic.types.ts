import { TFormStep } from 'components/App/Form/Questions/Sections';

export type TUseNavigationLogic = (
  prevStepName: TFormStep | 'StartPage',
  nextStepName?: TFormStep | 'Summary',
) => {
  goToNextStep: () => void;
};
