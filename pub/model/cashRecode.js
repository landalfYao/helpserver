const db = require("./../db/mysqlHelper.js");

const app = {
    async add(args) {
        //state = 1提现成功，state=0提现审核中，state=2 提现失败
        let sql = 'insert into cash_recode (uid,type,cash_fee,state,msg,trade_no) value(?,?,?,?,?,?)'
        let params = [args.uid, args.type, args.cash_fee, args.state, args.msg, args.trade_no]
        let result = await db.query(sql, params)
        return result
    },
    async cashsum(args) {
        let sql = 'select sum(cash_fee) sum from cash_recode where uid = ? and type =? and state=1'
        let params = [args.uid, args.type]
        let result = await db.query(sql, params)
        return result
    },

    async updateState(args) {
        let sql = 'update wallets set state = ? where uid = ?'
        let params = [args.state, args.uid]
        let result = await db.query(sql, params)
        return result
    },
    async findByUid(args) {
        let sql = 'select * from cash_recode where uid=? and type=?'
        let params = [args.uid, args.type]
        let result = await db.query(sql, params)
        return result
    },

    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    }
}
module.exports = app