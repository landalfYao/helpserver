const db = require('./../db/mysqlHelper.js')

const app = {
    //获取微信用户总数
    async getWxuserTotal() {
        let sql = 'select count(*) total from wxuser'
        let result = await db.query(sql, [])
        return result
    },
    //获取当日微信用户总数
    async getWxuserTotalByDaily() {
        let sql = 'select count(*) total from wxuser where to_days(create_time) = to_days(now()) '
        let result = await db.query(sql, [])
        return result
    },
    //获取所有订单信息
    async getOrderTotal() {
        let sql = 'select count(*) total from helplist'
        let result = await db.query(sql, [])
        return result
    },
    //根据状态获取订单信息
    async getOrderTotalByState(state){
        let sql = 'select count(*) total from helplist where state='+state
        let result = await db.query(sql, [])
        return result
    },
    //获取营业额
    async getTurnover(){
        let sql = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1'
        let result = await db.query(sql, [])
        return result  
    },
    //获取今日营业额
    async getTurnoverByDaily(){
        let sql = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and to_days(create_time) = to_days(now())'
        let result = await db.query(sql, [])
        return result  
    },
    //获取退款金额
    async getRefund(){
        let sql = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1'
        let result = await db.query(sql, [])
        return result  
    },
    //获取今日退款金额
    async getRefundByDaliy(){
        let sql = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and to_days(create_time) = to_days(now())'
        let result = await db.query(sql, [])
        return result  
    },
    //获取学校
    async getAreaTotal () {
        let sql = 'select count(*) total from area where area.is_delete=0'
        let result = await db.query(sql, [])
        return result  
    },
    //获取接单人数
    async getTakingTotal () {
        let sql = 'select count(*) total from userinfo where state = 1'
        let result = await db.query(sql, [])
        return result  
    },

}

module.exports = app