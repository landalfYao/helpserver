const db = require("./../db/mysqlHelper.js");

const app = {
    async add(args) {
        let sql = 'insert into capital_trend (a_id,u_id,h_id,p_get,u_get,a_get,rate) value(?,?,?,?,?,?,?)'
        let params = [args.a_id, args.u_id, args.h_id, args.p_get, args.u_get, args.a_get, args.rate]
        let result = await db.query(sql, params)
        return result
    },
    async sumFee(args) {
        let sql = 'select sum(' + args.sumName + ') sum from capital_trend where ' + args.idName + '=?'
        let params = [args.idvalue]
        let result = await db.query(sql, params)
        return result
    },
    async findByAid(args) {
        let sql = 'select * from capital_trend where a_id=?'
        let params = [args.a_id]
        let result = await db.query(sql, params)
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
}
module.exports = app