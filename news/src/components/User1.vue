<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="border-bottom:2px solid #6A6464;padding:10px;"
    >
      <el-breadcrumb-item :to="{ path: '' }" class="zi">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="zi">最新动态</el-breadcrumb-item>
      <el-breadcrumb-item class="zi">新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-row :gutter="20" style="height:400px;">
        <el-col :span="16">
          <ul>
            <li
              style="border-bottom:1px dashed #939393;padding:10px;"
              v-for="(item,i) of list"
              :key="i"
            >
              <span style="color:red">{{i+1}}.</span>
              <span style="padding:5px;padding-bottom:5px;">{{item.title}}</span>
              <span style="float:right;">
                <span>{{item.ntype}}</span>
                |
                <span>{{item.ntime}}</span>
              </span>
            </li>
          </ul>
          <!-- 页数 -->
          <!-- <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>-->
          <el-button-group style="margin-left:45%;">
            <el-button type="primary" icon="el-icon-arrow-left" @click="left">上一页</el-button>
            <el-button type="primary" @click="after">
              下一页
              <i class="el-icon-arrow-right el-icon-right"></i>
            </el-button>
          </el-button-group>
        </el-col>
        <el-col :span="8">
          <div>
            <!-- 轮播图 cur-->
            <div class="block" style="margin-bottom:75px;">
              <span class="demonstration">校园风光</span>
              <el-carousel height="150px" style="margin-top:25px;">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- 标签 -->
            <div style="margin-bottom:25px;">今日热词:</div>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin-botton:10px;"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加 +</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 新闻列表
      list: [], //商品列表
      pageNum: "",
      pageCount: "",
      //   分页

      dynamicTags: ["爱学习", "今天吃啥", "考研", "最新疫情"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    left() {
      if (this.pageNum <= 1) {
        this.$message.error("正在第一页!");
      } else {
        this.pageNum--;
        this.loadMore();
      }
    },
    after() {
      if (this.pageNum >= this.pageCount) {
        this.$message.error("正在最后一页!");
      } else {
        this.pageNum++;
        this.loadMore();
      }
      // console.log(this.pno);
      // console.log('长度',this.list.length/this.pno);
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 新闻列表
    loadMore() {
      // console.log(123)
      //功能:发送ajax请求获取服务器返回商品列表
      // node Get/product pno pageSize
      // 1:创建变量url保存请求地址
      var url = "index/list";
      // 2:创建变量obj请求服务器参数
      var obj = { pageNum: this.pageNum };
      // 3:发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        // console.log(res.data);
        this.list = res.data.list;
        this.pageCount = res.data.pageCount;
        // console.log(this.pageCount);
      });
    }
  },
  created() {
    this.loadMore(); //加载数据
  }
};
</script>
<style>
/* 标签 */
.el-tag + .el-tag {
  margin-left: 15px;
  margin-bottom: 15px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

/* 走马灯 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  background-image: url("../assets/index/a1.jpg");
  background-size: contain;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  background-image: url("../assets/index/a3.jpg");
  background-size: contain;
}

.zi {
  margin-top: 5px;
  color: #2c2255;
  font-size: 16px;
}
</style>