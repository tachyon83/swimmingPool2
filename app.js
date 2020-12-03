const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passportLocal')
const cors = require('cors');
// const router = express.Router();
const app = express();

app.use(express.json())
app.use(session({
    secret: 'secret secretary',
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
app.set('port', 3000 || process.env.PORT);
app.use(cors());

app.use((req, res, next) => {
    console.log('Server Call Time: ', Date.now())
    next()
})

const sessionCheckMiddleware = (req, res, next) => {
    if (req.session.passport) next()
    else res.end('not authenticated!')
}

app.use('/pool', require('./routes/pool'))
app.use('/login', require('./routes/login'))
app.use('/admin', sessionCheckMiddleware, require('./routes/admin'))
app.use('/logout', (req, res) => {
    // req.logout();
    // req.session.save(function () {
    //     res.redirect('/');
    // })
    req.session.destroy(err => {
        if (err) res.status(500);
        // res.status(200);
        res.json({ response: true })
    })
})

// 404 처리 미들웨어
app.use(function (req, res, next) {
    console.log('404')
    next(createError(404));
});

// 에러 핸들러
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    // res.render('error');
});

// app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
