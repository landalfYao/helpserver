const db = require('./../db/mysqlHelper.js')

const app = {

    async add(args) {
        let sql = 'INSERT INTO address_user (address,detail,wx_id) value(?,?,?)'
        let params = [args.address, args.detail, args.wx_id]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE address_user set address=?,detail=? where id = ?'
        let params = [args.address, args.detail, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE address_user set is_delete=1 where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },
    async getById(id) {
        let sql = 'select * from address_user where id =' + id
        let result = await db.query(sql, [])
        return result
    },

    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    }

}

module.exports = app