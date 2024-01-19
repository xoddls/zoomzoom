<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 프로젝트 설명

투어 상품 예약을 처리하는 API 서버 구현

2024.01.15 ~ 2024.01.20


## Installation

```bash
# install
$ npm install

# migration-generate
$ npm run migration:generate

# migration-run
$ npm run migration:run
```



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## 환경요구사항

+ Language : Node.js // v.16.14.0

+ Database : Mysql // v.8.2.0

+ Cache : Redis // v.7.2.4

+ Web application framework : nestjs // v.8.2.1

+ ORM : typeorm // @nestjs/typeorm 10.0.1, typeorm 0.3.19

+ 기타 : @nestjs/schedule // @4.0.0

        + nestjs/jwt // @10.2.0

        + cache-manager-ioredis // @2.1.0



## 기능요구사항

판매자

1. 하루에 받을수 있는 투어 예약은 5건으로 자동 승인, 판매자는 추가로 예약 승인 가능

2. 특정 요일, 또는 하루 단위로 투어를 하지 않는 휴일 지정 가능 (ex: 매주 월요일 휴일, 3월 1일 휴일)

3. 토큰을 이용해 고객의 예약 여부 확인이 가능하며, 한번 승인한 토큰은 재사용 불가


고객

1. 월 단위로 예약이 가능한 일정 조회, 판매자가 휴일 정보를 수정하지 않는다면 캐시 정보 사용

2. 예약 신청에 성공한 고객은 유일한 토큰 값을 승인의 결과값으로 획득

3. 여행 3일전까지 예약 취소 가능



## 설정

+ 환경변수

```bash
NODE_ENV=local

DB_HOST=localhost

DB_PORT=3306

DB_USERNAME=zoomzoom

DB_PASSWORD=zoomzoom

DB_NAME=zoomzoom

JWT_SECRETKEY=zoomzoom

JWT_EXPIRESIN=9999y
```



# DB

예약 테이블 (reservation)


예약 정보를 저장하는 테이블입니다.

투어에 대한 명세가 없기 때문에 최소한의 데이터를 사용했습니다.

3개의 칼럼이 모두 JWT 발급시 payload로 사용됩니다.

```bash
| Column       | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `id`         | INT       | 예약 고유 식별자           |
| `userId`     | INT       | 예약자 이름               |
| `date`       | DATE      | 예약 날짜                 |
```


예약취소 테이블 (cancleReservation)

취소된 예약을 저장하는 테이블입니다.

추후 취소한 예약 일정 조회와 같은 서비스를 위해 예약 테이블과 분리하였습니다.

예약 테이블에 cancleStatus를 써서 하나의 테이블에서 관리할 수도 있지만 칼럼이 늘어나는 것과 
데이터가 쌓이게 됐을 경우 성능저하를 피하고자 분리를 선택했습니다.

토큰을 통해 조회를 하는 방식이라 예약날짜를 그대로 저장합니다.


```bash
| Column       | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `id`         | INT       | 예약 고유 식별자           |
| `userId`     | INT       | 고객 이름                |
| `date`       | Date      | 예약 날짜                |
```


고객 테이블 (user)

고객의 정보를 저장하는 테이블입니다.

현재 서비스에서는 고객의 데이터에서 id 값만을 사용합니다.

이름과 이메일의 경우 중복되거나 비슷한 형식이 데이터가 발생할 것을 생각하여 JWT의 페이로드로 사용하지 않습니다.


```bash
| Column       | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `id`         | INT       | 고객 고유 식별자           |
| `name`       | VARCHAR   | 고객 이름                |
| `email`      | VARCHAR   | 고객 이메일 주소           | 
```


휴일 테이블 (holiday)

휴일의 정보를 저장하는 테이블입니다.

현재 서비스에서는 고객의 데이터에서 id 값만을 사용합니다.


```bash
| Column       | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `id`         | INT       | 휴일 고유 식별자           |
| `holidayDate`| Date      | 휴일 이름                |
```


휴일 규칙 테이블 (holidayRule)

특정 요일에 휴일을 지정하기 위해 조건을 저장하는 테이블입니다. ex) 매주 월요일 휴일

당일 기준으로 1년 뒤 까지 휴일을 지정하는 서비스 로직에 따라 year속성은 따로 사용하지 않습니다.


```bash
| Column       | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `id`         | INT       | 규칙 고유 식별자           |
| `month`      | INT       | 월 조건 enum             |
| `week`       | INT       | 주 조건 enum             |
| `date`       | INT       | 일 조건 enum             |
| `day`        | INT       | 요일 조건 enum            |
```

```c
export enum monthHolidayRule {
  '1월' = 1,
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
  '매 달',
  '짝수 달',
  '홀수 달',
}

export enum weekHolidayRule {
  '첫째 주' = 1,
  '둘째 주',
  '셋째 주',
  '넷째 주',
  '다섯째 주',
  '여섯째 주',
  '매 주',
}

export enum dateHolidayRule {
  '1일' = 1,
  '2일',
  '3일',
   ...
  '30일',
  '31일',
  '없음',
  '짝수 일',
  '홀수 일'
}

export enum dayHolidayRule {
  '월요일' = 1,
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
  '없음'
}
```



## 주요기능

1. 하루에 받을수 있는 투어 예약은 5건으로 자동 승인, 판매자는 추가로 예약 승인 가능

   userId와 date을 body()에 담아 요청합니다.

   자동승인곽 판매자 추가 승인 모두 승인 이후에 토큰을 발급해야함으로 auth모듈에 generateToekn메소드를 구현하고 AOP 방식을 통해 모듈화 했습니다.

   POST http://localhost:3000/autoApproveReservation : 자동 승인

   POST http://localhost:3000/addApproveReservation : 판매자 추가 승인



2. 특정 요일, 또는 하루 단위로 투어를 하지 않는 휴일 지정 가능 (ex: 매주 월요일 휴일, 3월 1일 휴일)

   2개의 방법을 통해 나누어 구현하였습니다.

   하루 단위로 추가하는 경우 'yyyy-mm-dd' 포맷의 데이터를 통해 쉽게 지정할 수 있었습니다.

   특정 요일의 경우 일반적인 비행기, 숙소 예약시스템을 참고하여 당일로부터 1년 뒤까지 예약 가능한 일정 조회를 하기 때문에 휴일 또한 당일로부터 1년 뒤까지 에서만 구하였습니다.

   enum을 통해 각 카테고리별 값을 나누어 if문을 통해 추가한 예약 규칙에 맞는 휴일을 찾아 지정합니다.

   1년안의 휴일만 지정하면 되기 때문에 year는 사용할 필요가 없습니다.

  http://localhost:3000/rule과 http://localhost:3000/holidayRule 나누어서 구현한 이유는 하나의 서비스로직에서 구현하려면 SRP가 지켜지지 않고 트랜잭션 및 비즈니스로직의 길이가 너무 길어지기 때문입니다.


   POST http://localhost:3000/holiday : 하루 단위 휴일 지정


   POST http://localhost:3000/rule : 특정 요일을 휴일로 지정하기 위한 규칙 등록 ex) 매주 월요일 휴일, 짝수 달 넷쨰 주 화요일


   POST http://localhost:3000/holidayRule : 등록된 규칙을 통해 1년 이내의 조건에 부합한 날을 찾아 휴일로 지정


  @Cron('0 0 0 * * *', { timeZone: 'Asia/Seoul' })autoAddHolidayByRuule : 등록된 규칙을 통해 매일 자정에 1년 뒤의 날짜가 휴일인지 아닌지 확인하고 휴일이라면 휴일로 지정합니다. 규칙을 한번만 등록한다면 시간경과에 따라 휴일이 자동으로 갱신됩니다.


  updateRedis : 휴일이 지정된 후 cacheKey값을 통해 redis에 해당 키값의 정보가 존재한다면 캐시를 갱신해줍니다. redis 캐시와 db 데이터 동기화를 위해 구현하였습니다.


  getHoliday : reservation모듈에서 예약 가능한 일정을 조회하기위해 휴일을 조회할 때 사용합니다.

  
  getWeekNumber : Date타입의 데이터가 해당 월의 몇번째 주에 해당하는지 계산합니다.
   

   
3. 토큰을 이용해 고객의 예약 여부 확인이 가능하며, 한번 승인한 토큰은 재사용 불가

  예약 조회를 위해서 발급된 JWT 토큰을 사용합니다. 

  userId, reservationId, date를 payload에 사용함으로써 verify() 이후 데이터를 확인할 수 있습니다.

  sign()을 이용하여 토큰을 발급하기 때문에 하나의 예약을 통해 발급된 토큰은 다른 예약을 조회할 때 사용할 수 없습니다.

  이를 통해 토큰의 재사용을 방지할 수 있습니다.


  GET http://localhost:3000/reservation : 예약시 발급된 토큰을 통해 예약 정보를 확인합니다.


  generateToken : 토큰 발급


  verifyToken : 토큰 유효성 검사
  


4. 월 단위로 예약이 가능한 일정 조회, 판매자가 휴일 정보를 수정하지 않는다면 캐시 정보 사용

   year와 month를 이어서 만든 cacheKey를 사용하여 redis의 캐시를 사용합니다.

   redis에 저장된 값은 예약가능한 일정이 아닌 휴일 데이터가 저장되어 있습니다.

   이는 휴일이 새로 추가 되었을 경우 redis와 db의 동기화를 편이하게 하기 위해서입니다.

   캐시의 유효기간은 한시간으로 하여 데이터가 누적되는 것을 방지합니다.


  GET http://localhost:3000/monthlyAvailablity : 해당년월 예약이 가능한 일정 조회


  
5. 예약 신청에 성공한 고객은 유일한 토큰 값을 승인의 결과값으로 획득

   JWT를 사용하여 토큰을 발급합니다. 3번의 내용과 동일합니다.
   

6. 여행 3일전까지 예약 취소 가능

  3일 이내라면 예약을 취소합니다. 예약 취소성공, 3일 이내 예약취소 실패, 이미 취소된 예약, 존재하지 않는 예약 4가지의 경우를 가집니다.


   GET http://localhost:3000/reservation/:reservationId : 예약 취소



## 개선사항

+ 서비스계층과 레포지터리계층분리

  db와 상호작용하는 로직이 길지 않고 전체적인 소스코드도 짧아서 따로 분리하지 않았습니다.

  이러한 구조를 통해 서비스 로직을 직관적으로 확인할 수는 있지만 추후 업데이트와 규모 확대를 고려했을때 반드시 분리하여야 합니다.


+ 인터페이스 도입

  시간이 촉박하여 인터페이스를 활용하지 못했습니다.

  현재 reservation모듈이 auth모듈을 의존하거나 상위 모듈이 dto를 의존하는등 DIP가 전혀 준수되지 않았습니다.

  준수한 아키텍처를 유지하기 위해 개선되어야 합니다.


+ 트랜잭션 동시성 해결

  http://localhost:3000/rule와 http://localhost:3000/holidayRule를 분리함에 따라 트랜잭션도 나누어 졌습니다.

  트랜잭션이 나누어졌기 때문에 규칙 등록이 성공하고 그 규칙으로 휴일 지정에 실패하더라도 등록된 규칙이 롤백되지 않습니다.

  이러한 경우 고객이 일정을 조회하거나 휴일에 해당하는 날이 스케쥴러를 통해 자동으로 휴일로 지정되지 않는 이상 계속 해서 휴일 지정이 안되는 현상이 발생합니다.


+ autoAddHolidayByRuule, addHolidayByRule 모듈화

  두 로직에는 휴일 규칙에 따라 적합한 날인지 판단하는 로직이 중복됩니다. 이를 모듈화를 통해 코드 반복을 줄이고 유지보수성을 확보해야합니다.


+ async updateRedis(t: EntityManager, date: string)

  현재 updateRedis에 파라미터로 외부에서 받아온 트랜잭션 t, EntityManager를 매개변수로 사용하지만 실제 로직에서는 사용되지 않습니다.

  이러한 경우 updateRedis에서 에러가 발생하여도 이전 메소드에서의 트랜잭션이 롤백되지 않습니다.


+ 테스트케이스 추가

  테스트를 모두 해피케이스에서만 진행하고 다양한 에러처리와 리턴처리가 이루어지지 않았습니다.

  
