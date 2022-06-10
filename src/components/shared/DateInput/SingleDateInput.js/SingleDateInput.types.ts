export type TSingleDateInput = {
  dateType: 'Day' | 'Month' | 'Year';
  maxLength: number;
  defaultValue: string | null;
  onChange: (newValue: string) => void;
  name: string;
  hasError: boolean;
};
