export type TMessageProps = {
  type: string;
  title: JSX.Element | string;
  content: JSX.Element | string;
  dismissable?: boolean;
  classes?: string;
};
