import { useFormDataContext } from 'state/formDataState/context';
import { Table, ChangeAnswerButton } from 'components/shared';
import dompurify from 'dompurify';
import MultiFileCell from 'components/sharedTableCells/MultiFileCell/MultiFileCell';

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
  const array = [
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
  ];
  categories.sort((a, b) => array.indexOf(a) - array.indexOf(b));
  const filteredDisabilityCategories = () => {
    const arr: Array<String> = [];
    categories.map((i) => {
      if (i === 'Blind') {
        arr.push(`${pronoun} ${prep} blind or partially sighted in both eyes`);
      } else if (i === 'Deaf') {
        arr.push(`${pronoun} ${prep} deaf or only able to hear a little sound in both ears`);
      } else if (i === 'Walk') {
        arr.push(`${pronoun} cannot walk or find it difficult to walk short distances`);
      } else if (i === 'Arms') {
        arr.push(`${pronoun} ${prep} unable to use both arms`);
      } else if (i === 'Language') {
        arr.push(`${pronoun} cannot speak at all in any language`);
      } else if (i === 'Learn') {
        arr.push(
          `${pronoun} find it hard to learn and remember new information and live independently`,
        );
      } else if (i === 'DrivingLicense') {
        arr.push(`${pronoun} cannot drive a car because ${pronounc} have a medical condition`);
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
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentBlind! }]} />,
        <ChangeAnswerButton from="Blind" />,
      ]
    : [];
  const proofDeaf = categories.includes('Deaf')
    ? [
        <span>Proof of disability - deaf or only able to hear a little sound in both ears</span>,
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentDeaf! }]} />,
        <ChangeAnswerButton from="Deaf" />,
      ]
    : [];
  const proofLanguage = categories.includes('Language')
    ? [
        <span>Proof of disability - cannot speak at all in any language</span>,
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentLanguage! }]} />,
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
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentWalk! }]} />,
        <ChangeAnswerButton from="Walk" />,
      ];
  const proofWalk = categories.includes('Walk') ? proofWalkAlt : [];
  const proofArms = categories.includes('Arms')
    ? [
        <span>Proof of disability - unable to use both arms</span>,
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentArms! }]} />,
        <ChangeAnswerButton from="Arms" />,
      ]
    : [];
  const proofLearn = categories.includes('Learn')
    ? [
        <span>
          Proof of disability - find it hard to learn and remember new information and live
          independently
        </span>,
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentLearn! }]} />,
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
  const refusedLicense =
    categories.includes('DrivingLicense') && refusedDrivingLicense !== null
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
        <MultiFileCell filesConfig={[{ title: '', files: proofDocumentDrive! }]} />,
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
    return el !== undefined && el.length !== 0;
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
