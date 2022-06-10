import { useState } from 'react';

import { useFormDataSubscription } from 'customHooks';
import { Button, FileUpload, Question } from 'components/shared';
import { TSharedStepSimpleProps, sharedStepSimplePropTypes } from 'types/step';

const StudentProofStep = ({ handleNavigation, question }: TSharedStepSimpleProps) => {
  const studentProofDocument = useFormDataSubscription('studentProofDocument');
  const identityDocument = useFormDataSubscription('identityDocument');
  const studentIdPhoto = useFormDataSubscription('studentIdPhoto');

  const [showAlternativeProof, setShowAlternativeProof] = useState(
    studentProofDocument.hasSavedValue || identityDocument.hasSavedValue,
  );

  const handleContinue = async () => {
    let isStudentIdPhotoValid = true;
    let isStudentProofValid = true;
    let isIdentityDocumentValid = true;

    if (
      !showAlternativeProof ||
      (!studentProofDocument.hasCurrentValue && !identityDocument.hasCurrentValue)
    ) {
      isStudentIdPhotoValid = studentIdPhoto.save();
      studentProofDocument.set(null);
      identityDocument.set(null);
      studentProofDocument.clearSavedValue();
      identityDocument.clearSavedValue();
    } else {
      studentIdPhoto.set(null);
      studentIdPhoto.clearSavedValue();
      isStudentProofValid = studentProofDocument.save();
      isIdentityDocumentValid = identityDocument.save();
    }

    if (!isStudentIdPhotoValid) return;
    if (!isStudentProofValid) return;
    if (!isIdentityDocumentValid) return;
    handleNavigation();
  };

  const questionHasError =
    studentIdPhoto.hasError || studentProofDocument.hasError || identityDocument.hasError;

  return (
    <Question question={question} handleContinue={handleContinue} showError={questionHasError}>
      <p>You can upload a photo of your student ID card if it shows:</p>
      <ul>
        <li>your name</li>
        <li>your photo</li>
        <li>the name of your university or college</li>
        <li>an expiry date</li>
      </ul>
      <FileUpload
        label="Upload student ID card"
        hint="Files must be jpeg or png file format"
        accept=".png, .jpg, .jpeg"
        name="studentIdPhoto"
        defaultFile={studentIdPhoto.currentValue}
        updateFile={studentIdPhoto.set}
        error={studentIdPhoto.error}
      />
      {showAlternativeProof ? (
        <h3 className="wmnds-m-t-none wmnds-m-b-lg">Or</h3>
      ) : (
        <Button
          text="I don’t have a student ID card, or my student ID card doesn’t meet the guidelines"
          onClick={() => setShowAlternativeProof(true)}
          btnClass="wmnds-btn--link wmnds-text-align-left wmnds-m-b-lg"
        />
      )}
      {showAlternativeProof && (
        <>
          <p>
            If your ID card does not show all of the information, you need to upload proof
            you&apos;re a student and an identity document.
          </p>
          <p>Proof you&apos;re a student:</p>
          <ul>
            <li>your Student Finance entitlement letter</li>
            <li>an enrolment letter or email</li>
            <li>
              a letter or email from your university or college confirming you are a full-time
              student
            </li>
          </ul>
          <p>Identity document:</p>
          <ul>
            <li>your passport</li>
            <li>your driving licence</li>
            <li>a bank card with your name on</li>
          </ul>
          <FileUpload
            label="Upload proof you're a student"
            hint="Files must be word or pdf file format"
            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            name="studentProofDocument"
            defaultFile={studentProofDocument.currentValue}
            updateFile={studentProofDocument.set}
            error={studentProofDocument.error}
          />
          <FileUpload
            label="Upload an identity document"
            hint="Files must be jpeg or png file format"
            accept=".png,.jpg,.jpeg"
            name="identityDocuemnt"
            defaultFile={identityDocument.currentValue}
            updateFile={identityDocument.set}
            error={identityDocument.error}
          />
        </>
      )}
    </Question>
  );
};

StudentProofStep.propTypes = sharedStepSimplePropTypes;

export default StudentProofStep;
