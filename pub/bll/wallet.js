const model = require('./../model/wallet.js')
const ctmodel = require('./../model/capitalTrend.js')
const camodel = require('./../model/cashRecode.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const roles = {


    async getByUid(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.findByUid({
                uid: auth.payload.id,
                type: auth.payload.type == 'wxm' ? 1 : 2
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                if (bkdata.length == 1) {
                    if (bkdata[0].state == 1) {
                        let bk = {
                            showFee: (parseFloat(bkdata[0].income_total) - parseFloat(bkdata[0].cash)).toFixed(2),
                            realFee: parseFloat(bkdata[0].income_total) - parseFloat(bkdata[0].cash),
                            income_total: bkdata[0].income_total,
                            cash: bkdata[0].cash
                        }
                        result.data = bk
                        result.msg = '查询成功'
                    } else {
                        result = retCode.ServerError
                        result.msg = '您的账户已被冻结'
                    }
                } else {
                    result = retCode.ServerError
                    result.msg = '您不是接单员或账户未开通'
                }


            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'wallets', 0, '用户查询账户余额 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },

    async cash(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.findByUid({
                uid: auth.payload.id,
                type: auth.payload.type == 'wxm' ? 1 : 2
            })
            if (bkdata.length == 1) {
                let cashFee = form.cashFee; //需要提现的金额
                if (bkdata[0].state == 1) {

                    let realFee = parseFloat(bkdata[0].income_total) - parseFloat(bkdata[0].cash); //虚拟实际余额

                    let ctdata = await ctmodel.sumFee({
                        sumName: 'u_get',
                        idName: 'u_id',
                        idvalue: auth.payload.id
                    })
                    let cadata = await camodel.cashsum({
                        uid: auth.payload.id,
                        type: auth.payload.type == 'wxm' ? 1 : 2
                    })
                    let checkIncomeTotal = ctdata[0].sum || 0
                    let checkCashTotal = cadata[0].sum || 0
                    if (checkIncomeTotal == bkdata[0].income_total && checkCashTotal == bkdata[0].cash) {
                        if (cashFee <= realFee && cashFee > 0.3 && cashFee < 1000) {
                            //实现提现
                        }
                    } else {
                        await camodel.add({
                            uid: auth.payload.id,
                            type: auth.payload.type == 'wxm' ? 1 : 2,
                            cash_fee: cashFee,
                            state: 2,
                            msg: '数据异常:检验总收入:' + checkIncomeTotal + ' 检验总提现:' + checkCashTotal + ' 虚拟总收入:' + bkdata[0].income_total + ' 虚拟提现:' + bkdata[0].cash
                        })
                        result = retCode.ServerError
                        result.msg = '您的账户数据异常'
                    }

                } else {
                    result = retCode.ServerError
                    result.msg = '您的账户已被冻结'
                }
            } else {
                result = retCode.ServerError
                result.msg = '您不是接单员或账户未开通'
            }
        }
        // if (auth.uid) {
        //     db.setLog(auth.uid, result.code, 'wallets', 0, '用户查询账户余额 ' + result.msg, ctx.request.url)
        // }
        return com.filterReturn(result)
    },
    // async getList(ctx) {
    //     ctx.request.body.tables = 'roles'
    //     let auth = await com.jwtFun.checkAuth(ctx)
    //     let result = retCode.Success
    //     if (auth.auth) {
    //         result = await com.commonSelect.getList(ctx)
    //         if (result.args) {
    //             let userResult = await model.getList(result.args, result.ct)
    //             let bkdata = result.result
    //             bkdata.data = userResult

    //             let re = retCode.Success
    //             re.data = userResult
    //             re.msg = '查询成功'
    //             result = re
    //         }
    //     } else {
    //         result = auth
    //     }
    //     if (auth.uid) {
    //         db.setLog(auth.uid, result.code, 'roles', '', '角色查询 ' + result.msg, '/api/role/get')
    //     }
    //     return com.filterReturn(result)
    // },
}
module.exports = roles