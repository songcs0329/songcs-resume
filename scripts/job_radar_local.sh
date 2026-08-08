#!/bin/bash
# 원티드 전용 로컬 수집기.
#
# 원티드 API는 데이터센터 IP에 403을 준다 — GitHub Actions 러너에서는 못 쓰고
# 주거용 IP인 이 Mac에서만 동작한다. 그래서 원티드만 여기서 따로 돌린다.
# 나머지(점핏·자사 페이지·링크 생존 확인)는 Actions가 담당한다.
#
# Mac이 꺼져 있으면 그냥 건너뛴다 — 다음 실행에서 같은 공고가 다시 잡히므로
# 놓쳐도 손실이 없다.
#
# 설치: launchctl load ~/Library/LaunchAgents/com.songcs.job-radar-local.plist
# 수동: bash scripts/job_radar_local.sh

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

LOG="$REPO/.job-radar-local.log"
exec >>"$LOG" 2>&1
echo "=== $(date '+%Y-%m-%d %H:%M:%S') 원티드 수집 시작 ==="

# 네트워크가 없으면 조용히 끝낸다 (노트북이 오프라인일 수 있다)
if ! curl -sf -o /dev/null --max-time 10 https://www.wanted.co.kr/; then
  echo "원티드 접근 불가 — 건너뜀"
  exit 0
fi

# 작업 중인 변경이 있으면 건드리지 않는다
if ! git diff --quiet || ! git diff --staged --quiet; then
  echo "작업 트리가 깨끗하지 않음 — 건너뜀"
  exit 0
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "현재 브랜치가 main이 아님($BRANCH) — 건너뜀"
  exit 0
fi

git pull --rebase --quiet origin main

python3 scripts/job_radar_collect.py --only wanted --skip-phase0

if git diff --quiet -- data/raw-jobs.md; then
  echo "신규 없음 — 커밋 생략"
  exit 0
fi

git add data/raw-jobs.md
git commit -q -m "chore(job-radar): $(date '+%Y-%m-%d') 원티드 공고 수집 (로컬)"
git push --quiet origin main
echo "푸시 완료: $(git log --oneline -1)"
