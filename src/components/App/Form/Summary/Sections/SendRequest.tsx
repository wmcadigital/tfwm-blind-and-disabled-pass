/* eslint-disable no-console */
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

  // local submitting state used to disable button and show spinner
  const [isSubmitting, setIsSubmitting] = useState(false);

  // error shown to the user if the API send fails
  const [submitError, setSubmitError] = useState<Nullable<string>>(null);

  const wouldLikeNetworkClubNews = useFormDataSubscription('wouldLikeNetworkClubNews', [
    {
      rule: 'OPTIONAL',
    },
  ]);
  const [, globalStateDispatch] = useGlobalContext();
  const fileData = [];
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
  // concatenate files
  const concatFiles = files.flat();

  const sendEmailHandler = async () => {
    setIsSubmitting(true); // Set loading state

    // Log form data for debugging (avoid logging sensitive data in production)
    // This will print the full formDataState and a generated application number.
    // console.log('formDataState:', formDataState);
    // create a sanitized copy of the form data with null values removed
    const removeNulls = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map((v) => removeNulls(v)).filter((v) => v !== null && v !== undefined);
      }
      if (obj && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [k, v]) => {
          if (v === null || v === undefined) return acc;
          const cleaned = removeNulls(v);
          if (cleaned === null || cleaned === undefined) return acc;
          if (
            typeof cleaned === 'object' &&
            !Array.isArray(cleaned) &&
            Object.keys(cleaned).length === 0
          ) {
            return acc;
          }
          acc[k] = cleaned;
          return acc;
        }, {});
      }
      return obj;
    };

    const sanitizedFormData = removeNulls(JSON.parse(JSON.stringify(formDataState)));
    // console.log('sanitizedFormData:', sanitizedFormData);

    // convert sanitized JSON to base64 (safe for Unicode)
    const base64SanitizedFormData = sanitizedFormData
      ? btoa(unescape(encodeURIComponent(JSON.stringify(sanitizedFormData))))
      : null;
    // console.log('base64SanitizedFormData:', base64SanitizedFormData);

    setSubmitError(null); // clear previous submit errors
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
    const endpoint = process.env.REACT_APP_EMAIL_API_ENDPOINT;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          to: 8,
          subject: `Blind and disabled application`,
          body: '',
          bodyHtml: base64SanitizedFormData,
          from: 'DoNotReply@tfwm.org.uk',
          files: fileData || [],
        }),
      });

      if (response.ok) {
        globalStateDispatch({
          type: 'SHOW_SUCCESS_PAGE',
          payload: null,
        });
      } else {
        // handle non-200 responses: show friendly error message
        console.error('Email API responded with status', response.status);
        setSubmitError('There was a problem sending your application. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('There was a problem sending your application. Please try again later.');
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
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

      {/* show API error if sending failed */}
      {submitError && (
        <div role="alert" aria-live="polite" className="wmnds-p-t-sm">
          <p className="wmnds-text-color-danger">{submitError}</p>
        </div>
      )}

      <Button
        type="button"
        btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-lg"
        onClick={handleSubmit}
        text="Accept and send"
        isFetching={isSubmitting}
        iconRight="general-chevron-right"
        disabled={isSubmitting}
      />
    </div>
  );
};

export default SendYourRequest;
