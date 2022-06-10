import { useState } from 'react';
import { useGlobalContext } from 'state/globalState';
import { NIconText, Message, Table } from 'components/shared';
import { removeNthItem } from 'helpers/summary';

const AboutTheTicket = () => {
  const [globalState] = useGlobalContext();
  const { ticket } = globalState;
  const ticketName = ticket.name || 'Monthly Direct Debit nBus West Midlands';
  const priceString = ticket.priceString || '£64.00 per month';

  // Change ticket
  const [isChangingTicket, setIsChangingTicket] = useState(false);
  const showChangeTicketMessage = () => setIsChangingTicket(true);
  const hideChangeTicketMessage = () => setIsChangingTicket(false);

  const handleChangeTicket = () => {
    window.location.href = 'https://find-a-ticket.tfwm.org.uk/';
  };

  const changeTicketMessage = (
    <div>
      <Message
        type="warning"
        title="Are you sure you want to change your ticket?"
        content={
          <p style={{ fontWeight: 'normal' }} className="wmnds-m-b-none wmnds-m-t-sm">
            You’ll need to re-enter your details if you change your ticket.
          </p>
        }
      />
      <button
        type="button"
        className="wmnds-btn wmnds-btn--primary wmnds-m-r-sm wmnds-m-b-sm"
        onClick={handleChangeTicket}
      >
        Change my ticket
      </button>
      <button
        type="button"
        className="wmnds-btn wmnds-btn--secondary"
        onClick={hideChangeTicketMessage}
      >
        Cancel
      </button>
    </div>
  );

  const tableValues = [
    [
      <span>Ticket</span>,
      <div>
        <p className="wmnds-m-b-md">
          <NIconText text={ticketName} />
        </p>
        <p className="wmnds-m-b-none">
          <strong>{priceString}</strong>
        </p>
      </div>,
      <button type="button" className="wmnds-btn wmnds-btn--link" onClick={showChangeTicketMessage}>
        Change
      </button>,
    ],
    [<>{changeTicketMessage}</>],
  ];

  const tableCellClasses = ['', '', 'wmnds-text-align-right'];
  const tableCellColSpans = [0, 3, 0, 0, 0];

  return (
    <Table
      title="About the ticket"
      values={isChangingTicket ? tableValues : removeNthItem(tableValues, 2)}
      cellClasses={tableCellClasses}
      cellColSpans={isChangingTicket ? tableCellColSpans : removeNthItem(tableCellColSpans, 2)}
    />
  );
};

export default AboutTheTicket;
