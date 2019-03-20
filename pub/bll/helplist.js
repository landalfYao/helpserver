const model = require("./../model/helplist.js");
const retCode = require("./../utils/retcode.js");
const com = require("../utils/common");
const db = require("./../db/mysqlHelper.js");
const token = require('../config/wxtoken')
const roles = {

  async add(ctx) {
    let form = ctx.request.body;
    let result = retCode.Success;
    let bkdata = await model.add(form);
    if (bkdata.errno) {
      if (bkdata.errno == 1062) {
        result = retCode.Fail;
        result.msg = "失败";
      } else {
        result = retCode.ServerError;
        result.msg = "服务端错误";
      }
    } else {
      result.data = bkdata.insertId;
      result.msg = "添加成功";
    }
    return com.filterReturn(result);
  },

  async updateState(ctx) {

    let form = ctx.request.body;
    let result = retCode.Success;
    let ordata = (await model.getById(form.id))[0]

    //取消订单
    if (form.state == 4) {
      if (ordata.state == 1 || ordata.state == 0) {

        let can = await model.getById(form.id)
        if (can.errno) {
          result = retCode.Fail;
          result.msg = "查询失败";
        } else {
          if (can.length == 1) {
            if (can[0].is_pay == 1 && can[0].state == 1) {
              const wxpay = require('./wxpay')
              let moo = await wxpay.refund(can[0])
              if (moo.return_code == 'SUCCESS') {
                let up = await model.updateRedundNo({
                  out_refund_no: moo.out_refund_no,
                  id: form.id,
                })
                if (up.errno) {
                  console.log(up)
                } else {
                  result = retCode.Success;
                  result.msg = "取消成功";
                  result.data = moo.return_msg
                }
              } else {
                result = retCode.Fail;
                result.msg = "取消失败";
                result.data = moo.return_msg
              }
            }
            let bkdata = await model.updatCancel(form);
            if (bkdata.errno) {
              if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
              } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
              }
            } else {
              result.data = bkdata.insertId;
              result.msg = "修改成功";
            }

          } else {
            result = retCode.Fail;
            result.msg = "没有该订单";
          }
        }
      } else {
        result = retCode.Fail
        result.msg = '订单已无法取消，请查看是否已被接单'
      }

    } else if (form.state == 1) {
      let bkdata = await model.updatePayed(form);
      if (bkdata.errno) {
        if (bkdata.errno == 1062) {
          result = retCode.Fail;
          result.msg = "失败";
        } else {
          result = retCode.ServerError;
          result.msg = "服务端错误";
        }
      } else {
        result.data = bkdata.changedRows;
        result.msg = "修改成功";
        // com.http.request('http://127.0.0.1:3339/api/wxmp/sendNotice?oid=' + ordata.id, 'GET', {})
      }
    }

    return com.filterReturn(result);
  },
  async updateConfirm(ctx) {
    let form = ctx.request.body;
    let result = retCode.Success;
    let bkdata = await model.confirm(form.id);
    if (bkdata.errno) {
      if (bkdata.errno == 1062) {
        result = retCode.Fail;
        result.msg = "失败";
      } else {
        result = retCode.ServerError;
        result.msg = "服务端错误";
      }
    } else {
      result.data = bkdata.insertId;
      result.msg = "修改成功";
    }
    return com.filterReturn(result);
  },
  async updateJd(ctx) {
    let form = ctx.request.body;
    let result = retCode.Success;
    let bkdata = await model.jd(form);
    if (bkdata.errno) {
      if (bkdata.errno == 1062) {
        result = retCode.Fail;
        result.msg = "失败";
      } else {
        result = retCode.ServerError;
        result.msg = "服务端错误";
      }
    } else {
      token.msgModel(form.openid, '8STlOtBZ4TrivsA8uD_5_SIGjYzWJve29Jm4wd3Q2Sk',
        form.form_id, '/pages/order/detail/detail?id=' + form.id, {
          "keyword1": {
            "value": form.order_num
          },
          "keyword2": {
            "value": form.title
          }
        }, '')
      result.data = bkdata.changedRows;
      result.msg = "修改成功";
    }
    return com.filterReturn(result);
  },

  async update(ctx) {
    let form = ctx.request.body;
    let result = retCode.Success;
    let auth = await com.jwtFun.checkAuth(ctx);
    if (auth.code == 1) {
      let bkdata = await model.update({
        name: form.name,
        atype: form.atype,
        sort: form.sort,
        agent_get: form.agent_get,
        p_get: form.p_get,
        pkId: form.pkId
      });
      if (bkdata.errno) {
        if (bkdata.errno == 1062) {
          result = retCode.Fail;
          result.msg = "该地区名称已存在";
        } else {
          result = retCode.ServerError;
          result.msg = "服务端错误";
        }
      } else {
        result.data = bkdata.changedRows;
        result.msg = "修改成功";
      }
      db.setLog({
        uid: auth.uid,
        ped_operation: "角色修改",
        operation_code: result.code,
        operation_msg: result.codeMsg,
        api_url: "/api/role/update"
      });
    } else {
      result = auth;
    }
    return com.filterReturn(result);
  },
  //删除
  async del(ctx) {
    let form = ctx.request.body;
    let result = retCode.Success;
    let auth = await com.jwtFun.checkAuth(ctx);
    if (auth.code == 1) {
      let bkdata = await model.updateDel(form.ids);
      if (bkdata.errno) {
        result = retCode.ServerError;
        result.msg = "服务端错误";
      } else {
        result.data = bkdata.changedRows;
        result.msg = "成功删除了" + bkdata.changedRows + "条数据";
      }
    } else {
      result = auth;
    }
    return com.filterReturn(result);
  },
  //查询
  async getList(ctx) {
    ctx.request.body.fields = "helplist.*,wxuser.avatar_url,wxuser.nick_name "
    ctx.request.body.tables = "helplist,wxuser";
    ctx.request.body.wheres =
      " helplist.wx_id = wxuser.id and helplist.is_delete = 0 and helplist.state in (1,2,3) and helplist.title in ('校园跑腿','上门维修','代替服务','其他帮助') and helplist.a_id=" + ctx.request.body.a_id;
    ctx.request.body.sorts = ' helplist.create_time desc'
    let result = await com.commonSelect.getList(ctx);
    if (result.args) {
      let userResult = await model.getList(result.args, result.ct);
      let bkdata = result.result;
      bkdata.data = userResult;
      let ct = result.ct.payload;

      let re = retCode.Success;
      re.data = userResult;
      return com.filterReturn(re);
    } else {
      return com.filterReturn(result);
    }
  },

  async getList2(ctx) {
    ctx.request.body.tables = 'helplist,wxuser'
    ctx.request.body.wheres += ' and wxuser.id = helplist.wx_id '
    let auth = await com.jwtFun.checkAuth(ctx)
    if (auth.code == 1) {
      let result = await com.commonSelect.getList(ctx)
      if (result.args) {
        let userResult = await model.getList(result.args, result.ct)
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

};
module.exports = roles;