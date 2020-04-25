<template>
  <div id="info">
    <el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane label="新闻添加">
          <div class="add" style="overflow:hidden;">
            <div style="margin-top:50px;">
              <span>文章标题</span>
              <el-input style="width:250px;" v-model="title" placeholder="请输入内容"></el-input>
            </div>

            <div>
              <span>新闻来源</span>
              <el-input style="width:250px;" v-model="origin" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span class="demonstration">发布时间</span>
              <el-date-picker v-model="ntime" type="date" placeholder="选择日期"></el-date-picker>
              <div>
                <span>新闻类型</span>
                <el-select v-model="ntype" style="margin-top:10px;" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div>
              <span>新闻内容</span>
              <br />
              <el-input
                style="width:450px;"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 20}"
                placeholder="请输入内容"
                v-model="content"
              ></el-input>
            </div>
            <div>
              <el-button
                type="primary"
                round
                style="position:relative;top:-65px;left:500px"
                @click="news"
              >发布</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发布公告">
          <div class="add" style="overflow:hidden;">
            <div style="margin-top:50px;">
              <span>公告标题</span>
              <el-input style="width:250px;" v-model="title1" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>文章作者</span>
              <el-input style="width:250px;" v-model="author" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>发布来源</span>
              <el-input style="width:250px;" v-model="origin1" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span class="demonstration">发布时间</span>
              <el-date-picker v-model="ntime1" type="date" placeholder="选择日期"></el-date-picker>
            </div>

            <div>
              <el-button
                type="primary"
                round
                style="position:relative;left:100px;"
                @click="inform"
              >发布</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: "",
      value2: "",
      title: "",
      content: "",
      ntype: "",
      origin: "",
      ntime: "",
      // 通知
      title1: "",
      author: "",
      origin1: "",
      ntime1: "",
      // 选择框
      options: [
        {
          value: "校内新闻",
          label: "校内新闻"
        },
        {
          value: "校外新闻",
          label: "校外新闻"
        }
      ]
    };
  },
  methods: {
    news() {
      // 发布新闻 title, content, ntype, origin, ntime
      var url = "/add_news";
      var title = this.title;
      if (!title) {
        alert("标题不能为空！");
        return;
      }
      var content = this.content;
      if (!content) {
        alert("内容不能为空！");
        return;
      }
      var ntype = this.ntype;
      if (!ntype) {
        alert("类型不能为空！");
        return;
      }
      // 留言时间
      let date = new Date();
      // console.log(date)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      month < 10 && (month = "0" + month);
      day < 10 && (day = "0" + day);
      this.ntime = year + "-" + month + "-" + day;
      var ntime = this.ntime;
      if (!ntime) {
        alert("时间不能为空！");
        return;
      }
      // console.log(title);
      // console.log(origin);
      // console.log(ntime);
      // console.log(ntype);
      // console.log(content);
      var obj = {
        title: this.title,
        origin: this.origin,
        content: this.content,
        ntype: this.ntype,
        ntime: this.ntime
      };
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
    },
    inform() {
      // 发布通知 title, content, ntype, origin, ntime
      var url = "/add_inform";
      var title = this.title1;
      if (!title) {
        alert("标题不能为空！");
        return;
      }

      var author = this.author;
      if (!author) {
        alert("作者不能为空！");
        return;
      }
      var origin = this.origin1;
      if (!origin) {
        alert("类型不能为空！");
        return;
      }
      // 留言时间
      let date = new Date();
      // console.log(date)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      month < 10 && (month = "0" + month);
      day < 10 && (day = "0" + day);
      this.ntime1 = year + "-" + month + "-" + day;
      var ntime = this.ntime1;
      if (!ntime) {
        alert("时间不能为空！");
        return;
      }
      // console.log(title);
      // console.log(origin);
      // console.log(ntime);
      // console.log(author);
      var obj = {
        title: this.title1,
        author: this.author,
        origin: this.origin1,
        ntime: this.ntime1
      };
      // 3:发送ajax请求
      this.axios
        .get(url, { params: obj })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else alert(res.data.msg);
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
.add {
  background-color: #f1f8ff;
  width: 1200px;
  height: 600px;

  margin: 0 auto;
}
.add span {
  font-size: 20px;
  margin-right: 5px;
}
.add > div {
  margin-bottom: 20px;
  margin-left: 150px;
}
#info .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
</style>