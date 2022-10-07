import { useGlobalContext } from 'state/globalState';
import { Message } from 'components/shared';

const SuccessPage = () => {
  const [globalState] = useGlobalContext();
  const { referenceNo } = globalState.form;

  return (
    <>
      <Message
        type="success-fill-no-icon"
        title="We've received your form"
        content={
          <p className="wmnds-m-t-md wmnds-m-b-none">
            Your application reference number is <strong>{referenceNo}</strong>
          </p>
        }
        classes="wmnds-p-lg wmnds-text-align-center wmnds-m-b-lg"
      />
      <div>
        <h2>What happens next?</h2>
        <p>You’ll receive an email to confirm that we have received your application.</p>
        <p>
          It can take up to 6 weeks to process an application. It may take longer if we need more
          information from you.
        </p>
        <p>
          If you’ve not received a response after 6 weeks contact our Ticketing Services team on
          0345 303 6760.
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
