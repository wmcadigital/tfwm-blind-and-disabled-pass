import { TTicket } from 'types/ticket';

export type TUseGetTicketInfo = () => {
  isLoading: boolean;
  hasError: boolean;
  ticketInfo: TTicket | null;
};
