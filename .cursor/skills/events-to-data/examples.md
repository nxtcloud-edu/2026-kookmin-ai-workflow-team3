# events.md → events.ts 변환 예시

## events.md (원본)

```markdown
## 이벤트 1: 빵집 상황(임생이형과의 면담)

- **배경**: 임생이형으로부터 연락이 왔다. 빵집에서 만나 대한민국 국가대표팀 감독직 제안을 받는 자리다.
- 사진: [image/빵집.webp]
- **선택지**:
  - A. "2014년 브라질 월드컵의 수모... 나의 명예를 다시 세우겠어..."
  - B. "형, 빵집까지 불러내셔서 이런 말씀 하시면 어떡합니까. 저 그냥 빵이나 먹고 갈게요."
- **결과**:
  - A → 이벤트 2 진행
    - (내부) 국민 민심: -100
    - (연출) 여론이 벌써부터 시끄럽다.
  - B → 이벤트 7-1 진행 (조기 엔딩)
```

## events.ts (결과)

```typescript
import bakeryImg from '@image/빵집.webp'

'event-1': {
  id: 'event-1',
  title: '빵집 상황',
  background: bakeryImg,
  text: '임생이형으로부터 연락이 왔다. 빵집에서 만나 대한민국 국가대표팀 감독직 제안을 받는 자리다.',
  choices: [
    {
      id: 'A',
      label: '2014년 브라질 월드컵의 수모... 나의 명예를 다시 세우겠어...',
      next: 'event-2',
      effects: { publicSentiment: -100 },
      feedback: '여론이 벌써부터 시끄럽다.',
    },
    {
      id: 'B',
      label: '형, 빵집까지 불러내셔서 이런 말씀 하시면 어떡합니까. 저 그냥 빵이나 먹고 갈게요.',
      next: 'event-7-1',
      // 조기 엔딩 — feedback 없음, effects 없음
    },
  ],
},
```

## 흔한 실수

| 실수 | 올바른 처리 |
|------|-------------|
| 진행 중 화면에 `-100` 표시 | `effects`만 저장, UI는 `feedback`만 |
| `(내부)` 수치를 `text`에 포함 | `effects` 객체로 분리 |
| `이벤트 7-1` → `event-7` | `event-7-1` (하이픈 유지) |
| 엔딩에 `choices` 추가 | `type: 'ending'` + `ending` 객체 |
