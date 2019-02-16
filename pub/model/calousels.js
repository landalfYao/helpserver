const db = require('./../db/mysqlHelper.js')

const app = {

    async add(args) {
        let sql = 'INSERT INTO calousels (cover,admin_id,is_show,sort,path,company,end_time,a_id,remark) value(?,?,?,?,?,?,?,?,?)'
        let params = [args.cover, args.admin_id, args.is_show,args.sort,args.path,args.company,args.end_time,args.a_id,args.remark]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE calousels set cover=?,is_show=?,sort=?,path=?,company=?,end_time=?,a_id=?,remark=? where id = ?'
        let params = [args.cover, args.is_show,args.sort,args.path,args.company,args.end_time, args.a_id,args.remark,args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE calousels set is_delete=1 where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },

    async updateShow(ids,is_show) {
        let sql = 'UPDATE calousels set is_show=? where id in (' + ids + ')'
        let result = await db.query(sql, [is_show])
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    }

}

module.exports = app