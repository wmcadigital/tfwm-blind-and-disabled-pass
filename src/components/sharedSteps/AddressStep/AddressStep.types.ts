import { Nullable } from 'types/helpers';
import { TSubscriptionReturn } from 'types/subscription';

export type TAddressSubscription = {
  addressLine1: TSubscriptionReturn<Nullable<string>>;
  addressLine2: TSubscriptionReturn<Nullable<string>>;
  addressLine3: TSubscriptionReturn<Nullable<string>>;
  addressLine4: TSubscriptionReturn<Nullable<string>>;
  district: TSubscriptionReturn<Nullable<string>>;
  postcode: TSubscriptionReturn<Nullable<string>>;
};

export type T4LineAddress = {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  district: string;
  postcode: string;
};
