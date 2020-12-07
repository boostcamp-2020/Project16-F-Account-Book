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
            <S.TooltipColorBox color="#8884d8" /> {`수입 : ${payload ? payload[0].value : 0}원`}
          </S.TooltipText>
          <S.TooltipText>
            <S.TooltipColorBox color="#82ca9d" /> {`지출 : ${payload ? payload[1].value : 0}원`}
          </S.TooltipText>
        </S.CustomTooltipContainer>
      )}
    </>
  );
};

const LineGraph = ({ width, height, data }: LineGraphProps): JSX.Element => {
  const { datePicker } = useSelector((state: RootState) => state);
  const { year, month } = datePicker;
  const { maxTotal, graphData } = dateUtil.makeDataForLineGraph(data, year, month);

  return (
    <S.StyledLineGraph>
      <LineChart
        width={width}
        height={height}
        data={graphData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, maxTotal]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={customTooltip} />
        <Legend />
        <Line type="monotone" dataKey="수입" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="지출" stroke="#82ca9d" />
      </LineChart>
    </S.StyledLineGraph>
  );
};

export default LineGraph;
