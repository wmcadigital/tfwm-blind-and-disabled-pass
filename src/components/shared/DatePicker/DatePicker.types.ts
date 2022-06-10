export type TDatePickerProps = {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  availableDates: Date[];
  inline: boolean;
};
