export type DropdownProps = {
  name: string;
  hint?: string;
  error?: { message: string } | null;
  className?: string;
  label: string;
  defaultValue?: string | null;
  options: { text: string; value: string }[];
  disabledOptionText: string | null;
  onChange?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
};
