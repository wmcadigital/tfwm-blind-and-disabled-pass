import { TFormStep } from 'components/App/Form/Questions/Sections';
import { TFormDataState, TFormDataStateItem } from 'state/formDataState/types';
import { Nullable } from 'types/helpers';
import { TSectionAndStep } from 'types/navigation';
import { TTicket } from 'types/ticket';

export type TGlobalState = {
  form: {
    isStarted: boolean;
    isFinished: boolean;
    isSubmitted: boolean;
    isEditing: boolean;
    isLoading: boolean;
    edit: {
      from: Nullable<TSectionAndStep>;
      to: Nullable<TSectionAndStep>;
      temporaryData: Partial<TFormDataState>;
    };
    currentSection: number;
    currentStep: number;
    previousSection: number;
    previousStep: number;
    referenceNo: string;
  };
  ticket: TTicket;
};

export type TSectionAndStepRange = {
  from: TSectionAndStep;
  to: TSectionAndStep;
};

export type TGlobalStateAction =
  | {
      type: 'START_FORM';
      payload?: null;
    }
  | {
      type: 'LOAD_FORM';
      payload?: null;
    }
  | {
      type: 'SHOW_START_PAGE';
      payload?: null;
    }
  | {
      type: 'SHOW_SUMMARY_PAGE';
      payload?: null;
    }
  | {
      type: 'SHOW_SUCCESS_PAGE';
      payload: string;
    }
  | {
      type: 'EDIT_FORM';
      payload: TSectionAndStep | TSectionAndStepRange;
    }
  | {
      type: 'UPDATE_EDIT_FORM_TO';
      payload: TFormStep;
    }
  | {
      type: 'ADD_TICKET_INFO';
      payload: TTicket;
    }
  | {
      type: 'GO_TO_SECTION_AND_STEP';
      payload: TSectionAndStep;
    }
  | {
      type: 'SET_PREVIOUS_SECTION_AND_STEP';
      payload: TSectionAndStep;
    }
  | {
      type: 'GO_BACK';
      payload?: null;
    }
  | {
      type: 'UPDATE_TEMP_FORM_DATA';
      payload: TFormDataStateItem;
    }
  | {
      type: 'ADD_EMPTY_TEMP_PAYER_AND_TICKET_HOLDER_DATA';
      payload?: null;
    }
  | {
      type: 'CLEAR_TEMP_FORM_DATA';
      payload?: null;
    };

export type TGlobalStateReducer = (state: TGlobalState, action: TGlobalStateAction) => TGlobalState;
export type TGlobalStateContext = [TGlobalState, React.Dispatch<TGlobalStateAction>];

export type TGlobalContextProviderProps = {
  children?: React.ReactNode;
};
