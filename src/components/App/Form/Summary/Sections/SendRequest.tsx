/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Button, Checkbox, WarningText } from 'components/shared';
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

  // local test mode routes requests to a test mailbox/group
  const [isLocalTest] = useState(process.env.NODE_ENV !== 'production');

  // local submitting state used to disable button and show spinner
  const [isSubmitting, setIsSubmitting] = useState(false);

  // error shown to the user if the API send fails
  const [submitError, setSubmitError] = useState<Nullable<string>>(null);

  // track mounted state to avoid setting state on unmounted component
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
    if (isMountedRef.current) setIsSubmitting(true); // Set loading state

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
    // console.log('Original formDataState:', formDataState);
    const {
      onlineApplicationNo,
      submissionDate,
      applicationForMe,
      promotionalCode,
      previousCustomer,
      previousCustomerReferenceNumber,
      currentSwiftcard,
      currentSwiftcardNumber,
      addProductToExistingCard,
      isApprentice,
      schoolName,
      schoolPostcode,
      employerName,
      employerPostcode,
      filename,
      BehalfTitle,
      BehalfFirstName,
      BehalfLastName,
      BehalfDateOfBirth,
      BehalfHomePhoneNumber,
      BehalfWorkPhoneNumber,
      BehalfMobilePhoneNumber,
      BehalfEmailAddress,
      currentTimeAtAddressYears,
      currentTimeAtAddressMonths,
      previousTimeAtAddressYears,
      previousTimeAtAddressMonths,
      BehalfCurrentPostcode,
      BehalfCurrentAddressLine1,
      BehalfCurrentAddressLine2,
      BehalfCurrentAddressLine3,
      BehalfCurrentAddressLine4,
      BehalfCurrentDistrict,
      BehalfCurrentTown,
      BehalfPreviousPostcode,
      BehalfPreviousAddressLine1,
      BehalfPreviousAddressLine2,
      BehalfPreviousAddressLine3,
      BehalfPreviousAddressLine4,
      BehalfPreviousTown,
      ApplicantTitle,
      ApplicantFirstName,
      ApplicantLastName,
      ApplicantDateOfBirth,
      ApplicantHomePhoneNumber,
      ApplicantWorkPhoneNumber,
      ApplicantMobilePhoneNumber,
      ApplicantEmailAddress,
      ApplicantDisability,
      howDidYouHearAboutCentroDirectDebit,
      ethnicity,
      ethnicityDetails,
      currentDisabledPass,
      passNumber,
      ApplicantCurrentPostcode,
      ApplicantCurrentAddressLine1,
      ApplicantCurrentAddressLine2,
      ApplicantCurrentAddressLine3,
      ApplicantCurrentAddressLine4,
      ApplicantCurrentDistrict,
      ApplicantCurrentTown,
      ApplicantPreviousPostcode,
      ApplicantPreviousAddressLine1,
      ApplicantPreviousAddressLine2,
      ApplicantPreviousAddressLine3,
      ApplicantPreviousAddressLine4,
      ApplicantPreviousTown,
      accountName,
      accountNumber,
      sortCode,
      relationshipToApplicant,
      discarded,
      ticketPrice,
      receiveByftFree,
      ApplicantPhoto,
      studentIdPhoto,
      studentProofDocument,
      identityDocument,
      proofDocumentBlind,
      proofDocumentDeaf,
      proofDocumentWalk,
      proofDocumentArms,
      proofDocumentLearn,
      proofDocumentLanguage,
      proofDocumentDrive,
      disabilityCategories,
      drivingLicense,
      hasDrivingLicense,
      refusedDrivingLicense,
      refusedLicense,
      distance,
      distanceMetric,
      alternateStart,
      contactPreference,
      contactPerson,
      changePhoto,
      firstName,
      lastName,
      emailAddress,
    } = formDataState;

    let dataToSend = {};

    // Ensure disabilityCategories is always an array or null (avoid nested ternary)
    let disabilityCategoriesArray = null;
    if (Array.isArray(disabilityCategories)) {
      disabilityCategoriesArray = disabilityCategories;
    } else if (disabilityCategories) {
      disabilityCategoriesArray = [disabilityCategories];
    }

    const disabilityCategoriesArraystr = `[${disabilityCategoriesArray
      .map((v) => `"${v}"`)
      .join(', ')}]`;

    // Helper to normalize file(s) into a stringified array literal (or null)
    // e.g. ["file1.jpg", "file2.png"]
    const fileNamesArray = (val) => {
      if (!val) return null;
      let names = [];
      if (Array.isArray(val)) {
        names = val.map((f) => (f && f.name ? f.name : null)).filter(Boolean);
      } else if (val && val.name) {
        names = [val.name];
      }
      return names.length > 0 ? `[${names.map((v) => `"${v}"`).join(', ')}]` : null;
    };

    // Escape and encode arrays for safe API transmission
    const escapeArray = (arr) => {
      if (!arr) return null;
      // if already a string (e.g. "[\"a\", \"b\"]"), try to double-decode
      if (typeof arr === 'string') {
        try {
          const doubleDecoded = decodeURIComponent(decodeURIComponent(arr));
          if (typeof doubleDecoded === 'string' && doubleDecoded.trim().startsWith('[')) {
            // return literal array string (e.g. ["a","b"]) so callers see [] instead of %255B...
            return doubleDecoded;
          }
        } catch (e) {
          // ignore and fall back to encoding
        }
        try {
          return escape(encodeURIComponent(arr));
        } catch (e) {
          return escape(encodeURIComponent(String(arr)));
        }
      }
      const a = Array.isArray(arr) ? arr : [arr];
      try {
        return escape(encodeURIComponent(JSON.stringify(a)));
      } catch (e) {
        return escape(encodeURIComponent(String(a)));
      }
    };

    let contactPreferenceArray = null;
    if (Array.isArray(contactPreference)) {
      contactPreferenceArray = contactPreference;
    } else if (contactPreference) {
      contactPreferenceArray = [contactPreference];
    }

    const contactPreferenceArraystr = `[${contactPreferenceArray.map((v) => `"${v}"`).join(', ')}]`;

    dataToSend = Object.entries({
      firstName,
      lastName,
      emailAddress,
      onlineApplicationNo,
      submissionDate,
      applicationForMe,
      promotionalCode,
      previousCustomer,
      previousCustomerReferenceNumber,
      currentSwiftcard,
      currentSwiftcardNumber,
      addProductToExistingCard,
      isApprentice,
      schoolName,
      schoolPostcode,
      employerName,
      employerPostcode,
      // filename,
      BehalfTitle,
      BehalfFirstName,
      BehalfLastName,
      BehalfDateOfBirth,
      BehalfHomePhoneNumber,
      BehalfWorkPhoneNumber,
      BehalfMobilePhoneNumber,
      BehalfEmailAddress,
      currentTimeAtAddressYears,
      currentTimeAtAddressMonths,
      previousTimeAtAddressYears,
      previousTimeAtAddressMonths,
      BehalfCurrentPostcode,
      BehalfCurrentAddressLine1,
      BehalfCurrentAddressLine2,
      BehalfCurrentAddressLine3,
      BehalfCurrentAddressLine4,
      BehalfCurrentDistrict,
      BehalfCurrentTown,
      BehalfPreviousPostcode,
      BehalfPreviousAddressLine1,
      BehalfPreviousAddressLine2,
      BehalfPreviousAddressLine3,
      BehalfPreviousAddressLine4,
      BehalfPreviousTown,
      ApplicantTitle,
      ApplicantFirstName,
      ApplicantLastName,
      ApplicantDateOfBirth,
      ApplicantHomePhoneNumber,
      ApplicantWorkPhoneNumber,
      ApplicantMobilePhoneNumber,
      ApplicantEmailAddress,
      ApplicantDisability,
      howDidYouHearAboutCentroDirectDebit,
      ethnicity,
      ethnicityDetails,
      currentDisabledPass,
      passNumber,
      ApplicantCurrentPostcode,
      ApplicantCurrentAddressLine1,
      ApplicantCurrentAddressLine2,
      ApplicantCurrentAddressLine3,
      ApplicantCurrentAddressLine4,
      ApplicantCurrentDistrict,
      ApplicantCurrentTown,
      ApplicantPreviousPostcode,
      ApplicantPreviousAddressLine1,
      ApplicantPreviousAddressLine2,
      ApplicantPreviousAddressLine3,
      ApplicantPreviousAddressLine4,
      ApplicantPreviousTown,
      accountName,
      accountNumber,
      sortCode,
      relationshipToApplicant,
      discarded,
      ticketPrice,
      receiveByftFree,
      ApplicantPhoto: escapeArray(fileNamesArray(ApplicantPhoto)),
      studentIdPhoto: escapeArray(fileNamesArray(studentIdPhoto)),
      studentProofDocument: escapeArray(fileNamesArray(studentProofDocument)),
      identityDocument: escapeArray(fileNamesArray(identityDocument)),
      proofDocumentBlind: escapeArray(fileNamesArray(proofDocumentBlind)),
      proofDocumentDeaf: escapeArray(fileNamesArray(proofDocumentDeaf)),
      proofDocumentWalk: escapeArray(fileNamesArray(proofDocumentWalk)),
      proofDocumentArms: escapeArray(fileNamesArray(proofDocumentArms)),
      proofDocumentLearn: escapeArray(fileNamesArray(proofDocumentLearn)),
      proofDocumentLanguage: escapeArray(fileNamesArray(proofDocumentLanguage)),
      proofDocumentDrive: escapeArray(fileNamesArray(proofDocumentDrive)),
      disabilityCategories: disabilityCategoriesArraystr, // send as stringified array (escaped)
      drivingLicense,
      hasDrivingLicense,
      refusedDrivingLicense,
      refusedLicense,
      distance,
      distanceMetric,
      alternateStart,
      contactPreference: contactPreferenceArraystr, // send as stringified array (escaped)
      contactPerson,
      changePhoto,
    }).reduce((acc, [key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        (Array.isArray(value) ? value.length > 0 : true)
      ) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    // console.log(dataToSend);

    const cleanedFormData = removeNulls(formDataState);
    const formattedJson = JSON.stringify(cleanedFormData);
    const encodedFormattedJson = encodeURIComponent(formattedJson);
    const escapedFormattedJson = escape(encodedFormattedJson);
    // console.log(escapedFormattedJson);
    const stringifiedFormData = JSON.stringify(formDataState);
    const firstChar = stringifiedFormData.charAt(0);
    const lastChar = stringifiedFormData.charAt(stringifiedFormData.length - 1);
    const middleData = stringifiedFormData.slice(1, -1);
    const escapedMiddle = middleData
      .replace(/"/g, '\\"')
      .replace(/{/g, '\\"{')
      .replace(/}/g, '}\\"')
      .replace(/\[/g, '\\"[')
      .replace(/\]/g, ']\\"');
    const escapedFormData = firstChar + escapedMiddle + lastChar;
    const cleanedEscapedFormData = escapedFormData.replace(/\/\/\//g, '/');
    // console.log(cleanedEscapedFormData);
    // console.log(JSON.stringify(cleanedEscapedFormData));

    setSubmitError(null); // clear previous submit errors

    // Check total file size before converting to base64
    // Base64 adds ~33% overhead (4 bytes per 3), so for a 10 MB API limit we cap raw files at ~7 MB
    const MAX_RAW_FILE_SIZE_BYTES = 7 * 1024 * 1024; // 7 MB
    const filteredFiles = concatFiles.filter((n) => n);
    const totalFileSize = filteredFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalFileSize > MAX_RAW_FILE_SIZE_BYTES) {
      if (isMountedRef.current) {
        setIsSubmitting(false);
        setSubmitError(
          `The total size of your attachments exceeds our 10 MB limit. Please remove some files and try again.`,
        );
      }
      return;
    }

    // returns the base64 string of files
    const toBase64 = (file: Blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
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
    const recipient = isLocalTest ? 7 : 8;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          to: recipient,
          subject: `Blind and disabled application`,
          body: JSON.stringify(dataToSend),
          // bodyHtml: base64FormattedJsonFormData,`
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
        if (isMountedRef.current)
          setSubmitError('There was a problem sending your application. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      if (isMountedRef.current)
        setSubmitError('There was a problem sending your application. Please try again later.');
    } finally {
      if (isMountedRef.current) setIsSubmitting(false); // Reset loading state
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
          <WarningText type="error" message={submitError} />
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