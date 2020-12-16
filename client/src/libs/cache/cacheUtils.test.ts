import cacheUtils from './cacheUtils';

it("mockKeySet에서 키 '2021-6'과 가장 먼 키는 '2020-6' 이다", () => {
  const mockKeySet = [
    '2020-12',
    '2020-11',
    '2020-10',
    '2020-09',
    '2020-08',
    '2020-07',
    '2020-06',
    '2021-01',
    '2021-02',
    '2021-03',
    '2021-04',
    '2021-05',
  ];
  expect(cacheUtils.getFurthermostDateKey('2021-6', mockKeySet)).toBe('2020-06');
});

it("mockKeySet에서 키 '2019-12'와 가장 먼 키는 '2020-12' 이다", () => {
  const mockKeySet = [
    '2020-12',
    '2020-11',
    '2020-10',
    '2020-09',
    '2020-08',
    '2020-07',
    '2020-06',
    '2020-05',
    '2020-04',
    '2020-03',
    '2020-02',
    '2020-01',
  ];
  expect(cacheUtils.getFurthermostDateKey('2019-12', mockKeySet)).toBe('2020-12');
});

it('현재키와 차이가 같은 키가 2개라면 더 과거 날짜를 가진 키가 선택된다', () => {
  const mockKeySet = [
    '2021-03',
    '2021-02',
    '2021-01',
    '2020-12',
    '2020-11',
    '2020-10',
    '2020-09',
    '2020-07',
    '2020-06',
    '2020-05',
    '2020-04',
    '2020-03',
    '2020-02',
    '2020-01',
  ];
  expect(cacheUtils.getFurthermostDateKey('2020-08', mockKeySet)).toBe('2020-01');
});

it("mockKeySet에서 키 '2020-11'와 가장 먼 키는 '2019-11' 이다", () => {
  const mockKeySet = [
    '2020-12',
    '2020-10',
    '2020-06',
    '2020-05',
    '2020-04',
    '2020-03',
    '2020-02',
    '2020-01',
    '2019-12',
    '2019-11',
    '2020-07',
    '2020-08',
    '2020-09',
  ];
  expect(cacheUtils.getFurthermostDateKey('2020-11', mockKeySet)).toBe('2019-11');
});

it("mockKeySet에서 키 '2021-11'와 가장 먼 키는 '2020-04' 이다", () => {
  const mockKeySet = [
    '2021-10',
    '2021-06',
    '2021-05',
    '2021-04',
    '2021-03',
    '2021-02',
    '2021-01',
    '2020-12',
    '2020-10',
    '2020-06',
    '2020-05',
    '2020-04',
  ];
  expect(cacheUtils.getFurthermostDateKey('2021-11', mockKeySet)).toBe('2020-04');
});
