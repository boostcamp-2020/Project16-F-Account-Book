import GoogleLoginButtonStyle from './styles/google';
import NaverLoginButtonStyle from './styles/naver';
import KakaoLoginButtonStyle from './styles/kakao';

const getButtonResource = (provider: string) => {
  if (provider === 'google') {
    return {
      Button: GoogleLoginButtonStyle,
      text: '구글 아이디로 로그인',
    };
  }

  if (provider === 'naver') {
    return {
      Button: NaverLoginButtonStyle,
      text: '네이버 아이디로 로그인',
    };
  }

  return {
    Button: KakaoLoginButtonStyle,
    text: '카카오 아이디로 로그인',
  };
};

export default { getButtonResource };
