import { TProps, propTypes, defaultProps } from './AddressCell.types';

const AddressCell = ({ line1, line2, line3, line4, postcode }: TProps) => {
  return (
    <>
      <p className="wmnds-m-b-none">{line1}</p>
      <p className="wmnds-m-b-none">{line2}</p>
      <p className="wmnds-m-b-none">{line3}</p>
      <p className="wmnds-m-b-none">{line4}</p>
      <p className="wmnds-m-b-none">{postcode}</p>
    </>
  );
};

AddressCell.propTypes = propTypes;
AddressCell.defaultProps = defaultProps;

export default AddressCell;
