# Project16-F-Account-Book

<br>

![Logo](https://user-images.githubusercontent.com/17294694/102017772-3eab1200-3dac-11eb-8e95-8435e44eb16a.png)



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

### 배포링크
크레딧 기간 만료로 인해 서버를 반납하였습니다. 😢

### 프로젝트 개요

웹 기반으로 동작하는 개인 입출금 및 가계 재정을 시각화 및 분석할 수 있는 가계부 구현

**[기능 상세 설명](https://github.com/boostcamp-2020/Project16-F-Account-Book/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)**

```
🗓 가계부 관리
```

- 내역 작성/삭제/수정 기능
- 월별/ 일별 내역 달력 조회 기능
- 카테고리, 결제수단 관리 기능

```
📋 대시보드
```

- 선택된 월에 해당하는 사용자 데이터를 집계/분석하여 보여줍니다.
- 월평균 수입과 이번 달 소비량을 이용해 소비 지수를 계산하고 소비 습관 상태 메세지를 보여줍니다.

```
📌 고정 지출 항목 분석
```

- 지난 3개월 데이터를 비교해 고정적으로 발생하는 소비 내역을 고정 지출 항목으로 생성합니다.
- 새로 추가되는 데이터와 비교하여 완료된 고정지출과 예정된 고정지출로 분리하여 보여줍니다.

```
📊 통계
```

- 카테고리 별, 기간 별 수입/지출 데이터를 집계하여 파이 그래프와 꺾은선 그래프로 시각화하여 보여줍니다.

```
📩 SMS 파싱
```

- SMS 문자 내역을 파싱하여 가계부를 작성 할 수 있습니다.
- 붙여넣기를 위한 별도의 공간 없이도 복사한 내역을 파싱할 수 있게 Clipboard API를 이용하여 구현했습니다.

<br>

### 기술스택

![스크린샷 2020-12-11 오후 9 36 26](https://user-images.githubusercontent.com/17294694/101904293-f5ff2780-3bf8-11eb-8775-52034f850fcb.png)



### Architecture

![스크린샷 2020-12-19 오후 3 55 58](https://user-images.githubusercontent.com/17294694/102683243-ccef2000-4212-11eb-8948-ce4a1ec43ae6.png)

<br>

### 기술 특장점

- **[쿼리 최적화](https://github.com/boostcamp-2020/Project16-F-Account-Book/wiki/%EC%BF%BC%EB%A6%AC-%EC%B5%9C%EC%A0%81%ED%99%94)**


    -  대량의 더미 데이터를 생성하는 Seeder 모듈을 구현하고 생성된 데이터를 이용하여 Select 성능을 비교하여 쿼리를 최적화


- **Redux와 [캐시](https://github.com/boostcamp-2020/Project16-F-Account-Book/wiki/Cache)를 활용한 데이터 관리**

    - 페이지, 컴포넌트 간의 공유되는 상태를 새로 불러오기보다는 전역적으로 관리하기 위하여 Redux 사용
    - 대부분의 상태관리에 필요한 데이터를 비동기적으로 실행되는 API 호출로 받아오게 되는데 이 과정을 Redux-Thunk 미들웨어로 구현


- **[Lazy Rendering](https://github.com/boostcamp-2020/Project16-F-Account-Book/wiki/%EB%9E%9C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)**

    - 데이터의 양이 많더라도 렌더링이 빠르게 진행될 수 있도록 Lazy Rendering을 적용

- **OAuth 로그인 구현 및 모듈화**

    - Kakao, Naver, Google OAuth 로그인 구현
    - 다양한 서비스의 OAuth 로그인과 연동할 수 있도록 OAuth 인증 로직을 모듈화


- **[트래픽 분산 처리](https://github.com/boostcamp-2020/Project16-F-Account-Book/wiki/%ED%8A%B8%EB%9E%98%ED%94%BD-%EB%B6%84%EC%82%B0-%EC%B2%98%EB%A6%AC)**


    - Docker Swarm을 이용하여 클러스터 환경을 구축하고 필요에 따라 Docker 컨테이너를 스케일링 할 수 있도록 구현
    - JWT 인증을 이용하여 분산 세션에 대한 문제를 해결

<br>

## 프로젝트 세팅 및 실행

### 환경변수 세팅

프로젝트를 실행하기 위해서 환경 변수를 설정해주어야 합니다.

```
cp server/.dummy.env server/.env
```

**환경변수**
```bash
TYPEORM_CONNECTION= #DB 타입(mysql)
TYPEORM_HOST= #DB HOST
TYPEORM_PORT= #DB PORT
TYPEORM_USERNAME= #DB 계정
TYPEORM_PASSWORD= #DB PASSWORD
TYPEORM_DATABASE= #DB 이름
TYPEORM_SYNCHRONIZE= #엔티티와 테이블 sync 여부 
TYPEORM_LOGGING= #쿼리 실행 로깅 여부 

CLIENT_URI= #클라이언트 URI 

JWT_SECRET= #토큰 Secret
JWT_TOKEN_EXPIRES_IN= #토큰 유효시간 (seconds)
JWT_TOKEN_REFERSH_THRESHOLD= #토큰이 재발급되는 남은시간 (seconds)

KAKAO_CLIENT_ID= #발급받은 CLIENT ID
KAKAO_CLIENT_SECRET= #발급받은 CLIENT SECRET
KAKAO_CALLBACK_URI= #개발자센터에 설정한 콜백 URI 

NAVER_CLIENT_ID= 
NAVER_CLIENT_SECRET= 
NAVER_CALLBACK_URI= 

GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET= 
GOOGLE_CALLBACK_URI= 
```

### 프로젝트 실행
루트 디렉토리에서 아래 명령어를 실행합니다.

```
yarn && yarn dev
```
