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
  const filteredDisabilityCategories = () => {
    const arr: Array<String> = [];
    disabilityCategories.map((i) => {
      if (i === 'Blind') {
        arr.push(`I am blind or partially sighted `);
      } else if (i === 'Deaf') {
        arr.push(`I am profoundly or severely deaf in both ears`);
      } else if (i === 'Walk') {
        arr.push(`I can't walk short distances without severe discomfort`);
      } else if (i === 'Arms') {
        arr.push(`I am unable to use both arms`);
      } else if (i === 'Language') {
        arr.push(`I can't speak at all in any language`);
      } else if (i === 'Learn') {
        arr.push(`I find it hard to learn and remember new information and live independently`);
      } else if (i === 'DrivingLicense') {
        arr.push(`I can't drive a car because I have a medical condition`);
      }
      return arr;
    });
    return arr.map((i) => {
      return `${i}`;
    });
  };
  const proofBlind = disabilityCategories.includes('Blind')
    ? [
        <span>Proof of disability - blind or partially sighted</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentBlind! }]} />,
        <ChangeAnswerButton from="Blind" />,
      ]
    : [];
  const proofDeaf = disabilityCategories.includes('Deaf')
    ? [
        <span>Proof of disability - profoundly or severly deaf in both ears</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentDeaf! }]} />,
        <ChangeAnswerButton from="Deaf" />,
      ]
    : [];
  const proofLanguage = disabilityCategories.includes('Language')
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
  const proofWalk = disabilityCategories.includes('Walk') ? proofWalkAlt : [];
  const proofArms = disabilityCategories.includes('Arms')
    ? [
        <span>Proof of disability - unable to use both arms</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentArms! }]} />,
        <ChangeAnswerButton from="Arms" />,
      ]
    : [];
  const proofLearn = disabilityCategories.includes('Learn')
    ? [
        <span>
          Proof of disability - find it hard to learn and remember new information and live
          independently
        </span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentLearn! }]} />,
        <ChangeAnswerButton from="Learn" />,
      ]
    : [];
  const hasLicense = disabilityCategories.includes('DrivingLicense')
    ? [
        <span>Do {applicationForMe ? `you` : `they`} have a driving license?</span>,
        <span>{hasDrivingLicense ? 'Yes' : 'No'}</span>,
        <ChangeAnswerButton from="DrivingLicense" />,
      ]
    : [];
  const refusedLicense = disabilityCategories.includes('DrivingLicense')
    ? [
        <span>
          Have {applicationForMe ? `you` : `they`} ever applied for a Driving License but were
          refused due to {applicationForMe ? `your` : `their`} condition?
        </span>,
        <span>{refusedDrivingLicense ? 'Yes' : 'No'}</span>,
        <ChangeAnswerButton from="RefusedLicense" />,
      ]
    : [];
  const proofDrive = disabilityCategories.includes('DrivingLicense')
    ? [
        <span>Proof of disability - cannot drive a car because of a medical condition</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentDrive! }]} />,
        <ChangeAnswerButton from="Drive" />,
      ]
    : [];

  return (
    <Table
      title="Proof of disability"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
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
        proofWalk,
        proofArms,
        proofLearn,
        proofLanguage,
        hasLicense,
        refusedLicense,
        proofDrive,
      ]}
    />
  );
};

export default DisabilityProof;
