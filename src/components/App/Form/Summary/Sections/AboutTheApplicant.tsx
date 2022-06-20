import { useFormDataContext } from 'state/formDataState';
import { Table, ChangeAnswerButton } from 'components/shared';
import { AddressCell, DateCell, ImageCell } from 'components/sharedTableCells';
import { removeNthItem } from 'helpers/summary';

const AboutTheApplicant = () => {
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const {
    ApplicantFirstName,
    ApplicantLastName,
    ApplicantDateOfBirth,
    ApplicantCurrentAddressLine1,
    ApplicantCurrentAddressLine2,
    ApplicantCurrentAddressLine3,
    ApplicantCurrentAddressLine4,
    ApplicantCurrentPostcode,
    ApplicantPhoto,
    ethnicity,
    ethnicityDetails,
    ApplicantEmailAddress,
    ApplicantMobilePhoneNumber,
    BehalfMobilePhoneNumber,
    BehalfEmailAddress,
    currentDisabledPass,
    passNumber,
    contactPreference,
  } = formDataState;
  const tableValues = [
    [
      <span>Name</span>,
      <span>{`${ApplicantFirstName} ${ApplicantLastName}`}</span>,
      <ChangeAnswerButton from="ApplicantName" />,
    ],
    [
      <span>Date of birth</span>,
      <DateCell date={ApplicantDateOfBirth!} />,
      <ChangeAnswerButton from="ApplicantBirthDate" />,
    ],
    [
      <span>Address</span>,
      <AddressCell
        line1={ApplicantCurrentAddressLine1!}
        line2={ApplicantCurrentAddressLine2!}
        line3={ApplicantCurrentAddressLine3}
        line4={ApplicantCurrentAddressLine4}
        postcode={ApplicantCurrentPostcode!}
      />,
      <ChangeAnswerButton from="ApplicantAddress" />, // Or any other the other address items
    ],
    [
      <span>Ethnicity</span>,
      <span>{`${ethnicityDetails || ethnicity}`}</span>,
      <ChangeAnswerButton from="ApplicantEthnicity" />,
    ],
    [
      <span>Ethnicity</span>,
      <span>{`${ethnicityDetails || ethnicity}`}</span>,
      <ChangeAnswerButton from="ApplicantEthnicity" />,
    ],
    [
      <span>How would {applicationForMe ? `you` : `they`} like to be contacted?</span>,
      <span>
        <p>{`${contactPreference.filter((n) => {
          return n.includes('etter');
        })}`}</p>
        <p>{`${ApplicantEmailAddress || BehalfEmailAddress}`}</p>
        <p>{`${ApplicantMobilePhoneNumber || BehalfMobilePhoneNumber}`}</p>
      </span>,
      <ChangeAnswerButton from="ApplicantContactDetails" />,
    ],
    [
      <span>Do {applicationForMe ? `you` : `they`} already have a disabled person’s pass?</span>,
      <span>{`${currentDisabledPass ? 'Yes' : 'No'}`}</span>,
      <ChangeAnswerButton from="CurrentPass" />,
    ],
    currentDisabledPass
      ? [
          <span>Current disabled person’s pass number</span>,
          <span>{`${passNumber}`}</span>,
          <ChangeAnswerButton from="CurrentPassNumber" />,
        ]
      : [],
    [
      <span>Updated Photo</span>,
      <ImageCell image={ApplicantPhoto!} />,
      <ChangeAnswerButton from="ApplicantPhoto" />,
    ],
  ].filter((el) => {
    return el !== [] && el.length !== 0;
  });

  return (
    <Table
      title={applicationForMe ? `About you` : `About the applicant`}
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={removeNthItem(tableValues, 5)}
    />
  );
};

export default AboutTheApplicant;
