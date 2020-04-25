<template>
  <div>
    <div style="display:flex;margin-bottom:10px;margin-top:10px;">
      <el-button class="el-icon-delete">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-scrollbar style="height:570px;">
      <!-- 显示列表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" type="index" prop="id" width="120"></el-table-column>
        <el-table-column label="标题" prop="title" width="120"></el-table-column>

        <el-table-column label="作者" prop="author" width="120"></el-table-column>

        <el-table-column label="新闻类型" prop="ntype" width="120"></el-table-column>

        <el-table-column prop="origin" label="新闻来源" width="120"></el-table-column>
        <el-table-column prop="ntime" label="发布时间" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },

  methods: {
    // 新闻列表显示
    loadMore() {
      var url = "admins/news_show";
      // 3:发送ajax请求
      this.axios.get(url).then(res => {
        this.tableData = res.data.data;
        // console.log(this.tableData);
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {
    this.loadMore(); //加载数据
  }
};
</script>