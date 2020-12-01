function Member(id, pw) {
    this.id = id;
    this.pw = pw;
}
Member.prototype.toJSON = () => {
    return {
        id: this.id,
        pw: this.pw
    }
}
const member1 = new Member('supermanager@pool.com', 'abcd1234')

module.exports = class MemberTempDAO {
    constructor() {
        // this.members.member1.id=member1.toJSON()
    }
    findById = (id, cb) => {
        if (members[id] != null) cb(null, members[id]);
        else cb("this ID does not exist", false);
    }
    // matchPw = (id, pw, cb) => {
    //     if (members[id].pw == pw) cb(null, members[id])
    //     else cb("this PW is incorrect", false);
    // }
}