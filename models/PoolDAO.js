const dbCreate = require('./dbPoolCreator')

class PoolDao {
    constructor() {
        dbCreate().then(pool => {
            this.dbpool = pool
            console.log('poolDao class instance and its dbPool created...')
        })
        // this.usedIds=[]
    }

    create = (q, fn) => {
        let info = [
            // this.usedIds.length ? this.usedIds.shift() : 'null',
            q.poolName,
            q.poolAddress,
            q.poolPhone,
            q.poolTypeMask,
            q.poolOpentime,
            q.poolOption,
            q.poolName,
        ]
        let sql_create = 'insert into pooltable(poolName,poolAddress,poolPhone,poolTypeMask,poolOpentime,poolOption) select * from (select ? as poolName,? as poolAddress,? as poolPhone,? as poolTypeMask,? as poolOpentime,? as poolOption) as tmp where not exists(select poolName from pooltable where poolName = ?) limit 1;'
        let sqlHandler = () => {
            return new Promise((resolve, reject) => {
                this.dbpool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        console.log('ERR: getConnection in sqlHandler');
                        fn(err, null);
                        return;
                    }
                    conn.query(sql_create, info, (err, rows, fields) => {
                        conn.release();
                        if (err) {
                            reject(err);
                            fn(err, null);
                            return;
                        }
                        resolve({ response: true });
                    })
                })
            })
        }
        async function resultSender() {
            fn(null, await sqlHandler())
        }
        resultSender();
    }

    update = (q, fn) => {
        let info = [
            q.poolName,
            q.poolAddress,
            q.poolPhone,
            q.poolTypeMask,
            q.poolOpentime,
            q.poolOption,
            q.poolId,
        ]
        let sql_update = 'update pooltable set poolName=?,poolAddress=?,poolPhone=?,poolTypeMask=?,poolOpentime=?,poolOption=? where poolId = ?;'
        let sqlHandler = () => {
            return new Promise((resolve, reject) => {
                this.dbpool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        console.log('ERR: getConnection in sqlHandler');
                        fn(err, null);
                        return;
                    }
                    conn.query(sql_update, info, (err, rows, fields) => {
                        conn.release();
                        if (err) {
                            reject(err);
                            fn(err, null);
                            return;
                        }
                        resolve({ response: true });
                    })
                })
            })
        }
        async function resultSender() {
            fn(null, await sqlHandler())
        }
        resultSender();
    }

    delete = (id, fn) => {
        let sql_delete = 'delete from pooltable where poolId = ?;'
        let sqlHandler = () => {
            return new Promise((resolve, reject) => {
                this.dbpool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        console.log('ERR: getConnection in sqlHandler');
                        fn(err, null);
                        return;
                    }
                    conn.query(sql_delete, id, (err, rows, fields) => {
                        conn.release();
                        if (err) {
                            reject(err);
                            fn(err, null);
                            return;
                        }
                        resolve({ response: true });
                    })
                })
            })
        }
        async function resultSender() {
            fn(null, await sqlHandler())
        }
        resultSender();
    }

    showAdminBoard = fn => {
        let sql_adminBoard = 'select count(*) from pooltable'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 16&poolTypeMask=16'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 8&poolTypeMask=8'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 4&poolTypeMask=4'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 2&poolTypeMask=2'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 1&poolTypeMask=1'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 4&poolOption=4'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 2&poolOption=2'
        sql_adminBoard += ' union '
        sql_adminBoard += 'select count(*) from pooltable where 1&poolOption=1'
        sql_adminBoard += ';'

        let boardItemNames = [
            'poolCount',
            'publicCount',
            'privateCount',
            'hotelCount',
            'indoorCount',
            'outdoorCount',
            'childCount',
            'womanCount',
            'disabledCount',
        ]

        let sqlHandler = () => {
            return new Promise((resolve, reject) => {
                this.dbpool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        console.log('ERR: getConnection in sqlHandler');
                        fn(err, null);
                        return;
                    }
                    conn.query(sql_adminBoard, (err, rows, fields) => {
                        conn.release();
                        if (err) {
                            reject(err);
                            fn(err, null);
                            return;
                        }
                        let ret = {}
                        for (let i in rows) ret[boardItemNames[i]] = Object.values(rows[i])[0]
                        resolve(ret);
                    })
                })
            })
        }
        async function resultSender() {
            fn(null, await sqlHandler())
        }
        resultSender();
    }

    // arrow function is needed to have an access to this.dbpool
    findDetailById = (id, fn) => {
        let sqlHandler = () => {
            return new Promise((resolve, reject) => {
                this.dbpool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        console.log('ERR: getConnection in sqlHandler');
                        fn(err, null);
                        return;
                    }
                    let sql_detail = 'select * from pooltable where poolId=?;'
                    conn.query(sql_detail, id, (err, rows, fields) => {
                        conn.release();
                        if (err) {
                            reject(err);
                            fn(err, null);
                            return;
                        }
                        resolve(rows[0])
                    })
                })
            })
        }
        async function resultSender() {
            fn(null, await sqlHandler())
        }
        resultSender();
    }

    // itemsPerPage등을 세팅 파일로 몰아주기
    // sqlHandler-resultSender를 then으로 바꿔주기
    // 함수에 넣어주는 쿼리문과 [?,?]만 달리하여 같은 함수 호출하게 설계하기
    // req.query에서 [?,?]만들어주는 함수 분리하기

    findList = (q, fn) => {
        let checked = '1';
        let itemsPerPage = 4;
        let pageNumber = q.pageNumber;
        let searchWord = '%' + q.searchWord + '%';

        // poolTypeMask와 row의 AND연산 후에 row면 true
        let poolTypeArray = [
            q.poolOutdoor,
            q.poolIndoor,
            q.poolHotel,
            q.poolPrivate,
            q.poolPublic,
        ];

        let poolTypeMask = 0;
        for (let i in poolTypeArray) if (poolTypeArray[i] == checked) poolTypeMask |= (1 << i);

        // opentime은 AND연산 후에 search opentime과 같으면 true
        let poolOpentime = q.poolOpentime;

        // child,woman,disabled는 AND연산으로 확인
        let poolOptionArray = [
            q.poolForDisabled,
            q.poolForWoman,
            q.poolForChild,
        ]
        let poolOption = 0
        for (let i in poolOptionArray) if (poolOptionArray[i] == checked) poolOption |= (1 << i);
        // let poolOption = q.poolForChild + q.poolForWoman + q.poolForDisabled;

        var sql_select_totalCount = "select count(*) as cnt from pooltable where (poolName like ? or poolAddress like ?) and (poolTypeMask&?)=poolTypeMask and (poolOpentime&?)=? and (poolOption&?)=?;"
        var sql_select = "select * from pooltable where (poolName like ? or poolAddress like ?) and (poolTypeMask&?)=poolTypeMask and (poolOpentime&?)=? and (poolOption&?)=? order by poolId limit ?,?;"
        let sqlHandler = () => {
            return new Promise((resolve, reject) => {
                this.dbpool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        console.log('ERR: getConnection in sqlHandler');
                        fn(err, null);
                        return;
                    }
                    conn.query(sql_select_totalCount, [searchWord, searchWord, poolTypeMask, poolOpentime, poolOpentime, poolOption, poolOption], (error, rows, fields) => {
                        if (err) {
                            if (conn) conn.release();
                            reject(err);
                            fn(err, null);
                            return;
                        }
                        let ret = [];
                        ret.push(rows[0].cnt);
                        // conn.query(sql_select, [searchWord, searchWord, poolTypeMask, poolOpentime, poolOpentime, poolOption, (pageNumber - 1) * itemsPerPage, (pageNumber - 1) * itemsPerPage + itemsPerPage], (error, rows, fields) => {
                        conn.query(sql_select, [searchWord, searchWord, poolTypeMask, poolOpentime, poolOpentime, poolOption, poolOption, (pageNumber - 1) * itemsPerPage, itemsPerPage], (error, rows, fields) => {
                            conn.release();
                            if (err) {
                                reject(err);
                                fn(err, null);
                                return;
                            }
                            let pools = []
                            for (let row of rows) {
                                pools.push(row)
                            }
                            ret.push(pools);
                            resolve(ret);
                        })
                    })
                })
            })
        }
        async function resultSender() {
            let ret = await sqlHandler();
            let result = {
                'totalCount': ret[0],
                'pools': ret[1],
            }
            fn(null, result)
        }
        resultSender();
    }
}

module.exports = new PoolDao()