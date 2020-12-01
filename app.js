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

app.use('/pool', require('./routes/pool'))
app.use('/login', require('./routes/login'))
app.use('/admin', require('./routes/admin'))

// // 404 처리 미들웨어
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// // 에러 핸들러
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
