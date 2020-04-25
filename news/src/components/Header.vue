<template>
  <div>
    <!-- 头部布局 -->
    <el-container>
      <el-header style="height:150px;">
        <!-- layout布局 -->
        <el-row>
          <el-col :span="6">
            <div>
              <img src="../assets/index/1.png" style="width:100px;margin-top:25px;" />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div style="color:white;font-size:30px;margin-left:-100px">校园新闻管理系统</div>
              <div style="color:white;font-size:25px;margin-left:-100px">Campus News</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="color:#A0CB34">.</div>
          </el-col>
          <el-col :span="6">
            <div style="margin-top:60px;">
              <i class="el-icon-user" style="color:white;">欢迎你!{{uname}}</i>
              <router-link to="/">
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  style="background:black;padding:10px;margin-left:10px;"
                  @click="logout"
                >退出</el-button>
              </router-link>
              <div style="margin-top:-20px;">
                <!-- 时间 -->
                {{gettime}}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <!-- 左边布局 -->
    <div>
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="最新动态">
          <User1 />
        </el-tab-pane>
        <el-tab-pane label="新闻分类">
          <User2 />
        </el-tab-pane>
        <el-tab-pane label="新闻详情">
          <User3 />
        </el-tab-pane>
        <el-tab-pane label="学校历史">
          <User4 />
        </el-tab-pane>
        <el-tab-pane label="个人信息">
          <User5 />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
 
<script>
import { mapState, mapMutations } from "vuex";

import User1 from "./User1.vue";
import User2 from "./User2.vue";
import User3 from "./User3.vue";
import User4 from "./User4.vue";
import User5 from "./User5.vue";
export default {
  // 注册子元素
  components: {
    User1,
    User2,
    User3,
    User4,
    User5
  },
  // 时间
  methods: {
   
    logout() {
      this.setUname("");
      localStorage.clear();
    },

    getTime: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      setInterval(this.getTime, 1000);
    },
    // 显示姓名

    ...mapMutations(["setUname"])
    //setUname(uname){ this.$store.commit("setName",uanme) }
  },
  computed: {
    ...mapState(["uname"])
    //uname{return this.$store.state.uname},
  },
  created() {
    this.currentTime();
  },
  //时间end
  data() {
    return {
      gettime: "",
      tabPosition: "left"
    };
  }
};
</script>

<style>
/* 左边导航栏样式 */
.el-tabs--left .el-tabs__nav-scroll {
  border-top: 2px solid bisque;
}
.el-tabs--left .el-tabs__active-bar.is-left {
  background-color: #a0cb34;
}
.el-tabs {
  height: 600px;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 2px solid #a0cb34;
}
.is-left {
  background-color: #a0cb34;
  width: 167px;
}
.el-tabs .el-tabs__item {
  font-size: 22px;
  color: azure;
  margin-top: 10px;
  /* margin-bottom: 15px; */
  /* width: 100%; */
}
/* 栅格布局 */

/* 整体布局 */
.el-container {
  width: 1200px;
  height: 150px;
  margin: 0 auto;
}
.el-header,
.el-footer {
  background-color: #a0cb34;
  color: #333;
  text-align: center;
  line-height: 60px;
}
element.style {
  height: 150px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>