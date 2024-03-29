export const formPath = [
  ['CheckIfUserIsTheApplicant'],
  [
    'ApplicantName',
    'ApplicantBirthDate',
    'ApplicantAddress',
    'ApplicantEthnicity',
    'ApplicantEthnicityDetails',
    'WhoToContact',
    'ApplicantContactDetails',
    'CurrentPass',
    'CurrentPassNumber',
    'ChangePhoto',
    'ApplicantPhoto',
    'NotEligible',
    'NotEligiblePostCode',
  ],
  [
    'RightCategories',
    'DisablityCategories',
    'Blind',
    'Deaf',
    'Language',
    'Walk',
    'Distance',
    'Arms',
    'Learn',
    'DrivingLicense',
    'RefusedLicense',
    'Drive',
  ],
  ['Name', 'Relationship'],
] as const;
export const formPathFlat = formPath.flat();
export type TFormStep = typeof formPathFlat[number];
