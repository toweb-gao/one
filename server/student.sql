#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS news;
#创建数据库，设置编码
CREATE DATABASE news CHARSET=UTF8;
#功能一:完成用户登录表创建
#1:进入news库
USE news;
#2:创建n_login表
CREATE TABLE n_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32)
);
#3:添加二条测试数据[合法]
INSERT INTO n_login VALUES(null,'tom',md5('123'));
INSERT INTO n_login VALUES(null,'jerry',md5('123'));
