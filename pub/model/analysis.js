const db = require("./../db/mysqlHelper.js");

const app = {
  //获取微信用户总数
  async getWxuserTotal() {
    let sql = "select count(*) total from wxuser";
    let result = await db.query(sql, []);
    return result;
  },
  //获取当日微信用户总数
  async getWxuserTotalByDaily() {
    let sql =
      "select count(*) total from wxuser where to_days(create_time) = to_days(now()) ";
    let result = await db.query(sql, []);
    return result;
  },

  //获取学校
  async getAreaTotal() {
    let sql = "select count(*) total from area where area.is_delete=0";
    let result = await db.query(sql, []);
    return result;
  },
  async getWxuserData(jd_id){
    let jdorder = 'select count(*) total,state from helplist where jd_id = ?  GROUP BY state'
    let jdorderDaily = 'select count(*) total,state from helplist where  jd_id = ? and DATE_FORMAT( create_time, " % Y % m " ) = DATE_FORMAT(  CURDATE() ," % Y % m " )  GROUP BY state '
    let orderType =
      "select count(*) total,title from helplist where state=3 and jd_id=?  GROUP BY title";
    let orderTypeMonth =
      'select count(*) total,title from helplist where state=3 and jd_id=? and DATE_FORMAT( create_time, " % Y % m " ) = DATE_FORMAT(  CURDATE() ," % Y % m " )  GROUP BY title'
    let data = {
      jdorder: await db.query(jdorder, [jd_id]),
      jdorderDaily: await db.query(jdorderDaily, [jd_id]),
      orderType: await db.query(orderType, [jd_id]),
      orderTypeMonth: await db.query(orderTypeMonth, [jd_id]),
    }
    return data
  },
  async getComTotalAndSy(args){
    let sq1 = 'select count(*) total from helplist where jd_id=? and state=3 and com_time like ?'
    let sq2 = 'select sum(u_get) sum from capital_trend where u_id=? and create_time like ?'
    let data = {
      completeTotalByMonth: (await db.query(sq1, [args.wx_id,args.com_time]))[0].total || 0,
      getFeeMonth: (await db.query(sq2, [args.wx_id,args.com_time]))[0].sum || 0,
    }
    return data
  },

  async getAgentData(a_id) {
    let waid = "where  a_id=?";
    let naid = a_id ? "and a_id=?" : "";
    let date = new Date()
    let month = date.getMonth()+1
    let m  = month <10 ? "0"+month:month
    let likeM = date.getFullYear()+'-'+m+'%'
    let user =
      "select count(*) total,state  from userinfo " +
      (a_id ? waid : "") +
      " GROUP BY state";

    let orderTotal =
      "select count(*) total from helplist " + (a_id ? waid : "");
    let turnover =
      "select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 " +
      naid;
    let turnoverDaily =
      "select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and to_days(create_time) = to_days(now()) " +
      naid;
    let turnoverMonth =
      'select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and create_time like  "'+likeM+'" ' +
      naid;
    let turnoverYear =
      "select sum(total_fee) turnover from helplist where state in (1,2,3) and is_pay=1 and create_time like  '"+date.getFullYear()+"%' "  +
      naid;
    let refund =
      "select sum(total_fee) refund from helplist where state = 4 and is_pay=1 " +
      naid;
    let refundDaily =
      "select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and to_days(create_time) = to_days(now()) " +
      naid;
    let refundMonth =
      'select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and create_time like  "'+likeM+'" '+
      naid;
    let refundYear =
      "select sum(total_fee) refund from helplist where state = 4 and is_pay=1 and create_time like  '"+date.getFullYear()+"%' " +
      naid;
    let data = {
      user: await db.query(user, [a_id]),
      orderTotal: (await db.query(orderTotal, [a_id]))[0].total || 0,
      turnover: (await db.query(turnover, [a_id]))[0].turnover || 0,
      turnoverDaily: (await db.query(turnoverDaily, [a_id]))[0].turnover || 0,
      turnoverMonth: (await db.query(turnoverMonth, [a_id]))[0].turnover || 0,
      turnoverYear: (await db.query(turnoverYear, [a_id]))[0].turnover || 0,
      refund: (await db.query(refund, [a_id]))[0].refund || 0,
      refundDaily: (await db.query(refundDaily, [a_id]))[0].refund || 0,
      refundMonth: (await db.query(refundMonth, [a_id]))[0].refund || 0,
      refundYear: (await db.query(refundYear, [a_id]))[0].refund || 0
    };
    if (!a_id) {
      data.wxuserTotal = (await this.getWxuserTotal())[0].total || 0;
      data.wxuserTotalDaily =
        (await this.getWxuserTotalByDaily())[0].total || 0;
      data.areaTotal = (await this.getAreaTotal())[0].total || 0;
    }
    if (user) {
      for (let i in data.user) {
        if (data.user[i].state == 0) {
          data.userWating = data.user[i].total;
        }
        if (data.user[i].state == 1) {
          data.userPass = data.user[i].total;
        }
        if (data.user[i].state == 2) {
          data.userBack = data.user[i].total;
        }
      }
    }

    return data;
  },

  async getOrderStateType(args){
    let waid = "where  a_id=?";
    let naid = args.a_id ? "and a_id=?" : "";
    let type = args.sbtype == 'year' ? '%Y-%m':'%Y-%m-%d'
    let s0 = this.filterSql('create_time',type,args.sbdate,0,naid)
    let s1 = this.filterSql('pay_time',type,args.sbdate,1,naid)
    let s2 = this.filterSql('jd_time',type,args.sbdate,2,naid)
    let s3 = this.filterSql('com_time',type,args.sbdate,3,naid)
    let s4 = this.filterSql('cancel_time',type,args.sbdate,4,naid)
    let arr = []
    let tempArr0 = await db.query(s0, [args.a_id]) || []
    for(let i in tempArr0){
      tempArr0[i].state = 's0'
      arr.push(tempArr0[i])
    }
    let tempArr1 = await db.query(s1, [args.a_id]) || []
    for(let i in tempArr1){
      tempArr1[i].state = 's1'
      arr.push(tempArr1[i])
    }
    let tempArr2 = await db.query(s2, [args.a_id]) || []
    for(let i in tempArr2){
      tempArr2[i].state = 's2'
      arr.push(tempArr2[i])
    }
    let tempArr3 = await db.query(s3, [args.a_id]) || []
    for(let i in tempArr3){
      tempArr3[i].state = 's3'
      arr.push(tempArr3[i])
    }
    let tempArr4 = await db.query(s4, [args.a_id]) || []
    for(let i in tempArr4){
      tempArr4[i].state = 's4'
      arr.push(tempArr4[i])
    }
    return arr
    
  },
  async getOrderTypeData(args){
    let waid = "where  a_id=?";
    let naid = args.a_id ? "and a_id=?" : "";
    let type = args.sbtype == 'year' ? '%Y-%m':'%Y-%m-%d'
    let t0 = this.filterSql2(type,args.sbdate,naid,'打印服务')
    let t1 = this.filterSql2(type,args.sbdate,naid,'快递代取')
    let t2 = this.filterSql2(type,args.sbdate,naid,'校园跑腿')
    let t3 = this.filterSql2(type,args.sbdate,naid,'上门维修')
    let t4 = this.filterSql2(type,args.sbdate,naid,'代替服务')
    let t5 = this.filterSql2(type,args.sbdate,naid,'其他帮助')
    let arr = []
    let tempa0 = await db.query(t0, [args.a_id]) || []
    let tempa1 = await db.query(t1, [args.a_id]) || []
    let tempa2 = await db.query(t2, [args.a_id]) || []
    let tempa3 = await db.query(t3, [args.a_id]) || []
    let tempa4 = await db.query(t4, [args.a_id]) || []
    let tempa5 = await db.query(t5, [args.a_id]) || []
    for(let i in tempa0){
      arr.push(tempa0[i])
    }
    for(let i in tempa1){
      arr.push(tempa1[i])
    }
    for(let i in tempa2){
      arr.push(tempa2[i])
    }
    for(let i in tempa3){
      arr.push(tempa3[i])
    }
    for(let i in tempa4){
      arr.push(tempa4[i])
    }
    for(let i in tempa5){
      arr.push(tempa5[i])
    }
    return arr
  },
  filterSql(proptime, type,sbdate,state,naid ){
    return  'SELECT DATE_FORMAT('+proptime+',"'+type+'") as time,count(*) total FROM helplist where  '+proptime+' like "'+sbdate+'%" and state='+state+' '+naid+'  GROUP BY  time  '
  },
  filterSql2( type,sbdate,naid,title){
    return 'SELECT DATE_FORMAT(create_time,"'+type+'") as time,count(*) total,title FROM helplist where  create_time like "'+sbdate+'%" and title="'+title+'" '+naid+' and is_pay=1  GROUP BY  time  '
  },
  async getOrderTitle(args){
    let waid = "where  a_id=?";
    let naid = args.a_id ? "and a_id=?" : "";
    let type = args.sbtype == 'year' ? '%Y-%m':'%Y-%m-%d'

  }
};

module.exports = app;
