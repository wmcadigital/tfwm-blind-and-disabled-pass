import { useFormDataContext } from 'state/formDataState/context';
import { Table, ChangeAnswerButton } from 'components/shared';
import { FileCell } from 'components/sharedTableCells';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const DisabilityProof = () => {
  const [formDataState] = useFormDataContext();
  const {
    disabilityCategories,
    drivingLicense,
    refusedLicense,
    proofDocumentBlind,
    proofDocumentDeaf,
    proofDocumentWalk,
    proofDocumentArms,
    proofDocumentLearn,
    proofDocumentLanguage,
    proofDocumentDrive,
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

  const drivingAnswers = disabilityCategories.includes('Drive')
    ? [
        <span>Do you have a driving licence?</span>,
        <span>{`${drivingLicense}`}</span>,
        <ChangeAnswerButton from="DrivingLicense" />,
      ]
    : [];
  const refusedAnswers = disabilityCategories.includes('Drive')
    ? [
        <span>
          Have you ever applied for a driving license but were refused due to your condition?
        </span>,
        <span>{`${refusedLicense}`}</span>,
        <ChangeAnswerButton from="RefusedLicense" />,
      ]
    : [];
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
  const proofWalk = disabilityCategories.includes('Walk')
    ? [
        <span>Proof of disability - cannot walk or find it difficult to walk short distances</span>,
        <FileCell filesConfig={[{ title: '', file: proofDocumentWalk! }]} />,
        <ChangeAnswerButton from="Walk" />,
      ]
    : [];
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
        drivingAnswers,
        refusedAnswers,
        proofBlind,
        proofDeaf,
        proofWalk,
        proofArms,
        proofLearn,
        proofLanguage,
        proofDrive,
      ]}
    />
  );
};

export default DisabilityProof;
