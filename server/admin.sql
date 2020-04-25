
#1:进入news库
USE news;
#2:创建n_login1表
CREATE TABLE n_login1(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32)
);
#3:添加二条测试数据
INSERT INTO n_login1 VALUES(null,'高老师',md5('123'));
INSERT INTO n_login1 VALUES(null,'杨老师',md5('123'));
