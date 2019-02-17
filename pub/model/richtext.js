const db = require('./../db/mysqlHelper.js')

const app = {

    async add(args) {
        let sql = 'INSERT INTO sw_richtext (author,content,remarks,admin_id,title,cover,phone,contact) value(?,?,?,?,?,?,?,?)'
        let params = [args.author,args.content,args.remarks,args.admin_id,args.title,args.cover,args.phone,args.contact]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE sw_richtext set author=?,content=?,remarks=?,title=?,cover=?,phone=?,contact=? where id = ? and admin_id=?'
        let params = [args.author,args.content,args.remarks,args.title,args.cover,args.phone,args.contact,args.id,args.admin_id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids,uid) {
        let sql = 'UPDATE sw_richtext set is_delete=1 where id in (' + ids + ') and admin_id=?'
        let result = await db.query(sql, [uid])
        return result
    },


    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

    async getWzById(args) {
        let sql = 'select * from sw_richtext where id=?'
        let result = await db.query(sql, [args.id])
        return result
    }

}

module.exports = app