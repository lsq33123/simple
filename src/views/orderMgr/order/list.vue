<template>
  <div>
    <div class="toolbar-wrap block-wrap">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="订单号">
              <el-input size="small" placeholder="请输入订单号" class="input-width" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品标题">
              <el-input size="small" placeholder="请输入关键字" class="input-width" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="买家">
              <el-input size="small" placeholder="请输入手机号" class="input-width" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="下单时间">
              <el-date-picker v-model="form.value1"size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="input-width" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="订单来源">
              <el-select v-model="form.value2" size="small" placeholder="请选择" class="input-width">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="渠道类型">
              <el-select v-model="form.value2" size="small" placeholder="请选择" class="input-width">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="订单状态">
              <el-select v-model="form.value2" size="small" placeholder="请选择" class="input-width">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="付款转态">
              <el-select v-model="form.value2" size="small" placeholder="请选择" class="input-width">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="发货状态">
              <el-select v-model="form.value2" size="small" placeholder="请选择" class="input-width">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="toolbar-btn">
              <el-button size="small" type="primary">查询</el-button>
              <el-button size="small">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class=" block-wrap ">
      <div class="flex flex-align-center flex-justify-end table-top-wrap">
        <span>
        <el-button size="small" type="primary">创建订单</el-button>
        <el-button size="small">导出</el-button>
        </span>
        <i class="el-icon-refresh-right"></i>
        <i class="el-icon-setting"></i>
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
      options: [
        { value: "全部", label: "全部" },
        { value: "其他", label: "其他" }
      ],
      form: {
        value1: "",
        value2: "全部"
      },
      total:1,
      listPage:{
        page:0,
        pageSzie:20
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    loadData(){

    }
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
  background: #fff;
  padding-bottom: 0px;
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
</style>
