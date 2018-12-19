const db = require('./../db/mysqlHelper.js')

const roles = {
    async add ( args ){
        let sql = 'INSERT INTO y_roles (name,remarks,sort) value(?,?,?)'
        let params = [args.name, args.remarks, args.sort]
        let result = await db.query(sql, params)
        return result
    },
    async update ( args ){
        let sql = 'UPDATE y_roles set name=?,remarks=?,sort=? where pk_id = ?'
        let params = [args.name, args.remarks, args.sort,args.pkId]
        let result = await db.query(sql,params)
        return result
    },
    async updateDel ( ids ){
        let sql = 'UPDATE y_roles set is_delete=1 where pk_id in ('+ids+')'
        let result = await db.query(sql,[])
        return result
    },
    async updateChecked( ids,checked ){
        let sql = 'UPDATE y_roles set checked='+checked+' where pk_id in ('+ids+')'
        let result = await db.query(sql,[])
        return result
    },
    async updateDisable( ids,disable ){
        let sql = 'UPDATE y_roles set disable='+disable+' where pk_id in ('+ids+')'
        let result = await db.query(sql,[])
        return result
    },
    async getList( args ){
        let result = await db.commonSelect( args )
        return result
    },
    async grantAuth( args ){
        let sql = 'Insert into y_role_auth_grant (role_id,auth_id) value '
        let arr = args.authIds.split(',')
        let inserts = []
        for( let i in arr ){
            inserts.push('('+args.roleId+','+arr[i]+')')
        }
        let result = await db.query(sql+inserts.toString(),[])
        return result
    },
    async cancelGrant( ids ){
        let sql = 'delete from y_role_auth_grant where pk_id in ('+ids+')'
        let result = await db.query(sql,[])
        return result
    }
}

module.exports = roles