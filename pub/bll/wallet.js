const model = require('./../model/wallet.js')
const ctmodel = require('./../model/capitalTrend.js')
const camodel = require('./../model/cashRecode.js')
const wxcash = require('./../bll/wxcash.js')
const wxuserModel = require('./../model/wxuser')
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
                        if (cashFee < realFee + 0.01 && cashFee > 0.3 && cashFee < 1000) {
                            //实现提现
                            let isok = await this.gocash(ctx, auth.payload.id, cashFee)
                            if (isok.code) {
                                result.msg = '提现成功'
                            } else {
                                result.msg = isok.msg
                            }
                        } else {
                            result = retCode.ServerError
                            result.msg = '提现金额输入有误'
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
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'ctx.request.url', 0, '用户提现 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },

    async gocash(ctx, wx_id, amount) {
        let wxuser = await wxuserModel.getById(wx_id)
        let openid = wxuser[0].openid
        let userinfo = await wxuserModel.getInfoByWxId(wx_id)
        let realname = userinfo[0].name
        let cash = await wxcash.wxcash(ctx, openid, realname, amount)
        if (cash.result_code == 'SUCCESS') {
            let ad = await camodel.add({
                uid: wx_id,
                type: 1,
                cash_fee: amount,
                state: 1,
                trade_no: cash.partner_trade_no,
                msg: '提现成功'
            })
            let re = await model.updateCash({
                uid: wx_id,
                add: amount
            })
            return {
                code: true
            }
        } else if (cash.result_code == 'FAIL') {
            let ad = await camodel.add({
                uid: wx_id,
                type: 1,
                cash_fee: amount,
                state: 3,
                trade_no: cash.partner_trade_no,
                msg: cash.err_code_des
            })
            let codemsg = {
                SENDNUM_LIMIT: '您的今日提现次数已达上限，请改日再来',
                V2_ACCOUNT_SIMPLE_BAN: '您的微信账户未实名，请实名后再来提现',
                FREQ_LIMIT: '超过频率限制，请稍后再试。',
                RECV_ACCOUNT_NOT_ALLOWED: '收款账户不在收款账户列表',
                SYSTEMERROR: '系统繁忙，请稍后再试。',
                SEND_FAILED: '付款错误',
                AMOUNT_LIMIT: '金额超限',
                NAME_MISMATCH: '姓名校验出错'
            }
            return {
                code: false,
                msg: codemsg[cash.err_code]
            }
        }

    },

    async getList(ctx) {
        ctx.request.body.tables = 'cash_recode,wxuser,userinfo,area'
        ctx.request.body.fields = 'cash_recode.*,wxuser.phone,userinfo.name realname,area.name schoolName'
        ctx.request.body.wheres += ' and cash_recode.uid = wxuser.id and cash_recode.uid=userinfo.wx_id and userinfo.a_id = area.pk_id'
        let auth = await com.jwtFun.checkAuth(ctx)
        let result = retCode.Success
        if (auth.auth) {
            result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await camodel.getList(result.args)
                let bkdata = result.result
                bkdata.data = userResult

                let re = retCode.Success
                re.data = userResult
                re.msg = '查询成功'
                result = re
            }
        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'cash_recode', '', '提现查询 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
}
module.exports = roles