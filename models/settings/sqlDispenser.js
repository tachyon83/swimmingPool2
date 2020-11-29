const dbSetting = require('./dbConnectionSettings')

let sql_createUser = "create user if not exists " + dbSetting.user + " identified by '" + dbSetting.password + "';";
let sql_grantPrivileges = "grant all privileges on " + dbSetting.database + ".* to '" + dbSetting.user + "'@'%';";
let sql_flush = "flush privileges;";
let sql_alterUser = "alter user " + dbSetting.user + " identified with mysql_native_password by '" + dbSetting.password + "';";
let sqls1 = sql_createUser + sql_grantPrivileges + sql_flush + sql_alterUser;

let sql_createDB = "create database if not exists " + dbSetting.database + ";";

let sql_createTable = "create table if not exists pooltable(poolId int not null, poolName varchar(20) not null, poolAddress varchar(60) not null, poolPhone varchar(20),poolTypeMask int,poolOpentime int,poolOption int,primary key(poolId));";
let sql_insertValues1 = "insert into pooltable(poolId,poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select 1 as poolId,'가나다 스포츠' as poolName,'서울 압구정동' as poolAddress,'010-1111-1111' as poolPhone,19 as poolTypeMask,1 as poolOpentime,101 as poolOption) as tmp where not exists(select poolName from pooltable where poolName = '가나다 스포츠') limit 1;";
let sql_insertValues2 = "insert into pooltable(poolId,poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select 2 as poolId,'미니미 수영장' as poolName,'대전 둔산동' as poolAddress,'010-2222-2222' as poolPhone,9 as poolTypeMask,1 as poolOpentime,11 as poolOption) as tmp where not exists(select poolName from pooltable where poolName = '미니미 수영장') limit 1;";
let sql_insertValues3 = "insert into pooltable(poolId,poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select 3 as poolId,'건강미 센터' as poolName,'대구 용산동' as poolAddress,'010-3333-3333' as poolPhone,18 as poolTypeMask,0 as poolOpentime,110 as poolOption) as tmp where not exists(select poolName from pooltable where poolName = '건강미 센터') limit 1;";
let sql_insertValues4 = "insert into pooltable(poolId,poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select 4 as poolId,'앗차거 호텔' as poolName,'부산 부전동' as poolAddress,'010-4444-4444' as poolPhone,7 as poolTypeMask,0 as poolOpentime,1 as poolOption) as tmp where not exists(select poolName from pooltable where poolName = '앗차거 호텔') limit 1;";
let sqls2 = sql_createTable + sql_insertValues1 + sql_insertValues2 + sql_insertValues3 + sql_insertValues4;

let randomWords = "가나다라마바사아자차카타파하";
let randomSz = 8000;
for (let i = 5; i < randomSz; ++i) {
    let poolNameRandom = "";
    for (var charCnt = 0; charCnt < 3; ++charCnt)poolNameRandom += randomWords[parseInt(Math.random() * 14)];
    let poolPhoneRandom = "010-" + poolNameRandom + "-0000";
    poolNameRandom = "'" + poolNameRandom + "'";
    poolPhoneRandom = "'" + poolPhoneRandom + "'";
    let poolMaskRandom = parseInt(Math.random() * 31) + 1
    let openTimeRandom = parseInt(Math.random() * 2)
    let optionRandom = parseInt(Math.random() * (1 << 3))
    let sql_insertValuesRandom = "insert into pooltable(poolId,poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select " + i + " as poolId," + poolNameRandom + " as poolName," + poolNameRandom + " as poolAddress," + poolPhoneRandom + " as poolPhone," + poolMaskRandom + " as poolTypeMask," + openTimeRandom + " as poolOpentime," + optionRandom + " as poolOption) as tmp where not exists(select poolId from pooltable where poolId = " + i + ") limit 1;";
    // console.log(sql_insertValuesRandom)
    sqls2 += sql_insertValuesRandom;
}

// '%' vs 'localhost'

module.exports = {
    initialSetup: sqls1,
    newDB: sql_createDB,
    createDummy: sqls2,
}