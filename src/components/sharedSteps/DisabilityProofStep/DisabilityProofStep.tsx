import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Button, FileUpload, Question } from 'components/shared';
import { TSharedStepDocsProps, sharedStepSimplePropTypes } from 'types/step';
import Icon from 'components/shared/Icon/Icon';

const DisabilityProofStep = ({
  handleNavigation,
  question,
  documentsList,
  application,
  canApply,
  dataCategoryPrefix,
  alternateEvidence,
  applicationNot,
}: TSharedStepDocsProps) => {
  const proofDocumentBlind = useFormDataSubscription('proofDocumentBlind');
  const proofDocumentDeaf = useFormDataSubscription('proofDocumentDeaf');
  const proofDocumentWalk = useFormDataSubscription('proofDocumentWalk');
  const proofDocumentArms = useFormDataSubscription('proofDocumentArms');
  const proofDocumentLearn = useFormDataSubscription('proofDocumentLearn');
  const proofDocumentLanguage = useFormDataSubscription('proofDocumentLanguage');
  const proofDocumentDrive = useFormDataSubscription('proofDocumentDrive');

  const { goToNextStep } = useNavigationLogic('DisablityCategories', 'Distance');

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

  const handleContinue = async () => {
    let isIdentityDocumentValid = true;

    if (!identityDocument.hasCurrentValue) {
      identityDocument.set(null);
      identityDocument.clearSavedValue();
    } else {
      isIdentityDocumentValid = identityDocument.save();
    }

    if (!isIdentityDocumentValid) return;
    handleNavigation();
  };

  const questionHasError = identityDocument.hasError;
  return (
    <Question question={question} handleContinue={handleContinue} showError={questionHasError}>
      {application() !== undefined && (
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
              {canApply ? 'You can apply' : 'You cannot apply'}
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
            <h3 className="wmnds-ticket-summary-msg__title">You cannot apply</h3>
          </div>
          <div className="wmnds-ticket-summary-msg__info">
            <>{applicationNot()}</>
          </div>
        </div>
      )}
      <p>Please upload one of the documents below:</p>
      {documentsList()}
      <p>
        You can take a picture of the document on a mobile phone. Please make sure the image is
        clear enough to read.
      </p>
      <FileUpload
        hint="Files must be jpeg or png file format"
        accept=".png,.jpg,.jpeg"
        name={`${dataCategoryPrefix}proof`}
        defaultFile={identityDocument.currentValue}
        updateFile={identityDocument.set}
        error={identityDocument.error}
        aria-label="Files must be jpeg or png file format"
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
