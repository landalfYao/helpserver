const model = require("./../model/helplist.js");
const retCode = require("./../utils/retcode.js");
const com = require("../utils/common");
const db = require("./../db/mysqlHelper.js");
const token = require('../config/wxtoken')
const roles = {
  /**
   * @api {post} /api/help/add 添加帮助
   * @apiDescription 添加帮助
   * @apiName Add
   * @apiGroup help
   * @apiParam {string} wx_id 用户ID
   * @apiParam {string} des 描述
   * @apiParam {string} lnglat 经纬度
   * @apiParam {string} address  地址
   * @apiParam {string} phone  手机号
   * @apiParam {string} pubarea  发布地区
   * @apiVersion 1.0.0
   * @apiSampleRequest http://localhost:3000/api/help/add
   * @apiVersion 1.0.0
   */
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
    //取消订单
    if (form.state == 4) {
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
          let bkdata = await model.updateState2(form);
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
    } else if (form.state == 1) {
      let bkdata = await model.updateState(form);
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
  /**
   * @api {post} /api/area/del 地区删除
   * @apiDescription 地区删除
   * @apiName del
   * @apiGroup area
   * @apiHeader {string} token token
   * @apiHeader {string} uid 用户ID
   * @apiParam {int} ids  pkId
   * @apiVersion 1.0.0
   * @apiSampleRequest http://localhost:3000/api/area/del
   * @apiVersion 1.0.0
   */
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
  /**
   * @api {post} /api/help/get 查询
   * @apiDescription 查询
   * @apiName Get
   * @apiGroup help
   * @apiHeader {string} token token
   * @apiHeader {string} uid 用户ID
   * @apiParam {string} fields 查询字段 例('name,id') 传空代表查询所有
   * @apiParam {string} wheres 查询条件 例('name=0 and id=3')
   * @apiParam {string} sorts  查询排序 例('name desc, id asc')
   * @apiParam {int} pageIndex  页码
   * @apiParam {int} pageSize  每页条数
   * @apiVersion 1.0.0
   * @apiSampleRequest http://localhost:3000/api/area/get
   * @apiVersion 1.0.0
   */
  async getList(ctx) {
    ctx.request.body.fields = "helplist.*,wxuser.avatar_url,wxuser.nick_name "
    ctx.request.body.tables = "helplist,wxuser";
    ctx.request.body.wheres =
      " helplist.wx_id = wxuser.id and helplist.is_delete = 0 and helplist.state in (1,2,3) and helplist.title in ('校园跑腿','上门维修','代替服务','其他帮助')";
    ctx.request.body.sorts = 'helplist.create_time desc'
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