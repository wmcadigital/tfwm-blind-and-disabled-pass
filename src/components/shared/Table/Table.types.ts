export type TTableProps = {
  title: string;
  caption?: string;
  headers: JSX.Element[];
  values: JSX.Element[][];
  classes?: string;
  cellClasses?: string[];
  cellColSpans?: number[];
};
