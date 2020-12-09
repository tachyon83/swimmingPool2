const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const memberDAO = require('../models/MemberDAO')

module.exports = () => {
    passport.serializeUser((member, done) => {
        console.log('serializing...')
        if (member) done(null, member.id);
    })
    passport.deserializeUser((id, done) => {
        console.log('deserializing...')
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
        memberDAO.match(id, pw, (err, res) => {
            if (err) {
                console.log('there should be no error but got an error')
                return done(err)
            }
            else if (!res) return done(null, false, { message: "wrong id or wrong pw" })
            else return done(null, res)
        })
    }))
}