const db = require('./../db/mysqlHelper.js')

const authorityCategory = {
    async add ( args ){
        let sql = 'INSERT INTO y_authority_category (cate_name,remarks,sort,is_show) value(?,?,?,?)'
        let params = [args.cateName, args.remarks, args.sort, args.isShow]
        let result = await db.query(sql, params)
        return result
    },
    async update ( args ){
        let sql = 'UPDATE y_authority_category set cate_name=?,remarks=?,sort=?,is_show=? where pk_id = ?'
        let params = [args.cateName,args.remarks,args.sort,args.isShow,args.uid]
        let result = await db.query(sql,params)
        return result
    },
    async updateSort ( args ){
        let sql = 'UPDATE y_authority_category set sort=? where pk_id = ?'
        let params = [args.sort,args.uid]
        let result = await db.query(sql,params)
        return result
    },
    async updateShow ( args ){
        let sql = 'UPDATE y_authority_category set is_show=? where pk_id in ('+args.ids+')'
        let params = [args.isShow]
        let result = await db.query(sql,params)
        return result
    },
    async updateDel ( ids ){
        let sql = 'UPDATE y_authority_category set is_delete=1 where pk_id in ('+ids+')'
        let result = await db.query(sql,[])
        return result
    },
    async findCate (  ) { 
        let sql = 'SELECT * FROM y_authority_category WHERE is_delete=0'
        let result = await db.query(sql,[])
        return result
    },
    async findAuth (  ) { 
        let sql = 'SELECT * FROM y_authority WHERE is_delete=0'
        let result = await db.query(sql,[])
        return result
    }
}

module.exports = authorityCategory