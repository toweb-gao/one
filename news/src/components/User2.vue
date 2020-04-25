<template>
  <div class="user_2">
    <!-- 导航栏 -->
    <el-tabs type="border-card">
      <el-tab-pane label="校内新闻">
        <!-- author ntime origin title   v-for="(item,i) of list1"
        :key="i"-->
        <el-scrollbar style="height:500px;">
          <table border="1">
            <tr>
              <th>序号</th>
              <th>新闻标题</th>
              <th>作者</th>
              <th>新闻来源</th>
              <th>发布时间</th>
            </tr>
            <tr v-for="(item,i) of list1" :key="i">
              <td>{{i+1}}</td>
              <td>{{item.title}}</td>
              <td>{{item.author}}</td>
              <td>{{item.origin}}</td>
              <td>{{item.ntime}}</td>
            </tr>
          </table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="校外新闻">
        <el-scrollbar style="height:500px;">
          <table border="1">
            <tr>
              <th>序号</th>
              <th>新闻标题</th>
              <th>作者</th>
              <th>新闻来源</th>
              <th>发布时间</th>
            </tr>
            <tr v-for="(item,i) of list2" :key="i">
              <td>{{i+1}}</td>
              <td>{{item.title}}</td>
              <td>{{item.author}}</td>
              <td>{{item.origin}}</td>
              <td>{{item.ntime}}</td>
            </tr>
          </table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="通知公告">
        <el-scrollbar style="height:500px;">
          <table border="1">
            <tr>
              <th>序号</th>
              <th>新闻标题</th>
              <th>作者</th>
              <th>新闻来源</th>
              <th>发布时间</th>
            </tr>
            <tr v-for="(item,i) of list3" :key="i">
              <td>{{i+1}}</td>
              <td>{{item.title}}</td>
              <td>{{item.author}}</td>
              <td>{{item.origin}}</td>
              <td>{{item.ntime}}</td>
            </tr>
          </table>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: [],
      ntype: "",
      list2: [],
      list3: []
    };
  },
  methods: {
    loadMore() {
      //功能:发送ajax请求获取服务器返回商品列表
      // node Get/product
      // 1:创建变量url保存请求地址
      var url = "index/sort";
      // 2:创建变量obj请求服务器参数
      this.ntype = "校外新闻";
      var obj = { ntype: this.ntype };
      // console.log(this.ntype);
      // 3:发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        // 5:在data添加属性list:[]保存商品列表
        // 6:将返回数据保存list结束
        // this.list1 = res.data.data;
        // console.log(res.data.data);
        this.list1 = res.data.data;
      });
    },
    loadMore1() {
      //功能:发送ajax请求获取服务器返回商品列表
      // node Get/product
      // 1:创建变量url保存请求地址
      var url = "index/sort";
      // 2:创建变量obj请求服务器参数
      this.ntype = "校内新闻";
      var obj = { ntype: this.ntype };
      // console.log(this.ntype);
      // 3:发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        // 5:在data添加属性list:[]保存商品列表
        // 6:将返回数据保存list结束
        // this.list1 = res.data.data;
        // console.log(res.data.data);
        this.list2 = res.data.data;
        // console.log(this.list2);
      });
    },
    loadMore2() {
      var url = "index/notice";
      // 3:发送ajax请求
      this.axios.get(url).then(res => {
        this.list3 = res.data.data;
        // console.log(this.list3);
      });
    }
  },
  created() {
    this.loadMore(); //加载数据
    this.loadMore1(); //加载数据
    this.loadMore2(); //加载数据
  }
};
</script>

<style>
.user_2 {
  position: relative;
  left: -10px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

/* 表格 */
table {
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
  width: 1000px;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
</style>