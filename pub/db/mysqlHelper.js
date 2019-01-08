const config = require('./../config/config.js')
const mysql = require("mysql")


const db = {

    query2(sql, args, cb) {
        const conn = mysql.createConnection(config.MYSQL)
        new Promise((resolve, reject) => {

            conn.query(sql, args, (err, result) => {
                if (err) {
                    console.log(err)
                    cb({
                        errno: err.errno,
                        code: err.code,
                        sqlMessage: err.sqlMessage
                    })
                } else {
                    cb(result)
                }
                conn.end()
            })
        })
    },
    async query(sql, args) {
        const conn = mysql.createConnection(config.MYSQL)
        return new Promise((resolve, reject) => {

            conn.query(sql, args, (err, result) => {
                if (err) {
                    console.log(err)
                    resolve({
                        errno: err.errno,
                        code: err.code,
                        sqlMessage: err.sqlMessage
                    })
                } else {
                    resolve(result)
                }
                conn.end()
            })
        })
    },

    /**
     * @param {*} tables     查询表名 (如: 'user,log')
     * @param {*} fields     查询字段 (如： 'name,pwd,id')
     * @param {*} wheres     查询条件 (如： 'name=34 and pwd=12')
     * @param {*} sorts      排序     (如： 'name desc,pwd asc')
     * @param {*} pageIndex  页码
     * @param {*} pageSize   每页条数
     */
    async commonSelect(args) {
        let {
            tables,
            fields,
            wheres,
            sorts,
            pageIndex,
            pageSize
        } = args;
        if (tables == '' || tables == undefined) {
            return {
                code: -1,
                codeMsg: 'argument "tables" not be a null value'
            }
        } else {
            let where = (wheres ? wheres + ' ' : 'is_delete=0');
            let sql = 'SELECT ' +
                (fields ? fields : '*') +
                ' FROM ' + tables + ' where ' +
                where + ' order by ' +
                (sorts ? sorts : 'create_time asc') + ' limit ' +
                (pageIndex ? (pageIndex - 1) * (pageSize ? pageSize : 15) : 0) + ',' +
                (pageSize ? pageSize : 15);

            let list = await this.query(sql, []);
            let total = await this.query('SELECT COUNT(*) total FROM ' + tables + ' where ' + where);
            if (total.length >= 0 && list.length >= 0) {
                return {
                    list: list,
                    total: total[0].total
                }
            } else {
                return {
                    code: list.errno || total.errno,
                    codeMsg: list.code || total.code
                }
            }
        }
    },
    async setLog(args) {
        let {
            uid,
            ped_operation,
            operation_code,
            operation_msg,
            api_url
        } = args
        let sql = 'INSERT INTO y_logs (uid,ped_operation,operation_code,operation_msg,api_url) values(?,?,?,?,?)'
        let result = await this.query(sql, [uid, ped_operation, operation_code, operation_msg, api_url])
        return result
    }
}

module.exports = db