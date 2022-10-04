import { TFormStep } from 'components/App/Form/Questions/Sections';
import { getSectionAndStep } from 'helpers/sectionAndStep';
import { TFormDataStateItem, TFormDataStateKey } from 'state/formDataState/types';
import { TSectionAndStep } from 'types/navigation';
import { TTicket } from 'types/ticket';
import initialFormDataState from 'state/formDataState/initialState';
import { getInitialValue } from 'helpers/formData';
import { TGlobalStateReducer, TSectionAndStepRange } from './types';

const reducer: TGlobalStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'START_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          isStarted: true,
          currentSection: 1,
          currentStep: 1,
        },
      };

    case 'LOAD_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: true,
        },
      };

    case 'SHOW_START_PAGE':
      return {
        ...state,
        form: {
          ...state.form,
          currentSection: 0,
          currentStep: 0,
          isStarted: false,
          isFinished: false,
          isEditing: false,
        },
      };

    case 'SHOW_SUMMARY_PAGE':
      return {
        ...state,
        form: {
          ...state.form,
          currentSection: 0,
          currentStep: 0,
          isFinished: true,
          isEditing: false,
          edit: {
            ...state.form.edit,
            from: null,
            to: null,
          },
        },
      };

    case 'SHOW_SUCCESS_PAGE': {
      const referenceNo = payload as string;

      return {
        ...state,
        form: {
          ...state.form,
          isSubmitted: true,
          isLoading: false,
          referenceNo,
        },
      };
    }

    case 'EDIT_FORM': {
      let to: TSectionAndStep;
      let from: TSectionAndStep;

      if ((payload as TSectionAndStepRange)?.from && (payload as TSectionAndStepRange)?.to) {
        from = (payload as TSectionAndStepRange).from;
        to = (payload as TSectionAndStepRange).to;
      } else {
        from = payload as TSectionAndStep;
        to = payload as TSectionAndStep;
      }

      return {
        ...state,
        form: {
          ...state.form,
          currentSection: from.section,
          currentStep: from.step,
          isFinished: false,
          isEditing: true,
          edit: {
            ...state.form.edit,
            from,
            to,
          },
        },
      };
    }

    case 'UPDATE_EDIT_FORM_TO': {
      const formStepName = payload as TFormStep;
      const newToSectionAndStep = getSectionAndStep(formStepName);

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          isEditing: true,
          edit: {
            ...state.form.edit,
            to: newToSectionAndStep,
          },
        },
      };
    }

    case 'ADD_TICKET_INFO':
      return {
        ...state,
        ticket: payload as TTicket,
      };

    case 'GO_TO_SECTION_AND_STEP': {
      const { section: newSection, step: newStep } = payload as TSectionAndStep;

      return {
        ...state,
        form: {
          ...state.form,
          currentSection: newSection,
          currentStep: newStep,
        },
      };
    }

    case 'SET_PREVIOUS_SECTION_AND_STEP': {
      const { section: newSection, step: newStep } = payload as TSectionAndStep;

      return {
        ...state,
        form: {
          ...state.form,
          previousSection: newSection,
          previousStep: newStep,
        },
      };
    }

    case 'GO_BACK': {
      const { previousSection, previousStep } = state.form;

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          currentSection: previousSection,
          currentStep: previousStep,
        },
      };
    }

    case 'UPDATE_TEMP_FORM_DATA': {
      const { name, value } = payload as TFormDataStateItem;

      return {
        ...state,
        form: {
          ...state.form,
          edit: {
            ...state.form.edit,
            temporaryData: {
              ...state.form.edit.temporaryData,
              [name]: value,
            },
          },
        },
      };
    }

    case 'CLEAR_TEMP_FORM_DATA': {
      return {
        ...state,
        form: {
          ...state.form,
          edit: {
            ...state.form.edit,
            temporaryData: {},
          },
        },
      };
    }

    case 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA': {
      const keysToClear = (Object.keys(initialFormDataState) as TFormDataStateKey[]).filter(
        (formDataKey) => {
          return (
            formDataKey.indexOf('Applicant') > -1 ||
            formDataKey.indexOf('payer') > -1 ||
            formDataKey === 'filename'
          );
        },
      );

      const emptyTempData = keysToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: getInitialValue(name),
        };
      }, {});

      return {
        ...state,
        form: {
          ...state.form,
          edit: {
            ...state.form.edit,
            temporaryData: {
              ...state.form.edit.temporaryData,
              ...emptyTempData,
            },
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
