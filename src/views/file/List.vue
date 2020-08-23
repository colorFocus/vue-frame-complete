<style lang="less">
</style>

<template>
  <div class="file-list" v-loading.fullscreen.lock="loading">
    <p>This is List page</p>
    <el-link type="primary" @click="gotoDetail">Go To Detail page</el-link>
    <br />
    <el-link type="danger" @click="dialogVisible = true">show dialog</el-link>
    <div>timeNow: {{timeNow|parseTime}}</div>
    <div>timeNow format: {{timeNow|formatTime}}</div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import moduleApi from "@/api/file.js";
import * as articleData from "@/assets/data/article.js";
import userData from "@/assets/data/user.json";

export default {
  name: "file-list",
  components: {},
  data() {
    return {
      loading: false,
      currentPageNum: 1,
      pageSize: 10,
      totalSize: 0,
      listData: [],
      selectedList: [],
      dialogVisible: false,
      timeNow: Date.now()
    };
  },
  computed: {},
  watch: {},
  mounted() {
    window.ts_list = this; //TODO:
    // this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      var params = {
        pageNum: this.currentPageNum,
        pageSize: this.pageSize
      };
      var res = await moduleApi.fileList(params);
      this.loading = false;
      if (res.code == "0") {
        var data = res.data;
        this.totalSize = data.totalSize;
        this.listData = data.datalist;
      } else {
        this.$message.error(res.msg || "获取数据失败!");
      }
    },
    handlePageChange(pageNum) {
      this.currentPageNum = pageNum;
      this.fetchData();
    },
    tableSelectEvent(items) {
      this.selectedList = [].concat(items);
    },
    handleChange() {
      this.currentComp = this.flag ? compA : compB;
      this.flag = !this.flag;
    },
    gotoDetail() {
      this.$router.push({
        name: "file-detail"
      });
    }
  }
};
</script>
