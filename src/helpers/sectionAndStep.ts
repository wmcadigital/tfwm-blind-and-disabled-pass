import { formPath } from 'components/App/Form/Questions/Sections';
import type { TFormStep } from 'components/App/Form/Questions/Sections';
import type { TSectionAndStep } from 'types/navigation';

export const getSectionAndStep = (stepNameToFind: TFormStep): TSectionAndStep => {
  let returnSection: number = -1;
  let returnStep: number = -1;

  formPath.some((section, sectionIndex) => {
    const stepIndex = section.findIndex((step) => step === stepNameToFind);
    const stepFound = stepIndex >= 0;

    if (stepFound) {
      returnSection = sectionIndex + 1;
      returnStep = stepIndex + 1;
    }

    return stepFound; // Short circuits loop if found early
  });

  return { section: returnSection, step: returnStep };
};

// Comparison
export const sectionAndStepAreEqual = (a: TSectionAndStep, b: TSectionAndStep): boolean => {
  const sectionEqual = a?.section === b?.section;
  const stepEqual = a?.step === b?.step;
  return sectionEqual && stepEqual;
};

export const arrayContainsSectionAndStep = (
  array: TSectionAndStep[],
  comparison: TSectionAndStep,
) => {
  return array.some((item) => {
    return sectionAndStepAreEqual(item, comparison);
  });
};

export const isSectionAndStepGreater = (a: TSectionAndStep, b: TSectionAndStep): boolean => {
  if (a.section > b.section) return true;
  return a.section >= b.section && a.step > b.step;
};
