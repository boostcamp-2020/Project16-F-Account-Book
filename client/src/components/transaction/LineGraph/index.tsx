import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
import dateUtil from '@libs/dateUtils';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules';
import * as S from './styles';
import { LineGraphProps } from './types';

const customTooltip = ({ active, payload, label }: TooltipProps) => {
  return (
    <>
      {active && (
        <S.CustomTooltipContainer>
          <S.TooltipText>{`${label}일`}</S.TooltipText>
          <S.TooltipText>
            <S.TooltipColorBox color="#4B88C4" /> {`수입 : ${payload ? payload[0].value : 0}원`}
          </S.TooltipText>
          <S.TooltipText>
            <S.TooltipColorBox color="#c2255c" /> {`지출 : ${payload ? payload[1].value : 0}원`}
          </S.TooltipText>
        </S.CustomTooltipContainer>
      )}
    </>
  );
};

const LineGraph = ({ data }: LineGraphProps): JSX.Element => {
  const { datePicker } = useSelector((state: RootState) => state);
  const { year, month } = datePicker;
  const { maxTotal, graphData } = dateUtil.makeDataForLineGraph(data, year, month);

  return (
    <ResponsiveContainer aspect={1.5}>
      <LineChart data={graphData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, maxTotal]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={customTooltip} />
        <Legend />
        <Line type="monotone" dataKey="수입" stroke="#4B88C4" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="지출" stroke="#c2255c" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
