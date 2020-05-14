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

- 2020-04-06
    - 하루 여러 커밋이 있으면 모두 합쳐서 1개로 변경
    - 지난주 월요일부터 일요일까지 구하기

- 2020-04-08
    - info.json 데이터 구조 변경

### TODO list
- 데이터 보여주기 편하게 저장 또는 읽기

- 파일에 저장시 순서대로, 또는 회차별로 저장하기(callback 제어하기) 
- 데이터 별로 정렬하기
- 데이터 호출 하는곳 변경하기, 또는 방법 바꾸기
- 원하는 요일부터 7일 구하기
- 슬랙 채널에 전송할 메시지 포맷 선정하기