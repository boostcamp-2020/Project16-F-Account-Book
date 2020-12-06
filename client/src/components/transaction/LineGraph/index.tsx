import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dateUtil from '@libs/dateUtils';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules';
import StyledLineGraph from './styles';
import { LineGraphProps, AggregateInfo } from './types';

const LineGraph = ({ width, height, data }: LineGraphProps): JSX.Element => {
  const { datePicker } = useSelector((state: RootState) => state);
  const { year, month } = datePicker;
  const { maxTotal, graphData } = dateUtil.makeDataForLineGraph(data, year, month);

  return (
    <StyledLineGraph>
      <LineChart
        width={width}
        height={height}
        data={graphData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, maxTotal]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="수입" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="지출" stroke="#82ca9d" />
      </LineChart>
    </StyledLineGraph>
  );
};

export default LineGraph;
