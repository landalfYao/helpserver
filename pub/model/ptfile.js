const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO sw_file (file_url,file_name,file_size,admin_id,group_id,mimetype) value(?,?,?,?,?,?)'
        let params = [args.file_url, args.file_name, args.file_size, args.admin_id, args.group_id,args.mimetype]
        let result = await db.query(sql, params)
        return result
    },
    async del(args){
        let sql = 'update sw_file set is_delete=1 where id in ('+args.ids+')'
        let params = []
        let result = await db.query(sql, params)
        return result
    },
    async update(args){
        let sql = 'update sw_file set group_id=? where id in ('+args.ids+')'
        let params = [args.group_id]
        let result = await db.query(sql, params)
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

    async addGroup(args){
        let sql = 'INSERT INTO sw_file_group (group_name,admin_id) value(?,?)'
        let params = [args.group_name, args.admin_id]
        let result = await db.query(sql, params)
        return result
    },

    async updateGroup(args){
        let sql = 'update sw_file_group set group_name=? where id=?'
        let params = [args.group_name, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async delGroup(args){
        let sql = 'update sw_file_group set is_delete=1 where id in ('+args.ids+')'
        let params = []
        let result = await db.query(sql, params)
        return result
    },

}

module.exports = app