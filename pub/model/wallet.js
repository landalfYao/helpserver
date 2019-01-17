const db = require("./../db/mysqlHelper.js");

const app = {
    async add(args) {
        let sql = 'insert into wallets (uid,type) value(?,?)'
        let params = [args.uid,args.type]
        let result = await db.query(sql, params)
        return result
    },
    async updateIncome(args){
        let sql = 'update wallets set income_total = income_total+? where uid = ?'
        let params = [args.add,args.uid]
        let result = await db.query(sql, params)
        return result
    },
    async updateCash(args){
        let sql = 'update wallets set cash = cash+? where uid = ?'
        let params = [args.add,args.uid]
        let result = await db.query(sql, params)
        return result
    }
}
module.exports = app