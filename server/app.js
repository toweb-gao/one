//功能:服务器程序
//1:引入四个模块
const express = require("express"); //web服务器模块
const mysql = require("mysql");//mysql模块
const session = require("express-session");//session模块
const cors = require("cors");//跨域
//2:创建连接池
var pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "news1",
    port: 3306,
    connectionLimit: 15
})
//3:创建web服务器
var server = express();
//4:配置跨域模块
//4.1:允许程序列表 脚手架
//4.2:每次请求验证
server.use(cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
    credentials: true
}))
//5:指定静态资源目录 public
server.use(express.static("public"));
//6:配置session对象
server.use(session({
    secret: "128位安全字符串",//加密条件
    resave: true,//每次请求更新数据
    saveUninitialized: true,//保存初始化数据
}));
//7:为服务器绑定监听端口 4000 news
server.listen(4000);
console.log("服务器起动.......");

//功能一:用户登录验证
// 学生登录
server.get("/login", (req, res, next) => {
    //1:获取脚手架传递用户名和密码
    var u = req.query.uname;
    var p = req.query.upwd;
    //2:创建sql语法并且将用户名和密码加入
    var sql = "SELECT userid FROM student WHERE uname=? AND upwd=md5(?)";
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [u, p], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.2:如果result.length长度为0,表示登录失败
        if (result.length == 0) {
            res.send({ code: -1, msg: "用户名或密码有误" });
        } else {
            //登录成功
            //如果用户登录成功:创建session对象并且将登录凭证uid
            //保存对象中    result=[{id:1}]
            //将当前登录用户id保存session对象中作业:登录凭证
            req.session.uid = result[0].id;
            res.send({
                code: 1, msg: "登录成功",
                uname: req.query.uname,
                userInfo: result[0]
            })
            // 在当前客户端保存在服务器上的session空间内存储自己的数据
            req.session.userInfo = result[0]
            req.session.save()		//手工保存session中数据的修改
            // console.log(req.session.userInfo)
        }
    });
})
//      http://127.0.0.1:4000/login?uname=tom&upwd=123456
// 管理员登录
server.get("/login1", (req, res, next) => {
    //1:获取脚手架传递用户名和密码
    var u = req.query.uname;
    var p = req.query.upwd;
    //2:创建sql语法并且将用户名和密码加入
    var sql = "SELECT admid FROM admins WHERE uname=? AND upwd=md5(?)";
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [u, p], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.2:如果result.length长度为0,表示登录失败
        if (result.length == 0) {
            res.send({ code: -1, msg: "用户名或密码有误" });
        } else {
            //登录成功
            //如果用户登录成功:创建session对象并且将登录凭证uid
            //保存对象中    result=[{id:1}]
            //将当前登录用户id保存session对象中作业:登录凭证
            req.session.uid = result[0].id;
            res.send({
                code: 1,
                msg: "登录成功",
                uname: req.query.uname,
                userInfo: result[0]
            })
        }
        // 在当前客户端保存在服务器上的session空间内存储自己的数据
        req.session.userInfo = result[0]
        req.session.save()		//手工保存session中数据的修改
    });
})
//      http://127.0.0.1:4000/login1?uname=高老师&upwd=123456

// 功能:显示最新新闻列表(分页)
//http://127.0.0.1:4000/index/list?pageNum=1
server.get('/index/list', (req, res, next) => {
    //1.读取客户端提交的请求数据
    let pageNum = req.query.pageNum		//客户端想显示的页号
    if (!pageNum) {		//客户端未提交页号，默认显示第1页
        pageNum = 1
    } else {				//客户端提交了页号，查询字符串中的数据都是字符串，解析为整数
        pageNum = parseInt(pageNum)
    }
    //2.执行数据库查询操作
    let output = {
        pageNum: pageNum,		//要显示的页号
        pageSize: 10,			//页面大小，每页要显示的记录条数
        pageCount: 0,			//符合条件的总页数
        totalCount: 0,			//符合条件的总记录数
        list: [],				//符合条件的记录数据
    }


    let placeholder = []		//为?占位符提供的数据

    //查询出满足条件的记录总数，并计算出总页数
    let sql1 = 'SELECT  COUNT(*)  AS  c  FROM  newslist  ';
    pool.query(sql1, placeholder, (err, result) => {
        if (err) {
            next(err)
            return
        }
        output.totalCount = result[0].c	//满足条件的总记录数
        output.pageCount = Math.ceil(output.totalCount / output.pageSize) //满足条件的总页数
        let sql2 = 'SELECT newsid,title,author,ntype,origin,ntime  FROM  newslist AS c  ORDER BY newsid DESC  LIMIT  ?, ? '
        placeholder.push((output.pageNum - 1) * output.pageSize)//LIMIT后的第一个?：从哪一条记录开始读取
        placeholder.push(output.pageSize)		//LIMIT后的第二个?：一次最多读取的记录数量
        pool.query(sql2, placeholder, (err, result) => {
            if (err) {
                next(err)
                return
            }
            output.list = result
            res.send(output)
        })
    })
	/*
	第1页： 从0开始要3条
	第2页： 从3开始要3条
	第3页： 从6开始要3条
	第N页： 从(N-1)*pageSize开始要3条
	*/
})


// 功能:根据新闻类型查看新闻信息
// 校内新闻 校外新闻
server.get("/index/sort", (req, res) => {
    //1:获取新闻类型
    var ntype = req.query.ntype;
    //2:创建sql语法
    var sql = "SELECT title,author,origin,ntime FROM newslist WHERE ntype=?";
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [ntype], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.2:如果result.length长度为0,表示登录失败
        if (result.length == 0) {
            res.send({ code: -1, msg: "none" });
            // console.log("失败", ntype)
        } else {

            res.send({ code: 1, msg: "查询成功", data: result })
            // console.log(result)
        }
    });
})
// 通知
server.get("/index/notice", (req, res, next) => {
    //2:创建sql语法
    var sql = "SELECT informid,title,author,origin,ntime FROM n_inform";
    //3:执行sql语法并且获取返回结果
    pool.query(sql, (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.2:如果result.length长度为0,表示登录失败
        if (result.length == 0) {
            res.send({ code: -1, msg: "none" });
            // console.log("失败", ntype)
        } else {
            res.send({ code: 1, msg: "查询成功", data: result })
            // console.log(result)
        }
    });
})
//http://127.0.0.1:4000/index/sort?ntype=校外新闻;
//http://127.0.0.1:4000/index/notice;
// 不抛出


// 功能:查询新闻详情可以点击下一条 加查询总数
server.get("/index/newsdetails1", (req, res, next) => {
    var id = req.query.id;
    let output = {
        totalCount: 0,		//满足条件的总记录数
        list: null			//指定页面中的记录
    }
    //2:创建sql语法
    //首先查询满足条件的记录总条数
    let sql = 'SELECT COUNT(*) AS c  FROM  newsdetails '
    pool.query(sql, (err, result) => {
        if (err) {
            next(err)
            return
        }
        output.totalCount = result[0]['c']		//获取到了总的记录数
        var sql1 = "SELECT title,ntype,origin,ntime,content FROM newsdetails WHERE newsid=?";
        //3:执行sql语法并且获取返回结果
        pool.query(sql1, [id], (err, result) => {
            if (err) {
                next(err)
                return
            }
            output.list = result
            res.json(output)
            // console.log(output.totalCount)

        });
    })
})


//http://127.0.0.1:4000/index/newsdetails1?id=1;

// 添加留言
server.get("/index/message", (req, res, next) => {
    let pname = req.query.pname;
    let content = req.query.content;
    let ntime = req.query.ntime;

    //2:创建sql语法
    let sql = "INSERT INTO n_message(pname,content,ntime) VALUES(?,?,?)"
    pool.query(sql, [pname, content, ntime], (err, result) => {
        if (err) {
            next(err)
            return
        }
        // console.log(result)
        //INSERT语句执行成功，输出注册成功的响应消息
        let output = {
            code: 200,
            msg: '留言添加成功',
            uid: result.insertId //INSERT语句产生的自增编号就是新用户编号
        }
        res.json(output)

    })
})
//http://127.0.0.1:4000/add?pname=亚索&content=你不懂我的快乐&ntime=2020-02-04;

// 评论显示
server.get("/index/message_show", (req, res, next) => {
    let output = {
        totalCount: 0,		//满足条件的总记录数
        list: null			//指定页面中的记录
    }
    //2:创建sql语法
    //首先查询满足条件的记录总条数
    let sql = 'SELECT COUNT(*) AS c  FROM  n_message '
    pool.query(sql, (err, result) => {
        if (err) {
            next(err)
            return
        }
        output.totalCount = result[0]['c']		//获取到了总的记录数
        var sql1 = "SELECT pname,content,ntime FROM n_message ORDER BY messageid DESC";
        //3:执行sql语法并且获取返回结果
        pool.query(sql1, (err, result) => {
            if (err) {
                next(err)
                return
            }
            output.list = result
            res.json(output)
            // console.log(output.totalCount)
            // console.log(result)
        });
    })
})
// http://127.0.0.1:4000/index/message_show

// 学生信息显示
server.get("/index/info_s", (req, res) => {
    var uname = req.query.uname;
    //2:创建sql语法
    var sql = "SELECT birthday,sex,sno FROM student WHERE uname=?";
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [uname], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.2:如果result.length长度为0,表示登录失败
        if (result.length == 0) {
            res.send({ code: -1, msg: "none" });
            // console.log("失败", ntype)
        } else {

            res.send({ code: 1, msg: "查询成功", data: result })
            // console.log(result)
        }
    });
})
// http://127.0.0.1:4000/index/info_s?uname=tom

// 修改学生密码
server.get("/index/upwd_s", (req, res) => {
    var uname = req.query.uname;
    console.log(uname)
    var upwd = req.query.upwd;
    console.log(upwd)
    //2:创建sql语法
    var sql = 'UPDATE student SET upwd=md5(?) WHERE uname=?';
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [upwd, uname], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //修改
        if (result.affectedRows > 0) {	//根据客户端提交的uname和phone查询到相关记录
            let output = {		//uname或phone已被占用，则不再继续执行插入操作
                code: 200,
                msg: '修改成功'
            }
            res.send(output)
            return
        } else {
            let output = {		//uname或phone已被占用，则不再继续执行插入操作
                code: -200,
                msg: '修改失败'
            }
            res.send(output)
            return
        }
    });
})

// 管理员相关接口
// 管理员信息显示
server.get("/index/info_a", (req, res) => {
    var uname = req.query.uname;
    //2:创建sql语法
    var sql = "SELECT birthday,sex,sno FROM admins WHERE uname=?";
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [uname], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.2:如果result.length长度为0,表示登录失败
        if (result.length == 0) {
            res.send({ code: -1, msg: "none" });
            // console.log("失败", ntype)
        } else {

            res.send({ code: 1, msg: "查询成功", data: result })
            // console.log(result)
        }
    });
})
// 修改管理员密码
server.get("/index/upwd_a", (req, res) => {
    var uname = req.query.uname;
    console.log(uname)
    var upwd = req.query.upwd;
    console.log(upwd)
    //2:创建sql语法
    var sql = 'UPDATE admins SET upwd=md5(?) WHERE uname=?';
    //3:执行sql语法并且获取返回结果
    pool.query(sql, [upwd, uname], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //修改
        if (result.affectedRows > 0) {	//根据客户端提交的uname和phone查询到相关记录
            let output = {		//uname或phone已被占用，则不再继续执行插入操作
                code: 200,
                msg: '修改成功'
            }
            res.send(output)
            return
        } else {
            let output = {		//uname或phone已被占用，则不再继续执行插入操作
                code: -200,
                msg: '修改失败'
            }
            res.send(output)
            return
        }
    });
})
// 发布新闻
// http://127.0.0.1:4000/add_news?title=1&content=2&ntype=3&origin=4&ntime=5
server.get('/add_news', (req, res, next) => {
    //1.接收客户端提交的请求数据
    let title = req.query.title
    if (!title) {
        let output = {
            code: 401,
            msg: 'title required'
        }
        res.send(output)
        return
    }
    console.log(1)
    let content = req.query.content
    if (!content) {
        let output = {
            code: 402,
            msg: 'content required'
        }
        res.send(output)
        return
    }
    let ntype = req.query.ntype
    if (!ntype) {
        let output = {
            code: 403,
            msg: 'ntype required'
        }
        res.send(output)
        return
    }
    let origin = req.query.origin
    if (!origin) {
        let output = {
            code: 403,
            msg: 'origin required'
        }
        res.send(output)
        return
    }
    let ntime = req.query.ntime
    if (!ntime) {
        let output = {
            code: 403,
            msg: 'ntime required'
        }
        res.send(output)
        return
    }
    //2.执行数据库插入操作
    let sql2 = "INSERT INTO newsdetails(title,content,ntype,origin,ntime) VALUES(?,?,?,?,?)"
    pool.query(sql2, [title, content, ntype, origin, ntime], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.向客户端输出响应消息
        let output = {
            code: 200,
            msg: 'register succ',
            uid: result.insertId		//新插入的用户在数据库中的自增编号
        }
        res.send(output)
    })
})

// 发布通知
// http://127.0.0.1:4000/add_news?title=1&content=2&ntype=3&origin=4&ntime=5
server.get('/add_inform', (req, res, next) => {
    //1.接收客户端提交的请求数据
    let title = req.query.title
    // console.log(req.query)
    if (!title) {
        let output = {
            code: 401,
            msg: 'title required'
        }
        res.send(output)
        return
    }
    let author = req.query.author
    console.log(author)
    if (!author) {
        let output = {
            code: 403,
            msg: '作者 required'
        }
        res.send(output)
        return
    }
    let origin = req.query.origin
    if (!origin) {
        let output = {
            code: 403,
            msg: 'origin required'
        }
        res.send(output)
        return
    }
    let ntime = req.query.ntime
    if (!ntime) {
        let output = {
            code: 403,
            msg: 'ntime required'
        }
        res.send(output)
        return
    }
    //2.执行数据库插入操作
    let sql2 = "INSERT INTO n_inform(title,author,origin,ntime) VALUES(?,?,?,?)"
    pool.query(sql2, [title, author, origin, ntime], (err, result) => {
        if (err) {
            next(err)
            return
        }
        //3.向客户端输出响应消息
        let output = {
            code: 200,
            msg: 'register succ',
            uid: result.insertId		//新插入的用户在数据库中的自增编号
        }
        res.send(output)
    })
})

// 新闻管理列表显示

server.get("/admins/news_show", (req, res, next) => {
    var sql1 = "SELECT newsid,title,author,ntype,origin,ntime FROM newslist";
    //3:执行sql语法并且获取返回结果
    pool.query(sql1, (err, result) => {
        if (err) {
            next(err)
            return
        }
        if (result.length == 0) {
            res.send({ code: -1, msg: "none" });
            // console.log("失败", ntype)
        } else {

            res.send({ code: 1, msg: "查询成功", data: result })
            // console.log(result)
        }
    });
})
// http://127.0.0.1:4000/admins/news_show
// 新闻管理列表显示

server.get("/admins/student_show", (req, res, next) => {
    var sql1 = "SELECT userid,uname,sex,birthday,sno,phone FROM student";
    //3:执行sql语法并且获取返回结果
    pool.query(sql1, (err, result) => {
        if (err) {
            next(err)
            return
        }
        if (result.length == 0) {
            res.send({ code: -1, msg: "none" });
            // console.log("失败", ntype)
        } else {

            res.send({ code: 1, msg: "查询成功", data: result })
            // console.log(result)
        }
    });
})
// http://127.0.0.1:4000/admins/student_show


//测试:
//启动服务器  node app.js
//打开浏览器在地址栏输入
//      http://127.0.0.1:4000/login?uname=tom&upwd=123456
//      http://127.0.0.1:4000/login1?uname=高老师&upwd=123456

/*4.声明后置中间件*/
//此处必须有后置的异常处理中间件！！否则一旦路由抛异常，整个服务器会崩溃，客户端会收到5xx错误  
/*
Express默认提供了一个如下的错误处理中间件
app.use((err, req, res, next)=>{
	//1 在服务器的控制台（如果有的话）中输出错误消息
	//2 向客户端输出一个500的响应消息，Content-Type：text/html
})
*/
//自定义一个错误处理中间件
server.use((err, req, res, next) => {
    res.status(5001)
    let output = {
        code: 500,
        msg: '服务器出现错误!',
        err: err
    }
    res.json(output)
    //TODO: 此处也可以在一个log文件中记录此次错误
})
