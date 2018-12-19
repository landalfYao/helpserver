const db = require('./../db/mysqlHelper.js')

const authority = {
    async add ( args ){
        let sql = 'INSERT INTO y_authority (name,api_url,cate_id) value(?,?,?)'
        let params = [args.name, args.apiUrl, args.cateId]
        let result = await db.query(sql, params)
        return result
    },
    async update ( args ){
        let sql = 'UPDATE y_authority set name=?,api_url=?,cate_id=? where pk_id = ?'
        let params = [args.name, args.apiUrl, args.cateId,args.pkId]
        let result = await db.query(sql,params)
        return result
    },
    async updateDel ( args ){
        let sql = 'UPDATE y_authority set is_delete=1 where pk_id in ('+args.ids+')'
        let result = await db.query(sql,[])
        return result
    },
}

module.exports = authority