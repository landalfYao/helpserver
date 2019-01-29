const db = require('./../db/mysqlHelper.js')

const roles = {
    async add(args) {
        let sql = 'INSERT INTO roles (role_name,remarks,state,sort) value(?,?,?,?)'
        let params = [args.role_name, args.remarks, args.state, args.sort]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE roles set role_name=?,remarks=?,state=?,sort=? where id = ?'
        let params = [args.role_name, args.remarks, args.state, args.sort, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateDel(ids) {
        let sql = 'UPDATE roles set is_delete=1 where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },

    async updateDisable(ids, state) {
        let sql = 'UPDATE roles set state=' + state + ' where id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
    async grantAuth(args) {
        let sql = 'Insert into y_role_auth_grant (role_id,auth_id) value '
        let arr = args.authIds.split(',')
        let inserts = []
        for (let i in arr) {
            inserts.push('(' + args.roleId + ',' + arr[i] + ')')
        }
        let result = await db.query(sql + inserts.toString(), [])
        return result
    },
    async cancelGrant(ids) {
        let sql = 'delete from y_role_auth_grant where pk_id in (' + ids + ')'
        let result = await db.query(sql, [])
        return result
    }
}

module.exports = roles