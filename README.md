# 校园综合服务平台-后台
## 介绍

> 本文档为校园综合服务平台服务端的安装部署教程，欢迎 star

> 项目不足请多指教，任何问题请移步对应的仓库提交Issues，或加入最下方交流群

### 项目链接
本项目配合以下两端使用：<br>
#### [1.后台-服务端地址：https://github.com/landalfYao/helpserver.git](https://github.com/landalfYao/helpserver.git)<br>
#### [2.小程序端地址：https://github.com/landalfYao/help.git](https://github.com/landalfYao/help.git)<br>

## 安装教程

#### 1.新建数据库
本目录中找到数据库文件 ```help.sql```
```
CREATE SCHEMA `help` DEFAULT CHARACTER SET utf8mb4 ;
```

2.修改配置文件
路径 pub/config/config.js

```
  MYSQL: {
    host: "localhost",
    user: "root",//数据库用户名
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
```

3.安装依赖并启动

```
npm install
npm start
```

访问[http://localhost:3337](http://localhost:3337)

## 交流方式

### ！搭建遇到任何问题，请联系群内管理人员，切勿相信其他非管理人员！

点击链接加入群聊【hbhzdtn交流群1群】：https://jq.qq.com/?_wv=1027&k=8P2OdlUB

点击链接加入群聊【hbhzdtn交流群2群】：https://jq.qq.com/?_wv=1027&k=jNQktW2Q
