import { useFormDataContext } from 'state/formDataState';
import { Table, ChangeAnswerButton } from 'components/shared';
import { removeNthItem } from 'helpers/summary';

const AboutYou = () => {
  const [formDataState] = useFormDataContext();
  const { BehalfFirstName, BehalfLastName, relationshipToApplicant } = formDataState;

  const tableValues = [
    [
      <span>Your name</span>,
      <span>{`${BehalfFirstName} ${BehalfLastName}`}</span>,
      <ChangeAnswerButton from="Name" />, // or ApplicantLastName
    ],
    [
      <span>Relationship to applicant</span>,
      <span>{`${relationshipToApplicant}`}</span>,
      <ChangeAnswerButton from="Relationship" />,
    ],
  ];

  return (
    <Table
      title="About you"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={removeNthItem(tableValues, 7)}
    />
  );
};

export default AboutYou;
