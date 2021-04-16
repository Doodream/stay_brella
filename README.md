# 🌂 StayBrella

> 우산 쇼핑몰

[Staybrella](https://staybrella-front.vercel.app/)

## ⏰ 제작 기간 & 참여 인원

- 2021년 4월 9일 ~ 2021년 4월 15일
- 개인 프로젝트

---

## 🛠 사용기술

`Frontend`

- JavaScript ES6
- React
- Next JS
- Ant d
- Styled Component

`Backend`

- Node JS
- Express JS
- AWS Service  : EC2, Route53, LoadBalancer
- Mongo DB

---

## 🕹 주요기능

- 로그인  📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/account/login/index.js#L45) 📱 [백엔드 코드](https://github.com/Doodream/staybrella_backend/blob/ab688db2290eb8743e7cb26ae0bc6b5cb709b188/models/User.js#L42)
- 개인정보수정  📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/account/myPage/myinfo/index.js#L73) 📱 [백엔드 코드](https://github.com/Doodream/staybrella_backend/blob/ab688db2290eb8743e7cb26ae0bc6b5cb709b188/index.js#L153)
- 장바구니 📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/product/detail/Cart/Cart.js#L28)
- 리뷰 📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/product/detail/Review/Review.js#L42) 📱 [백엔드 코드](https://github.com/Doodream/staybrella_backend/blob/ab688db2290eb8743e7cb26ae0bc6b5cb709b188/index.js#L169)

---

## 💻  핵심 트러블 슈팅

### next js SSR 빌드 문제

- React Js에서와 달리 next JS는 SSR방식으로 서버와 통신합니다. 일반 create-react-app 에는 JS파일 로딩이 끝나야 렌더링이 되는 CSR방식과 달리 SSR은 JS 파일 로딩전 HTML 파일 로딩 후 바로 Layout 해버립니다. 따라서 js 파일로딩 없이 페이지 렌더링이 가능해야했습니다.
- 대표적으로 window 객체등 전역객체의 로딩이 되지않아 발생되는 문제점에서 파생되는 코드들에 대해서 `type of window === undefined ?`  처리를 하였습니다.

📌 [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/account/myPage/myinfo/index.js#L22)

### useState setter 값 반영 시점 문제

- useState의 setter는 페이지가 리렌더링 될 때 해당값이 반영이 됩니다. 즉,  Hook 안의  `setValue( '값')` 바로 아래줄 부터 `value` 값이 `'값'` 형태로 사용될 수가 없습니다. 아래줄에 반영되는 `value`는 `setValue` 이전 값이였습니다.
- 훅 안에서 상태변수를 없데이트 하려 임시 변수에 상태값 을 넣고 해당 값을 변형해주며 setter 처리했습니다.  해당 값에 대한 파생처리는 `useEffect()` 의존성 배열로 해결하였습니다.

📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/product/detail/Cart/Cart.js#L30)

### Promise 함수 동기식 처리

- Promise는 비동기 처리이기 때문에 때에 따라 원하는 순서대로 실행되지 않을 때가 있습니다. 해당 코드는 Promise 처리하여 비동기 처리를 하는데 Promise 함수들이 여러번 호출되면 해당 Promise 함수가 원하는 순서로 실행되지 않을 때가 있습니다. 입력값이 배열이라면 `reducer` 가 해결 방법입니다.
- 그럴 경우 Promise를 같은 훅에 넣지 않고 실행시점을 다른 곳에서 시작하게 하여 구조적 비동기 처리를 합니다. 아래 코드에서는  useEffect( )의 의존성 배열로 상태변수를 넣어 실행시점을 나눴습니다.

📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/pages/account/myPage/myinfo/index.js#L43)  📌 [api 코드](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/contexts/Auth/AuthProvider.js#L68)

### api request, response

- 클라이언트에서 api 요청을 보내면 해당 요청을 바탕으로 데이터 처리후에 응답처리를합니다.  하지만 처리하자마자 바로 해당 저장된 값을 불러오기보다는 요청된 내용을 다시 응답해주는게 처리속도가 빨랐습니다.
- 저장이 되었는지만 확인하고 요청된 내용을 다시 응답하여 response 데이터 처리를 동기적으로 처리하였습니다.

📌  [코드 확인](https://github.com/Doodream/staybrella_front/blob/839b7e171e3ea62cd1f16cf277ae475a2e1bf421/src/contexts/Auth/AuthProvider.js#L68) 📱 [백엔드 코드](https://github.com/Doodream/staybrella_backend/blob/ab688db2290eb8743e7cb26ae0bc6b5cb709b188/index.js#L153)

## 📑  그외 트러블 슈팅

- CORS 에러
> SOP 동일 출처 정책으로 http 통신시 상대방측의 출처를 인지하지 못하면 데이터 통신이 거부되는 현상이 있었다. 이를 위해 CORS 적용을 위해 백엔드에서 cors 모듈을 사용해서 헤더에 로컬 개발 주소와 배포 도메인을 추가했다.
- flex-wrap  처리
> /product/index.js 페이지의 물건 목록에서 컴포넌트들이 박스를 이탈해서 자동으로 정리가 안되었다.
자식 컴포넌트에 `flex-wrap : wrap`  `justify-content : start` 설정을 통해 박스엔에 자동정렬 처리를 했다.
- 상대경로 → 절대경로
> 컴포넌트를 import 할때 경로삽입시 상대경로를 넣었다. 하지만 vscode에서는 jsconfig.json 파일을 통해 절대 경로 설정을 할수 있다. 절대경로 안에서 디렉토리 이동시 import 파일마다 수정할 필요가 없다.
- 중복코드 컴포넌트 화
> 자주쓰는 스타일과 컴포넌트들이 있다. 페이지를 만들면 테마를 생각하게 되는데 기본테마는 _app.js 파일에서 기본 css 설정을 하지만, 새롭게 만드는 컴포넌트들은 스타일설정을 매번하기가 힘들다. StyleAtoms.js 파일에 자주쓰는 버튼과 라벨을 모아 컴포넌트를 만들어 사용했다.  ProductCard나 Goods 등 컴포넌트를 이용해 중복코드를 제한 했다.
- 동적페이지 생성
> next js 에서는 실제로 페이지를 만들지 않더라도 변수를 입력받아 동적페이지를 작성할 수 있다.
> /product/[id].js 나 /product/[...slug].js 형태가 있는데 이런 동적페이지에 데이터를 넘기려면 Link 컴포넌트를 이용해 href에 qurey 값을 주면 된다.
- useEffect 의존성 배열 감지
> next js 에서는 실제로 페이지를 만들지 않더라도 변수를 입력받아 동적페이지를 작성할 수 있다.
> /product/[id].js 나 /product/[...slug].js 형태가 있는데 이런 동적페이지에 데이터를 넘기려면 Link 컴포넌트를 이용해 href에 qurey 값을 주면 된다.
- mongoDB의 key indexing 중복
> 중복될 수 있는 값으로 키값 을 설정해 놓으면 중복처리되어 데이터 저장이 안된다.
> DB에서 값을 인덱싱 하려면 데이터들을 구분할 키값이 있어야 한다. 기본적으로 데이터 객체당 데이터를 구분할 유니크한 키값을 설정해 놓고 해당 데이터를 키 인덱싱을 설정해놓으면 키값의 중복없이 데이터가 저장되어 구분할 수 있다.
---
