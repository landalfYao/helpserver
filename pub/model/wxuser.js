const db = require('./../db/mysqlHelper.js')

const roles = {
    add ( args,cb ){
        let sql = 'INSERT INTO wxuser (openid) value(?)'
        let params = [args.openid]
        db.query2(sql, params,function(res){
            cb(res)
        })
       
    },
    async update ( args ){
        let sql = 'UPDATE wxuser set nick_name=?,avatar_url=?,gender=? ,province=?,city=?,phone=? where openid = ?'
        let params = [args.atype, args.name, args.agent_get,args.p_get, args.sort,args.openid]
        let result = await db.query(sql,params)
        return result
    },
    async updateDel ( ids ){
        let sql = 'UPDATE wxuser set is_delete=1 where pk_id in ('+ids+')'
        let result = await db.query(sql,[])
        return result
    },

    async getByOpenid (openid) {
        let sql = 'select * from wxuser where openid=?'
        let result = await db.query(sql,[openid])
        return result
    },
    async getList( args ){
        let result = await db.commonSelect( args )
        return result
    },

}

module.exports = roles