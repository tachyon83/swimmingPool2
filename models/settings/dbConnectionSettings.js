module.exports = {
    // please enter your mysql local username and its password below
    yourLocalMySQLUsername: 'root2',
    yourLocalMySQLPassword: '1234',
    host: process.env.CLEARDB_HOST || 'localhost',
    port: 3306,
    user: process.env.CLEARDB_USER || 'poolmanager',
    password: process.env.CLEARDB_PASSWORD || '1234',
    database: process.env.CLEARDB_DATABASE || 'pooldb',
    tablename: 'pooltable',
    connectionLimit: 100,
}