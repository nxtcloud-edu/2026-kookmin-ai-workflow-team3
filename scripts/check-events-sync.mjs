#!/usr/bin/env node
/**
 * Docs/events.md ↔ web/src/data/events.ts 이벤트 ID 동기화 검사
 * Usage: node scripts/check-events-sync.mjs [--json]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const eventsMdPath = path.join(root, 'Docs', 'events.md')
const eventsTsPath = path.join(root, 'web', 'src', 'data', 'events.ts')

/** 엔딩 챕터 헤더만 있고 playable 노드는 아님 */
const SKIP_MD_IDS = new Set(['event-7'])

/** events.ts 전용 (events.md에 없어도 허용) */
const ALLOW_EXTRA_TS_IDS = new Set(['event-placeholder'])

function parseMdEventIds(content) {
  const ids = new Set()
  const pattern = /^#{2,3} 이벤트 (\d+(?:-\d+)?):/gm

  for (const match of content.matchAll(pattern)) {
    const id = `event-${match[1]}`
    if (!SKIP_MD_IDS.has(id)) {
      ids.add(id)
    }
  }

  return ids
}

function parseTsEventIds(content) {
  const ids = new Set()
  const pattern = /'((?:event-\d+(?:-\d+)?)|event-placeholder)':/g

  for (const match of content.matchAll(pattern)) {
    ids.add(match[1])
  }

  return ids
}

function main() {
  if (!fs.existsSync(eventsMdPath)) {
    console.error(`Missing: ${eventsMdPath}`)
    process.exit(1)
  }
  if (!fs.existsSync(eventsTsPath)) {
    console.error(`Missing: ${eventsTsPath}`)
    process.exit(1)
  }

  const mdIds = parseMdEventIds(fs.readFileSync(eventsMdPath, 'utf8'))
  const tsIds = parseTsEventIds(fs.readFileSync(eventsTsPath, 'utf8'))

  const missingInTs = [...mdIds].filter((id) => !tsIds.has(id)).sort()
  const extraInTs = [...tsIds]
    .filter((id) => !mdIds.has(id) && !ALLOW_EXTRA_TS_IDS.has(id))
    .sort()

  const result = {
    inSync: missingInTs.length === 0 && extraInTs.length === 0,
    mdCount: mdIds.size,
    tsCount: tsIds.size,
    missingInTs,
    extraInTs,
    mdIds: [...mdIds].sort(),
    tsIds: [...tsIds].sort(),
  }

  const asJson = process.argv.includes('--json') || process.env.EVENTS_SYNC_JSON === '1'

  if (asJson) {
    console.log(JSON.stringify(result))
    process.exit(result.inSync ? 0 : 2)
  }

  if (result.inSync) {
    console.log(`OK: events.md와 events.ts 이벤트 ID가 일치합니다 (${mdIds.size}개).`)
    process.exit(0)
  }

  console.log('events.md ↔ web/src/data/events.ts 동기화 필요\n')

  if (missingInTs.length > 0) {
    console.log('events.ts에 없음 (추가 필요):')
    for (const id of missingInTs) {
      console.log(`  - ${id}`)
    }
    console.log()
  }

  if (extraInTs.length > 0) {
    console.log('events.md에 없음 (events.ts에만 존재):')
    for (const id of extraInTs) {
      console.log(`  - ${id}`)
    }
    console.log()
  }

  console.log('반영: .cursor/skills/events-to-data 스킬 → web/src/data/events.ts')
  process.exit(2)
}

main()
