import DateUtils from '.';

describe('DateUtils Tests', () => {
  describe('countMonthBetween() Tests', () => {
    it('2020-01과 2020-12 사이의 month 개수는 12이다.(1월, 12월포함)', () => {
      const count = DateUtils.countMonthBetween(new Date('2020-01'), new Date('2020-12'));
      expect(count).toEqual(12);
    });

    it('2018-06과 2020-12 사이의 month 개수는 31이다.(6월, 12월포함)', () => {
      const count = DateUtils.countMonthBetween(new Date('2018-06'), new Date('2020-12'));
      expect(count).toEqual(31);
    });

    it('2020-12과 2020-12 사이의 month 개수는 1이다.', () => {
      const count = DateUtils.countMonthBetween(new Date('2020-12'), new Date('2020-12'));
      expect(count).toEqual(1);
    });
  });

  describe('getStartDateAndEndDate() Tests', () => {
    it('year=2020, month=12일때 startDate=2020-12-01, endDate=2020-12-31이다.', () => {
      const { startDate, endDate } = DateUtils.getStartDateAndEndDate(2020, 12);
      expect(startDate).toEqual('2020-12-01');
      expect(endDate).toEqual('2020-12-31');
    });

    it('year=2020, month=1일때 startDate=2020-01-01, endDate=2020-01-31이다.', () => {
      const { startDate, endDate } = DateUtils.getStartDateAndEndDate(2020, 1);
      expect(startDate).toEqual('2020-01-01');
      expect(endDate).toEqual('2020-01-31');
    });
  });
});
