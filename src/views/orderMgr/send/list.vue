<template>
  <div>
    <div class="toolbar-wrap block-wrap">
      <div style="display:flex;align-items:center">
        <label class="form-text">订单号</label>
        <el-input v-model="orderNo" size="small" placeholder="请输入订单号" class="input-width" />
      </div>
      <div class="toolbar-btn">
        <el-button size="small" type="primary" @click="loadData">查询</el-button>
        <el-button size="small" @click="orderNo = ''">重置</el-button>
      </div>
    </div>

    <div class=" block-wrap ">
      <div class="flex flex-align-center flex-justify-between table-top-wrap">
        <div class="tab-wrap__no-border">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in orderStatusList" :key="index" :label="item.name" :name="item.id+ ''" />
          </el-tabs>
        </div>
        <span>
          <i class="el-icon-refresh-right" @click="loadData"></i>
          <!-- <i class="el-icon-setting"></i> -->
          <Setting :columns="columns" @onChangeCheck="onChangeCheck"/>
        </span>
      </div>

      <TableTemplate :tableData="tableData"  :columns="columns" class="mt10" @reload="loadData"/>
      <pagination v-show="total > 0" :total="total" :page.sync="listPage.page" :limit.sync="listPage.page_szie" @pagination="loadData" />
    </div>
  </div>
</template>

<script>
import { getOrderLogisticsList } from "@/api/order"
import TableTemplate from "./tableTemplate.vue"
import Setting from '@/components/RightToolbar/setting'
export default {
  components: { TableTemplate ,Setting},
  props: {},
  data() {
    return {
      activeName: "1",
      orderNo: "",
      orderStatus: 1,
      orderStatusList:[{id:1,name:'待发货'},{id:2,name:'已发货'}],
      tableData: [],
      total: 1,
      listPage: {
        page: 1,
        page_size: 20
      },
                  columns: [
        {
          label: "商品",
          prop: "v1",
          width: 500,
          show:true
        },

        {
          label: "发货状态",
          prop: "v4",
          width: 100,
          show:true
        },

        {
          label: "收货信息",
          prop: "v9",
          width: 100,
          show:true
        },
        {
          label: "发货信息",
          prop: "v10",
          width: 100,
          show:true
        },
        {
          label: "备注",
          prop: "v11",
          width: 100,
          show:true
        },
        {
          label: "操作",
          prop: "action",
          width: 100,
          show:true
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    loadData() {
      const params = {
        order_sn: this.orderNo,
        order_status_ex: this.orderStatus,
        ...this.listPage
      }
      getOrderLogisticsList(this.removeEmpty(params)).then(res => {
        this.tableData = res.result.list || []
        this.total = res.result.total
      })
    },
    handleClick() {},
        onChangeCheck(arr){
      this.columns.forEach((item,index)=>{
        if(arr.includes(item.label)){
          item.show = true
        } else {
          item.show = false
        }
        this.$set(this.columns,index,item)
      })
    }
  }
}
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

.form-text {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  /* line-height: 2.5rem; */
  padding: 0 10px 0 0;
  box-sizing: border-box;
}
</style>

<style>
.tab-wrap__no-border .el-tabs__nav-wrap::after {
  height: 0 !important;
  bottom: 30px !important;
}
</style>
