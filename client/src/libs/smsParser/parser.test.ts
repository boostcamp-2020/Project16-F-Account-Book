import SMSParser from './parser';

describe('SMSParser Tests', () => {
  describe('카드결제 내역 parse tests', () => {
    it('kg이니시스 승인', () => {
      const sms = `[WEB발신]
              [kg이니시스]
              04/12 21:13
              464,000원 익월
              합산요금청구`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: 'KG',
        amount: 464000,
        date: '04/12',
        time: '21:13',
        resultType: '승인',
        paymentType: '신용카드',
        isDeposit: false,
      });
    });

    it('KB국민카드 승인', () => {
      const sms = `[WEB발신]
              KB국민카드 김영근님 06/07
              09:22 5000원
              결제 승인`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: 'KB',
        amount: 5000,
        date: '06/07',
        time: '09:22',
        resultType: '승인',
        paymentType: '신용카드',
        isDeposit: false,
      });
    });

    it('KB국민체크카드 승인취소', () => {
      const sms = `[Web발신]
                KB국민체크카드
                윤*우님
                06/08 08:57
                28,440원
                11PAY 인증
                승인취소
                `;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: 'KB',
        amount: 28440,
        date: '06/08',
        time: '08:57',
        resultType: '취소',
        paymentType: '체크카드',
        isDeposit: true,
      });
    });

    it('현대카드 승인', () => {
      const sms = `현대 ZERO 승인
            2,500원 일시불
            04/10 13:15
            코레일유통서울지사
            누적 560,852원
            0.7%할인`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '현대',
        amount: 2500,
        date: '04/10',
        time: '13:15',
        resultType: '승인',
        paymentType: '신용카드',
        isDeposit: false,
      });
    });

    it('신한체크카드 승인', () => {
      const sms = `[Web발신]
              [신한체크카드승인] 최*희(7062)
              02/10 13:10
              (금액)1,000원 PAYCO`;

      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '신한',
        amount: 1000,
        date: '02/10',
        time: '13:10',
        resultType: '승인',
        paymentType: '체크카드',
        isDeposit: false,
      });
    });

    it('롯데카드 승인', () => {
      const sms = `롯데3121 승인
              5,200원 일시불
              09/15 18:31
              월드크리닝 롯데마트`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '롯데',
        amount: 5200,
        date: '09/15',
        time: '18:31',
        resultType: '승인',
        paymentType: '신용카드',
        isDeposit: false,
      });
    });

    it('우리 체크카드 승인', () => {
      const sms = `[Web발신]
              우리(8804) 체크카드승인
              윤*우님
              10,000원
              11/03 10:03
              스타벅스코리아`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '우리',
        amount: 10000,
        date: '11/03',
        time: '10:03',
        resultType: '승인',
        paymentType: '체크카드',
        isDeposit: false,
      });
    });

    it('우리카드 승인취소', () => {
      const sms = `[Web발신]
              우리(4575)승인취소
              임*봉님
              4562원 일시불 
              12/07 20:29
              네이버페이
              누적123,456원`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '우리',
        amount: 4562,
        date: '12/07',
        time: '20:29',
        resultType: '취소',
        paymentType: '신용카드',
        isDeposit: true,
      });
    });

    it('농협카드 승인', () => {
      const sms = `[Web발신]
      NH카드7*9*승인
      박*용
      12,350원 체크
      12/06 20:37
      세븐일레븐 고대안암고 
      잔액222,210원`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: 'NH',
        amount: 12350,
        date: '12/06',
        time: '20:37',
        resultType: '승인',
        paymentType: '체크카드',
        isDeposit: false,
      });
    });
  });

  describe('이체내역 문자 parse tests', () => {
    it('농협 입금', () => {
      const sms = `[Web발신]
              농협 입금 200원
              06/11 22:29 123-1234-4567-12
              잔액 200000원`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '농협',
        amount: 200,
        date: '06/11',
        time: '22:29',
        paymentType: '이체',
        isDeposit: true,
      });
    });

    it('농협 출금', () => {
      const sms = `농협 출금 5000원
                08/31 19:01 123-1234-1234-12
                잔액 200000원`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '농협',
        amount: 5000,
        date: '08/31',
        time: '19:01',
        paymentType: '이체',
        isDeposit: false,
      });
    });

    it('신한은행 출금', () => {
      const sms = `[Web발신]
      [신한은행] 09/26
      21:31:30.27
      [110-***-123456]
      지급 20,000원
      (최창희)`;
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '신한',
        amount: 20000,
        date: '09/26',
        time: '21:31',
        paymentType: '이체',
        isDeposit: false,
      });
    });
  });

  describe('예외처리 Tests', () => {
    it('결제내역에 대한 텍스트가 아닐때', () => {
      const sms = '이것은 결제내역에 대한 텍스트가 아닙니다.';
      const parsedSMS = SMSParser.parse(sms);

      expect(parsedSMS).toEqual({
        cardname: '',
        amount: 0,
        date: '',
        time: '',
        paymentType: '',
        isDeposit: false,
      });
    });
  });
});
