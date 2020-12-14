import getDayMatrix from './calendarUtils';

it('2020년 11월 달력 매트릭스 생성 테스트', () => {
  const matrix = getDayMatrix(2020, 11);
  const flattedMatrix = matrix.flat();
  for (let i = 0; i < 30; i += 1) {
    expect(Number(flattedMatrix[i])).toBe(i + 1);
  }

  for (let i = 2; i < 7; i += 1) {
    expect(matrix[4][i]).toBe(' ');
  }
});

it('2020년 12월 달력 매트릭스 생성 테스트', () => {
  const matrix = getDayMatrix(2020, 12);
  const flattedMatrix = matrix.flat();

  expect(matrix.every((row) => row.length === 7)).toBe(true);
  expect(matrix[0][0]).toBe(' ');
  expect(matrix[0][1]).toBe(' ');
  expect(matrix[4][5]).toBe(' ');
  expect(matrix[4][6]).toBe(' ');

  const startIdx = 2;
  for (let i = 0; i < 31; i += 1) {
    expect(Number(flattedMatrix[startIdx + i])).toBe(i + 1);
  }
});
