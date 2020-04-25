<template>
  <!-- 必须有一个最大的div-->
  <div class="big">
    <!-- 登录框 -->
    <div id="login">
      <div class="login_a">
        <!-- 网站名 -->
        <div id="name" style="color:green">校园新闻管理系统</div>
        <div class="content">
          <el-select v-model="value" placeholder="请选择用户登录类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.type"
            ></el-option>
          </el-select>

          <div v-show="value === 'student'">
            <el-input placeholder="请输入学号" v-model="uname" change class="g1"></el-input>
            <el-input placeholder="请输入密码" v-model="upwd" show-password></el-input>
            <el-button type="primary" @click="login0" class="deng">登录</el-button>
          </div>
          <div v-show="value === 'admin'">
            <el-input placeholder="请输入管理员名" v-model="uname" class="g1"></el-input>
            <el-input placeholder="请输入密码" v-model="upwd" show-password></el-input>
            <el-button type="primary" class="deng" @click="login2">登录</el-button>
          </div>
          <div v-show="value === 'visitor'">
            <el-button type="primary" class="deng" style="height:40px;" @click="yk">游客入口</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      options: [
        {
          value: 1,
          label: "学生登录",
          type: "student"
        },
        {
          value: 2,
          label: "管理员登录",
          type: "admin"
        },
        {
          value: 3,
          label: "游客登录",
          type: "visitor"
        }
      ],
      value: "",
      uname: "高老师",
      upwd: "123"
    };
  },
  methods: {
    login0() {
      this.login({
        //给user
        uname: this.uname,
        upwd: this.upwd
      });
      //登录函数
      //1:获取脚手架传递用户名和密码
      var u = this.uname;
      var p = this.upwd;
      // console.log(u, p);
      /*5.创建url变量 保存请求服务地址*/
      var url = "login";
      /*6.创建obj变量 保存请求时参数*/
      var obj = { uname: u, upwd: p };
      /*7.发送ajax请求*/
      this.axios.get(url, { params: obj }).then(res => {
        /*8.接受服务器返回结果*/
        /*9.如果-1提示用户名和密码有误*/
        /*10.如果1 商品列表组件 /Product  */

        if (res.data.code == -1) {
          this.$message.error("用户名或密码有误!");
        } else {
          this.$message({
            message: "登录成功",
            type: "success"
          });

          this.$router.push("/index");
        }
      });
    },
    // 管理员登录
    login2() {
      this.login1({
        //给user
        uname: this.uname,
        upwd: this.upwd
      });
      //登录函数
      //1:获取脚手架传递用户名和密码
      var u = this.uname;
      var p = this.upwd;
      // console.log(u, p);
      /*5.创建url变量 保存请求服务地址*/
      var url = "login1";
      /*6.创建obj变量 保存请求时参数*/
      var obj = { uname: u, upwd: p };
      /*7.发送ajax请求*/
      this.axios.get(url, { params: obj }).then(res => {
        /*8.接受服务器返回结果*/
        /*9.如果-1提示用户名和密码有误*/
        /*10.如果1 商品列表组件 /Product  */

        if (res.data.code == -1) {
          this.$message.error("用户名或密码有误!");
        } else {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.$router.push("/admin");
        }
      });
    },
    yk() {
      this.$router.push("/tourist");
      // console.log("跳游客页面");
    },
    ...mapActions([
      //去vuex的actions中取出名为login的函数放到此地
      "login", //,"logout","registor"
      "login1" //,"logout","registor"
    ])

    // 学生登录

    //end
  }
};
</script>
<style scoped>
#login {
  margin: 60px auto;
  width: 1000px;
  height: 700px;
  /* background-image: linear-gradient(#76e2ca, #63d0d3, #36a8e7); */
  position: relative;
}
.login_a {
  width: 400px;
  height: 200px;
  position: absolute;
  top: 200px;
  left: 300px;
}
.content {
  width: 100%;
  height: 100%;
  padding: 40px 50px;
  background-image: url(../assets/login/1.jpg);
  background-size: cover;
}
#name {
  width: 500px;
  color: white;
  font-size: 30px;
}
.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
el-button {
  width: 100%;
}
.g1 {
  margin-bottom: 10px;
}
.deng {
  color: #fff;
  font-size: 20px;
  text-decoration: none;
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: center;
}
/* 背景图 */
.big {
  background-image: url("../assets/login/1.jpg");
  background-size: cover;
  width: 70%;
  height: 700px;
  margin: 0 auto;
}
</style>