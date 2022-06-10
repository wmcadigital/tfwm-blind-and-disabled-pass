import { getSearchParam } from 'helpers/URLSearchParams';
import { TGlobalState } from './types';

const initialState: TGlobalState = {
  form: {
    isStarted: false,
    isFinished: false,
    isSubmitted: false,
    isEditing: false,
    edit: {
      from: null,
      to: null,
      temporaryData: {},
    },
    currentSection: 0,
    currentStep: 0,
    previousSection: 0,
    previousStep: 0,
    referenceNo: '',
  },
  ticket: {
    id: parseInt(getSearchParam('ticketId') as string, 10) || -1,
    name: '',
    modes: [],
    priceString: '',
    availableDates: [new Date()],
    raw: {},
  },
};

export default initialState;
