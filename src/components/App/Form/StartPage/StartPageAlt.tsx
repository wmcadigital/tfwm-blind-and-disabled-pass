import { Button } from 'components/shared';

import { useGlobalContext } from 'state/globalState/context';
import { useFormDataContext } from 'state/formDataState/context';
import Icon from 'components/shared/Icon/Icon';

import { TTicket } from 'types/ticket';
import DisablityCategories from './DisablityCategories';

const StartPageAlt = () => {
  const [, formDataDispatch] = useFormDataContext();
  const [, globalStateDispatch] = useGlobalContext();
  const userCanStartForm = true;
  const [formDataState] = useFormDataContext();
  const { disabilityCategories, alternateStart } = formDataState;
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
  const blindContent = (
    <>
      <h3>Blind or partially sighted in both eyes</h3>
      <p>Please have one of these documents ready before you apply:</p>
      <ul>
        <li>A registration card from your local council</li>
        <li>Certificate of Vision Impairment (a CVI, which used to be called a BD8)</li>
      </ul>
    </>
  );
  const deafContent = (
    <>
      <h3>Very deaf or only able to hear a little sound in both ears</h3>
      <p>Please upload one of the documents below:</p>
      <ul>
        <li>Proof you are registered with your local social services department as deaf</li>
        <li>Audiogram from a specialist saying you cannot hear very well</li>
      </ul>
    </>
  );
  const walkContent = (
    <>
      <h3>Cannot walk or find it difficult to walk short distances</h3>
      <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md">
        <div className="wmnds-ticket-summary-msg__header">
          <Icon iconName="general-checkmark" className="wmnds-ticket-summary-msg__icon" />
          <h3 className="wmnds-ticket-summary-msg__title">You can apply</h3>
        </div>
        <div className="wmnds-ticket-summary-msg__info">
          <>
            <p>your impairment is the same as someone who gets</p>

            <ul>
              <li>high rate mobility component of the Disability Living Allowance (DLA)</li>
              <li>
                Standard or enhanced rate of the mobility component of Personal Independence
                Payments (PIP).
              </li>
            </ul>
          </>
        </div>
      </div>
      <p>Please upload one of the documents below:</p>
      <ul>
        <li>
          A letter from Department of Works and Pensions (DWP) less than 12 months old that says you
          get the High Rate Mobility Component of the Disability Living Allowance
        </li>
        <li>
          A letter from Department of Works and Pensions (DWP) less than 12 months old that says you
          get a Personal Independence Payment (PIP) with a score of 8 or more in the Moving around
          activity
        </li>
        <li>
          A letter from the Service Personnel &amp; Veterans Agency (SPA) that says you get a War
          Pensions Mobility Supplement (WPMS)
        </li>
        <li>
          A copy of both sides of your Disabled Persons&apos; Parking permit (Blue badge). This must
          one of the new style plastic permits.
        </li>
      </ul>
    </>
  );
  const armsContent = (
    <>
      <h3>Unable to use both arms</h3>
      <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md">
        <div className="wmnds-ticket-summary-msg__header">
          <Icon iconName="general-checkmark" className="wmnds-ticket-summary-msg__icon" />
          <h3 className="wmnds-ticket-summary-msg__title">You can apply</h3>
        </div>
        <div className="wmnds-ticket-summary-msg__info">
          <>
            <p>
              If your disability has a big impact on daily activities such as paying a fare on a bus
              bus or train.
            </p>
          </>
        </div>
      </div>
      <p>Please upload one of the documents below:</p>
      <ul>
        <li>A medical report that says you cannot use both arms for daily tasks</li>
      </ul>
    </>
  );
  const learnContent = (
    <>
      <h3>Find it hard to learn and remember new information and live independently</h3>
      <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md">
        <div className="wmnds-ticket-summary-msg__header">
          <Icon iconName="general-checkmark" className="wmnds-ticket-summary-msg__icon" />
          <h3 className="wmnds-ticket-summary-msg__title">You can apply</h3>
        </div>
        <div className="wmnds-ticket-summary-msg__info">
          <>
            <p>
              We use the World Health Organisation (WHO) guidance which says that someone is
              learning disabled if <strong>all three statements</strong> apply:
            </p>

            <ul>
              <li>It is difficult to understand complex information or learn new skills</li>
              <li>it is difficult to live independently</li>
              it is difficult to live independently
              <li />
            </ul>
          </>
        </div>
      </div>
      <p>Please upload one of the documents below:</p>
      <ul>
        <li>A letter from your school about your learning ability</li>
        <li>
          The full statement of Special Educational Needs or Individual Education Plan and any
          reviews
        </li>
        <li>Your care plan or support plan</li>
        <li>
          A letter from social services or from a manager of a residential care home that says you
          meet the three statements above.
        </li>
        <li>
          A copy of your patient summary, confirming you have been diagnosed with a severe, moderate
          or mild learning disability. This can be obtained from your Doctors surgery.
        </li>
        <li>
          A letter from a medical professional such as a GP, that says you have a learning
          disability and whether it is mild, moderate or severe. A medical professional does not
          have to be your GP. For example, it can also include a CPN, learning disability
          specialist, Occupational Health therapist or a Psychiatrist.
        </li>
      </ul>
    </>
  );
  const languageContent = (
    <>
      <h3>Cannot speak at all in any language</h3>
      <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-cannot wmnds-m-b-md">
        <div className="wmnds-ticket-summary-msg__header">
          <Icon iconName="general-cross" className="wmnds-ticket-summary-msg__icon" />
          <h3 className="wmnds-ticket-summary-msg__title">You cannot apply</h3>
        </div>
        <div className="wmnds-ticket-summary-msg__info">
          <>
            <p>If your speech is slow or difficult to understand.</p>
          </>
        </div>
      </div>
      <p>Please upload one of the documents below:</p>
      <ul>
        <li>
          A letter from Department of Works and Pensions (DWP) less than 12 months old that says you
          get a Personal Independence Payment (PIP) with a score of 8 or more in the Communicating
          verbally activity.
        </li>
        <li>A medical report that says you do not have any speech</li>
      </ul>
    </>
  );
  const driveContent = (
    <>
      <h3>Cannot drive a car because I have a medical condition</h3>
      <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md">
        <div className="wmnds-ticket-summary-msg__header">
          <Icon iconName="general-checkmark" className="wmnds-ticket-summary-msg__icon" />
          <h3 className="wmnds-ticket-summary-msg__title">You can apply</h3>
        </div>
        <div className="wmnds-ticket-summary-msg__info">
          <>
            <ul>
              <li>if you would be refused a driving licence because of your medical condition</li>
              <li>if you are over 16.</li>
            </ul>
            <p>You may get a pass if you have one of these conditions</p>
            <ul>
              <li>have fits you cannot control (epilepsy)</li>
              <li>have severe mental health issues</li>
              <li>may suddenly faint or black out</li>
              <li>any disability that makes it dangerous for you to drive.</li>
            </ul>
          </>
        </div>
      </div>
      <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-cannot wmnds-m-b-md">
        <div className="wmnds-ticket-summary-msg__header">
          <Icon iconName="general-cross" className="wmnds-ticket-summary-msg__icon" />
          <h3 className="wmnds-ticket-summary-msg__title">You cannot apply</h3>
        </div>
        <div className="wmnds-ticket-summary-msg__info">
          <>
            <ul>
              <li>if you have a driving licence</li>
              <li>if your medical condition is due to alcohol or drugs</li>
            </ul>
          </>
        </div>
      </div>
      <p>Please upload one of the documents below:</p>
      <ul>
        <li>Proof of any medicine you have taken in the last six months</li>
        <li>A medical letter about your epilepsy or seizure</li>
        <li>
          A letter from the Driving and Vehicle Licensing Agency (DVLA), less than 12 months old,
          that says your driving licence has been refused or taken away
        </li>
        <li>
          A letter from your GP, CPN, Epilepsy specialist, Occupational Health therapist or
          Psychiatrist, that:
          <ul>
            <li>Says you would not get a driving licence if you applied</li>
            <li>says you would be a danger to yourself or others if you did drive</li>
            <li>confirms your condition</li>
          </ul>
        </li>
      </ul>
    </>
  );
  return (
    <>
      {!alternateStart ? (
        <DisablityCategories />
      ) : (
        <>
          <h2>Evidence needed for the chosen category</h2>
          {disabilityCategories.includes('Blind') && blindContent}
          {disabilityCategories.includes('Deaf') && deafContent}
          {disabilityCategories.includes('Walk') && walkContent}
          {disabilityCategories.includes('Arms') && armsContent}
          {disabilityCategories.includes('Learn') && learnContent}
          {disabilityCategories.includes('Language') && languageContent}
          {disabilityCategories.includes('DrivingLicense') && driveContent}
          <Button
            text="Start my application"
            btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-md"
            iconRight="general-chevron-right"
            disabled={!userCanStartForm}
            onClick={startForm}
          />
          <p className="wmnds-m-t-lg">
            <a href=".html">I will apply later</a>
          </p>
        </>
      )}
    </>
  );
};

export default StartPageAlt;
