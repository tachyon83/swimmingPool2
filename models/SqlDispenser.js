const dbSetting = require('./DBconnectionSettings')

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

// '%' vs 'localhost'

module.exports = {
    initialSetup: sqls1,
    newDB: sql_createDB,
    createDummy: sqls2,
}