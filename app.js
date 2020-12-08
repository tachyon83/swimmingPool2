const http = require('http');
const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser')
const passport = require('passport');
const passportConfig = require('./config/passportLocal')
const cors = require('cors');
const corsSettings = require('./config/corsConfigurations')
const flash = require('connect-flash')
// const router = express.Router();
const app = express();

app.use(express.json())
app.use(session({
    secret: 'secret secretary',
    resave: true,
    saveUninitialized: false,
    cookie: {
        // httpOnly: false,
        path: corsSettings.origin,
        sameSite: 'lax',
    }
}))
// app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
// deserialization occurs prior to [server call time] ??
passportConfig();
app.set('port', process.env.PORT || 3000);

app.use(cors({
    // this origin means the origin of the request, the client side
    // origin: 'http://localhost:3001',
    // origin: true,
    origin: corsSettings.origin,
    credentials: true,
    preflightContinue: true,
}));
app.use(flash())

app.use((req, res, next) => {
    console.log('current sessionID', req.session.id)
    console.log('passport check: ', req.session.passport)
    console.log('Server Call Time: ', Date.now())
    next()
})

const isAuthenticated = (req, res, next) => {
    if (req.user || (req.session.passport && req.session.passport.user === 'supermanager@pool.com')) next()
    else {
        console.log('this session is not Authenticated')
        res.json({ response: false })
    }
}

app.use('/isAuthenticated', require('./routes/isAuthenticated'))
app.use('/pool', require('./routes/pool'))
app.use('/login', require('./routes/login'))
app.use('/admin', isAuthenticated, require('./routes/admin'))
app.use('/logout', (req, res) => {
    // req.logout();
    // req.session.save(function () {
    //     res.redirect('/');
    // })
    req.session.destroy(err => {
        if (err) res.status(500);
        res.json({ response: true })
    })
})

// // 404
// app.use(function (req, res, next) {
//     // next(createError(404));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    console.log('reached the end...404 or 500')
    // res.render('error');
});

// app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
