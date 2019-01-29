const db = require('./../db/mysqlHelper.js')

const authority = {
    async add(args) {
        let sql = 'INSERT INTO auths (auth_name,auth_url,cate_id,remarks) value(?,?,?,?)'
        let params = [args.auth_name, args.auth_url, args.cate_id, args.remarks]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE auths set auth_name=?,auth_url=?,cate_id=?,remarks=? where id = ?'
        let params = [args.auth_name, args.auth_url, args.cate_id, args.remarks, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(args) {
        let sql = 'UPDATE auths set is_delete=1 where id in (' + args.ids + ')'
        let result = await db.query(sql, [])
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
}

module.exports = authority