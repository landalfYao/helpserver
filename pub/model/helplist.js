const db = require('./../db/mysqlHelper.js')

const roles = {

    async add(args) {
        let sql = 'INSERT INTO helplist (wx_id,title,state,des,a_id,total_fee,form_id,mu,qi,yjm,cai,order_num,openid,page) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        let params = [args.wx_id, args.title, 0, args.des, args.a_id, args.total_fee, args.form_id, args.mu, args.qi, args.yjm, args.cai, args.order_num,args.openid,args.page]
        let result = await db.query(sql, params)
        return result
    },
    async updateState(args) {
        let sql = 'UPDATE helplist set state=?,is_pay=? where id = ?'
        let params = [args.state, args.is_pay, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async jd(args) {
        let sql = 'update helplist set state = 2,jd_id=? where id = ?'
        let params = [args.jd_id, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async confirm(id) {
        let sql = 'update helplist set state = 3 where id = ?'
        let params = [id]
        let result = await db.query(sql, params)
        return result
    },
    async updateOrderNum(oid, id) {
        let sql = 'UPDATE helplist set order_num=? where id = ?'
        let params = [oid, id]
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