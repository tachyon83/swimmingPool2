module.exports = {
    sessionSettings: {
        secret: 'secret secretary',
        // resave: true,
        resave: false,
        saveUninitialized: false,
        proxy: (process.env.NODE_ENV === 'production') ? true : false,
        cookie: (process.env.NODE_ENV === 'production') ? {
            httpOnly: true,
            // path: corsSettings.origin,
            // sameSite: 'lax',
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 10,
        } : null,
    },
    corsSettings: {
        // origin_https: 'https://otters-pool.herokuapp.com',
        // origin_http: 'http://otters-pool.herokuapp.com',
        origin: true,
        credentials: true,
        preflightContinue: true,
    },
}