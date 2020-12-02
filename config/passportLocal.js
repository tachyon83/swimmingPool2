const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const memberDAO = require('../models/MemberDAO')
console.log('memberDAO', memberDAO)

module.exports = () => {
    passport.serializeUser((member, done) => {
        done(null, member.id);
    })
    passport.deserializeUser((id, done) => {
        memberDAO.findById(id, (err, member) => {
            done(err, member);
        })
    })
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    }, (req, id, pw, done) => {
        console.log('inside passport local')
        console.log('memberDAO', memberDAO)
        memberDAO.match(id, pw, (err, res) => {
            console.log('memberDAO.match fn called in passportLocal.js')
            if (err) return done(err, null)
            // if(!res)return done(null,res,{message:'wrong id or wrong pw'})
            return done(null, res)
        })
    }))
}