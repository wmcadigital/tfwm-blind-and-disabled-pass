import { useState } from 'react';
import { useGlobalContext } from 'state/globalState';
import Question from 'components/shared/Question/Question';
import { Input, Checkbox } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';
import { TSharedStepProps } from 'types/step';

const ContactDetailsStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const emailAddress = useFormDataSubscription(`${dataNamePrefix}EmailAddress`, [
    { rule: 'EMAIL' },
  ]);

  const phoneNumber = useFormDataSubscription(`${dataNamePrefix}MobilePhoneNumber`, [
    { rule: 'PHONE_NUMBER' },
  ]);
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing } = globalState.form;

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const contactPreferences = useFormDataSubscription('contactPreference');
  const contactPerson = useFormDataSubscription('contactPerson');
  const [formDataState] = useFormDataContext();
  const { contactPreference } = formDataState;
  const ApplicantFirstName = useFormDataSubscription('ApplicantFirstName');

  const [contactPref, setcontactPref] = useState(contactPreference);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = contactPref;
    const item = e.target.name;
    const addOrRemove = () => (arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
    setcontactPref(addOrRemove());
    contactPreferences.set(addOrRemove());
  };

  const handleContinue = () => {
    const hasEmail = contactPref.includes('Email');
    const hasPhone = contactPref.includes('Phone');
    const isEmailValid = emailAddress.save();
    const isPhoneNumberValid = phoneNumber.save();
    contactPreferences.save();
    if (contactPref.length < 1 || (hasEmail && !isEmailValid) || (hasPhone && !isPhoneNumberValid))
      return;
    if (isEditing) globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
    handleNavigation();
  };
  const details = applicationForMe.currentValue
    ? `We will only use these to contact you about your application and disabled person's
  pass.`
    : `We will only use these to get in contact about ${ApplicantFirstName.currentValue}'s application and disabled person's
    pass.`;
  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={emailAddress.hasError || phoneNumber.hasError}
    >
      <div className="wmnds-m-b-lg">
        <p className="wmnds-m-b-lg">{details}</p>
        <Checkbox
          name="Phone"
          classes="wmnds-m-b-md"
          labelElement={<span>Phone</span>}
          onChange={handleClick}
          defaultValue={contactPref.includes('Phone')}
        />
        {contactPref.includes('Phone') && (
          <div className="wmnds-m-b-l wmnds-m-l-xl">
            <Input
              groupClassName="wmnds-m-b-l wmnds-m-l-md"
              name="mobilePhone"
              inputmode="tel"
              label={
                <>
                  Phone number
                  <br />
                  For example, 07700900457
                </>
              }
              defaultValue={phoneNumber.currentValue}
              type="text"
              className="wmnds-col-1 wmnds-col-md-2-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => phoneNumber.set(e.target.value)}
              error={phoneNumber.error}
            />
          </div>
        )}
        <Checkbox
          name="Email"
          classes="wmnds-m-b-md"
          labelElement={<span>Email</span>}
          defaultValue={contactPref.includes('Email')}
          onChange={handleClick}
        />
        {contactPref.includes('Email') && (
          <div className="wmnds-m-b-l wmnds-m-l-xl">
            <Input
              groupClassName="wmnds-m-b-l wmnds-m-l-md"
              name="email"
              inputmode="email"
              label={
                <>
                  Email address
                  <br />
                  For example, name@example.com
                </>
              }
              defaultValue={emailAddress.currentValue}
              type="text"
              className="wmnds-col-1 wmnds-col-md-2-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                emailAddress.set(e.target.value)
              }
              error={emailAddress.error}
            />
          </div>
        )}
        {!contactPerson.savedValue === true && (
          <>
            <Checkbox
              name="Letter"
              classes="wmnds-m-b-md"
              labelElement={<span>Letter</span>}
              defaultValue={contactPref.includes('Letter')}
              onChange={handleClick}
            />
            <Checkbox
              name="Large print letter"
              classes="wmnds-m-b-md"
              labelElement={<span>Large print letter</span>}
              defaultValue={contactPref.includes('Large print letter')}
              onChange={handleClick}
            />
          </>
        )}
      </div>
    </Question>
  );
};

export default ContactDetailsStep;
