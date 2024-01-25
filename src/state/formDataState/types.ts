import { Nullable } from 'types/helpers';
import { TSession } from 'types/session';
import { TApiTicket } from 'types/ticket';

// fields that are directly edited by user need to be Subscription<DATA_TYPE>
// fields that are set via code need to be Nullable<DATA_TYPE>
export type TFormDataState = {
  sessionNo: number;
  id: string;
  onlineApplicationNo: Nullable<number>;
  submissionDate: Nullable<string>;
  onlineSalesTransactionId: Nullable<number>;
  createdDateTime: string;
  applicationForMe: Nullable<boolean>;
  outOfCounty: Nullable<string>;
  startDate: Nullable<Date>;
  ticketId: Nullable<number>;
  ticketCode: Nullable<string>;
  addOn: Nullable<string>;
  promotionalCode: Nullable<string>;
  previousCustomer: Nullable<boolean>;
  previousCustomerReferenceNumber: Nullable<number>;
  currentSwiftcard: Nullable<boolean>;
  currentSwiftcardNumber: Nullable<string>;
  addProductToExistingCard: Nullable<boolean>;
  isApprentice: Nullable<boolean>;
  schoolName: Nullable<string>;
  schoolPostcode: Nullable<string>;
  employerName: Nullable<string>;
  employerPostcode: Nullable<string>;
  filename: Nullable<string>;
  BehalfTitle: Nullable<string>;
  BehalfFirstName: Nullable<string>;
  BehalfLastName: Nullable<string>;
  BehalfDateOfBirth: Nullable<Date>;
  BehalfHomePhoneNumber: Nullable<string>;
  BehalfWorkPhoneNumber: Nullable<string>;
  BehalfMobilePhoneNumber: Nullable<string>;
  BehalfEmailAddress: Nullable<string>;
  currentTimeAtAddressYears: Nullable<number>;
  currentTimeAtAddressMonths: Nullable<number>;
  previousTimeAtAddressYears: Nullable<number>;
  previousTimeAtAddressMonths: Nullable<number>;
  BehalfCurrentPostcode: Nullable<string>;
  BehalfCurrentAddressLine1: Nullable<string>;
  BehalfCurrentAddressLine2: Nullable<string>;
  BehalfCurrentAddressLine3: Nullable<string>;
  BehalfCurrentAddressLine4: Nullable<string>;
  BehalfCurrentDistrict: Nullable<string>;
  BehalfCurrentTown: Nullable<string>;
  BehalfPreviousPostcode: Nullable<string>;
  BehalfPreviousAddressLine1: Nullable<string>;
  BehalfPreviousAddressLine2: Nullable<string>;
  BehalfPreviousAddressLine3: Nullable<string>;
  BehalfPreviousAddressLine4: Nullable<string>;
  BehalfPreviousTown: Nullable<string>;
  ApplicantTitle: Nullable<string>;
  ApplicantFirstName: Nullable<string>;
  ApplicantLastName: Nullable<string>;
  ApplicantDateOfBirth: Nullable<Date>;
  ApplicantHomePhoneNumber: Nullable<string>;
  ApplicantWorkPhoneNumber: Nullable<string>;
  ApplicantMobilePhoneNumber: Nullable<string>;
  ApplicantEmailAddress: Nullable<string>;
  ApplicantDisability: Nullable<string>;
  wouldLikeNetworkClubNews: Nullable<boolean>;
  ethnicity: Nullable<string>;
  ethnicityDetails: Nullable<string>;
  currentDisabledPass: Nullable<boolean>;
  passNumber: Nullable<string>;
  howDidYouHearAboutCentroDirectDebit: Nullable<string>;
  ApplicantCurrentPostcode: Nullable<string>;
  ApplicantCurrentAddressLine1: Nullable<string>;
  ApplicantCurrentAddressLine2: Nullable<string>;
  ApplicantCurrentAddressLine3: Nullable<string>;
  ApplicantCurrentAddressLine4: Nullable<string>;
  ApplicantCurrentDistrict: Nullable<string>;
  ApplicantCurrentTown: Nullable<string>;
  ApplicantPreviousPostcode: Nullable<string>;
  ApplicantPreviousAddressLine1: Nullable<string>;
  ApplicantPreviousAddressLine2: Nullable<string>;
  ApplicantPreviousAddressLine3: Nullable<string>;
  ApplicantPreviousAddressLine4: Nullable<string>;
  ApplicantPreviousTown: Nullable<string>;
  accountName: Nullable<string>;
  accountNumber: Nullable<string>;
  sortCode: Nullable<string>;
  relationshipToApplicant: Nullable<string>;
  discarded: Nullable<boolean>;
  ticketPrice: Nullable<number>;
  receiveByftFree: Nullable<boolean>;
  // Uploaded files
  ApplicantPhoto: Nullable<File>;
  studentIdPhoto: Nullable<File>;
  studentProofDocument: Nullable<File>;
  identityDocument: Nullable<File>;
  proofDocumentBlind: Nullable<File[]>;
  proofDocumentDeaf: Nullable<File[]>;
  proofDocumentWalk: Nullable<File[]>;
  proofDocumentArms: Nullable<File[]>;
  proofDocumentLearn: Nullable<File[]>;
  proofDocumentLanguage: Nullable<File[]>;
  proofDocumentDrive: Nullable<File[]>;

  disabilityCategories: Nullable<Array<string>>;
  drivingLicense: Nullable<string>;
  hasDrivingLicense: Nullable<boolean>;
  refusedDrivingLicense: Nullable<boolean>;
  refusedLicense: Nullable<string>;
  distance: Nullable<string>;
  distanceMetric: Nullable<boolean>;
  alternateStart: Nullable<boolean>;
  contactPreference: Array<string>;
  contactPerson: Nullable<boolean>;
  changePhoto: Nullable<boolean>;
};

export type TFormDataStateKey = keyof TFormDataState;
export type TFormDataStateValue = NonNullable<TFormDataState[TFormDataStateKey]>;
export type TSingleFormDataStateValue<T extends TFormDataStateKey> = TFormDataState[T];
export type TFormDataStateItem = {
  name: TFormDataStateKey;
  value: NonNullable<TFormDataState[TFormDataStateKey]>;
};

export type TFormDataStateAction =
  | {
      type: 'UPDATE_SESSION_DATA';
      payload: TSession;
    }
  | {
      type: 'UPDATE_TICKET_DATA';
      payload: Partial<TApiTicket>;
    }
  | {
      type: 'UPDATE_FORM_DATA';
      payload: Partial<TFormDataState>;
    }
  | {
      type: 'CLEAR_TICKET_HOLDER_DATA';
      payload?: null;
    }
  | {
      type: 'CLEAR_PAYER_DATA';
      payload?: null;
    }
  | {
      type: 'CLEAR_FORM_DATA';
      payload: TFormDataStateKey[];
    };

export type TFormDataStateReducer = (
  state: TFormDataState,
  action: TFormDataStateAction,
) => TFormDataState;

export type TFormDataContext = [TFormDataState, React.Dispatch<TFormDataStateAction>];

export type TFormDataContextProviderProps = {
  children?: React.ReactNode;
};
