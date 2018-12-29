const db = require('./../db/mysqlHelper.js')

const roles = {

    async add(args) {
        let sql = 'INSERT INTO helplist (wx_id,state,des,phone,area_id,form_id) value(?,0,?,?,?,?)'
        let params = [args.wx_id, args.des, args.phone, args.area_id, args.form_id]
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