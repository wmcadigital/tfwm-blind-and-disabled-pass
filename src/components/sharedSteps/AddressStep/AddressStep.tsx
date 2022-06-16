import { useState } from 'react';

import Question from 'components/shared/Question/Question';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TSharedStepProps } from 'types/step';
import AddressManual from './AddressManual/AddressManual';
import AddressAutocomplete from './AddressAutocomplete/AddressAutocomplete';

const AddressStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const [isAddressMissing, setIsAddressMissing] = useState(false);
  const enterAddressManually = () => setIsAddressMissing(true);

  const addressLine1 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine1`);
  const addressLine2 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine2`, [
    { rule: 'OPTIONAL' },
  ]);

  const addressLine3 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine3`, [
    { rule: 'OPTIONAL' },
  ]);
  const addressLine4 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine4`);
  const postcode = useFormDataSubscription(`${dataNamePrefix}CurrentPostcode`);

  const address = {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    postcode,
  };

  const handleContinue = () => {
    const line1Valid = addressLine1.save();
    const line2Valid = addressLine2.save();
    const line3Valid = addressLine3.save();
    const line4Valid = addressLine4.save();
    const postcodeValid = postcode.save();
    if (!line1Valid || !line2Valid || !line3Valid || !line4Valid || !postcodeValid) return;
    handleNavigation();
  };

  const hasError =
    addressLine1.hasError ||
    addressLine2.hasError ||
    addressLine3.hasError ||
    addressLine4.hasError ||
    postcode.hasError;

  return (
    <Question question={question} handleContinue={handleContinue} showError={hasError}>
      <p className="wmnds-m-b-lg">We&apos;ll send the pass to this address.</p>
      {isAddressMissing ? (
        <AddressManual address={address} />
      ) : (
        <AddressAutocomplete address={address} handleNotFound={enterAddressManually} />
      )}
    </Question>
  );
};

export default AddressStep;
