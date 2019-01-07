const db = require('./../db/mysqlHelper.js')

const roles = {

    async add(args) {
        let sql = 'INSERT INTO dl_server (dl_id,server_name,dl_sy,user_sy,p_sy,is_show,price_gui) value(?,?,?,?,?,?,?)'
        let params = [args.dl_id, args.server_name, args.dl_sy, args.user_sy, args.p_sy, args.is_show, args.price_gui]
        let result = await db.query(sql, params)
        return result
    },
    async updateState(args) {
        let sql = 'UPDATE dl_server set is_show=? where id = ?'
        let params = [args.state, args.id]
        let result = await db.query(sql, params)
        return result
    },

    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
    async getListByUid(uid) {
        let sql = 'SELECT * FROM dl_server where dl_id =' + uid
        let result = await db.query(sql, [])
        return result
    }

}

module.exports = roles