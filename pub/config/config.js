/**
 * 配置文件
 */


//开发配置
const development = {
  //服务器端口
  SERVER_PORT: 3000,

  //REDIS配置
  REDIS: {
    host: "localhost",
    port: 6379,
    password: "abcd",
    maxAge: 3600000
  },

  //MYSQL数据库配置
  MYSQL: {
    host: "localhost",
    user: "root",
    password: "", //数据库密码
    port: "3306",
    database: "help", //数据库名
    timezone: "+08:00",
    dateStrings: true
  },


  APP_ID: "", //微信小程序APPID
  APP_SECRET: "", //微信小程序APP密钥
  Mch_id: "", //商户号
  Mch_key: "", //商户密钥

  // WXMP_TOKEN: 'baixiaochuanglian2023',

  uploadPath: "http://localhost:3337/uploads/files/", //图片路径
  imagesPath: "http://localhost:3337/images/",


  userType: {
    WXM: 'wxm',
    YZY: 'yzy'
  },

  getWxPayOrdrID: function () {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var mouth = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    var msecond = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
    if (mouth < 10) {
      /*月份小于10  就在前面加个0*/
      mouth = String(String(0) + String(mouth));
    }
    if (day < 10) {
      /*日期小于10  就在前面加个0*/
      day = String(String(0) + String(day));
    }
    if (hour < 10) {
      /*时小于10  就在前面加个0*/
      hour = String(String(0) + String(hour));
    }
    if (minute < 10) {
      /*分小于10  就在前面加个0*/
      minute = String(String(0) + String(minute));
    }
    if (second < 10) {
      /*秒小于10  就在前面加个0*/
      second = String(String(0) + String(second));
    }
    if (msecond < 10) {
      msecond = String(String(00) + String(second));
    } else if (msecond >= 10 && msecond < 100) {
      msecond = String(String(0) + String(second));
    }

    var currentDate =
      String(year) +
      String(mouth) +
      String(day) +
      String(hour) +
      String(minute) +
      String(second) +
      String(msecond);
    return currentDate;
  },

  //超级管理员 Y_USER PK_ID
  SUPER_ADMINISTRATOR: 1,

  //登录限制
  limiTLogin: {
    open: true,
    limitTime: 2 * 60 * 1000, //几分钟之内连续输错
    inputPwdErrorNum: 4, //密码连续输错次数
    waitTime: 5 * 60 * 1000 //等待时间
  }
};

const config = development;

module.exports = config;