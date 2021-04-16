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
- flex-wrap  처리
- 상대경로 → 절대경로
- 중복코드 컴포넌트 화
- 동적페이지 생성
- useEffect 의존성 배열 감지
- mongoDB의 key indexing 중복

---
