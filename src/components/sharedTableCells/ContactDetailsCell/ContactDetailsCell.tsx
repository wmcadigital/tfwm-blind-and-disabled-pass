import { TProps } from './ContactDetailsCell.types';

const ContactDetailsCell = ({ phoneNumber, emailAddress }: TProps) => {
  return (
    <>
      <p className="wmnds-m-b-none">{phoneNumber}</p>
      <p className="wmnds-m-b-none">{emailAddress}</p>
    </>
  );
};

export default ContactDetailsCell;
