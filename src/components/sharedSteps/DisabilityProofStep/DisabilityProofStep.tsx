import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Button, Question } from 'components/shared';
import { TSharedStepDocsProps, sharedStepSimplePropTypes } from 'types/step';
import Icon from 'components/shared/Icon/Icon';
import { useGlobalContext } from 'state/globalState';
import MultiFileUpload from 'components/shared/MultiFileUpload/MultiFileUpload';

const DisabilityProofStep = ({
  handleNavigation,
  question,
  documentsList,
  application,
  canApply,
  dataCategoryPrefix,
  alternateEvidence,
  applicationNot,
  applicationInfo,
}: TSharedStepDocsProps) => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;
  const disabilityCategories = useFormDataSubscription('disabilityCategories');
  const proofDocumentBlind = useFormDataSubscription('proofDocumentBlind');
  const proofDocumentDeaf = useFormDataSubscription('proofDocumentDeaf');
  const proofDocumentWalk = useFormDataSubscription('proofDocumentWalk');
  const distanceMetric = useFormDataSubscription('distanceMetric');
  const proofDocumentArms = useFormDataSubscription('proofDocumentArms');
  const proofDocumentLearn = useFormDataSubscription('proofDocumentLearn');
  const proofDocumentLanguage = useFormDataSubscription('proofDocumentLanguage');
  const proofDocumentDrive = useFormDataSubscription('proofDocumentDrive');
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const maxFilesAllowed = 8;

  const { goToNextStep } = useNavigationLogic('DisablityCategories', 'Distance');
  const pronoun = applicationForMe.currentValue ? 'You' : 'They';

  const proofDocument = () => {
    if (question.includes('blind')) {
      return proofDocumentBlind;
    }
    if (question.includes('deaf')) {
      return proofDocumentDeaf;
    }
    if (question.includes('walk')) {
      return proofDocumentWalk;
    }
    if (question.includes('arms')) {
      return proofDocumentArms;
    }
    if (question.includes('learn')) {
      return proofDocumentLearn;
    }
    if (question.includes('language')) {
      return proofDocumentLanguage;
    }
    if (question.includes('drive')) {
      return proofDocumentDrive;
    }
    return proofDocumentBlind;
  };
  const identityDocument = proofDocument();

  const checkProof = () => {
    const arr = disabilityCategories.savedValue ? disabilityCategories.savedValue : [];
    if (arr.includes('Blind') && !proofDocumentBlind.savedValue) {
      return 3;
    }
    if (arr.includes('Deaf') && !proofDocumentDeaf.savedValue) {
      return 4;
    }
    if (arr.includes('Walk') && (!proofDocumentWalk.savedValue || distanceMetric === null)) {
      return 6;
    }
    if (arr.includes('Arms') && !proofDocumentArms.savedValue) {
      return 8;
    }
    if (arr.includes('Learn') && !proofDocumentLearn.savedValue) {
      return 9;
    }
    if (arr.includes('Language') && !proofDocumentLanguage.savedValue) {
      return 5;
    }
    if (arr.includes('DrivingLicense') && !proofDocumentDrive.savedValue) {
      return 10;
    }
    return 0;
  };
  const stepTo = checkProof();
  const handleContinue = async () => {
    const isIdentityDocumentValid = identityDocument.save();
    if (!isIdentityDocumentValid) return;
    // If user changes this step we need to delete any saved data
    if (isEditing && stepTo !== 0) {
      checkProof();
      globalStateDispatch({
        type: 'GO_TO_SECTION_AND_STEP',
        payload: { section: 3, step: stepTo },
      });
    } else {
      handleNavigation();
    }
  };
  const deleteFile = (file: File) => {
    if (identityDocument.currentValue !== null) {
      const array = [...identityDocument.currentValue];
      const index = identityDocument.currentValue.indexOf(file);
      if (index > -1) {
        array.splice(index, 1);
        identityDocument.set(array);
      }
    }
  };

  // const one = !question.includes('learn') ? 'one' : 'at least two';
  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={identityDocument.hasError}
    >
      {application && application() !== undefined && (
        <div
          className={
            canApply
              ? 'wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md'
              : 'wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-cannot wmnds-m-b-md'
          }
        >
          <div className="wmnds-ticket-summary-msg__header">
            <Icon
              iconName={canApply ? 'general-checkmark' : 'general-cross'}
              className="wmnds-ticket-summary-msg__icon"
            />
            <h3 className="wmnds-ticket-summary-msg__title">
              {canApply ? `${pronoun} can apply` : `${pronoun} cannot apply`}
            </h3>
          </div>
          <div className="wmnds-ticket-summary-msg__info">
            <>{application()}</>
          </div>
        </div>
      )}
      {applicationNot && applicationNot() !== undefined && (
        <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-cannot wmnds-m-b-md">
          <div className="wmnds-ticket-summary-msg__header">
            <Icon iconName="general-cross" className="wmnds-ticket-summary-msg__icon" />
            <h3 className="wmnds-ticket-summary-msg__title">{pronoun} cannot apply</h3>
          </div>
          <div className="wmnds-ticket-summary-msg__info">
            <>{applicationNot()}</>
          </div>
        </div>
      )}
      {applicationInfo && applicationInfo() !== undefined && (
        <div className="wmnds-warning-text wmnds-warning-text--info">
          <div style={{ color: '#3c1053' }}>
            <Icon iconName="general-info" className="wmnds-warning-text__icon" />
          </div>
          <>{applicationInfo()}</>
          <br />
        </div>
      )}
      <p>Please upload one of the documents below:</p>
      {documentsList()}
      <p>
        You can take a picture of the document on a mobile phone. Please make sure the image is
        clear enough to read.
      </p>
      <MultiFileUpload
        hint={`Files must be jpeg, png or pdf file format. You can upload up to ${maxFilesAllowed} files.`}
        accept=".png,.jpg,.jpeg,.pdf"
        name={`${dataCategoryPrefix}proof`}
        maxFiles={maxFilesAllowed}
        defaultFiles={identityDocument.currentValue}
        updateFiles={identityDocument.set}
        removeFile={deleteFile}
        error={identityDocument.error}
        aria-label={`Files must be jpeg, png or pdf file format. You can upload up to ${maxFilesAllowed} files.`}
      />
      {alternateEvidence && (
        <Button
          text="I do not have evidence of my condition"
          onClick={() => goToNextStep()}
          btnClass="wmnds-btn--link wmnds-text-align-left wmnds-m-b-lg"
          aria-label="I do not have evidence of my condition"
        />
      )}
    </Question>
  );
};

DisabilityProofStep.propTypes = sharedStepSimplePropTypes;

export default DisabilityProofStep;