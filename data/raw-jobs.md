# Job Radar 원본 공고 (수집기 → 큐레이터 인계 파일)

`scripts/job_radar_collect.py`가 **URL 200 검증을 통과한** 공고만 여기에 적는다.
Claude 루틴은 이 파일을 읽어 채점·브리프를 붙여 `src/data/jobs.json`으로 옮기고,
처리한 블록은 `data/raw-jobs-archive.md` 끝에 덧붙인다. 여기 없는 공고를 임의로 만들어 넣지 말 것.

처리 대기분만 남기는 파일이다 — 루틴이 매 실행 통째로 읽으므로 작게 유지한다.

## Pending
