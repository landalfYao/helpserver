# Host: 129.28.89.58  (Version 5.5.57-log)
# Date: 2019-03-20 11:01:35
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='权限分类';

#
# Data for table "auth_cate"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='权限表';

#
# Data for table "auths"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='角色权限';

#
# Data for table "role_auth"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='角色';

#
# Data for table "roles"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='平台用户';

#
# Data for table "y_user"
#

INSERT INTO `y_user` VALUES (1,'admin','ebcbf97ec1d80c0388d39bf508039baa','',1,'AVAILABLE','2019-03-20 11:00:24',0,0.000,NULL,NULL,NULL,0,NULL,'');
