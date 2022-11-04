import { Message } from 'components/shared';

const SuccessPage = () => {
  return (
    <>
      <Message
        type="success-fill-no-icon"
        title="We've received your form"
        content={<span />}
        classes="wmnds-p-lg wmnds-text-align-center wmnds-m-b-lg"
      />
      <div>
        <h2>What happens next?</h2>
        <p>
          You’ll receive an email to confirm that we have received your application. It will contain
          a reference number in case you need to contact us.
        </p>
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
