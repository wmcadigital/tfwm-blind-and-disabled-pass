import { TFormDataState } from './types';

const initialState: TFormDataState = {
  sessionNo: 0,
  id: '',
  onlineApplicationNo: null,
  submissionDate: null,
  onlineSalesTransactionId: null,
  createdDateTime: '',
  applicationForMe: null,
  outOfCounty: null,
  startDate: null,
  ticketId: null,
  ticketCode: '',
  addOn: null,
  promotionalCode: null,
  previousCustomer: false,
  previousCustomerReferenceNumber: null,
  currentSwiftcard: false,
  currentSwiftcardNumber: null,
  addProductToExistingCard: null,
  isApprentice: null,
  schoolName: null,
  schoolPostcode: null,
  employerName: null,
  employerPostcode: null,
  filename: '.',
  BehalfTitle: '.',
  BehalfFirstName: null,
  BehalfLastName: null,
  BehalfDateOfBirth: null,
  BehalfHomePhoneNumber: null,
  BehalfWorkPhoneNumber: null,
  BehalfMobilePhoneNumber: '',
  BehalfEmailAddress: '',
  currentTimeAtAddressYears: null,
  currentTimeAtAddressMonths: null,
  previousTimeAtAddressYears: null,
  previousTimeAtAddressMonths: null,
  BehalfCurrentPostcode: null,
  BehalfCurrentAddressLine1: null,
  BehalfCurrentAddressLine2: null,
  BehalfCurrentAddressLine3: null,
  BehalfCurrentAddressLine4: null,
  BehalfCurrentTown: '.',
  BehalfPreviousPostcode: null,
  BehalfPreviousAddressLine1: null,
  BehalfPreviousAddressLine2: null,
  BehalfPreviousAddressLine3: null,
  BehalfPreviousAddressLine4: null,
  BehalfPreviousTown: null,
  ApplicantTitle: '.',
  ApplicantFirstName: null,
  ApplicantLastName: null,
  ApplicantDateOfBirth: null,
  ApplicantHomePhoneNumber: null,
  ApplicantWorkPhoneNumber: null,
  ApplicantMobilePhoneNumber: '',
  ApplicantEmailAddress: '',
  ApplicantDisability: '.',
  wouldLikeNetworkClubNews: false,
  howDidYouHearAboutCentroDirectDebit: null,
  ethnicity: null,
  ethnicityDetails: null,
  currentDisabledPass: null,
  passNumber: null,
  ApplicantCurrentPostcode: null,
  ApplicantCurrentAddressLine1: null,
  ApplicantCurrentAddressLine2: null,
  ApplicantCurrentAddressLine3: null,
  ApplicantCurrentAddressLine4: null,
  ApplicantCurrentTown: '.',
  ApplicantPreviousPostcode: null,
  ApplicantPreviousAddressLine1: null,
  ApplicantPreviousAddressLine2: null,
  ApplicantPreviousAddressLine3: null,
  ApplicantPreviousAddressLine4: null,
  ApplicantPreviousTown: null,
  accountName: null,
  accountNumber: null,
  sortCode: null,
  relationshipToApplicant: null,
  has16to18Card: false,
  cardNumber16to18: null,
  imported: null,
  discarded: null,
  isChild: false,
  ticketPrice: null,
  receiveByftFree: null,
  // Uploaded files
  ApplicantPhoto: null,
  studentIdPhoto: null,
  studentProofDocument: null,
  identityDocument: null,
  proofDocumentBlind: null,
  proofDocumentDeaf: null,
  proofDocumentWalk: null,
  proofDocumentArms: null,
  proofDocumentLearn: null,
  proofDocumentLanguage: null,
  proofDocumentDrive: null,

  disabilityCategories: [],
  drivingLicense: null,
  refusedLicense: null,
  distance: null,
  alternateStart: false,
  contactPreference: [],
  contactPerson: null,
  changePhoto: null,
};

export default initialState;
