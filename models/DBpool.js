const mysql = require('mysql');
const dbSetting = require('./DBconnectionSettings')
const sqls = require('./SqlDispenser')

var sqls1 = sqls.initialSetup
var sql_createDB = sqls.newDB
var sqls2 = sqls.createDummy

let randomWords = "가나다라마바사아자차카타파하";

var randomSz = 8000;
for (var i = 5; i < randomSz; ++i) {
    var poolNameRandom = "";
    for (var charCnt = 0; charCnt < 3; ++charCnt)poolNameRandom += randomWords[parseInt(Math.random() * 14)];
    var poolPhoneRandom = "010-" + poolNameRandom + "-0000";
    poolNameRandom = "'" + poolNameRandom + "'";
    poolPhoneRandom = "'" + poolPhoneRandom + "'";
    var poolMaskRandom = parseInt(Math.random() * 31) + 1
    var openTimeRandom = parseInt(Math.random() * 2)
    var optionRandom = parseInt(Math.random() * (1 << 3))
    var sql_insertValuesRandom = "insert into pooltable(poolId,poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select " + i + " as poolId," + poolNameRandom + " as poolName," + poolNameRandom + " as poolAddress," + poolPhoneRandom + " as poolPhone," + poolMaskRandom + " as poolTypeMask," + openTimeRandom + " as poolOpentime," + optionRandom + " as poolOption) as tmp where not exists(select poolId from pooltable where poolId = " + i + ") limit 1;";
    // console.log(sql_insertValuesRandom)
    sqls2 += sql_insertValuesRandom;
}

function db_initSetting() {
    return new Promise((resolve, reject) => {
        const conn_init1 = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: dbSetting.yourLocalMySQLUsername,
            password: dbSetting.yourLocalMySQLPassword,
            multipleStatements: true,
        })
        conn_init1.connect();
        conn_init1.query(sqls1, (err) => {
            conn_init1.destroy();
            if (err) {
                throw err;
                return;
            }
            const conn_init2 = mysql.createConnection({
                host: 'localhost',
                port: 3306,
                user: 'poolmanager',
                password: '1234',
                multipleStatements: true,
            })
            conn_init2.connect()
            conn_init2.query(sql_createDB, (err) => {
                conn_init2.destroy();
                if (err) {
                    throw err;
                    return;
                }
                const conn_init3 = mysql.createConnection({
                    host: 'localhost',
                    port: 3306,
                    user: 'poolmanager',
                    password: '1234',
                    database: 'pooldb',
                    multipleStatements: true,
                })
                conn_init3.connect()
                conn_init3.query(sqls2, (err) => {
                    conn_init3.destroy()
                    if (err) {
                        reject(err)
                    }
                    resolve();
                })
            })
        })
    })
}

async function dbpoolCreater() {
    await db_initSetting();
    return await mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'poolmanager',
        password: '1234',
        database: 'pooldb',
        multipleStatements: true,
        connectionLimit: 100,
    })
}
module.exports = async () => {
    return await dbpoolCreater();
}