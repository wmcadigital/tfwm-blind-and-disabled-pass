export type TQuestionProps = {
  question: string;
  handleContinue: () => void;
  children: React.ReactNode;
  showError?: boolean;
  isLoading?: boolean;
};
