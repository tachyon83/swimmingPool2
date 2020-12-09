module.exports = {
    sessionSettings: {
        secret: 'secret secretary',
        // resave: true,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            httpOnly: true,
            // path: corsSettings.origin,
            // sameSite: 'lax',
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 10,
        }
    },
    corsSettings: {
        // origin_https: 'https://otters-pool.herokuapp.com',
        // origin_http: 'http://otters-pool.herokuapp.com',
        origin: true,
        // origin: 'https://otters-pool.herokuapp.com',
        credentials: true,
        preflightContinue: true,
    },
}