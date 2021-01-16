# 수영장 CRUD 미니 프로젝트
   
   
   
## 소개
  
본 프로젝트는 2인이 수행한 미니 프로젝트이며,   
아래의 주소에서 확인하실 수 있습니다.  
서버가 수면중이니, 2~3번 시도하시면 접속가능합니다.  
https://otters-pool.herokuapp.com  
otters는 수달이며 '수'영장에 '달'려간다는 뜻으로 지었습니다.  
  
백엔드는 제가 맡았고,  
프론트엔드는 danakim21님이 맡았습니다.  
https://github.com/danakim21  
본 Readme에서는 백엔드 코드와 관련된 내용만 담겨있습니다.  
  
백엔드: https://github.com/tachyon83/swimmingPool2  
프론트엔드: https://github.com/tachyon83/swimmingPool2-front  
  
  
  
## 개요
  
몇가지 필터를 통해 검색조건을 맞추고,  
그에 맞는 수영장을 검색하는 프로젝트  
관리자 모드에서는 정보 추가,수정,삭제 등이 모두 가능합니다.  
그리고 현재 등록된 수영장들에 대한 개략적인 현황을 볼 수 있습니다.  
기본적으로 데이터베이스 연결, 모듈화, 라우팅, CRUD구현, 클라우드에 배포까지를 목표했습니다.  
  
  
  
## 사용 기술 및 주요 모듈
  
Node Express Passport Mysql
  
  
  
## 폴더 구조
  
app.js  
dbSetup_heroku.js  
dbSetup.js  
|- config : 각종 세팅과 passport 로컬 Strategy구현  
|- models - settings  
                |- dbConnectionSettings : 데이터베이스 연결 관련 세팅  
                |- sqlDispenser : SQL 쿼리문 모음  
          - dbPoolCreator : MySQL연결 Pool 리턴  
          - MemberDao : 회원 관련 DAO 클래스 구현  
          - PoolDao : 수영장 정보 관련 DAO 클래스 구현  
|- routes - admin : 관리자 모드에서만 사용가능한 admin경로로 들어오는 모든 요청 처리  
          - login : 로그인에 사용  
          - pool : pool경로로 들어오는 모든 요청 처리  
          - isAuthenticated : 인증된 사용자인지 확인하는 경로  
  
  
  
## 주요 내용
  
- 백엔드와 프론트엔드가 서로 다른 주소를 통해 배포 (CORS이슈 관리함)  
- 데이터베이스 접속시 connection을 계속 만들지 않고, pool을 활용하여 connection사용 후 반납하는 방식
- 하나의 파일에서 pool을 만들고 다른 곳에서는 그 pool을 참조하는 방식
- Dao클래스를 분할하여 주제에 따른 관련 메서드를 모아둠
- Routes를 주제에 따라 분할하여 관리
- 서로 다른 도메인을 활용하므로 passport 로그인 성공시 커스텀 콜백을 사용하여 처리함
  
        
        
## 어려웠거나 배운 점
  
- CORS 이슈 관리가 힘들었음. POST, PUT등의 메서드로 요청이 있을 때 OPTIONS라는 method로 '사전요청'이 있다는 사실을 알게 됨.
- CORS 세팅을 통해 허가할 요청 경로를 명시하여 넣어둘 수 있다는 사실을 알게 됨 (배열도 가능). 현재는 간단하게 true로 되어있음.
- 크롬 브라우저 정책으로 도메인이 다른 곳에서 보내주는 쿠키는 거부한다는 사실을 알게 됨. <- 이를 해결하기 위해 관련 설정 필요하였음.
  (cookie-sameSite, cors-credentials 등등)
- heroku에서 proxy를 앞에 세우기에 관련 설정이 필요하였음.
- 하나의 파일에 모든 것을 넣지 않고, 여러 개의 파일로 분할하는 과정에서 비동기처리의 동기화가 어려웠고,
  공용자원을 한 곳에서만 정의하고 같이 쓰도록 하는 부분도 어려웠음.
  예시: createPool이 비동기 처리인데 그것이 완료된 후에 다른 파일에서 참조하도록 만드는 부분
    
    
    
* 비록 간단한 프로젝트이지만, 첫번째였던 만큼 여러가지 어려웠던 점들이 있었습니다. 하지만, 이를 통해 생각보다 많은 부분을 깨닫게 되었습니다.  


