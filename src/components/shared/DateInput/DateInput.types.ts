export type TDateInputProps = {
  prefix?: string;
  name: string;
  defaultDate: Date | null;
  hasError: boolean;
  hint?: string | JSX.Element;
  onChange: (newDate: Date | null) => void;
};
