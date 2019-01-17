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
    async getOrderTotalByState(state) {
        let sql = 'select count(*) total from helplist where state=' + state
        let result = await db.query(sql, [])
        return result
    },
    //获取营业额
    async getTurnover() {
        let sql = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1'
        let result = await db.query(sql, [])
        return result
    },
    //获取今日营业额
    async getTurnoverByDaily() {
        let sql = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and to_days(create_time) = to_days(now())'
        let result = await db.query(sql, [])
        return result
    },
    //获取退款金额
    async getRefund() {
        let sql = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1'
        let result = await db.query(sql, [])
        return result
    },
    //获取今日退款金额
    async getRefundByDaliy() {
        let sql = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and to_days(create_time) = to_days(now())'
        let result = await db.query(sql, [])
        return result
    },
    //获取学校
    async getAreaTotal() {
        let sql = 'select count(*) total from area where area.is_delete=0'
        let result = await db.query(sql, [])
        return result
    },
    //获取接单人数
    async getTakingTotal() {
        let sql = 'select count(*) total from userinfo where state = 1'
        let result = await db.query(sql, [])
        return result
    },
    async getAgentData(a_id) {
        let waid = 'where  a_id=?'
        let naid = a_id ? 'and a_id=?' : ''
        let user = 'select count(*) total,state  from userinfo ' + (a_id ? waid : '') + ' GROUP BY state'
        let order = 'select count(*) total,state from helplist ' + (a_id ? waid : '') + '  GROUP BY state'
        let orderMonth = 'select count(*) total,state from helplist where DATE_FORMAT( create_time, " % Y % m " ) = DATE_FORMAT(  CURDATE( ) ," % Y % m " ) ' + naid + '  GROUP BY state'
        let orderType = 'select count(*) total,title from helplist ' + (a_id ? waid : '') + '  GROUP BY title'
        let orderTypeMonth = 'select count(*) total,title from helplist where DATE_FORMAT( create_time, " % Y % m " ) = DATE_FORMAT(  CURDATE( ) ," % Y % m " ) ' + naid + ' GROUP BY title'
        let orderTotal = 'select count(*) total from helplist ' + (a_id ? waid : '')
        let turnover = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 ' + (naid)
        let turnoverDaily = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and to_days(create_time) = to_days(now()) ' + naid
        let turnoverMonth = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and DATE_FORMAT( create_time, " % Y % m " ) = DATE_FORMAT(  CURDATE( ) ," % Y % m " ) ' + naid
        let turnoverYear = 'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and YEAR(create_time)=YEAR(NOW()) ' + naid
        let refund = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 ' + naid
        let refundDaily = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and to_days(create_time) = to_days(now()) ' + naid
        let refundMonth = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and DATE_FORMAT( create_time, " % Y % m " ) = DATE_FORMAT(  CURDATE( ) ," % Y % m " )  ' + naid
        let refundYear = 'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and YEAR(create_time)=YEAR(NOW()) ' + naid
        let data = {
            user: (await db.query(user, [a_id])),
            order: (await db.query(order, [a_id])),
            orderMonth: (await db.query(orderMonth, [a_id])),
            orderType: (await db.query(orderType, [a_id])),
            orderTypeMonth: (await db.query(orderTypeMonth, [a_id])),
            orderTotal: (await db.query(orderTotal, [a_id]))[0].total || 0,
            turnover: (await db.query(turnover, [a_id]))[0].turnover || 0,
            turnoverDaily: (await db.query(turnoverDaily, [a_id]))[0].turnover || 0,
            turnoverMonth: (await db.query(turnoverMonth, [a_id]))[0].turnover || 0,
            turnoverYear: (await db.query(turnoverYear, [a_id]))[0].turnover || 0,
            refund: (await db.query(refund, [a_id]))[0].refund || 0,
            refundDaily: (await db.query(refundDaily, [a_id]))[0].refund || 0,
            refundMonth: (await db.query(refundMonth, [a_id]))[0].refund || 0,
            refundYear: (await db.query(refundYear, [a_id]))[0].refund || 0,
        }
        if (!a_id) {
            data.wxuserTotal = (await this.getWxuserTotal())[0].total || 0
            data.wxuserTotalDaily = (await this.getWxuserTotalByDaily())[0].total || 0
            data.areaTotal = (await this.getAreaTotal())[0].total || 0
        }
        if (user) {
            for (let i in data.user) {
                if (data.user[i].state == 0) {
                    data.userWating = data.user[i].total
                }
                if (data.user[i].state == 1) {
                    data.userPass = data.user[i].total
                }
                if (data.user[i].state == 2) {
                    data.userBack = data.user[i].total
                }
            }
        }


        return data
    }

}

module.exports = app