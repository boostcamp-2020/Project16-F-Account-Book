export type AggregateInfo = [number, { totalIn: number; totalOut: number }][];

export type LineGraphProps = {
  width: number;
  height: number;
  data: AggregateInfo;
};
