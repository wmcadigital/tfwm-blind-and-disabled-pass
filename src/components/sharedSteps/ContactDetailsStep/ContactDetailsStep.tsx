import { useState } from 'react';
import Question from 'components/shared/Question/Question';
import { Input, Checkbox } from 'components/shared';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from 'types/step';

const ContactDetailsStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const emailAddress = useFormDataSubscription(`${dataNamePrefix}EmailAddress`, [
    { rule: 'EMAIL' },
  ]);

  const phoneNumber = useFormDataSubscription(`${dataNamePrefix}MobilePhoneNumber`, [
    { rule: 'PHONE_NUMBER' },
  ]);
  const contactPreference = useFormDataSubscription('contactPreference');
  const contactPerson = useFormDataSubscription('contactPerson');

  const [contactPref, setcontactPref] = useState(['']);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = contactPref;
    const item = e.target.name;
    const addOrRemove = () => (arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
    setcontactPref(addOrRemove());
    contactPreference.set(addOrRemove());
  };

  const handleContinue = () => {
    const isEmailValid = !contactPref.includes('Email') || emailAddress.save();
    const isPhoneNumberValid = !contactPref.includes('Phone') || phoneNumber.save();
    contactPreference.save();
    if (!isEmailValid || !isPhoneNumberValid) return;
    handleNavigation();
  };

  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={emailAddress.hasError || phoneNumber.hasError}
    >
      <div className="wmnds-m-b-lg">
        <p className="wmnds-m-b-lg">
          We will only use these to contact you about your application and disabled person&apos;s
          pass.
        </p>
        <Checkbox
          name="Phone"
          classes="wmnds-m-b-md"
          labelElement={<span>Phone</span>}
          onChange={handleClick}
          defaultValue={contactPref.includes('Phone')}
        />
        {contactPref.includes('Phone') && (
          <Input
            groupClassName="wmnds-m-b-l wmnds-m-l-lg"
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
        )}
        <Checkbox
          name="Email"
          classes="wmnds-m-b-md"
          labelElement={<span>Email</span>}
          defaultValue={contactPref.includes('Email')}
          onChange={handleClick}
        />
        {contactPref.includes('Email') && (
          <Input
            groupClassName="wmnds-m-b-lg  wmnds-m-l-lg"
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => emailAddress.set(e.target.value)}
            error={emailAddress.error}
          />
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
