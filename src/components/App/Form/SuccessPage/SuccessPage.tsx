import { useGlobalContext } from 'state/globalState';
import { Message } from 'components/shared';

const SuccessPage = () => {
  const [globalState] = useGlobalContext();
  const { referenceNo } = globalState.form;

  return (
    <>
      <Message
        type="success-fill-no-icon"
        title="We've recieved your form"
        content={
          <p className="wmnds-m-t-md wmnds-m-b-none">
            Your application reference number is <strong>{referenceNo}</strong>
          </p>
        }
        classes="wmnds-p-lg wmnds-text-align-center wmnds-m-b-lg"
      />
      <div>
        <h2>What happens next?</h2>
        <p>You’ll receive an email to confirm your Direct Debit has been set up.</p>
        <p>
          Once we confirm your Direct Debit, your Swift card will take up to 10 working days to
          arrive. If you have not received your new pass at least 3 working days before the start
          date, please contact our Ticketing Services Team on 0345 303 6760.
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
