const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passportLocal')
const cors = require('cors');
const flash = require('connect-flash')
// const router = express.Router();
const app = express();

app.use(express.json())
app.use(session({
    secret: 'secret secretary',
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
// deserialization occurs prior to server call time
app.use(passport.session());
passportConfig();
app.set('port', 3000 || process.env.PORT);
app.use(cors());
app.use(flash())

app.use((req, res, next) => {
    console.log('Server Call Time: ', Date.now())
    console.log('session check in the first middleware1', req.session.passport)
    console.log('session check in the first middleware1', req.user)
    next()
})

const sessionCheckMiddleware = (req, res, next) => {
    console.log(req.session.passport)
    // passport serialize records the authenticated user in req.user
    console.log(req.user)
    console.log(req.member)
    if (req.session.passport && req.session.passport.user === 'supermanager@pool.com') next()
    // else res.end('not authenticated!')
    else res.json({ response: false })
    // 이게 인증이 안되서 못가는건지...아니면 DB처리하다가 뭔가 잘못되서 오류난건지
}

const c = (req, res, next) => {
    console.log('checkpoint');
    next()
}
app.use('/pool', require('./routes/pool'))
app.use('/login', c, require('./routes/login'))
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

// // 404 처리 미들웨어
// app.use(function (req, res, next) {
//     console.log('omg ... 404')
//     next()
//     // next(createError(404));
//     console.log('inside 404')
// });

// // 에러 핸들러
// app.use(function (err, req, res, next) {
//     console.log('inside error handler')
//     // set locals, only providing error in development
//     // res.locals.message = err.message;
//     // res.locals.error = req.app.get('env') === 'development' ? err : {};

//     res.status(err.status || 500);
//     // res.render('error');
// });

// app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
