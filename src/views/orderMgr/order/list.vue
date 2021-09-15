<template>
  <div>
    <div class="toolbar-wrap block-wrap">
      <el-form label-width="100px" ref="form" :model="form">
        <el-row>
          <el-col :span="7">
            <el-form-item label="订单号" prop="order_sn">
              <el-input v-model="form.order_sn" size="small" placeholder="请输入订单号" class="w250" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品标题" prop="goods_name">
              <el-input v-model="form.goods_name" size="small" placeholder="请输入关键字" class="w250" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="买家" prop="buyer_phone">
              <el-input v-model="form.buyer_phone" size="small" placeholder="请输入手机号" class="w250" clearable />
            </el-form-item>
          </el-col>
          <template v-if="isExt">
            <el-col :span="7">
              <el-form-item label="下单时间" prop="create_time">
                <el-date-picker
                  v-model="form.create_time"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  class="w250"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="订单来源" prop="order_type">
                <SelOrderSource v-model="form.order_type" size="small" class="w250" showAll filterable clearable @change="onChange" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="渠道类型" prop="channel_type">
                <SelOrderChannel v-model="form.channel_type" size="small" class="w250" showAll filterable clearable @change="onChange" />
              </el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="订单状态" prop="order_status">
                <!-- <SelOrderStatus v-model="form.order_status" size="small" placeholder="请选择" showAll clearable class="w250" /> -->

                <el-select v-model="form.order_status" size="small" placeholder="请选择" clearable class="w250">
                  <el-option label="全部" value="" />
                  <el-option v-for="item in tabList" :key="item.value" :label="item.name" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="3">
            <div class="toolbar-btn flex-c">
              <el-button size="small" type="primary" @click="loadData">查询</el-button>
              <el-button size="small" @click="onReset">重置</el-button>
              <span v-if="!isExt" class="text-btn ml10 fz15" @click="isExt = true"> 展开 <i class="el-icon-arrow-down"></i> </span>
              <span v-else class="text-btn ml10 fz15" @click="isExt = false"> 收起 <i class="el-icon-arrow-up "></i> </span>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="block-wrap ">
      <div class="flex-c flex-justify-between table-top-wrap">
        <el-tabs v-model="activeName" class="tab-wrap__no-border" @tab-click="onChangeTab">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.name" :name="item.value + ''"></el-tab-pane>
        </el-tabs>

        <div class="flex-c">
          <el-button size="small" type="primary" @click="onAdd">创建订单</el-button>
          <el-button size="small" @click="onExport">导 出</el-button>
          <i class="el-icon-refresh-right pointer" @click="loadData"></i>
          <!-- <i class="el-icon-setting pointer"></i> -->
          <Setting :columns="columns" @onChangeCheck="onChangeCheck"/>
        </div>
      </div>

      <TableTemplate :tableData="tableData" :columns="columns"  class="mt10" @reload="loadData"/>
      <pagination v-show="total > 0" :total="total" :page.sync="listPage.page" :limit.sync="listPage.page_size" @pagination="loadData" />
    </div>
  </div>
</template>

<script>
import { getOrderList, getOrderStatus } from "@/api/order"
import TableTemplate from "./tableTemplate.vue"
import SelOrderChannel from "@/components/SelectInput/selOrderChannel"
import SelOrderSource from "@/components/SelectInput/selOrderSource"
import SelOrderStatus from "@/components/SelectInput/selOrderStatus"
import Setting from '@/components/RightToolbar/setting'
export default {
  components: { TableTemplate, SelOrderChannel, SelOrderSource, SelOrderStatus ,Setting},
  props: {},
  data() {
    return {
      isExt: false,
      activeName: "first",
      tabList: [],
      form: {
        goods_name: "",
        order_type: "",
        channel_type: "",
        order_status: ""
      },
      tableData: [],
      total: 1,
      listPage: {
        page: 1,
        page_size: 20
      },
            columns: [
        {
          label: "商品",
          prop: "goods_name",
          width: 200,
          show:true
        },
        {
          label: "订单状态",
          prop: "order_status_name",
          width: 100,
          show:true
        },

        {
          label: "单价（元）",
          prop: "v5",
          width: 100,
          show:true
        },
        {
          label: "数量",
          prop: "v6",
          width: 100,
          show:true
        },
        {
          label: "实收（元）",
          prop: "payment_money",
          width: 100,
          show:true
        },
        {
          label: "买家",
          prop: "buyer_phone",
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
          label: "售后",
          prop: "v10",
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
    this.initData()
    this.loadData()
  },
  mounted() {},
  methods: {
    initData() {
      getOrderStatus().then(res => {
        // console.log('res:', res)
        this.tabList = res.result
      })
    },
    loadData() {

      if(this.form.order_status === ''){
        this.activeName = 'first'
      } else {
        this.activeName = this.form.order_status + ''
      }

      const params = { ...this.form, ...this.listPage }
      if (params.create_time && params.create_time.length) {
        params.create_start = params.create_time[0]
        params.create_end = params.create_time[1]
      }
      delete params.create_time
      getOrderList(this.removeEmpty(params)).then(res => {
        // console.log('res:', res)
        this.tableData = res.result.data
        this.total = res.result.total
      })
    },
    onChange(val) {},
    onChangeTab(tab) {
      if (tab.name === "first") {
        this.form.order_status = ""
      } else {
        this.form.order_status = parseInt(tab.name)
      }
      this.loadData()
    },
    onReset() {
      this.$refs.form.resetFields()
    },
    onAdd() {
      this.$router.push("/orderMgr/addOrderList")
    },
    onExport() {
      this.$message.warning("稍后导出~")
    },
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
  background: #fff;
  padding-bottom: 0px;
  .toolbar-btn {
    text-align: left;
    margin-top: 2px;
  }
}
.table-top-wrap {
  i {
    font-size: 20px;
    line-height: 36px;
    margin-left: 20px;
  }
}

.w250 {
  width: 250px;
}
</style>
<style lang="scss">
.tab-wrap__no-border {
  .el-tabs__nav-wrap::after {
    height: 0 !important;
    bottom: 30px !important;
  }
  .el-tabs__header {
    margin: 0px;
  }
}
</style>
