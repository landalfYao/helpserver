const db = require("./../db/mysqlHelper.js");

const app = {
    async getUserAnalysis(id) {
        let orderTotal = 'select count(*) total from helplist where jd_id=? '
        let orderJdTotal = 'select count(*) total from helplist'
        let params = [id]
        let result = await db.query(sql, params)
        return result
    },
}
module.exports = app