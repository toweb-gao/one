<template>
  <div class="details">
    <!--overflow  -->
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="border-bottom:2px solid #6A6464;padding:10px;"
      >
        <el-breadcrumb-item :to="{ path: '' }" class="zi">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="zi">新闻详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <el-button type="primary" plain style="float:left;" @click="left3">上一条</el-button>
    <el-button type="primary" plain style="float:right;" @click="after3">下一条</el-button>
    <div v-for="(item,i) of list3" :key="i">
      <div style="width:100%;text-align:center;">
        <span style="color:red;font-size:35px;margin:0 auto;">{{item.title}}</span>
      </div>
      <div style="width:100%;">
        <span style="margin-left:900px;font-weight:bold;">{{item.ntime}}</span>
      </div>
      <div>
        <span style="margin-left:700px;font-weight:bold;">新闻来源:{{item.origin}}</span>
        <span style="font-weight:bold;position:relative;left:50px;">新闻类型:{{item.ntype}}</span>
      </div>

      <!-- 新闻正文 overflow-x:scroll; -->
      <el-scrollbar style="height:150px;">
        <div style="padding:10px 40px;height:120px;text-indent:30px;">
          <span>{{item.content}}</span>
        </div>
      </el-scrollbar>
    </div>
    <!-- 留言区 -->
    <div>
      <div>
        <span style="font-size:24px;">校友留言</span>
      </div>

      <div>
        <el-input type="contetn" :rows="2" placeholder="请输入内容" v-model="content"></el-input>
        <div style="float:right">
          <el-input v-model="pname" placeholder="请输入你的昵称" style="width:250px;"></el-input>
          <el-button type="primary" plain style="height:40px;margin-top:10px;" @click="issue">发布</el-button>
        </div>
      </div>
      <!-- 留言区 -->
      <div style="margin-bottom:30px;">
        <span>{{this.totalCount1}}</span>人参与,
        <span>{{this.totalCount1}}</span>留言
      </div>
      <div>
        <el-scrollbar style="height:100px;margin-top:0px;">
          <el-row
            v-for="(item,i) of list_message"
            :key="i"
            style="height:15px;position:relative;top:-20px;"
          >
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <i class="el-icon-user-solid"></i>
                <span style="margin-left:10px;color:red">{{item.pname}}:</span>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple-light">
                <span style="margin-left:20px;">{{item.content}}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
                <span style="margin-right:20px;">{{item.ntime}}</span>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文本域
      pname: "",
      content: "",
      ntime: "",
      disabled: false,
      // 新闻
      list3: [],
      id: 1,
      totalCount: "",
      totalCount1: "",
      list_message: []
    };
  },
  methods: {
    // 发布留言
    issue() {
      // 留言时间
      let date = new Date();
      // console.log(date)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      month < 10 && (month = "0" + month);
      day < 10 && (day = "0" + day);
      this.ntime = year + "-" + month + "-" + day;

      if (!this.pname) {
        alert("昵称不能为空");
        return;
      }
      if (!this.content) {
        alert("内容不能为空");
        return;
      }
      console.log(this.ntime);
      console.log(this.pname);
      console.log(this.content);
      let url = "/index/message";
      let data = {
        pname: this.pname,
        content: this.content,
        ntime: this.ntime
      };

      // 3:发送ajax请求
      this.axios
        .get(url, { params: data })
        .then(res => {
          if (res.data.code === 200) {
            alert("留言成功");
            this.loadMore1();
          } else {
            alert("留言失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    left3() {
      if (this.id > 1) {
        this.id--;
        this.loadMore();
      }
    },
    after3() {
      if (this.id < this.totalCount) {
        this.id++;
        this.loadMore();
      }
    },
    loadMore() {
      //功能:发送ajax请求获取服务器返回商品列表
      // node Get/product
      // 1:创建变量url保存请求地址
      var url = "index/newsdetails1";
      var obj = { id: this.id };
      // 3:发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        // 5:在data添加属性list:[]保存商品列表
        // 6:将返回数据保存list结束
        // this.list1 = res.data.data;
        // console.log(res.data.list);
        // console.log(res.data.totalCount);
        this.totalCount = res.data.totalCount;
        this.list3 = res.data.list;
      });
    },
    loadMore1() {
      //功能:发送ajax请求获取服务器返回商品列表
      // node Get/product
      // 1:创建变量url保存请求地址
      var url = "index/message_show";
      // 3:发送ajax请求
      this.axios.get(url).then(res => {
        // console.log(res.data.list);
        // console.log(res.data.totalCount);
        this.totalCount1 = res.data.totalCount;
        this.list_message = res.data.list;
      });
    }
  },
  created() {
    this.loadMore(); //加载数据
    this.loadMore1(); //加载数据
  }
};
</script>

<style>
.details div {
  margin-top: 10px;
}
</style>