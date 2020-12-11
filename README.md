# Project16-F-Account-Book


![Logo](https://user-images.githubusercontent.com/17294694/101917945-1c7a8e00-3c0c-11eb-828d-03e127a4d883.png)


배포링크 - [http://tess.kro.kr](http://tess.kro.kr)

<br>

## 팀원 소개

- **박동현**([@parkdit94](https://github.com/parkdit94))
    - 매사에 웃음기가 많습니다.
    - 꾸준히 성장하기 위해 계획을 세우는 것을 좋아합니다.
    - 계획을 수정하는 것도 좋아합니다.

- **박진용**([@namda-on](https://github.com/namda-on))
    - 재미있는 서비스 개발 자체에 관심이 많습니다.
    - 새로운 것에 도전하고 배우는 것을 좋아합니다.
    - 팀원들과 소통하기를 좋아하며 협업을 좋아합니다!

- **정상우**([@sangw3433](https://github.com/sangw3433))
    - 저와 다른 의견을 가진 분과 이야기하는 것을 좋아합니다.
    - 성능적인 측면에서 관심이 많습니다.
    - 게임, 배드민턴을 좋아합니다.


- **최창희**([@changheedev](https://github.com/changheedev))
    - 서버개발, 인프라 및 자동화에 관심이 많은 개발자입니다.
    - 기술에 대해 얘기 나누고 배우는 것을 좋아합니다.
    - 몸은 가볍지만 엉덩이는 무겁습니다. 👨‍💻




<br>

## 프로젝트 소개

### 프로젝트 개요

웹 기반으로 동작하는 개인 입출금 및 가계 재정을 시각화 및 분석할 수 있는 가계부 구현

### 기술스택

![스크린샷 2020-12-11 오후 9 36 26](https://user-images.githubusercontent.com/17294694/101904293-f5ff2780-3bf8-11eb-8775-52034f850fcb.png)



### Architecture

![스크린샷 2020-12-11 오후 9 33 31](https://user-images.githubusercontent.com/17294694/101904084-a882ba80-3bf8-11eb-8679-78145643e0c1.png)


## 프로젝트 세팅 및 실행

### 환경변수 세팅

프로젝트를 실행하기 위해서 환경 변수를 설정해주어야 합니다.

```
cp server/dummy.env server/.env
```

**환경변수**
```
TYPEORM_CONNECTION : 연동할 DB 타입              ex) mysql
TYPEORM_HOST : 연결할 DB Host                   
TYPEORM_PORT : 연결할 DB Port                   
TYPEORM_USERNAME : DB연결에 사용할 계정
TYPEORM_PASSWORD : 계정 패스워드
TYPEORM_DATABASE : 연결할 Database              
TYPEORM_SYNCHRONIZE : 엔티티와 테이블 sync 설정    ex) true
TYPEORM_LOGGING : Logging 설정                 ex) true

CLIENT_URI = 프론트엔드 URI                      ex) http://localhost:3000

JWT_SECRET : 토큰 생성에 사용할 Secret
JWT_TOKEN_EXPIRES_IN** : 토큰의 유효기간              ex) 1d
JWT_COOKIE_EXPIRES_IN** = 인증 쿠키의 유효기간 (ms)    ex) 86400000

XXX_CLIENT_ID** = 개발자 센터에서 발급받은 client id 
XXX_CLIENT_SECRET** = 개발자 센터에서 발급받은 client secret
XXX_CALLBACK_URI** = 개발자 센터에서 설정한 callback uri      ex) http://localhost:4000/api/auth/callback/xxx (xxx = kakao | naver | google)
```

### 프로젝트 실행
루트 디렉토리에서 아래 명령어를 실행합니다.

```
yarn && yarn dev
```