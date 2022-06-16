import { Button } from 'components/shared';

import { useGlobalContext } from 'state/globalState/context';
import { useFormDataContext } from 'state/formDataState/context';

import { TTicket } from 'types/ticket';

const StartPage = () => {
  const [, formDataDispatch] = useFormDataContext();
  const [, globalStateDispatch] = useGlobalContext();

  const userCanStartForm = true;

  const startForm = async () => {
    formDataDispatch({ type: 'UPDATE_TICKET_DATA', payload: {} });
    globalStateDispatch({
      type: 'ADD_TICKET_INFO',
      payload: {} as TTicket,
    });
    globalStateDispatch({ type: 'START_FORM' });
    globalStateDispatch({
      type: 'GO_TO_SECTION_AND_STEP',
      payload: { section: 1, step: 1 },
    });
  };

  return (
    <>
      <h1>Apply for a disabled person&apos;s pass</h1>
      <h2>Use this service to:</h2>
      <ul>
        <li>
          <p>apply for a disabled person&apos;s pass</p>
        </li>
      </ul>
      <p>This process takes around 15 minutes.</p>

      <h2 className="wmnds-m-b-lg">Before you start</h2>
      <p>
        Gather any evidence you have of your condition. The type of evidence required depends on
        which category you apply for. If you do not know what evidence you need,{' '}
        <a href=".html">tell us which categories apply to you</a> and we will tell you what
        documents you need to submit with your application.
      </p>
      <p>
        You can read about{' '}
        <a href=".html">how we assess disabled person&apos;s pass applications.</a>
      </p>
      <p>
        You can <a href=".html">contact us if you need help</a> completing your application.
      </p>
      <p>
        You can also <a href=".html">print and complete a paper application form</a> if you prefer.
      </p>
      <Button
        text="Start now"
        btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-md"
        iconRight="general-chevron-right"
        disabled={!userCanStartForm}
        onClick={startForm}
      />
    </>
  );
};

export default StartPage;
