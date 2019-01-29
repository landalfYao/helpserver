const db = require('./../db/mysqlHelper.js')

const app = {

    async add(args) {
        let arr = args.auth_ids.split(',')
        for (let i in arr) {
            arr[i] = '(' + arr[i] + ',' + args.role_id + ')'
        }
        let sql = 'INSERT INTO role_auth (auth_id,role_id) values' + arr.toString()
        let params = []
        let result = await db.query(sql, params)
        return result
    },

    async updateDel(ids) {
        let sql = 'delete from role_auth where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },


    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    }

}

module.exports = app