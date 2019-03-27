# Host: 129.28.89.58  (Version 5.5.57-log)
# Date: 2019-03-27 12:29:46
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "address_cate"
#

DROP TABLE IF EXISTS `address_cate`;
CREATE TABLE `address_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `is_show` int(1) NOT NULL DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `a_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "address_cate"
#


#
# Structure for table "address_info"
#

DROP TABLE IF EXISTS `address_info`;
CREATE TABLE `address_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `a_id` int(11) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `sub_name` varchar(100) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "address_info"
#


#
# Structure for table "address_user"
#

DROP TABLE IF EXISTS `address_user`;
CREATE TABLE `address_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `detail` varchar(100) DEFAULT NULL,
  `wx_id` int(11) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "address_user"
#


#
# Structure for table "area"
#

DROP TABLE IF EXISTS `area`;
CREATE TABLE `area` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `atype` int(1) DEFAULT NULL COMMENT '1城市 2校园',
  `name` varchar(100) DEFAULT NULL COMMENT '地区名',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`pk_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='地区';

#
# Data for table "area"
#


#
# Structure for table "auth_cate"
#

DROP TABLE IF EXISTS `auth_cate`;
CREATE TABLE `auth_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(30) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `is_show` int(1) NOT NULL DEFAULT '1',
  `remarks` varchar(50) NOT NULL DEFAULT '',
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='权限分类';

#
# Data for table "auth_cate"
#

INSERT INTO `auth_cate` VALUES (1,'权限管理','2019-01-29 10:09:04',0,1,'只能超级管理员用',1),(2,'权限类目管理','2019-01-29 11:45:14',0,1,'1',2),(3,'角色管理','2019-01-29 14:44:14',0,1,'1',3),(4,'日志管理','2019-01-29 14:44:26',0,1,'1',4),(5,'用户管理','2019-01-29 14:45:28',0,1,'1',5),(6,'微信用户管理','2019-01-29 14:45:44',0,1,'1',6),(7,'数据分析管理','2019-01-29 14:46:51',0,1,'1',7),(8,'代理商管理','2019-01-29 14:47:59',0,1,'1',8),(9,'代理地区管理','2019-01-29 14:48:06',0,1,'1',9),(10,'订单管理','2019-01-29 14:48:20',0,1,'1',10),(11,'地址管理','2019-01-29 14:49:14',0,1,'1',11),(12,'微信地址管理','2019-01-30 00:07:30',0,1,'1',12),(13,'文件管理','2019-01-30 00:16:38',0,1,'1',13),(14,'账户管理','2019-02-14 10:52:50',0,1,'1',14),(15,'广告营销管理','2019-02-16 16:25:38',0,1,'1',15),(16,'文章管理','2019-02-17 17:53:11',0,1,'1',16);

#
# Structure for table "auths"
#

DROP TABLE IF EXISTS `auths`;
CREATE TABLE `auths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_id` int(11) NOT NULL DEFAULT '0',
  `auth_name` varchar(30) NOT NULL DEFAULT '',
  `auth_url` varchar(100) NOT NULL DEFAULT '' COMMENT '路径',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `remarks` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

#
# Data for table "auths"
#

INSERT INTO `auths` VALUES (1,1,'新增权限','/api/auth/add','2019-01-29 13:28:15',0,'超级管理员专属'),(2,1,'修改权限','/api/auth/update','2019-01-29 13:35:59',0,'超级管理员专属'),(3,1,'删除权限','/api/auth/del','2019-01-29 14:52:59',0,'超管专属'),(4,1,'查询权限','/api/auth/get','2019-01-29 14:53:26',0,'1'),(5,2,'新增权限类目','/api/auth/cate/add','2019-01-29 14:53:58',0,'超管专属'),(6,2,'修改权限类目','/api/auth/cate/update','2019-01-29 14:54:08',0,'超管专属'),(7,2,'删除权限类目','/api/auth/cate/del','2019-01-29 14:54:45',0,'超管专属'),(8,2,'查询权限类目','/api/auth/cate/get','2019-01-29 14:54:54',0,'超管专属'),(9,2,'修改权限类目显示','/api/auth/cate/update/onShow','2019-01-29 14:55:40',0,'超管专属'),(10,2,'修改权限类目关闭','/api/auth/cate/update/unShow','2019-01-29 14:55:49',0,'超管专属'),(11,3,'新增角色','/api/role/add','2019-01-29 14:57:29',0,'1'),(12,3,'删除角色','/api/role/del','2019-01-29 14:58:02',0,'1'),(13,3,'修改角色','/api/role/update','2019-01-29 14:58:11',0,'1'),(14,3,'查询角色','/api/role/get','2019-01-29 14:58:21',0,'1'),(15,3,'禁用角色','/api/role/disable','2019-01-29 14:59:09',0,'1'),(16,3,'启用角色','/api/role/avaliable','2019-01-29 14:59:27',0,'1'),(17,4,'查询所有用户日志','/api/user/log/get','2019-01-29 15:00:13',0,'1'),(18,5,'新增用户','/api/user/register','2019-01-29 15:02:19',0,'1'),(19,5,'查询用户','/api/user/get','2019-01-29 15:02:36',0,'1'),(20,5,'根据代理地查询用户','/api/user/get/aid','2019-01-29 15:03:43',0,'1'),(21,5,'获取用户个人信息','/api/user/info','2019-01-29 15:04:43',0,'1'),(22,5,'修改用户个人信息','/api/user/update','2019-01-29 15:05:18',0,'1'),(23,5,'修改用户个人密码','/api/user/update/pwd','2019-01-29 15:05:38',0,'1'),(24,5,'禁用用户','/api/user/state/disable','2019-01-29 15:06:10',0,'1'),(25,5,'启用用户','/api/user/state/available','2019-01-29 15:06:23',0,'1'),(26,6,'查询微信用户','/api/wx/user/get','2019-01-29 15:08:52',0,'1'),(27,6,'微信登录','/api/wx/user/login','2019-01-29 15:09:25',0,'1'),(28,6,'微信用户审核信息修改','/api/wx/user/update','2019-01-29 15:09:57',0,'1'),(29,6,'微信用户修改','/api/wx/user/update/wx','2019-01-29 15:11:15',0,'1'),(30,6,'修改默认地址','/api/wx/user/update/def/address','2019-01-29 15:11:58',0,'1'),(31,6,'删除微信用户','/api/wx/user/del','2019-01-29 15:12:35',0,'1'),(32,6,'根据ID获取微信用户','/api/wx/user/get/id','2019-01-29 15:14:38',0,'1'),(33,6,'根据WXID获取审核信息','/api/wx/user/get/info/wxid','2019-01-29 15:22:54',0,'1'),(34,6,'获取审核信息列表','/api/wx/user/get/info','2019-01-29 15:23:46',0,'1'),(35,6,'提交新的审核信息','/api/wx/user/regis','2019-01-29 15:24:24',0,'1'),(36,6,'修改审核信息','/api/wx/user/update/info','2019-01-29 15:24:42',0,'1'),(37,6,'审核通过操作','/api/wx/user/info/pass','2019-01-29 15:25:25',0,'1'),(38,6,'审核驳回操作','/api/wx/user/info/unpass','2019-01-29 15:25:37',0,'1'),(39,7,'获取平台数据','/api/anlysis/get','2019-01-29 15:26:44',0,'1'),(40,7,'获取代理数据','/api/anlysis/get/agent','2019-01-29 15:27:04',0,'1'),(41,7,'获取微信用户数据','/api/anlysis/get/wx','2019-01-29 15:27:30',0,'1'),(42,8,'新增服务项','/api/server/add','2019-01-29 15:28:50',0,'1'),(43,8,'修改服务项','/api/server/update','2019-01-29 15:29:17',0,'1'),(44,8,'删除服务项','/api/server/del','2019-01-29 15:29:24',0,'1'),(45,8,'查询服务项','/api/server/get','2019-01-29 15:29:48',0,'1'),(46,8,'根据服务项ID查询','/api/server/get/id','2019-01-29 15:30:28',0,'1'),(47,8,'根据代理ID查询','/api/server/get/uid','2019-01-29 15:30:41',0,'1'),(48,3,'赋予权限','/api/auth/grant','2019-01-29 16:36:58',0,'1'),(49,3,'删除赋予的权限','/api/auth/grant/del','2019-01-29 16:37:29',0,'1'),(50,3,'查询赋予的权限','/api/auth/grant/get','2019-01-29 16:37:37',0,'1'),(51,10,'查询订单','/api/help/get2','2019-01-29 19:48:20',0,'1'),(52,11,'新增地址','/api/address/add','2019-01-29 21:36:54',0,'1'),(53,11,'修改地址','/api/address/update','2019-01-29 21:37:15',0,'1'),(54,11,'删除地址','/api/address/del','2019-01-29 21:37:24',0,'1'),(55,11,'查询地址','/api/address/get','2019-01-29 21:37:35',0,'1'),(56,11,'查询地址类目','/api/address/cate/get','2019-01-29 21:38:03',0,'1'),(57,11,'修改地址类目','/api/address/cate/update','2019-01-29 21:38:08',0,'1'),(58,11,'删除地址类目','/api/address/cate/del','2019-01-29 21:38:23',0,'1'),(59,11,'新增地址类目','/api/address/cate/add','2019-01-29 21:38:33',0,'1'),(60,12,'微信用户地址添加','/api/user/address/add','2019-01-30 00:08:28',0,'1'),(61,12,'微信用户地址修改','/api/user/address/update','2019-01-30 00:08:51',0,'1'),(62,12,'微信用户地址删除','/api/user/address/del','2019-01-30 00:08:59',0,'1'),(63,12,'获取微信用户地址列表','/api/user/address/get','2019-01-30 00:09:13',0,'1'),(64,12,'根据ID获取地址','/api/user/address/get/id','2019-01-30 00:09:51',0,'1'),(65,9,'新增代理地区','/api/area/add','2019-01-30 00:13:10',0,'小程序'),(66,9,'修改代理地区','/api/area/update','2019-01-30 00:13:32',0,'小程序'),(67,9,'删除代理地区','/api/area/del','2019-01-30 00:13:46',0,'小程序'),(68,9,'获取代理地区列表','/api/area/get','2019-01-30 00:13:59',0,'小程序'),(69,9,'微信获取代理地区列表','/api/area/wxget','2019-01-30 00:15:31',0,'小程序'),(70,13,'上传文件','/api/file/upload','2019-01-30 00:17:20',0,'1'),(71,13,'查询文件','/api/file/get','2019-01-30 00:17:38',0,'1'),(72,13,'清除临时文件','/api/file/temp','2019-01-30 00:19:47',0,'1'),(73,10,'新增订单','/api/help/add','2019-01-30 00:25:27',0,'1'),(74,10,'微信支付','/api/help/pay','2019-01-30 00:26:25',0,'1'),(75,10,'接单操作','/api/help/jd','2019-01-30 00:26:52',0,'1'),(76,10,'确认订单操作','/api/help/confirm','2019-01-30 00:27:32',0,'1'),(77,10,'修改状态操作','/api/help/update/state','2019-01-30 00:28:11',0,'1'),(78,10,'删除订单','/api/help/del','2019-01-30 00:28:34',0,'1'),(79,6,'获取接单用户','/api/wx/user/get/com','2019-01-30 00:50:38',0,'1'),(80,5,'账户查询','/api/ct/get','2019-02-06 21:55:20',0,'1'),(81,7,'查询微信用户部分数据','/api/anlysis/get/wx/sm','2019-02-06 23:25:10',0,'1'),(82,7,'查看订单状态数据','/api/anlysis/get/order/state','2019-02-08 16:20:05',0,'1'),(83,7,'查看订单类型数据','/api/anlysis/get/order/type','2019-02-08 16:20:36',0,'1'),(84,14,'获取用户账户余额信息','/api/wallet/get/uid','2019-02-14 10:53:43',0,'1'),(85,14,'申请提现','/api/wallet/cash','2019-02-14 11:32:40',0,'1'),(86,14,'查询提现记录','/api/wallet/cash/get','2019-02-15 10:51:47',0,'1'),(87,15,'新增轮播图','/api/calousels/add','2019-02-16 16:26:28',0,'1'),(88,15,'修改轮播图','/api/calousels/update','2019-02-16 16:26:52',0,'1'),(89,15,'轮播图上架','/api/calousels/show','2019-02-16 16:27:08',0,'1'),(90,15,'轮播图下架','/api/calousels/unshow','2019-02-16 16:27:16',0,'1'),(91,15,'轮播图删除','/api/calousels/del','2019-02-16 16:27:30',0,'1'),(92,15,'获取轮播图','/api/calousels/get','2019-02-16 16:27:41',0,'1'),(93,5,'设置重要通知','/api/user/update/emer','2019-02-16 19:45:18',0,'1'),(94,5,'查看重要通知','/api/user/get/emer','2019-02-16 19:45:45',0,'1'),(95,16,'新增文章','/api/richtext/add','2019-02-17 17:53:34',0,'1'),(96,16,'删除文章','/api/richtext/del','2019-02-17 17:54:01',0,'1'),(97,16,'修改文章','/api/richtext/update','2019-02-17 17:54:11',0,'1'),(98,16,'查询文章','/api/richtext/get','2019-02-17 17:54:24',0,'1'),(99,16,'根据ID查询文章','/api/richtext/get/id','2019-02-17 17:57:41',0,'1');

#
# Structure for table "calousels"
#

DROP TABLE IF EXISTS `calousels`;
CREATE TABLE `calousels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cover` varchar(255) NOT NULL DEFAULT '',
  `admin_id` int(11) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `is_show` int(1) NOT NULL DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sort` int(11) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `company` varchar(50) DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `a_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='轮播图';

#
# Data for table "calousels"
#


#
# Structure for table "capital_trend"
#

DROP TABLE IF EXISTS `capital_trend`;
CREATE TABLE `capital_trend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_id` int(11) NOT NULL DEFAULT '0' COMMENT '代理',
  `u_id` int(11) NOT NULL DEFAULT '0' COMMENT '微信用户',
  `h_id` int(11) NOT NULL DEFAULT '0' COMMENT '订单ID',
  `p_get` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '平台获得收益',
  `u_get` double(10,2) NOT NULL DEFAULT '0.00' COMMENT '用户获得',
  `a_get` double(10,2) NOT NULL DEFAULT '0.00' COMMENT '代理获得收益',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rate` varchar(30) NOT NULL DEFAULT '0.00' COMMENT '收益率',
  PRIMARY KEY (`id`),
  UNIQUE KEY `h_id` (`h_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='资金走向';

#
# Data for table "capital_trend"
#


#
# Structure for table "cash_recode"
#

DROP TABLE IF EXISTS `cash_recode`;
CREATE TABLE `cash_recode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `cash_fee` double(10,2) NOT NULL DEFAULT '0.00',
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL DEFAULT '0' COMMENT 'state = 1提现成功，state=0提现审核中，state=2 提现失败',
  `type` int(1) NOT NULL DEFAULT '1' COMMENT '1微信用户',
  `msg` varchar(100) DEFAULT NULL,
  `trade_no` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='提现记录';

#
# Data for table "cash_recode"
#


#
# Structure for table "dl_server"
#

DROP TABLE IF EXISTS `dl_server`;
CREATE TABLE `dl_server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dl_id` int(11) DEFAULT NULL COMMENT '代理ID',
  `server_name` varchar(30) DEFAULT NULL COMMENT '服务项名称',
  `dl_sy` double(10,3) DEFAULT NULL COMMENT '代理收益',
  `user_sy` double(10,3) DEFAULT NULL COMMENT '用户收益',
  `p_sy` double(10,3) DEFAULT NULL COMMENT '平台收益',
  `creare_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_show` int(1) DEFAULT NULL COMMENT '0关闭，1开启',
  `price_gui` varchar(30) DEFAULT NULL COMMENT '价格规则{s:1,m:2,l:3} | p:1 | p:false',
  `des` varchar(255) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `jdr` varchar(255) DEFAULT '0' COMMENT '接单人',
  `rate_id` int(11) DEFAULT NULL COMMENT '收益ID',
  `tags` text COMMENT '标签',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`server_name`,`dl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='代理设置';

#
# Data for table "dl_server"
#


#
# Structure for table "files"
#

DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(150) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `realname` varchar(70) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(30) DEFAULT NULL,
  `wx_id` int(11) DEFAULT NULL,
  `is_temp` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "files"
#


#
# Structure for table "helplist"
#

DROP TABLE IF EXISTS `helplist`;
CREATE TABLE `helplist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wx_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(30) DEFAULT NULL,
  `state` int(1) DEFAULT NULL COMMENT '0待付款 1待接单 2待完成 3已完成 4已取消',
  `des` varchar(255) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `a_id` int(11) DEFAULT NULL COMMENT '发布地区ID',
  `total_fee` double(6,2) DEFAULT NULL COMMENT '价格',
  `form_id` varchar(255) DEFAULT NULL,
  `mu` varchar(100) DEFAULT NULL COMMENT '目的地',
  `qi` varchar(100) DEFAULT NULL COMMENT '起点',
  `file` varchar(100) DEFAULT NULL COMMENT '文件',
  `order_num` varchar(60) DEFAULT NULL,
  `is_pay` int(1) NOT NULL DEFAULT '0' COMMENT '0未支付 1已支付',
  `jd_id` int(11) DEFAULT NULL COMMENT '接单人ID',
  `openid` varchar(40) DEFAULT NULL,
  `page` int(11) DEFAULT NULL COMMENT '页数',
  `cai` varchar(255) DEFAULT NULL COMMENT '是否彩印 1是0否',
  `out_refund_no` varchar(64) DEFAULT NULL,
  `pay_time` timestamp NULL DEFAULT NULL COMMENT '付款时间',
  `jd_time` timestamp NULL DEFAULT NULL COMMENT '接单时间',
  `com_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  `cancel_time` timestamp NULL DEFAULT NULL COMMENT '取消时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='帮助列表';

#
# Data for table "helplist"
#


#
# Structure for table "reasons_cancel"
#

DROP TABLE IF EXISTS `reasons_cancel`;
CREATE TABLE `reasons_cancel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT '0',
  `wx_id` int(11) NOT NULL DEFAULT '0',
  `msg` varchar(255) NOT NULL DEFAULT '',
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='取消原因表';

#
# Data for table "reasons_cancel"
#


#
# Structure for table "role_auth"
#

DROP TABLE IF EXISTS `role_auth`;
CREATE TABLE `role_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL DEFAULT '0',
  `auth_id` int(11) NOT NULL DEFAULT '0',
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_id` (`role_id`,`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='角色权限';

#
# Data for table "role_auth"
#

INSERT INTO `role_auth` VALUES (4,1,4,0,'2019-01-29 19:16:42'),(11,1,11,0,'2019-01-29 19:17:27'),(14,1,14,0,'2019-01-29 19:17:27'),(15,1,15,0,'2019-01-29 19:17:27'),(16,1,16,0,'2019-01-29 19:17:27'),(17,1,48,0,'2019-01-29 19:17:27'),(18,1,49,0,'2019-01-29 19:17:27'),(19,1,50,0,'2019-01-29 19:17:27'),(20,1,17,0,'2019-01-29 19:17:27'),(21,1,18,0,'2019-01-29 19:17:27'),(22,1,19,0,'2019-01-29 19:17:27'),(23,1,20,0,'2019-01-29 19:17:27'),(24,1,21,0,'2019-01-29 19:17:27'),(25,1,22,0,'2019-01-29 19:17:27'),(26,1,23,0,'2019-01-29 19:17:27'),(27,1,24,0,'2019-01-29 19:17:27'),(28,1,25,0,'2019-01-29 19:17:27'),(29,1,26,0,'2019-01-29 19:17:27'),(30,1,27,0,'2019-01-29 19:17:27'),(31,1,28,0,'2019-01-29 19:17:27'),(32,1,29,0,'2019-01-29 19:17:27'),(33,1,30,0,'2019-01-29 19:17:27'),(34,1,31,0,'2019-01-29 19:17:27'),(35,1,32,0,'2019-01-29 19:17:27'),(36,1,33,0,'2019-01-29 19:17:27'),(37,1,34,0,'2019-01-29 19:17:27'),(38,1,35,0,'2019-01-29 19:17:27'),(39,1,36,0,'2019-01-29 19:17:27'),(40,1,37,0,'2019-01-29 19:17:27'),(41,1,38,0,'2019-01-29 19:17:27'),(42,1,39,0,'2019-01-29 19:17:27'),(43,1,40,0,'2019-01-29 19:17:27'),(44,1,41,0,'2019-01-29 19:17:27'),(53,2,40,0,'2019-01-30 00:41:23'),(54,2,41,0,'2019-01-30 00:41:23'),(55,2,45,0,'2019-01-30 00:41:23'),(56,2,46,0,'2019-01-30 00:41:23'),(57,2,47,0,'2019-01-30 00:41:23'),(58,2,51,0,'2019-01-30 00:41:23'),(59,2,75,0,'2019-01-30 00:41:23'),(60,2,76,0,'2019-01-30 00:41:23'),(61,2,52,0,'2019-01-30 00:41:23'),(62,2,53,0,'2019-01-30 00:41:23'),(63,2,54,0,'2019-01-30 00:41:23'),(64,2,55,0,'2019-01-30 00:41:23'),(65,2,56,0,'2019-01-30 00:41:23'),(66,2,57,0,'2019-01-30 00:41:23'),(67,2,58,0,'2019-01-30 00:41:23'),(68,2,59,0,'2019-01-30 00:41:23'),(69,2,70,0,'2019-01-30 00:41:23'),(70,2,71,0,'2019-01-30 00:41:23'),(71,2,72,0,'2019-01-30 00:41:23'),(72,2,34,0,'2019-01-30 00:48:52'),(73,2,37,0,'2019-01-30 00:48:52'),(74,2,38,0,'2019-01-30 00:48:52'),(75,2,79,0,'2019-01-30 00:50:52'),(76,2,21,0,'2019-01-30 00:52:06'),(77,2,22,0,'2019-01-30 00:52:06'),(78,2,23,0,'2019-01-30 00:52:06'),(79,3,27,0,'2019-02-03 15:30:31'),(80,3,28,0,'2019-02-03 15:30:31'),(81,3,29,0,'2019-02-03 15:30:31'),(82,3,30,0,'2019-02-03 15:30:31'),(83,3,32,0,'2019-02-03 15:30:31'),(84,3,33,0,'2019-02-03 15:30:31'),(85,3,35,0,'2019-02-03 15:30:31'),(86,3,36,0,'2019-02-03 15:30:31'),(87,3,51,0,'2019-02-03 15:30:31'),(88,3,73,0,'2019-02-03 15:30:31'),(89,3,74,0,'2019-02-03 15:30:31'),(90,3,75,0,'2019-02-03 15:30:31'),(91,3,76,0,'2019-02-03 15:30:31'),(92,3,77,0,'2019-02-03 15:30:31'),(93,3,60,0,'2019-02-03 15:30:31'),(94,3,61,0,'2019-02-03 15:30:31'),(95,3,62,0,'2019-02-03 15:30:31'),(96,3,63,0,'2019-02-03 15:30:31'),(97,3,64,0,'2019-02-03 15:30:31'),(98,3,70,0,'2019-02-03 15:30:31'),(99,3,71,0,'2019-02-03 15:30:31'),(100,3,72,0,'2019-02-03 15:30:31'),(101,3,68,0,'2019-02-06 21:34:08'),(102,3,47,0,'2019-02-06 21:35:16'),(103,2,80,0,'2019-02-06 21:55:48'),(104,3,41,0,'2019-02-06 23:25:36'),(105,3,81,0,'2019-02-06 23:25:36'),(106,2,81,0,'2019-02-06 23:26:05'),(107,2,82,0,'2019-02-08 16:20:58'),(108,2,83,0,'2019-02-08 16:20:58'),(109,3,84,0,'2019-02-14 10:53:53'),(110,3,85,0,'2019-02-14 11:33:14'),(111,3,92,0,'2019-02-16 16:32:02'),(112,2,93,0,'2019-02-16 19:46:06'),(113,2,94,0,'2019-02-16 19:46:06'),(114,3,94,0,'2019-02-16 19:46:25'),(115,2,95,0,'2019-02-17 17:57:55'),(116,2,96,0,'2019-02-17 17:57:55'),(117,2,97,0,'2019-02-17 17:57:55'),(118,2,98,0,'2019-02-17 17:57:55'),(119,2,99,0,'2019-02-17 17:57:55'),(120,3,99,0,'2019-02-17 17:58:07'),(121,3,55,0,'2019-02-21 14:38:08'),(122,3,56,0,'2019-02-21 14:38:08'),(123,2,43,0,'2019-02-23 14:28:43');

#
# Structure for table "roles"
#

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL DEFAULT '' COMMENT '角色名',
  `remarks` varchar(50) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(11) NOT NULL DEFAULT '0',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0可用1禁用',
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='角色';

#
# Data for table "roles"
#

INSERT INTO `roles` VALUES (1,'管理员','2','2019-01-29 14:31:57',0,0,1),(2,'代理','12','2019-01-29 14:33:02',0,0,2),(3,'微信用户','1','2019-01-29 15:21:20',0,0,3);

#
# Structure for table "sw_file"
#

DROP TABLE IF EXISTS `sw_file`;
CREATE TABLE `sw_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) DEFAULT NULL,
  `file_name` varchar(100) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) DEFAULT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `file_name` (`file_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='文件';

#
# Data for table "sw_file"
#


#
# Structure for table "sw_file_group"
#

DROP TABLE IF EXISTS `sw_file_group`;
CREATE TABLE `sw_file_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(30) DEFAULT NULL,
  `admin_id` int(11) NOT NULL DEFAULT '0',
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "sw_file_group"
#


#
# Structure for table "sw_richtext"
#

DROP TABLE IF EXISTS `sw_richtext`;
CREATE TABLE `sw_richtext` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(30) DEFAULT NULL COMMENT '编辑人',
  `content` text,
  `remarks` varchar(30) DEFAULT NULL,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(30) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `contact` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "sw_richtext"
#


#
# Structure for table "userinfo"
#

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wx_id` int(11) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `card_num` varchar(18) DEFAULT NULL,
  `cert` varchar(150) DEFAULT NULL COMMENT '证件照片',
  `a_id` int(11) DEFAULT NULL COMMENT '证件照片方面',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0.审核中  1.已通过  2.不通过',
  `msg` varchar(100) DEFAULT NULL COMMENT '不通过 原因',
  `stu_card` varchar(100) DEFAULT NULL COMMENT '学生证照片',
  `form_id` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `card_num` (`card_num`),
  KEY `wx_id` (`wx_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "userinfo"
#


#
# Structure for table "wallets"
#

DROP TABLE IF EXISTS `wallets`;
CREATE TABLE `wallets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0',
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '1.微信用户  2.平台或代理用户',
  `income_total` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '总收入',
  `cash` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '已提现',
  `ceate_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL DEFAULT '1' COMMENT '1可提现 2冻结',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='钱包';

#
# Data for table "wallets"
#


#
# Structure for table "wx_logs"
#

DROP TABLE IF EXISTS `wx_logs`;
CREATE TABLE `wx_logs` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

#
# Data for table "wx_logs"
#


#
# Structure for table "wxmp_user"
#

DROP TABLE IF EXISTS `wxmp_user`;
CREATE TABLE `wxmp_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(60) NOT NULL DEFAULT '',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `wx_id` int(11) NOT NULL DEFAULT '0',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0.不接受订单提醒  1.接受订单提醒',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='公众号用户';

#
# Data for table "wxmp_user"
#


#
# Structure for table "wxuser"
#

DROP TABLE IF EXISTS `wxuser`;
CREATE TABLE `wxuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(30) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `openid` varchar(60) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `payment` double(15,3) NOT NULL DEFAULT '0.000' COMMENT '钱包',
  `gender` int(1) DEFAULT NULL,
  `dphone` varchar(255) DEFAULT NULL COMMENT '短号',
  `auth` int(1) NOT NULL DEFAULT '0' COMMENT '0 不可接单 1.可接单',
  `default_address` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='微信用户';

#
# Data for table "wxuser"
#


#
# Structure for table "y_logs"
#

DROP TABLE IF EXISTS `y_logs`;
CREATE TABLE `y_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0',
  `fi_table` varchar(100) NOT NULL DEFAULT '' COMMENT '被操作的表',
  `table_id` varchar(255) DEFAULT NULL COMMENT '被操作表的id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `des` varchar(150) DEFAULT NULL COMMENT '操作描述',
  `api_url` varchar(150) DEFAULT NULL,
  `op_code` varchar(255) NOT NULL DEFAULT '' COMMENT '操作code码',
  `is_delete` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='日志';

#
# Data for table "y_logs"
#


#
# Structure for table "y_user"
#

DROP TABLE IF EXISTS `y_user`;
CREATE TABLE `y_user` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `a_id` varchar(20) DEFAULT '' COMMENT '校园Id',
  `dtype` int(1) DEFAULT NULL COMMENT '账号类型 1管理员  2校园代理 3代理子账号',
  `user_state` varchar(10) NOT NULL DEFAULT 'AVAILABLE' COMMENT '1.可用 2不可用',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` int(1) NOT NULL DEFAULT '0',
  `payment` double(15,3) NOT NULL DEFAULT '0.000' COMMENT '钱包',
  `phone` varchar(11) DEFAULT NULL,
  `deadline` timestamp NULL DEFAULT NULL COMMENT '代理期限',
  `role_id` int(11) DEFAULT NULL,
  `open_emer` int(1) NOT NULL DEFAULT '0' COMMENT '0关闭，1开启   重要通知',
  `emer_title` varchar(30) DEFAULT NULL COMMENT '紧急通知标题',
  `emer_content` varchar(300) DEFAULT '' COMMENT '紧急通知上下文',
  PRIMARY KEY (`pk_id`),
  UNIQUE KEY `a_id` (`a_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='平台用户';

#
# Data for table "y_user"
#

INSERT INTO `y_user` VALUES (1,'admin','ebcbf97ec1d80c0388d39bf508039baa','',1,'AVAILABLE','2019-03-20 11:00:24',0,0.000,NULL,NULL,NULL,0,NULL,'');
