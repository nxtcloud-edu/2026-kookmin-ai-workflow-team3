# 내가 홍명보라면 — Web

React + Vite + TypeScript + Zustand + Tailwind 미연시 클라이언트.

## 실행

```powershell
cd web
npm install
npm run dev
```

브라우저에서 표시되는 로컬 주소(보통 `http://localhost:5173`)로 접속합니다.

## 구조

```text
src/
├── data/events.ts      # events.md 기반 이벤트 데이터
├── game/               # 타입, 티어 유틸
├── store/gameStore.ts  # Zustand 게임 상태
├── screens/            # 타이틀, 이벤트, 엔딩 화면
└── components/         # UI 조각
```

## 콘텐츠 추가

1. [Docs/events.md](../Docs/events.md)에 시나리오 작성
2. `src/data/events.ts`에 동일 이벤트를 객체로 추가
3. `npm run dev`로 분기 확인

이미지는 저장소 루트 `image/` 폴더를 `@image/` alias로 import합니다.

## MVP 범위

- 이벤트 1~3 + 조기 엔딩 7-1 playable
- 이벤트 4 이후는 placeholder

배포 설정은 아직 포함하지 않습니다.
