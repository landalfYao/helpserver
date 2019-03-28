const usermodel = require('./../model/user.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
const pPattern = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
const mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[7|8])|(18[0,5-9]))\d{8}$/;
const user = {
    async updateEmer(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            form.uid = auth.uid
            let bkdata = await usermodel.updateEmer(form)
            if (bkdata.errno) {

                result = retCode.ServerError
                result.msg = '服务端错误'

            } else {
                result.data = bkdata.changedRows
                result.msg = '修改成功了' + bkdata.changedRows + '条数据'
            }
        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'y_user', auth.uid, '修改重要通知 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    async getEmer(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let uid = auth.uid
            if (auth.payload.type == 'wxm') {
                uid = form.dl_id
            }
            let bkdata = await usermodel.getEmer(uid)
            if (bkdata.errno) {

                result = retCode.ServerError
                result.msg = '服务端错误'

            } else {
                result.data = bkdata[0]
                result.msg = '查询成功'
            }
        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'y_user', auth.uid, '查询重要通知 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    //禁用用户
    async disableUser(ctx, state) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let ids = form.ids.split(',')
            let temp = -1
            let temp2 = -1
            for (let i in ids) {
                if (ids[i] == auth.uid) {
                    temp = i
                }
                if (ids[i] == 1) {
                    temp = i
                }
            }
            if (temp != -1) {
                result = retCode.Fail
                result.msg = '无法将自己禁用，请重新选择禁用对象'
            } else if (temp2 != -1) {
                result = retCode.Fail
                result.msg = '无法禁用超级管理员'
            } else {
                for (let i in ids) {
                    if (com.loginState.get('y' + ids[i]) == 1) {
                        com.loginState.remove('y' + ids[i])
                    }
                }
                let bkdata = await usermodel.stateUser(ids, state)
                if (bkdata.errno) {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                } else {

                    result.msg = '成功更新了' + bkdata.changedRows + '个用户'
                    result.data = bkdata.changedRows

                }
            }
        } else {
            result = auth
        }
        return com.filterReturn(result)
    },

    /**
     * @api {post} /api/user/update/pwd 修改密码
     */
    async updatePwd(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        let isNull = await this.isPwdNull(form)
        if (isNull.code == 1) {
            if (auth.code == 1) {
                form.oldPwd = com.secrets.decypt(form.oldPwd, 'base64', com.ivkey, 'hex', true)
                form.newPwd = com.secrets.decypt(form.newPwd, 'base64', com.ivkey, 'hex', true)
                form.confirmPwd = com.secrets.decypt(form.confirmPwd, 'base64', com.ivkey, 'hex', true)
                if (form.oldPwd == form.newPwd) {
                    result = retCode.Fail
                    result.msg = '旧密码与新密码不能相等'
                } else {
                    let isOldTrue = await usermodel.getByIdAndPassword({
                        uid: ctx.header.uid,
                        password: com.md5(form.oldPwd)
                    })
                    if (isOldTrue.errno) {
                        result = retCode.ServerError
                        result.msg = '服务端错误'
                    } else {
                        if (isOldTrue.length == 1) {
                            if (form.newPwd == form.confirmPwd) {
                                let resDa = await usermodel.updatePwd({
                                    uid: ctx.header.uid,
                                    password: com.md5(form.newPwd)
                                })
                                if (resDa.errno) {
                                    result = retCode.ServerError
                                    result.msg = '服务端错误'
                                } else {

                                    if (com.loginState.get('y' + ctx.header.uid) == 1) {
                                        com.loginState.remove('y' + ctx.header.uid)
                                    }
                                    delete result.uid
                                    result.msg = '密码修改成功'
                                }
                            } else {
                                result = retCode.Fail
                                result.msg = '密码不相等'
                            }
                        } else {
                            result = retCode.Fail
                            result.msg = '旧密码不正确'
                        }
                    }
                }

            } else {
                return auth
            }
        } else {
            result = isNull
        }

        return com.filterReturn(result)
    },
    //密码判空
    async isPwdNull(form) {
        let result = retCode.Success
        if (form.oldPwd == '' || form.oldPwd == undefined) {
            result = retCode.NotNullValue
            result.msg = '旧密码不能为空'
        } else if (form.newPwd == '' || form.newPwd == undefined) {
            result = retCode.NotNullValue
            result.msg = '新密码不能为空'
        } else if (form.confirmPwd == '' || form.confirmPwd == undefined) {
            result = retCode.NotNullValue
            result.msg = '确认密码不能为空'
        }
        return result
    },

    /**
     * @api {post} /api/user/update 更新用户个人信息
     */
    async updateUserInfo(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await usermodel.updateUserInfo({
                nickName: form.nickName,
                avatarUrl: form.avatarUrl,
                uid: auth.uid
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                db.setLog({
                    uid: result.uid,
                    ped_operation: '更新用户个人信息',
                    operation_code: result.code,
                    operation_msg: result.codeMsg,
                    api_url: '/api/user/update'
                })
                result.data = (await usermodel.getUserInfo(auth.uid))[0]
                delete result.uid
                result.msg = '修改成功'
            }
            return com.filterReturn(result)
        } else {
            return com.filterReturn(auth)
        }
    },


    /**
     * @api {post} /api/user/get 用户查询
     */
    async getList(ctx) {
        ctx.request.body.tables = 'y_user left join area on y_user.a_id = area.pk_id '
        ctx.request.body.wheres = ' y_user.is_delete = 0 '
        ctx.request.body.fields = 'y_user.* , area.name'
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await usermodel.getList(result.args, result.ct)
                let bkdata = result.result
                bkdata.data = userResult
                let ct = result.ct.payload

                let re = retCode.Success
                re.data = userResult
                return com.filterReturn(re)
            } else {
                return com.filterReturn(result)
            }
        } else {
            return com.filterReturn(auth)
        }

    },
    async getLog(ctx) {
        ctx.request.body.tables = 'y_logs'
        let auth = await com.jwtFun.checkAuth(ctx)
        let result = retCode.Success
        if (auth.auth) {
            result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await usermodel.getList(result.args, result.ct)
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
            db.setLog(auth.uid, result.code, 'y_logs', '', '用户日志查询 ' + result.msg, '/api/user/log/get')
        }
        return com.filterReturn(result)
    },
    /**
     * @api {get} /api/user/info 查询用户信息(个人)
     */
    async getUserInfo(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await usermodel.getUserInfo(ctx.request.body.uid)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {

                delete result.uid
                result.msg = '获取成功'
                result.data = bkdata[0]
            }
            return com.filterReturn(result)
        } else {
            return com.filterReturn(auth)
        }
    },

    async getInfoByArea(ctx) {
        let result = retCode.Success
        let bkdata = await usermodel.getInfoByArea(ctx.request.body.aid)
        if (bkdata.errno) {
            result = retCode.ServerError
            result.msg = '服务端错误'
        } else {
            if (bkdata.length > 0) {
                result = retCode.Success
                result.msg = '获取成功'
            } else {
                result = retCode.Fail
                result.msg = '该学校即将开通'
            }
            delete result.uid

            result.data = bkdata[0]
        }
        return com.filterReturn(result)

    },
    /**
     * @api {post} /api/user/register 用户注册
     */
    async register(ctx) {
        let form = ctx.request.body

        if (form.username == '' || form.username == undefined) {
            result = retCode.NotNullValue
            result.msg = '用户名不能为空'
            return result
        } else if (form.password == '' || form.password == undefined) {
            result = retCode.NotNullValue
            result.msg = '密码不能为空'
            return result
        } else if (form.checkPwd == '' || form.checkPwd == undefined) {
            result = retCode.NotNullValue
            result.msg = '确认密码不能为空'
            return result
        } else if (form.dtype == '' || form.dtype == undefined) {
            result = retCode.NotNullValue
            result.msg = '用户类型不能为空'
            return result
        } else if (form.phone == '' || form.phone == undefined) {
            result = retCode.NotNullValue
            result.msg = '手机号不能为空'
            return result
        } else {
            form.password = com.secrets.decypt(form.password, 'base64', com.ivkey, 'hex', true)
            form.checkPwd = com.secrets.decypt(form.checkPwd, 'base64', com.ivkey, 'hex', true)
            if (form.password == form.checkPwd) {
                let result = retCode.Success
                if (!uPattern.test(form.username)) {
                    result = retCode.IncorrectFormat
                    result.msg = '请输入4到16位，只能输入字母、数字、下划线、减号'
                    return result
                } else {
                    if (!pPattern.test(form.password)) {
                        result = retCode.IncorrectFormat
                        result.msg = '请输入8位以上密码，必须包含字母和数字'
                        return result
                    } else {
                        let res = await usermodel.addUser({
                            username: form.username,
                            password: com.md5(form.password),
                            dtype: form.dtype,
                            a_id: form.a_id,
                            phone: form.phone,
                            deadline: form.deadline,
                            role_id: form.dtype == 1 ? 1 : 2
                        })
                        if (res.errno) {
                            return {
                                code: res.errno,
                                codeMsg: res.code,
                                msg: '用户名已存在'
                            }
                        } else {

                            result.data = form.username
                            result.msg = '注册成功'
                            return result
                        }

                    }
                }
            } else {
                result = retCode.Fail
                result.msg = '密码不相等'
                return result
            }
        }
    },

    /**
     * @api {post} /api/user/login 用户登录
     */
    async login(ctx) {
        let form = ctx.request.body
        //参数判空
        let result = await this.isParamsNull(form)

        if (result.code == 1) {
            form.password = com.secrets.decypt(form.password, 'base64', com.ivkey, 'hex', true)

            form.password = com.md5(form.password)
            let res = null
            //登录方式，手机号/用户名/邮箱
            let loginStyle = 'username'
            if (mPattern.test(form.username)) {
                loginStyle = 'phone'
            } else {
                loginStyle = 'username'
            }
            let isUser = await usermodel.getByUsername(form)
            if (isUser.errno) {
                return {
                    code: res.errno,
                    codeMsg: res.code,
                    msg: '数据异常'
                }
            } else {
                if (isUser.length == 1) {
                    res = await usermodel.getByUsernameAndPassword(loginStyle, form)
                    if (res.errno) {
                        return {
                            code: res.errno,
                            codeMsg: res.code,
                            msg: '数据异常'
                        }
                    } else {
                        if (res.length == 1) {
                            if (res[0].is_delete == 1) {
                                result = retCode.Fail
                                result.msg = '用户已被删除'
                            } else if (res[0].user_state == 'DISABLE') {
                                result = retCode.Fail
                                result.msg = '账户不可用,请联系管理'
                            } else {
                                const userToken = {
                                    pk_id: res[0].pk_id,
                                    a_id: res[0].a_id,
                                    dtype: res[0].dtype,
                                    phone: res[0].phone,
                                    role_id: res[0].role_id,
                                    type: 'yzy'
                                }
                                //生成token
                                const token = await com.jwtFun.sign(userToken)
                                let rs = retCode.Success
                                rs.msg = '登录成功'
                                rs.token = token
                                rs.data = res[0]

                                //设置登陆态
                                com.loginState.set('y' + res[0].pk_id, 1)


                                return rs
                            }
                        } else if (res.length > 1) {
                            result = retCode.Fail
                            result.msg = '登录异常'
                        } else {
                            result = retCode.UsernameOrPasswordError
                            result.msg = '密码不正确'

                        }
                    }
                } else if (isUser.length > 1) {
                    result = retCode.Fail
                    result.msg = '登录异常'
                } else {
                    result = retCode.UserNotExist
                    result.msg = '用户不存在'
                }

            }
        }

        return result
    },
    //登录判断空值
    async isParamsNull(form) {
        let result = retCode.Success
        if (form.username == '' || form.username == undefined) {
            result = retCode.NotNullValue
            result.msg = '用户名不能为空'
        } else if (form.password == '' || form.password == undefined) {
            result = retCode.NotNullValue
            result.msg = '密码不能为空'
        }
        return result
    },
    //密码输错锁定
    async inputPwdErrorLimit(form) {

    }
}

module.exports = user