const db = require('./../db/mysqlHelper.js')

const authorityCategory = {
    async add(args) {
        let sql = 'INSERT INTO auth_cate (cate_name,remarks,sort,is_show) value(?,?,?,?)'
        let params = [args.cate_name, args.remarks, args.sort, args.is_show]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE auth_cate set cate_name=?,remarks=?,sort=?,is_show=? where id = ?'
        let params = [args.cate_name, args.remarks, args.sort, args.is_show, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateSort(args) {
        let sql = 'UPDATE auth_cate set sort=? where id = ?'
        let params = [args.sort, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateShow(args) {
        let sql = 'UPDATE auth_cate set is_show=? where id in (' + args.ids + ')'
        let params = [args.is_show]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE auth_cate set is_delete=1 where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },
    async findCate() {
        let sql = 'SELECT * FROM auth_cate WHERE is_delete=0'
        let result = await db.query(sql, [])
        return result
    },
    async findAuth() {
        let sql = 'SELECT * FROM y_authority WHERE is_delete=0'
        let result = await db.query(sql, [])
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
}

module.exports = authorityCategory