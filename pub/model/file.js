const db = require('./../db/mysqlHelper.js')

const app = {
    async getList(args) {
        let result = await db.commonSelect(args);
        return result;
    },
    async add(args) {
        let sql = 'INSERT INTO files (filename,size,realname,type,wx_id,a_id) value(?,?,?,?,?,?)'
        let params = [args.filename, args.size, args.realname,args.type,args.wx_id,args.a_id]
        let result = await db.query(sql, params)
        return result
    },
    async findById(args) {
        let sql = 'select * from files where id=?'
        let params = [args.id]
        let result = await db.query(sql, params)
        return result
    },
    async del(ids) {
        let sql = 'UPDATE file set is_delete=1 where id in (' + ids + ')'
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

module.exports = app