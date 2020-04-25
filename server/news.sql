#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS news1;
#创建数据库，设置编码
CREATE DATABASE news1 CHARSET=UTF8;
#一:用户登录表创建
#1:进入news1库
USE news1;
#2:创建student表  
CREATE TABLE student(
  userid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50) DEFAULT NULL,
  upwd  VARCHAR(32) DEFAULT NULL,
  sex   VARCHAR(11) DEFAULT NULL,
  birthday VARCHAR(32) DEFAULT NULL,
  sno VARCHAR(32) DEFAULT NULL,
  phone VARCHAR(16) DEFAULT NULL 
);
#3:添加数据
INSERT INTO student VALUES(null,'tom',md5('123456'),'男',"1997/02/05",1001,"15756787489");
INSERT INTO student VALUES(null,'juery',md5('123456'),'女',"1997/12/05",1002,"15756787489");
INSERT INTO student VALUES(null,'add',md5('123456'),'男',"1997/05/05",1003,"15756787489");
INSERT INTO student VALUES(null,'sgh',md5('123456'),'女',"1997/07/05",1004,"15756787489");
INSERT INTO student VALUES(null,'hyrf',md5('123456'),'男',"1997/08/05",1005,"15756787489");
INSERT INTO student VALUES(null,'kus',md5('123456'),'男',"1997/09/05",1006,"15756787489");
INSERT INTO student VALUES(null,'sss',md5('123456'),'男',"1997/02/05",1007,"15756787489");
INSERT INTO student VALUES(null,'iuy',md5('123456'),'男',"1997/01/05",1008,"15756787489");
INSERT INTO student VALUES(null,'vbh',md5('123456'),'男',"1997/03/05",1009,"15756787489");
INSERT INTO student VALUES(null,'thu',md5('123456'),'男',"1997/06/05",1010,"15756787489");
INSERT INTO student VALUES(null,'the shy',md5('123456'),'男',"1997/02/05",1011,"15756787489");
INSERT INTO student VALUES(null,'rookie',md5('123456'),'男',"1997/02/05",1012,"15756787489");
INSERT INTO student VALUES(null,'tdaoubl',md5('123456'),'男',"1997/02/05",013,"15756787489");
INSERT INTO student VALUES(null,'double',md5('123456'),'男',"1997/02/05",014,"15756787489");
#2:创建管理员登录表admin表
DROP TABLE IF EXISTS admins;

CREATE TABLE admins(
  admid INT PRIMARY KEY AUTO_INCREMENT,
 uname VARCHAR(50) DEFAULT NULL,
  upwd VARCHAR(32) DEFAULT NULL,
  sex VARCHAR(11) DEFAULT NULL,
  birthday VARCHAR(32) DEFAULT NULL,
  sno VARCHAR(32) DEFAULT NULL,
  phone VARCHAR(16) DEFAULT NULL ,
  work_num VARCHAR(11) DEFAULT NULL 
);
#3:添加二条测试数据
INSERT INTO admins VALUES(null,'高老师',md5('123456'),'男','1995/05/20',001,'15756787489',25);
INSERT INTO admins VALUES(null,'杨老师',md5('123456'),'女','1996/11/12',001,'15756787489',24);

#新闻信息表
CREATE TABLE newslist(
  newsid INT PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(50) DEFAULT NULL,
  author  VARCHAR(32) DEFAULT NULL,
  ntype   VARCHAR(11) DEFAULT NULL,
  origin VARCHAR(32) DEFAULT NULL,
  ntime VARCHAR(32) DEFAULT NULL
);
#添加新闻信息
INSERT INTO newslist VALUES(null,'最新疫情情况1','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况2','张三','校内新闻','搜狗','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况3','张三','校外新闻','搜狗','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况4','张三','校内新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况5','张三','校外新闻','微博','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况6','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况7','张三','校外新闻','新华社','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况8','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况9','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况10','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况11','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况12','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况13','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况14','张三','校外新闻','百度','2020/02/05');
INSERT INTO newslist VALUES(null,'最新疫情情况15','张三','校外新闻','百度','2020/02/05');

#新闻详情表
CREATE TABLE newsdetails(
  newsid INT PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(50) DEFAULT NULL,
  ntype VARCHAR(11) DEFAULT NULL,
  origin VARCHAR(32) DEFAULT NULL,
  ntime VARCHAR(32) DEFAULT NULL,
  content VARCHAR(1000) DEFAULT NULL
);
#添加新闻详情
INSERT INTO newsdetails VALUES(null,'最新疫情情况1','校外新闻','百度','2020/02/05','
    2月7日，教育部召开全国教育系统应对新型冠状病毒感染肺炎疫情防控工作视频会议。教育部党组书记、部长、部应对疫情工作领导小组组长陈宝生强调，防止疫情向学校扩散、守护师生安康、维护校园稳定，是教育系统的一项重大政治任务，是当前最重要的工作。要以高度的责任心和强烈的使命感，守住校园这片净土，确保师生生命安全。他要求，未经学校批准学生一律不准返校，校外无关人员一律不准进校门，师生进入校门一律核验身份和检测体温，对发烧咳嗽者一律实行医学隔离观察，不服从管理者一律严肃处理。2月13日四川省教育厅发出通知要求全省各级各类学校2020年2月底前暂不开学，具体开学时间将视疫情防控情况，经科学评估后确定，届时提前向社会公布。
');
INSERT INTO newsdetails VALUES(null,'最新疫情情况2','校外新闻','百度','2020/02/05','
    2月7日，教育部召开全国教育系统应对新型冠状病毒感染肺炎疫情防控工作视频会议。教育部党组书记、部长、部应对疫情工作领导小组组长陈宝生强调，防止疫情向学校扩散、守护师生安康、维护校园稳定，是教育系统的一项重大政治任务，是当前最重要的工作。要以高度的责任心和强烈的使命感，守住校园这片净土，确保师生生命安全。他要求，未经学校批准学生一律不准返校，校外无关人员一律不准进校门，师生进入校门一律核验身份和检测体温，对发烧咳嗽者一律实行医学隔离观察，不服从管理者一律严肃处理。2月13日四川省教育厅发出通知要求全省各级各类学校2020年2月底前暂不开学，具体开学时间将视疫情防控情况，经科学评估后确定，届时提前向社会公布。
');
INSERT INTO newsdetails VALUES(null,'最新疫情情况3','校外新闻','百度','2020/02/05','
    2月7日，教育部召开全国教育系统应对新型冠状病毒感染肺炎疫情防控工作视频会议。教育部党组书记、部长、部应对疫情工作领导小组组长陈宝生强调，防止疫情向学校扩散、守护师生安康、维护校园稳定，是教育系统的一项重大政治任务，是当前最重要的工作。要以高度的责任心和强烈的使命感，守住校园这片净土，确保师生生命安全。他要求，未经学校批准学生一律不准返校，校外无关人员一律不准进校门，师生进入校门一律核验身份和检测体温，对发烧咳嗽者一律实行医学隔离观察，不服从管理者一律严肃处理。2月13日四川省教育厅发出通知要求全省各级各类学校2020年2月底前暂不开学，具体开学时间将视疫情防控情况，经科学评估后确定，届时提前向社会公布。
');
INSERT INTO newsdetails VALUES(null,'最新疫情情况4','校外新闻','百度','2020/02/05','
    2月7日，教育部召开全国教育系统应对新型冠状病毒感染肺炎疫情防控工作视频会议。教育部党组书记、部长、部应对疫情工作领导小组组长陈宝生强调，防止疫情向学校扩散、守护师生安康、维护校园稳定，是教育系统的一项重大政治任务，是当前最重要的工作。要以高度的责任心和强烈的使命感，守住校园这片净土，确保师生生命安全。他要求，未经学校批准学生一律不准返校，校外无关人员一律不准进校门，师生进入校门一律核验身份和检测体温，对发烧咳嗽者一律实行医学隔离观察，不服从管理者一律严肃处理。2月13日四川省教育厅发出通知要求全省各级各类学校2020年2月底前暂不开学，具体开学时间将视疫情防控情况，经科学评估后确定，届时提前向社会公布。
');
INSERT INTO newsdetails VALUES(null,'最新疫情情况5','校外新闻','百度','2020/02/05','
    2月7日，教育部召开全国教育系统应对新型冠状病毒感染肺炎疫情防控工作视频会议。教育部党组书记、部长、部应对疫情工作领导小组组长陈宝生强调，防止疫情向学校扩散、守护师生安康、维护校园稳定，是教育系统的一项重大政治任务，是当前最重要的工作。要以高度的责任心和强烈的使命感，守住校园这片净土，确保师生生命安全。他要求，未经学校批准学生一律不准返校，校外无关人员一律不准进校门，师生进入校门一律核验身份和检测体温，对发烧咳嗽者一律实行医学隔离观察，不服从管理者一律严肃处理。2月13日四川省教育厅发出通知要求全省各级各类学校2020年2月底前暂不开学，具体开学时间将视疫情防控情况，经科学评估后确定，届时提前向社会公布。
');

#创建留言表

CREATE TABLE n_message(
  messageid INT PRIMARY KEY AUTO_INCREMENT,
  pname VARCHAR(32) DEFAULT NULL,
  ntime VARCHAR(32) DEFAULT NULL,
  content VARCHAR(50) DEFAULT NULL
);
#添加留言
INSERT INTO n_message VALUES(null,'阿giao','2020/04/06','今天天气好晴朗,处处好风光');
#创建通知公告栏
CREATE TABLE n_inform(
  informid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32) DEFAULT NULL,
  author VARCHAR(32) DEFAULT NULL,
  origin VARCHAR(32) DEFAULT NULL,
  ntime  VARCHAR(16) DEFAULT NULL
);
#添加通知
INSERT INTO n_inform VALUES(null,'关于延期开学及再次强调学生不得提前返校的通知','路飞','教务处','2020-0202');
