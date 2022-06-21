import { useFormDataContext } from 'state/formDataState/context';
import { Table, ChangeAnswerButton } from 'components/shared';
import { FileCell } from 'components/sharedTableCells';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const DisabilityProof = () => {
  const [formDataState] = useFormDataContext();
  const {
    applicationForMe,
    disabilityCategories,
    proofDocumentBlind,
    proofDocumentDeaf,
    proofDocumentWalk,
    proofDocumentArms,
    proofDocumentLearn,
    proofDocumentLanguage,
    proofDocumentDrive,
    distance,
    distanceMetric,
    hasDrivingLicense,
    refusedDrivingLicense,
  } = formDataState;
  const pronoun = applicationForMe ? 'I' : 'They';
  const pronounc = applicationForMe ? 'I' : 'they';
  const prep = applicationForMe ? 'am' : 'are';
  const categories = disabilityCategories || [];

  const filteredDisabilityCategories = () => {
    const arr: Array<String> = [];
    categories.map((i) => {
      if (i === 'Blind') {
        arr.push(`${pronoun} ${prep} blind or partially sighted `);
      } else if (i === 'Deaf') {
        arr.push(`${pronoun} ${prep} am profoundly or severely deaf in both ears`);
      } else if (i === 'Walk') {
        arr.push(`${pronoun} can't walk short distances without severe discomfort`);
      } else if (i === 'Arms') {
        arr.push(`${pronoun} ${prep} unable to use both arms`);
      } else if (i === 'Language') {
        arr.push(`${pronoun} can't speak at all in any language`);
      } else if (i === 'Learn') {
        arr.push(
          `${pronoun} find it hard to learn and remember new information and live independently`,
        );
      } else if (i === 'DrivingLicense') {
        arr.push(`${pronoun} can't drive a car because ${pronounc} have a medical condition`);
      }
      return arr;
    });
    return arr.map((i) => {
      return `${i}`;
    });
  };
  const proofBlind = categories.includes('Blind')
    ? [
        <span>Proof of disability - blind or partially sighted</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentBlind! }]} />,
        <ChangeAnswerButton from="Blind" />,
      ]
    : [];
  const proofDeaf = categories.includes('Deaf')
    ? [
        <span>Proof of disability - profoundly or severly deaf in both ears</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentDeaf! }]} />,
        <ChangeAnswerButton from="Deaf" />,
      ]
    : [];
  const proofLanguage = categories.includes('Language')
    ? [
        <span>Proof of disability - cannot speak at all in any language</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentLanguage! }]} />,
        <ChangeAnswerButton from="Language" />,
      ]
    : [];
  const proofWalkAlt = distance
    ? [
        <span>How far can {applicationForMe ? `you` : `they`} walk?</span>,
        <span>
          {distance} {distanceMetric ? `metres` : `feet`}
        </span>,
        <ChangeAnswerButton from="Distance" />,
      ]
    : [
        <span>Proof of disability - cannot walk or find it difficult to walk short distances</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentWalk! }]} />,
        <ChangeAnswerButton from="Walk" />,
      ];
  const proofWalk = categories.includes('Walk') ? proofWalkAlt : [];
  const proofArms = categories.includes('Arms')
    ? [
        <span>Proof of disability - unable to use both arms</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentArms! }]} />,
        <ChangeAnswerButton from="Arms" />,
      ]
    : [];
  const proofLearn = categories.includes('Learn')
    ? [
        <span>
          Proof of disability - find it hard to learn and remember new information and live
          independently
        </span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentLearn! }]} />,
        <ChangeAnswerButton from="Learn" />,
      ]
    : [];
  const hasLicense = categories.includes('DrivingLicense')
    ? [
        <span>Do {applicationForMe ? `you` : `they`} have a driving license?</span>,
        <span>{hasDrivingLicense ? 'Yes' : 'No'}</span>,
        <ChangeAnswerButton from="DrivingLicense" />,
      ]
    : [];
  const refusedLicense = categories.includes('DrivingLicense')
    ? [
        <span>
          Have {applicationForMe ? `you` : `they`} ever applied for a Driving License but were
          refused due to {applicationForMe ? `your` : `their`} condition?
        </span>,
        <span>{refusedDrivingLicense ? 'Yes' : 'No'}</span>,
        <ChangeAnswerButton from="RefusedLicense" />,
      ]
    : [];
  const proofDrive = categories.includes('DrivingLicense')
    ? [
        <span>Proof of disability - cannot drive a car because of a medical condition</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentDrive! }]} />,
        <ChangeAnswerButton from="Drive" />,
      ]
    : [];
  const tableData = [
    [
      <span>Which categories apply?</span>,
      <span
        dangerouslySetInnerHTML={{
          __html: sanitize(filteredDisabilityCategories().toString().replace(/,/g, '<br><br>')),
        }}
      />,
      <ChangeAnswerButton from="DisablityCategories" />,
    ],
    proofBlind,
    proofDeaf,
    proofLanguage,
    proofWalk,
    proofArms,
    proofLearn,
    hasLicense,
    refusedLicense,
    proofDrive,
  ].filter((el) => {
    return el !== [] && el.length !== 0;
  });
  return (
    <Table
      title="Proof of disability"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={tableData}
    />
  );
};

export default DisabilityProof;
