<template>
  <div>
    <div class="toolbar-wrap block-wrap">
      <div style="display:flex;align-items:center">
      <label class="form-text" >订单号</label>
          <el-input size="small" placeholder="请输入订单号" class="input-width" />

      </div>
      <div class="toolbar-btn">
        <el-button size="small" type="primary">查询</el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>

    <div class=" block-wrap ">
      <div class="flex flex-align-center flex-justify-between table-top-wrap">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-wrap">
    <el-tab-pane label="用户管理" name="first"></el-tab-pane>
    <el-tab-pane label="配置管理" name="second"></el-tab-pane>
    <el-tab-pane label="角色管理" name="third"></el-tab-pane>
  </el-tabs>
  <span>

        <i class="el-icon-setting"></i>
        <i class="el-icon-refresh-right"></i>
  </span>
      </div>

      <TableTemplate style="margin-top:10px" />
      <pagination v-show="total > 0" :total="total" :page.sync="listPage.page" :limit.sync="listPage.pageSize" @pagination="loadData" />
    </div>
  </div>
</template>

<script>
// import { } from '@/api'
import TableTemplate from "./tableTemplate.vue";
export default {
  components: { TableTemplate },
  props: {},
  data() {
    return {
      activeName:'first',
      options: [
        { value: "全部", label: "全部" },
        { value: "其他", label: "其他" }
      ],
      form: {
        value1: "",
        value2: "全部"
      },
      total: 1,
      listPage: {
        page: 0,
        pageSzie: 20
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    loadData() {},
    handleClick() {}
  }
};
</script>

<style lang="scss" scoped>
.block-wrap {
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.1);
  margin: 20px;
  padding: 20px 20px 20px 20px;
  background: #fff;
}

.block-wrap + .block-wrap {
  margin-top: 20px;
}

.toolbar-wrap {
  display: flex;
  justify-content: space-between;
  background: #fff;
  // padding-bottom:0px;
  .toolbar-btn {
    text-align: left;
  }
}
.table-top-wrap {
  i {
    font-size: 20px;
    line-height: 36px;
    margin-left: 20px;
  }
}

.flex {
  display: flex;
  flex: &-align-center {
    align-items: center;
  }
  &-justify-center {
    justify-content: center;
  }
  &-justify-between {
    justify-content: space-between;
  }
  &-justify-end {
    justify-content: flex-end;
  }
}

.input-width {
  width: 250px;
}

.form-text{
      text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    /* line-height: 2.5rem; */
    padding: 0 10px 0 0;
    box-sizing: border-box;
}

    .el-tabs__nav-wrap::after{
    height: 0;
  }
</style>
