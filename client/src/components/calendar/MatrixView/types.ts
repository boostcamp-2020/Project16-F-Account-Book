export type MatrixViewTypes = {
  headers: string[];
  matrix: string[][];
  selectDay: number;
  dailyTotal: Map<number, { totalIn: number; totalOut: number }>;
};
