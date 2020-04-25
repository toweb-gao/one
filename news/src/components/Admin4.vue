<template>
  <div class="a">
    <div>
      <div>
        <div style="font-size:24px;margin-left:-15px">基本信息:</div>
        <div>
          个人标签:
          <span style="color:#3872B5">{{tabs}}</span>
        </div>
        <div>
          <span>姓名:{{uname}}</span>
          <span style="margin-left:300px;">性别:{{this.data.sex}}</span>
        </div>
        <div>
          <span>出生年月:{{this.data.birthday}}</span>
          <span style="margin-left:190px;">学号:{{this.data.sno}}</span>
        </div>
      </div>
    </div>

    <div>
      <div style="font-size:24px;margin-left:0">个人设置</div>
      <div>
        <div>添加个人标签</div>
        <el-input v-model="tabs" placeholder="请输入内容" style="width:300px;"></el-input>
        <div>
          <!-- 弹框 -->
          <el-button style="font-size:20px;" type="text" @click="open">修改密码</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tabs: "每天都是晴天!",
      data: "",
      // 修改的密码值
      value: ""
    };
  },
  methods: {
    //    修改密码
    open() {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9A-Za-z]{3,12}$/,
        inputErrorMessage: "密码格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的密码是: " + value
          });
          this.value = value;
          // console.log(this.value);
          if (this.value) {
            // 修改密码
            var url = "/index/upwd_a";
            var uname = this.uname;
            var upwd = this.value;
            // console.log(uname, upwd);
            var obj = { uname: this.uname, upwd: this.value };
            // 3:发送ajax请求
            this.axios
              .get(url, { params: obj })
              .then(res => {
                // console.log(res);
                if (res.data.code === 200) {
                  alert(res.data.msg);
                } else alert(res.data.msg);
              })
              .catch(err => {});
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 学生信息
    info_student() {
      var url = "/index/info_a";
      var uname = this.uname;
      var obj = { uname: this.uname };
      // 3:发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        this.data = res.data.data[0];
        // console.log(this.data.sno);
      });
    },
    ...mapMutations(["setUname"])
    //setUname(uname){ this.$store.commit("setName",uanme) }
  },
  created() {
    this.info_student(); //加载数据
  },
  computed: {
    ...mapState(["uname"])
    //uname{return this.$store.state.uname},
  }
};
</script>

<style>
.a div {
  margin-top: 25px;
  margin-left: 15px;
  font-size: 20px;
}
</style>