const mysql = require('mysql');
const dbSetting = require('./settings/dbConnectionSettings')
const sqls = require('./settings/sqlDispenser')

function db_initSetting() {
    return new Promise((resolve, reject) => {
        const conn_init1 = mysql.createConnection({
            host: dbSetting.host,
            port: dbSetting.port,
            user: dbSetting.yourLocalMySQLUsername,
            password: dbSetting.yourLocalMySQLPassword,
            multipleStatements: true,
        })
        conn_init1.connect();
        conn_init1.query(sqls.initialSetup, (err) => {
            conn_init1.destroy();
            if (err) throw err;
            const conn_init2 = mysql.createConnection({
                host: dbSetting.host,
                port: dbSetting.port,
                user: dbSetting.user,
                password: dbSetting.password,
                multipleStatements: true,
            })
            conn_init2.connect()
            conn_init2.query(sqls.newDB, (err) => {
                conn_init2.destroy();
                if (err) throw err;
                const conn_init3 = mysql.createConnection({
                    host: dbSetting.host,
                    port: dbSetting.port,
                    user: dbSetting.user,
                    password: dbSetting.password,
                    database: dbSetting.database,
                    multipleStatements: true,
                })
                conn_init3.connect()
                conn_init3.query(sqls.createDummy, (err) => {
                    conn_init3.destroy()
                    if (err) throw err
                    resolve();
                })
            })
        })
    })
}

async function dbpoolCreater() {
    await db_initSetting();
    return await mysql.createPool({
        host: dbSetting.host,
        port: dbSetting.port,
        user: dbSetting.user,
        password: dbSetting.password,
        database: dbSetting.database,
        multipleStatements: true,
        connectionLimit: dbSetting.connectionLimit,
    })
}
module.exports = async () => {
    return await dbpoolCreater();
}