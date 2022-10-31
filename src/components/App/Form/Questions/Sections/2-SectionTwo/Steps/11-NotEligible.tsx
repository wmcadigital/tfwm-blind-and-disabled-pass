import React, { useEffect } from 'react';
import { useNavigationLogic } from 'customHooks';
import { Question } from 'components/shared';

const NotEligible = () => {
  const { goToNextStep } = useNavigationLogic('ApplicantBirthDate', 'Summary');
  useEffect(() => {
    /* eslint no-underscore-dangle: 0 */
    // @ts-ignore
    window.__8x8Chat = {
      uuid: 'script_1846483120624b05c7b46378.06993588',

      tenant: 'd2VzdG1pZGxhbmRzY29tYmkwMQ',

      channel: 'Ticketing Web Chat',

      domain: 'https://vcc-eu7.8x8.com',

      path: '/.',

      buttonContainerId: '__8x8-chat-button-container-script_1846483120624b05c7b46378.06993588',

      align: 'right',
    };
    const se = document.createElement('script');

    se.type = 'text/javascript';

    se.async = true;

    // @ts-ignore
    se.src = `${window.__8x8Chat.domain + window.__8x8Chat.path}/CHAT/common/js/chat.js`;

    const os = document.getElementsByTagName('script')[0];
    // @ts-ignore
    os.parentNode.insertBefore(se, os);
  });
  const handleContinue = () => {
    goToNextStep();
  };
  return (
    <div>
      <Question question="Sorry, you're not eligible" handleContinue={handleContinue}>
        <p>To be eligible for a disabled person&apos;s pass you must: </p>
        <ul>
          <li>be at least 5 years old</li>
          <li>live in the West Midlands</li>
          <li>have an eligible disability that&apos;s expected to last at least 12 months</li>
        </ul>
        <p>
          You can get a West Midlands disabled person&apos;s travel pass if you live in the West
          Midlands. You must live at a property where council tax is paid to one of these councils:
        </p>
        <ul>
          <li>Birmingham</li>
          <li>Coventry</li>
          <li>Dudley</li>
          <li>Sandwell</li>
          <li>Solihull</li>
          <li>Walsall</li>
          <li>Wolverhampton</li>
        </ul>
        <p>You do not need to be the one who pays the council tax.</p>
        <p>
          If you do not live in the West Midlands, please contact your Local Authority who will be
          able to give you advice on how to apply.
        </p>
      </Question>
      <div className="wmnds-p-sm">
        <div className="wmnds-inset-text" aria-label="call us">
          <h4>Customer Services</h4>
          <h5>Live Chat</h5>
          <p>
            The chat button will appear below when this service is available. Starting live chat
            will open a window at the bottom of your browser.
          </p>
          <div id="__8x8-chat-button-container-script_1846483120624b05c7b46378.06993588" />
          <h5>Telephone</h5>
          <p>Phone: 0345 303 6760</p>
          Mondays, Tuesdays, Thursdays and Fridays, 8am to 6pm <br />
          Wednesdays, 10am to 6pm
          <br />
          Saturdays, 9am to 1pm
          <br />
          Sundays and Bank Holidays, Closed
        </div>
      </div>
    </div>
  );
};

export default NotEligible;
