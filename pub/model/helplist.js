const db = require('./../db/mysqlHelper.js')

const roles = {

    async add(args) {
        let sql = 'INSERT INTO helplist (wx_id,title,state,des,a_id,total_fee,form_id,mu,qi,url,cai,order_num) value(?,?,?,?,?,?,?,?,?,?,?,?)'
        let params = [args.wx_id, args.title, 0, args.des, args.a_id, args.total_fee, args.form_id, args.mu, args.qi, args.url, args.cai, args.order_num]
        let result = await db.query(sql, params)
        return result
    },
    async updateState(args) {
        let sql = 'UPDATE helplist set state=? where id = ?'
        let params = [args.state, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE y_roles set is_delete=1 where pk_id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },

    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

}

module.exports = roles