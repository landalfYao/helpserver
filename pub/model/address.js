const db = require('./../db/mysqlHelper.js')

const app = {

    async add(args) {
        let sql = 'INSERT INTO address_info (cate_id,name,sort,sub_name) value(?,?,?,?)'
        let params = [args.cate_id, args.name, args.sort,args.sub_name]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE address_info set cate_id=?,name=? ,sort=?,sub_name=? where id = ?'
        let params = [args.cate_id, args.name, args.sort,args.sub_name, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE address_info set is_delete=1 where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },


    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    }

}

module.exports = app