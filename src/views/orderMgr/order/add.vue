<template>
  <div class="container-wrap">
    <div class="left-wrap ">
      <div class="block-wrap ">
        <el-form label-width="120px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品信息</span>
            </div>
            <el-table :data="tableData">
              <el-table-column label="商品标题" min-width="200">
                <template slot-scope="scope">
                  <div class="flex-c">
                    <span style="color:red;margin-right:6px;font-size:16px">*</span>

                    <el-select v-model="scope.row.goods_id" filterable @change="val => onChangeGood(scope.row, val)" class="w300">
                      <el-option v-for="item in goodList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="stock" label="库存" min-width="100"> </el-table-column>
              <el-table-column prop="sales_price" label="销售价(元)" min-width="100"> </el-table-column>

              <el-table-column label="实收金额(元)" min-width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.actual_price" class="w200" />
                </template>
              </el-table-column>

              <el-table-column label="商品数量" min-width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.count" controls-position="right" :min="1" />
                </template>
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <i class="el-icon-delete table-delete-btn" @click="detRow(scoped.$index)"></i>
                </template>
              </el-table-column>
            </el-table>

            <div class="flex-cc add-row-wrap">
              <div @click="addRow">
                <i class="el-icon-plus"></i>
                <span>添加一行</span>
              </div>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>买家信息</span>
            </div>

            <el-form-item label="渠道类型" required>
              <SelOrderChannel v-model="buyer.channel_type" class="w200" />
            </el-form-item>
            <el-form-item label="手机号" required>
              <SelPhoneCode v-model="buyer.phone_code_id" class="w200" />
              <el-input v-model="buyer.buyer_phone" placeholder="请输入手机号" class="w250" @input="onInputPhone" />
              <div class="mark-icon-wrap">
                <svg-icon icon-class="check" class-name="check-panel-icon" />
                已注册
              </div>
              <div class="mark-icon-wrap">
                <svg-icon icon-class="check" class-name="check-panel-icon" />
                首购
              </div>
            </el-form-item>
            <el-form-item label="姓名" required>
              <el-input v-model="buyer.buyer_name" placeholder="请输入买家姓名" class="w450" />
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收货信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="收货人" required>
                  <el-input v-model="buyer.receive.receive_name" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="手机号" required>
                  <SelPhoneCode v-model="buyer.receive.phone_code_id" class="w200" />
                  <el-input v-model="buyer.receive.receive_phone" placeholder="请输入手机号码" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货地址" required>
                  <SelAddress v-model="buyer.receive.address_area_ids" placeholder="请选择省/市/区" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="详细地址" required>
                  <el-input v-model="buyer.receive.receive_address" placeholder="请输入详细地址" class="w450" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收款信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="销售价(元)">
                  <el-input v-model="buyer.total_money" disabled class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运费(元)" required>
                  <el-input v-model="buyer.express_price" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实收金额(元)" required>
                  <el-input v-model="buyer.payment_money" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款渠道" required>
                  <SelPayChannel v-model="buyer.pay_channel" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款情况" required>
                  <el-select v-model="buyer.payment_type" class="w125">
                    <el-option label="先款后货" :value="1"> </el-option>
                    <el-option label="先货后款" :value="2"> </el-option>
                  </el-select>
                  <SelOrderStatus v-model="buyer.total_money" class="w125" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款时间" required>
                  <el-date-picker v-model="buyer.pay_time" type="date" placeholder="选择日期" class="w250" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="第三方支付单号">
                  <el-input v-model="buyer.transaction_id" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="图片凭证">
                  <SingleImg v-model="buyer.pay_voucher" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
    </div>
    <!-- <div class="right-wrap ">
      <el-tabs tab-position="right" style="height: 200px;position: absolute;">
        <el-tab-pane label="商品信息"></el-tab-pane>
        <el-tab-pane label="买家信息"></el-tab-pane>
        <el-tab-pane label="收货信息"></el-tab-pane>
        <el-tab-pane label="金额信息"></el-tab-pane>
      </el-tabs>
    </div> -->
    <div class="bottom-bar-wrap flex-cc">
      <el-button type="primary" size="small" style="width:200px" @click="onSubmit">提 交</el-button>
    </div>
  </div>
</template>

<script>
import { addOrderList, getGoodsList, appUserStatus } from "@/api/order"
import SelPhoneCode from "@/components/SelectInput/selPhoneCode"
import SelAddress from "@/components/SelectInput/selAddress"
import SelOrderSource from "@/components/SelectInput/selOrderSource"
import SelPayChannel from "@/components/SelectInput/selPayChannel"
import SelOrderStatus from "@/components/SelectInput/selOrderStatus"
import SelOrderChannel from "@/components/SelectInput/selOrderChannel"
import SingleImg from "@/components/Upload/singleImg"
import { debounce } from "@/utils"
export default {
  components: { SelPhoneCode, SelAddress, SelOrderSource, SelPayChannel, SelOrderStatus, SingleImg, SelOrderChannel },
  props: {},
  data() {
    return {
      goodList: [],
      tableData: [{ v1: "" }, { v1: "" }],
      isFirst: 0, //是否首购  1是
      isReg: 0, //是否已注册 1是
      buyer: {
        receive: {} //收货信息
      } //买家信息
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData() {
      getGoodsList().then(res => {
        // console.log('res:', res)
        this.goodList = res.result
      })
    },
    addRow() {
      this.tableData.push({ v1: "" })
    },
    detRow(index) {
      this.tableData.splice(index, 1)
    },
    onChangeGood(row, val) {
      const currGood = this.goodList.find(item => item.id === val)
      if (currGood !== {}) {
        row.stock = currGood.stock
        row.sales_price = currGood.sales_price
        row.actual_price = currGood.sales_price
        row.count = 1
      }
    },
    onInputPhone(val) {
      debounce( function(){
        this.checkFirstReg(val)
        console.log('44444:', 44444)
      } , 500)
    },
    checkFirstReg(tel) {
      console.log("23:", 23)
      // appUserStatus({mobile: tel}).then(res => {
      //   this.isFirst = res.result.is_first_buy
      //   this.isReg = res.result.is_registered
      // })
    },
    onSubmit() {
      const params = {
        goods: this.tableData,
        ...this.buyer
      }
      console.log("params:", params)

      if (params.receive.address_area_ids.length) {
        params.receive.address_area_ids = params.receive.address_area_id.join(",")
      }

      addOrderList(params).then(res => {
        // console.log('res:', res)
        this.msgSuccess("订单创建成功")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-wrap {
  padding-bottom: 50px;
}

.block-wrap {
  margin: 20px;
}

.el-card + .el-card {
  margin-top: 20px;
}

.left-wrap {
  // width: calc(100% - 200px);
  width: 100%;
  display: inline-block;
}
.right-wrap {
  width: 200px;
  display: inline-block;
  padding-top: 20px;
}

.table-delete-btn {
  color: red;
  font-size: 20px;
  cursor: pointer;
}

.add-row-wrap {
  height: 40px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  div {
    cursor: pointer;
  }
  span {
    font-size: 15px;
    margin-left: 6px;
    color: #909399;
  }
}
.mark-icon-wrap {
  display: inline-block;
  // line-height: unset;
  // align-items: center;
  // height: 36px;
  .check-panel-icon {
    fill: red;
    font-size: 20px;
    margin-left: 18px;
  }
}

.bottom-bar-wrap {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}

.w250 {
  width: 250px !important;
}
.w125 {
  width: 125px !important;
}
</style>
