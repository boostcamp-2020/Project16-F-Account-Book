export default interface KakaoUserInfo {
  id: string;
  properties: {
    nickname: string;
  };
  type: 'kakao';
}
