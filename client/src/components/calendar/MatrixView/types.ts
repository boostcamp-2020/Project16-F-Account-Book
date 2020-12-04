export type MatrixViewTypes = {
  matrix: string[][];
  headers: string[];
  cell: (value: string, key: number) => JSX.Element;
};
