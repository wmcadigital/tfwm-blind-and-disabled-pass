export type TApiTicket = {
  id: number;
  name: string;
  allowBus: boolean;
  allowMetro: boolean;
  allowTrain: boolean;
  ticketCurrentAmount: number;
  validity: string;
  // Direct debit details
  buyOnDirectDebit: boolean;
  directDebitCode: string;
  isAdult: boolean;
  isChild: boolean;
  isStudent: boolean;
  outOfCounty: boolean;
};

export type TTicket = {
  id: number;
  name: string;
  priceString: string;
  modes: Array<'bus' | 'rail' | 'metro'>;
  availableDates: Date[];
  raw: Partial<TApiTicket>;
};
