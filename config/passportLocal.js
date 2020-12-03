const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const memberDAO = require('../models/MemberDAO')
// console.log('memberDAO', memberDAO)

module.exports = () => {
    passport.serializeUser((member, done) => {
        console.log('inside serialize', member)
        done(null, member.id);
    })
    passport.deserializeUser((id, done) => {
        console.log('checking if this session is authenticated..?')
        memberDAO.findById(id, (err, member) => {
            if (err) return done(err, null)
            if (!member) {
                console.log('not authenticated')
                return done(null, null)
            }
            console.log('authenticated in deserialize')
            return done(null, member);
        })
    })
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    }, (req, id, pw, done) => {
        console.log('inside passport local')
        memberDAO.match(id, pw, (err, res) => {
            console.log('memberDAO.match fn called in passportLocal.js')
            console.log('res in passportlocal, this should be member himself if authenticated', res)
            if (err) {
                console.log('there should be no error')
                return done(err, null)
            }
            if (!res) return done(null, res, { message: 'wrong id or wrong pw' })
            return done(null, res)
        })
    }))
}