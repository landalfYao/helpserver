const ctModel = require("./../model/capitalTrend.js");
const hModel = require("./../model/helplist.js");
const wModel = require("./../model/wallet.js");
const retCode = require("./../utils/retcode.js");
const com = require("../utils/common");
const app = {
  async complete(ctx) {
    let form = ctx.request.body;
    let result = retCode.Success;
    let order = (await hModel.getById(form.id))[0];
    if (order.state == 2) {
      let bkdata = await hModel.confirm(form.id);
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
        //获取订单

        //获取代理用户
        let y_user = (await hModel.getUserByAid(order.a_id))[0];
        //获取服务项
        let server = (await hModel.getServerByDlIdAndServerName(
          y_user.pk_id,
          order.title
        ))[0];
        console.log(server);
        //计算资金分流
        let p_get = parseFloat(server.p_sy) * parseFloat(order.total_fee);
        let a_get = parseFloat(server.dl_sy) * parseFloat(order.total_fee);
        let u_get =
          parseFloat(1 - server.p_sy - server.dl_sy) *
          parseFloat(order.total_fee);
        let data = {
          a_id: order.a_id,
          u_id: order.jd_id,
          h_id: order.id,
          p_get: p_get,
          a_get: a_get,
          u_get: u_get,
          rate:
            "p:" + server.p_sy + " d:" + server.dl_sy + " u:" + server.user_sy
        };
        let newRecode = await ctModel.add(data);

        //平台入账
        await wModel.updateIncome({
          add: p_get,
          uid: 1
        });
        //代理入账
        await this.income(y_user.pk_id, 2, a_get);
        //用户入账
        await this.income(order.jd_id, 1, u_get);
      }
    } else {
      result = retCode.Fail;
      result.msg = "该订单已完成";
    }

    return com.filterReturn(result);
  },
  async income(id, type, gets) {
    let uw = await wModel.findByUid({
      uid: id,
      type: type
    });
    if (uw.length == 1) {
      let uinc = await wModel.updateIncome({
        add: gets,
        uid: id
      });
    } else {
      let uinc = await wModel.add({
        uid: id,
        type: type
      });
      if (uinc.insertId) {
        await wModel.updateIncome({
          add: gets,
          uid: id
        });
      }
    }
  }
};
module.exports = app;
