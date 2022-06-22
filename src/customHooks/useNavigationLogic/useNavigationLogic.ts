import {
  getSectionAndStep,
  isSectionAndStepGreater,
  sectionAndStepAreEqual,
} from 'helpers/sectionAndStep';
import { useState, useCallback, useEffect } from 'react';
import { useGlobalContext } from 'state/globalState/context';
import { TUseNavigationLogic } from './useNavigationLogic.types';

const useNavigationLogic: TUseNavigationLogic = (prevStepName, nextStepName) => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing, edit, currentSection, currentStep } = globalState.form;

  const [prevSectionAndStepUpdated, setPrevSectionAndStepUpdated] = useState(false);
  const [shouldGoToNextStep, setShouldGoToNextStep] = useState(false);

  const setPrevSectionAndStep = useCallback(() => {
    let payload;
    const currentSectionAndStep = {
      section: currentSection,
      step: currentStep,
    };
    if (
      prevStepName === 'StartPage' ||
      (isEditing && sectionAndStepAreEqual(edit.from!, currentSectionAndStep))
    ) {
      payload = { section: 0, step: 0 };
    } else {
      payload = getSectionAndStep(prevStepName);
    }

    globalStateDispatch({ type: 'SET_PREVIOUS_SECTION_AND_STEP', payload });
    setPrevSectionAndStepUpdated(true);
  }, [currentSection, currentStep, edit.from, globalStateDispatch, isEditing, prevStepName]);

  useEffect(() => {
    if (!prevSectionAndStepUpdated) {
      setPrevSectionAndStep();
    }
  }, [prevSectionAndStepUpdated, setPrevSectionAndStep]);

  const goToNextStep = () => setShouldGoToNextStep(true);

  const navigate = useCallback(() => {
    if (!nextStepName) return;
    if (nextStepName === 'Summary') {
      globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
      return;
    }

    const stepToNavigateTo = getSectionAndStep(nextStepName);

    if (
      isEditing &&
      isSectionAndStepGreater(stepToNavigateTo, edit.to!) &&
      currentSection !== 2 &&
      currentStep !== 6 &&
      currentStep !== 10 &&
      currentStep !== 11
    ) {
      globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
      return;
    }

    globalStateDispatch({ type: 'GO_TO_SECTION_AND_STEP', payload: stepToNavigateTo });
  }, [edit.to, globalStateDispatch, isEditing, nextStepName]);

  useEffect(() => {
    if (shouldGoToNextStep) navigate();
  }, [navigate, shouldGoToNextStep]);

  return {
    goToNextStep,
  };
};

export default useNavigationLogic;
