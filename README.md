# Commit-Counter

## 주간 commit내역 카운트
```terminal
> npm install 
:pacakge.json 의존 모듈 설치

> npm ls --depth=0
:설치 모듈 확인

> node commit-counter.js "abc,bbb"
또는
> node commit-counter.js
: 실행시 전달 아이디 목록 없으면 info.json 파일 기준으로 조회
: 그것도 없으면 조회 안함
: 업로드된 info.json은 테스트용으로 실사용시 파일 수정 필요
```

- 2020-03-29
    - json-parser 추가
    - 실행인자 없으면 info.json에서 불러오게 변경

### TODO list
- 호출 순서대로 출력 되게 변경(동기식)
- 데이터 호출 하는곳 변경하기, 또는 방법 바꾸기
