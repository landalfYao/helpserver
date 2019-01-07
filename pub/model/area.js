const db = require('./../db/mysqlHelper.js')

const roles = {

    async add(args) {
        let sql = 'INSERT INTO area (atype,name,sort) value(?,?,?)'
        let params = [args.atype, args.name, args.sort]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE area set atype=?,name=? ,sort=? where pk_id = ?'
        let params = [args.atype, args.name, args.sort, args.pkId]
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
    async wxget() {
        let sql = 'select name,pk_id from area where atype = 2 order by sort asc'
        let result = await db.query(sql, [])
        return result
    }

}

module.exports = roles