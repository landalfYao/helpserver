const db = require('./../db/mysqlHelper.js')

const app = {

    async add(args) {
        let sql = 'INSERT INTO address_cate (a_id,name,sort,is_show) value(?,?,?,?)'
        let params = [args.a_id, args.name, args.sort,args.is_show]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE address_cate set name=? ,sort=?,is_show=? where id = ?'
        let params = [ args.name, args.sort,args.is_show, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE address_cate set is_delete=1 where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },


    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    }

}

module.exports = app