import Axios from 'axios';
import * as qs from 'querystring';
import KakaoUserInfo from './types/kakao-user-info';

const getKakaoAccessToken = async (code: string): Promise<string> => {
  const response = await Axios.post(
    'https://kauth.kakao.com/oauth/token',
    qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
    }),
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        charset: 'utf-8',
      },
    },
  );
  return response.data.access_token;
};

const getKakaoUserInfo = async (accessToken: string): Promise<KakaoUserInfo> => {
  const { data } = await Axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export { getKakaoAccessToken, getKakaoUserInfo };
