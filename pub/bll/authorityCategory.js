const model = require('./../model/authorityCategory.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')

const authorityCategory = {

    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.add(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该权限名称已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
                result.data = 0
            } else {
                result.data = bkdata.insertId
                result.msg = '添加成功'
            }

        } else {
            result = auth
            result.data = 0
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'auth_cate', result.data, '权限分类 ' + result.msg, '/api/auth/cate/add')
        }
        return com.filterReturn(result)
    },

    async update(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.update(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该权限名称已存在'
                } else {

                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.msg = '修改成功'
            }


        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'auth_cate', form.id, '权限类目更新 ' + result.msg, '/api/auth/cate/update')
        }
        delete result.data
        return com.filterReturn(result)
    },

    async updateShow(ctx, isShow) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.updateShow({
                is_show: isShow == 'onShow' ? 1 : 0,
                ids: form.ids
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '成功更新了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'auth_cate', form.ids, '权限类目更新显示或关闭 ' + result.msg, '/api/auth/cate/' + isShow)
        }
        return com.filterReturn(result)
    },

    async updateSort(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.updateSort({
                sort: form.sort,
                id: form.id
            })
            if (bkdata.errno) {
                delete result.uid
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                delete result.uid
                result.data = bkdata.changedRows
                result.msg = '更新成功'
            }
            if (auth.uid) {
                db.setLog(auth.uid, result.code, 'auth_cate', form.id, '权限类目排序 ' + result.msg, '/api/auth/cate/sort')
            }
        } else {
            result = auth
        }
        return com.filterReturn(result)
    },

    async updateDel(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.updateDel(form.ids)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '删除了' + bkdata.changedRows + '数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'auth_cate', form.ids, '权限类目删除 ' + result.msg, '/api/auth/cate/del')
        }
        return com.filterReturn(result)
    },
    async getList(ctx) {
        ctx.request.body.tables = 'auth_cate'
        let auth = await com.jwtFun.checkAuth(ctx)
        let result = retCode.Success
        if (auth.auth) {
            result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await model.getList(result.args, result.ct)
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
            db.setLog(auth.uid, result.code, 'auth_cate', '', '权限类目查询 ' + result.msg, '/api/auth/cate/get')
        }
        return com.filterReturn(result)
    },


    async getListByCate(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let cate = await model.findCate()
            let aut = await model.findAuth()
            if (cate.errno || aut.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                let arr = cate
                //修改
                for (let i in arr) {
                    arr[i].auths = []
                    for (let j in aut) {
                        if (arr[i].pk_id == aut[j].cate_id) {
                            arr[i].auths.push(aut[j])
                        }
                    }

                }
                result.data = arr
                result.msg = '查询成功'
            }
            if (auth.uid) {
                db.setLog(auth.uid, result.code, 'auth_cate', '', '根据类目ID权限查询 ' + result.msg, '/api/auth/cate/get')
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    }
}

module.exports = authorityCategory