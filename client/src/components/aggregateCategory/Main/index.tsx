import React, { useMemo } from 'react';
import AggregateCategoryItem from '@/components/aggregateCategory/Item';
import { AggregateCategoryPropType } from '@/commons/types/aggregateCategory';
import { Doughnut } from 'react-chartjs-2';
import * as S from './styles';

const AggregateCategoryMain = ({ list, isIncome }: AggregateCategoryPropType): JSX.Element => {
  const state = useMemo(() => {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const data: string[] = [];

    list.forEach((item) => {
      labels.push(item.category);
      data.push(item.aggregate);
      backgroundColor.push(
        `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
          Math.random() * 255,
        )})`,
      );
    });

    return { labels, datasets: [{ backgroundColor, data }] };
  }, [list, isIncome]);

  const total = useMemo(() => {
    let sum = 0;
    list.forEach((value) => {
      sum += Number(value.aggregate);
    });
    return sum;
  }, [list, isIncome]);
  return (
    <>
      <S.Chart>
        <Doughnut
          data={state}
          options={{
            width: '400',
            height: '400',
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: true,
              position: 'right',
              labels: { fontSize: 14, boxWidth: 14 },
            },
          }}
        />
      </S.Chart>
      <S.Box>
        {isIncome ? <S.Title>카테고리별 수입</S.Title> : <S.Title>카테고리별 지출</S.Title>}
        {list.length !== 0 ? (
          list.map((item) => (
            <AggregateCategoryItem key={item.category + item.aggregate} item={item} total={total} />
          ))
        ) : (
          <></>
        )}
      </S.Box>
    </>
  );
};

export default AggregateCategoryMain;
