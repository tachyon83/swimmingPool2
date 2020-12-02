const bcrypt = require('bcrypt');
const saltRounds = 10
const username = 'supermanager@pool.com'
const password = 'abcd1234'

function Member(id, pw) {
    this.id = id;
    this.pw = pw;
    console.log('a super manager is created (memberdao)')
}
Member.prototype.toJson = () => {
    return {
        id: this.id,
        pw: this.pw,
    }
}
Member.prototype.match = (id, pw, fn) => {
    console.log('member dao match function called')
    if (id === this.id) {
        bcrypt.compare(pw, this.pw, (err, res) => {
            console.log('inside bcrypt compare')
            if (err) return fn(err, null)
            if (res) return fn(null, this.toJson())
        })
    }
    return fn(null, false)
}
Member.prototype.findById = (id, fn) => {
    if (id === this.id) return fn(null, this.toJson())
}
bcrypt.genSalt(saltRounds).then(salt => {
    return bcrypt.hash(password, salt)
}).then(hash => {
    // console.log('supermanger is created. his password: ', hash)
    module.exports = new Member(username, hash)
}).catch(err => console.error(err.message))
