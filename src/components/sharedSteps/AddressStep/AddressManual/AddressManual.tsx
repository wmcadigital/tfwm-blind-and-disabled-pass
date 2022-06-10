import { Input } from 'components/shared';
import { TAddressManualProps } from './AddressManual.types';

const AddressManual = ({ address }: TAddressManualProps) => {
  const { addressLine1, addressLine2, addressLine3, addressLine4, postcode } = address;

  return (
    <>
      <Input
        className="wmnds-col-1 wmnds-col-md-2-3"
        groupClassName="wmnds-m-b-sm"
        name="AddressLine1"
        inputmode="text"
        label="Building and street"
        defaultValue={addressLine1.currentValue}
        onChange={(e) => addressLine1.set(e.target.value)}
        type="text"
        error={addressLine1.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="AddressLine2"
        inputmode="text"
        label=""
        aria-label="Address Line 2"
        defaultValue={addressLine2.currentValue}
        onChange={(e) => addressLine2.set(e.target.value)}
        type="text"
        error={addressLine2.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="TownOrCity"
        inputmode="text"
        label="Town or city"
        defaultValue={addressLine3.currentValue}
        onChange={(e) => addressLine3.set(e.target.value)}
        type="text"
        error={addressLine3.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="County"
        inputmode="text"
        label="County"
        defaultValue={addressLine4.currentValue}
        onChange={(e) => addressLine4.set(e.target.value)}
        type="text"
        error={addressLine4.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="postcode"
        inputmode="text"
        label="Postcode"
        defaultValue={postcode.currentValue}
        onChange={(e) => postcode.set(e.target.value)}
        type="text"
        error={postcode.error}
      />
    </>
  );
};

export default AddressManual;
