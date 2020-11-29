const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passportLocal')
// const bodyParser = require('body-parser')
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
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())

const poolRouter = require('./routes/pool')
const loginRouter = require('./routes/login')

app.use('/pool', poolRouter)
app.use('/login', loginRouter)

// app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
