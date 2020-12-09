const dbSetting = require('./dbConnectionSettings')

// '%' vs 'localhost'

let sql_createUser =
    `create user if not exists ${dbSetting.user}
    identified by '${dbSetting.password}';`;
let sql_grantPrivileges =
    `grant all privileges on ${dbSetting.database}.* 
    to '${dbSetting.user}'@'%';`;
let sql_flush =
    `flush privileges;`;
let sql_alterUser =
    `alter user ${dbSetting.user} 
    identified with mysql_native_password 
    by '${dbSetting.password}';`;
let sqls1 = sql_createUser + sql_grantPrivileges + sql_flush + sql_alterUser;

let sql_createDB =
    `create database if not exists ${dbSetting.database};`;

let sql_createTable =
    `create table if not exists 
    ${dbSetting.tablename}(poolId int not null auto_increment, 
    poolName varchar(20) not null, poolAddress varchar(60) not null, 
    poolPhone varchar(20),poolTypeMask int,poolOpentime int,
    poolOption int,primary key(poolId));`
let sql_insertValues1 =
    `insert into ${dbSetting.tablename}(poolName,poolAddress,
    poolPhone,poolTypeMask,poolOpentime,poolOption) 
    values ('가나다 스포츠','서울 압구정동','010-1111-1111',17,1,5);`
let sql_insertValues2 =
    `insert into ${dbSetting.tablename}(poolName,poolAddress,
    poolPhone,poolTypeMask,poolOpentime,poolOption) 
    values ('미니미 수영장','대전 둔산동','010-2222-2222',9,1,3);`
let sql_insertValues3 =
    `insert into ${dbSetting.tablename}(poolName,poolAddress,
    poolPhone,poolTypeMask,poolOpentime,poolOption) 
    values ('건강미 센터','대구 용산동','010-3333-3333',18,0,6);`
let sql_insertValues4 =
    `insert into ${dbSetting.tablename}(poolName,poolAddress,
    poolPhone,poolTypeMask,poolOpentime,poolOption) 
    values ('앗차거 호텔','부산 부전동','010-4444-4444',6,0,1);`
let sqls2 = sql_createTable + sql_insertValues1 + sql_insertValues2 + sql_insertValues3 + sql_insertValues4;

let randomWords = "가나다라마바사아자차카타파하";
let randomSz = 50;
let poolMaskRandomPossibilities = [18, 17, 10, 9, 6, 5]
for (let i = 0; i < randomSz; ++i) {
    let poolNameRandom = "";
    for (var charCnt = 0; charCnt < 3; ++charCnt)poolNameRandom += randomWords[parseInt(Math.random() * 14)];
    let poolPhoneRandom = "010-" + poolNameRandom + "-0000";
    poolNameRandom = "'" + poolNameRandom + "'";
    poolPhoneRandom = "'" + poolPhoneRandom + "'";
    let poolMaskRandom = poolMaskRandomPossibilities[parseInt(Math.random() * 6)]
    let openTimeRandom = parseInt(Math.random() * 2)
    let optionRandom = parseInt(Math.random() * (1 << 3))

    let sql_insertValuesRandom =
        `insert into ${dbSetting.tablename}(poolName,poolAddress,
        poolPhone,poolTypeMask,poolOpentime,poolOption) 
        values (${poolNameRandom},${poolNameRandom},
        ${poolPhoneRandom},${poolMaskRandom},
        ${openTimeRandom},${optionRandom});`

    sqls2 += sql_insertValuesRandom;
}

let sql_create =
    `insert into ${dbSetting.tablename}(poolName,poolAddress,
    poolPhone,poolTypeMask,poolOpentime,poolOption) 
    select * from (select ? as poolName,? as poolAddress,
    ? as poolPhone,? as poolTypeMask,? as poolOpentime,? 
    as poolOption) as tmp where not exists(select poolName 
    from ${dbSetting.tablename} where poolName = ?) limit 1;`
let sql_detail =
    `select * from pooltable where poolId=?;`

let sql_select_totalCount =
    `select count(*) as cnt from ${dbSetting.tablename} 
    where (poolName like ? or poolAddress like ?) 
    and (poolTypeMask&?)=poolTypeMask and 
    (poolOpentime&?)=? and (poolOption&?)=?;`
let sql_select =
    `select * from ${dbSetting.tablename} 
    where (poolName like ? or poolAddress like ?) 
    and (poolTypeMask&?)=poolTypeMask and 
    (poolOpentime&?)=? and (poolOption&?)=? 
    order by poolId limit ?,?;`

let sql_delete =
    `delete from ${dbSetting.tablename} where poolId = ?;`

let sql_update =
    `update ${dbSetting.tablename} set poolName=?,
    poolAddress=?,poolPhone=?,poolTypeMask=?,poolOpentime=?,
    poolOption=? where poolId = ?;`

let sql_adminBoard =
    `select count(*) from ${dbSetting.tablename} union all
    select count(*) from ${dbSetting.tablename} where 16&poolTypeMask=16 union all
    select count(*) from ${dbSetting.tablename} where 8&poolTypeMask=8 union all
    select count(*) from ${dbSetting.tablename} where 4&poolTypeMask=4 union all
    select count(*) from ${dbSetting.tablename} where 2&poolTypeMask=2 union all
    select count(*) from ${dbSetting.tablename} where 1&poolTypeMask=1 union all
    select count(*) from ${dbSetting.tablename} where 4&poolOption=4 union all
    select count(*) from ${dbSetting.tablename} where 2&poolOption=2 union all
    select count(*) from ${dbSetting.tablename} where 1&poolOption=1;`

module.exports = {
    initialSetup: sqls1,
    newDB: sql_createDB,
    createDummy: sqls2,
    sql_create: sql_create,
    sql_detail: sql_detail,
    sql_select_totalCount: sql_select_totalCount,
    sql_select: sql_select,
    sql_adminBoard: sql_adminBoard,
    sql_delete: sql_delete,
    sql_update: sql_update,
}