import { getInitialValue } from 'helpers/formData';
import { TSession } from 'types/session';
import { TApiTicket } from 'types/ticket';
import { TFormDataState, TFormDataStateKey, TFormDataStateReducer } from './types';

const reducer: TFormDataStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_SESSION_DATA': {
      const { createdDateTime, id, sessionNo } = payload as TSession;

      return {
        ...state,
        createdDateTime,
        id,
        sessionNo,
      };
    }

    case 'UPDATE_TICKET_DATA': {
      const apiTicketData = payload as Partial<TApiTicket>;

      return {
        ...state,
        ticketId: apiTicketData?.id || null,
        ticketPrice: apiTicketData?.ticketCurrentAmount || null,
      };
    }

    case 'UPDATE_FORM_DATA': {
      const newData = payload as Partial<TFormDataState>;

      // merge incoming form data
      const merged = {
        ...state,
        ...newData,
      } as TFormDataState;

      // If ApplicantEmailAddress is provided (not null or empty), copy it to emailAddress
      if (
        newData.ApplicantEmailAddress !== undefined &&
        newData.ApplicantEmailAddress !== null &&
        newData.ApplicantEmailAddress !== ''
      ) {
        merged.emailAddress = newData.ApplicantEmailAddress as string;
      } else if (
        newData.BehalfEmailAddress !== undefined &&
        newData.BehalfEmailAddress !== null &&
        newData.BehalfEmailAddress !== ''
      ) {
        // Otherwise, if BehalfEmailAddress is provided, use that
        merged.emailAddress = newData.BehalfEmailAddress as string;
      }

      // If ApplicantFirstName is provided (not null/undefined/empty), copy it to firstName
      if (
        newData.ApplicantFirstName !== undefined &&
        newData.ApplicantFirstName !== null &&
        newData.ApplicantFirstName !== ''
      ) {
        merged.firstName = newData.ApplicantFirstName as string;
      }

      // If ApplicantLastName is provided (not null/undefined/empty), copy it to lastName
      if (
        newData.ApplicantLastName !== undefined &&
        newData.ApplicantLastName !== null &&
        newData.ApplicantLastName !== ''
      ) {
        merged.lastName = newData.ApplicantLastName as string;
      }

      return merged;
    }

    case 'CLEAR_FORM_DATA': {
      const valuesToClear = payload as TFormDataStateKey[];

      const dataToClear = valuesToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: getInitialValue(name),
        };
      }, {});

      return {
        ...state,
        ...dataToClear,
      };
    }

    case 'CLEAR_TICKET_HOLDER_DATA': {
      const keysToClear = (Object.keys(state) as TFormDataStateKey[]).filter((formDataKey) => {
        return formDataKey.indexOf('Applicant') > -1 || formDataKey === 'filename';
      });

      const dataToClear = keysToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: getInitialValue(name),
        };
      }, {});

      return {
        ...state,
        ...dataToClear,
      };
    }

    case 'CLEAR_PAYER_DATA': {
      const keysToClear = (Object.keys(state) as TFormDataStateKey[]).filter((formDataKey) => {
        return formDataKey.indexOf('payer') > -1 || formDataKey === 'filename';
      });

      const dataToClear = keysToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: getInitialValue(name),
        };
      }, {});

      return {
        ...state,
        ...dataToClear,
      };
    }

    default:
      return state;
  }
};

export default reducer;
