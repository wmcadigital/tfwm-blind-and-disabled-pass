// @ts-nocheck
import { useState } from 'react';
import { Button, Checkbox } from 'components/shared';
import { validate } from 'helpers/validation';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';

const SendYourRequest = () => {
  const [formDataState] = useFormDataContext();

  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState<Nullable<TError>>(null);
  const [hasAgreedToContact, setHasAgreedToContact] = useState(false);
  const [agreeError, setAgreeError] = useState<Nullable<TError>>(null);

  const [hasAgreedToPrivacy, sethasAgreedToPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState<Nullable<TError>>(null);

  const wouldLikeNetworkClubNews = useFormDataSubscription('wouldLikeNetworkClubNews', [
    {
      rule: 'OPTIONAL',
    },
  ]);
  const [globalState, globalStateDispatch] = useGlobalContext();
  const fileData = [];
  const applicationNumber = Math.floor(Math.random() * 10000000 + 1).toString();
  const files = [
    formDataState.ApplicantPhoto,
    formDataState.proofDocumentArms ? [...formDataState.proofDocumentArms] : [],
    formDataState.proofDocumentBlind ? [...formDataState.proofDocumentBlind] : [],
    formDataState.proofDocumentDeaf ? [...formDataState.proofDocumentDeaf] : [],
    formDataState.proofDocumentDrive ? [...formDataState.proofDocumentDrive] : [],
    formDataState.proofDocumentLanguage ? [...formDataState.proofDocumentLanguage] : [],
    formDataState.proofDocumentLearn ? [...formDataState.proofDocumentLearn] : [],
    formDataState.proofDocumentWalk ? [...formDataState.proofDocumentWalk] : [],
  ];
  const checkAnswersEl = document.getElementById('application-summary');
  // concatenate files
  const concatFiles = files.flat();
  // remove change button
  const editedText =
    checkAnswersEl &&
    checkAnswersEl.outerHTML.replaceAll(
      '<td class="wmnds-text-align-right" colspan="0"><button type="button" class="wmnds-btn wmnds-btn--link">Change</button></td>',
      '',
    );
  const sendEmailHandler = async () => {
    const base64Content = editedText && btoa(unescape(encodeURIComponent(editedText)));
    const fullName = `${formDataState.ApplicantFirstName} ${formDataState.ApplicantLastName}`;
    // returns the base64 string of files
    const toBase64 = (file: Blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    const filteredFiles = concatFiles.filter((n) => n);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredFiles.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const base64File = await toBase64(filteredFiles[i]);
      fileData.push({
        name: filteredFiles[i].name,
        type: filteredFiles[i].type,
        content: base64File.split('base64,')[1],
      });
    }
    globalStateDispatch({
      type: 'LOAD_FORM',
    });
    await fetch(`https://internal-api.wmca.org.uk/emails/api/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        to: 8,
        subject: `Blind and disabled application`,
        body: '{"M":"j"}',
        bodyHtml: base64Content,
        from:
          formDataState.ApplicantEmailAddress ||
          formDataState.BehalfEmailAddress ||
          'test@test.com',
        files: fileData || [],
        displayName: fullName,
      }),
    }).then((response) => {
      // If the response is successful(200: OK)
      if (response.status === 200) {
        globalStateDispatch({
          type: 'SHOW_SUCCESS_PAGE',
          payload: applicationNumber,
        });
      }
    });
  };

  const toggleCheckboxValue = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorState?: React.Dispatch<React.SetStateAction<Nullable<TError>>>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setErrorState) setErrorState(null);
      setState(e.target.checked);
    };
  };

  const handleSubmit = () => {
    wouldLikeNetworkClubNews.save();
    const termsValidation = validate(hasAgreedToTerms, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree to the terms and conditions' },
    ]);

    const privacyValidation = validate(hasAgreedToPrivacy, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree to the privacy policy' },
    ]);

    const agreeValidation = validate(hasAgreedToContact, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree that we may contact your GP' },
    ]);

    if (!termsValidation.isValid) setTermsError(termsValidation.error);
    if (!privacyValidation.isValid) setPrivacyError(privacyValidation.error);
    if (!agreeValidation.isValid) setAgreeError(agreeValidation.error);
    if (!termsValidation.isValid || !privacyValidation.isValid || !agreeValidation.isValid) return;
    sendEmailHandler();
  };
  return (
    <div>
      <h3 className="wmnds-m-t-md">Now send your request</h3>
      <p>
        By submitting this request you are confirming that, to the best of your knowledge, the
        details you are providing are correct.
      </p>

      <Checkbox
        name="ContactGPAgreement"
        classes="wmnds-m-b-md"
        labelElement={
          <span>
            You agree that we may contact your GP to support your application. We’ll contact you if
            this is required.
          </span>
        }
        defaultValue={hasAgreedToContact}
        onChange={toggleCheckboxValue(setHasAgreedToContact, setAgreeError)}
        error={agreeError}
      />
      <Checkbox
        name="TermsAndConditions"
        classes="wmnds-m-b-md"
        labelElement={
          <span>
            Agree to the{' '}
            <a
              href="https://www.tfwm.org.uk/terms-and-conditions/transport-for-west-midlands-website/"
              target="_blank"
              rel="noreferrer"
            >
              terms and condition
            </a>
          </span>
        }
        defaultValue={hasAgreedToTerms}
        onChange={toggleCheckboxValue(setHasAgreedToTerms, setTermsError)}
        error={termsError}
      />
      <Checkbox
        name="PrivacyPolicy"
        classes="wmnds-m-b-md"
        labelElement={
          <span>
            Agree to the{' '}
            <a
              href="https://www.tfwm.org.uk/policies/privacy-and-cookies-policy/"
              target="_blank"
              rel="noreferrer"
            >
              privacy policy
            </a>
          </span>
        }
        defaultValue={hasAgreedToPrivacy}
        onChange={toggleCheckboxValue(sethasAgreedToPrivacy, setPrivacyError)}
        error={privacyError}
      />
      <br />
      <span>Submission can take a while depending upon the size of your attached files.</span>
      <Button
        type="button"
        btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-lg"
        onClick={handleSubmit}
        text="Accept and send"
        isFetching={globalState.form.isLoading}
        iconRight="general-chevron-right"
      />
    </div>
  );
};

export default SendYourRequest;
