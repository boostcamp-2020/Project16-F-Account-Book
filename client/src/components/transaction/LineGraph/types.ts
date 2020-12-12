export type AggregateInfo = [number, { totalIn: number; totalOut: number }][];

export type LineGraphProps = {
  data: AggregateInfo;
};
