---
name: events-to-data
description: >-
  Docs/events.md 이벤트를 web/src/data/events.ts 게임 데이터로 변환·동기화한다.
  이벤트 추가, events.ts 갱신, 분기·수치·연출 필드 매핑, 엔딩 7-x 데이터화
  요청 시 사용.
---

# events.md → events.ts 변환

[Docs/events.md](../../Docs/events.md)가 **원본**, [web/src/data/events.ts](../../web/src/data/events.ts)가 **런타임 데이터**다.

## 변환 순서

1. `Docs/events.md`에서 해당 이벤트 블록 읽기
2. `web/src/game/types.ts`의 `GameEvent` 타입에 맞게 객체 작성
3. `events` 레코드에 `'event-N': { ... }` 추가·수정
4. 배경 이미지 `import` 추가 (`@image/파일명`)
5. `cd web && npm run dev`로 분기 확인

대사를 새로 쓸 때는 먼저 [hongmyungbo-dialogue](../hongmyungbo-dialogue/SKILL.md)로 `events.md`를 작성한 뒤 이 스킬로 변환한다.

## 필드 매핑

| events.md | events.ts |
|-----------|-----------|
| `**배경**` | `text` |
| 이벤트 제목(## 헤더) | `title` |
| `사진: [image/…]` | `background: import` |
| 선택지 A/B `label` | `choices[].label` (따옴표 안 대사만) |
| `A → 이벤트 N` | `choices[].next: 'event-N'` |
| `(내부) 국민 민심: -100` | `effects: { publicSentiment: -100 }` |
| `(내부) 선수단 분위기: +20` | `effects: { teamMorale: 20 }` |
| `(연출) …` | `feedback: '…'` |
| 선택 X / 자동 진행 | `autoNext`, `autoEffects` |
| 엔딩 7-x | `type: 'ending'`, `ending: { … }` |

## 이벤트 ID 규칙

| events.md | events.ts id |
|-----------|--------------|
| 이벤트 1 | `event-1` |
| 이벤트 4-1 | `event-4-1` |
| 이벤트 7-3 | `event-7-3` |

## 타입별 템플릿

### 선택지 이벤트

```typescript
'event-2': {
  id: 'event-2',
  title: '기자회견',
  background: pressConferenceImg,
  text: '…',
  choices: [
    {
      id: 'A',
      label: '…',
      next: 'event-3',
      effects: { publicSentiment: -100 },
      feedback: '기자들이 고개를 저으며 메모한다.',
    },
    {
      id: 'B',
      label: '…',
      next: 'event-3',
      effects: { publicSentiment: -50 },
      feedback: '여론은 여전히 차갑지만, 일부 기자는 고개를 끄덕인다.',
    },
  ],
},
```

### 자동 이벤트 (선택 X)

```typescript
'event-3': {
  id: 'event-3',
  title: '월드컵 최종 예선',
  background: afcQualifiersImg,
  text: '…',
  autoNext: 'event-4',
  autoEffects: { publicSentiment: 20, teamMorale: 40 },
},
```

### 엔딩 (7-x)

```typescript
'event-7-1': {
  id: 'event-7-1',
  title: '제시마치',
  background: jesimachiImg,
  text: '…',
  type: 'ending',
  ending: {
    code: 'E0',
    title: '제시마치',
    grade: '32강 진출 (패러디)',
    epilogue: '…그래도 16강— 아니, 32강은 갔다.',
  },
},
```

## 엔딩 판정 (향후 구현)

`events.md` §엔딩 판정 로직의 `IF/ELIF`는 `web/src/game/endingResolver.ts` 등으로 분리한다.  
지금은 **직접 분기**(`next: 'event-7-1'`)와 **조건부 resolver**를 혼용 가능.

조건부 엔딩 추가 시 `gameStore`의 `resolveNext` 또는 별도 함수에서:

- `publicSentiment`, `teamMorale`
- `flags` (예: `event-6-1-C` 선택 여부)
- `tournamentResult` (32강/16강/탈락)

를 평가해 `event-7-N` id를 반환한다.

## 체크리스트

- [ ] `events.md`와 텍스트·분기가 일치하는가
- [ ] 진행 중 UI에 수치가 노출되지 않는가 (`feedback`만)
- [ ] 엔딩에만 `formatStat`으로 수치 표시하는가
- [ ] 이미지 경로가 `image/`에 실제 존재하는가
- [ ] `getEvent`로 모든 `next` id가 등록되어 있는가

## 예시

[event-1 변환 예시](examples.md)

## 작업 후

화면·상태 로직이 필요하면 [react-vn-web](../react-vn-web/SKILL.md).  
Git·progress는 [kookmin-team-workflow](../kookmin-team-workflow/SKILL.md).

## 자동 동기화 알림 (Cursor 훅)

`Docs/events.md`를 에이전트가 수정하면:

1. `.cursor/hooks/sync-events-after-edit.ps1` 실행
2. `node scripts/check-events-sync.mjs`로 ID 불일치 검사
3. 누락 시 대화에 **events.ts 갱신** 안내가 주입됨

수동 검사:

```powershell
node scripts/check-events-sync.mjs
```

> events.md → events.ts **완전 자동 생성은 하지 않음** (마크다운 파싱이 깨지기 쉬움). 훅은 누락 감지 + 에이전트 작업 유도.
