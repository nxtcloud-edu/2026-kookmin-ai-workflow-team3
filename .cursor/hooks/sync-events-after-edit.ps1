# Cursor hook: Docs/events.md 수정 후 web/src/data/events.ts 동기화 알림
# afterFileEdit / postToolUse(Write) 에서 호출
$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try {
    $input = $raw | ConvertFrom-Json
} catch {
    exit 0
}

function Test-IsEventsMdPath {
    param([string]$Path)
    if (-not $Path) { return $false }
    $normalized = $Path -replace '\\', '/'
    return $normalized -match 'Docs/events\.md$'
}

$targetPath = $null

if ($input.file_path) {
    $targetPath = [string]$input.file_path
}

if (-not $targetPath -and $input.tool_name -eq 'Write' -and $input.tool_input) {
    $toolInput = $input.tool_input
    if ($toolInput -is [string]) {
        try { $toolInput = $toolInput | ConvertFrom-Json } catch { $toolInput = $null }
    }
    if ($toolInput) {
        if ($toolInput.PSObject.Properties['path']) {
            $targetPath = [string]$toolInput.path
        } elseif ($toolInput.PSObject.Properties['file_path']) {
            $targetPath = [string]$toolInput.file_path
        }
    }
}

if (-not (Test-IsEventsMdPath $targetPath)) {
    exit 0
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$checkScript = Join-Path $repoRoot 'scripts\check-events-sync.mjs'

if (-not (Test-Path $checkScript)) {
    exit 0
}

$env:EVENTS_SYNC_JSON = '1'
$nodeOutput = & node $checkScript 2>&1
$exitCode = $LASTEXITCODE
Remove-Item Env:EVENTS_SYNC_JSON -ErrorAction SilentlyContinue

if ($exitCode -eq 0) {
  $payload = @{
    additional_context = 'events.md 수정됨. web/src/data/events.ts와 이벤트 ID가 일치합니다.'
  } | ConvertTo-Json -Compress
  Write-Output $payload
  exit 0
}

if ($exitCode -ne 2) {
    exit 0
}

try {
    $result = $nodeOutput | ConvertFrom-Json
} catch {
    exit 0
}

$missing = @($result.missingInTs) -join ', '
$extra = @($result.extraInTs) -join ', '

$lines = @(
    'events.md가 수정되었습니다. web 클라이언트 동기화가 필요합니다.',
    '',
    '필수 작업: events-to-data 스킬에 따라 web/src/data/events.ts를 갱신하세요.',
    '수치는 effects, 연출은 feedback 필드로 매핑합니다. 진행 중 UI에 숫자 노출 금지.',
    ''
)

if ($missing) {
    $lines += "events.ts에 추가 필요: $missing"
}
if ($extra) {
    $lines += "events.ts에만 존재 (정리 검토): $extra"
}

$lines += ''
$lines += '검사 명령: node scripts/check-events-sync.mjs'

$payload = @{
    additional_context = ($lines -join "`n")
} | ConvertTo-Json -Compress

Write-Output $payload
exit 0
