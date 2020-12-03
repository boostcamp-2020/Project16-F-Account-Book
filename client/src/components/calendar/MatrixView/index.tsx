import React from 'react';
import { MatrixViewTypes } from './types';
import * as S from './styles';

function MatrixView({ matrix, headers, cell }: MatrixViewTypes): JSX.Element {
  return (
    <S.Matrix>
      <S.Table>
        <S.Thead>
          <S.Tr>
            {headers.map((v, i) => (
              <S.Th key={`day${i.toString()}`}>{v}</S.Th>
            ))}
          </S.Tr>
        </S.Thead>
        <S.Tbody>
          {matrix.map((row, i: number) => (
            <S.Tr key={`date${i.toString()}`}>
              {row.map((v, j) => cell(v, i * matrix[i].length + j))}
            </S.Tr>
          ))}
        </S.Tbody>
      </S.Table>
    </S.Matrix>
  );
}

export default MatrixView;
