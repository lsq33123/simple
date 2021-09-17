<template>
  <div class="container-wrap">
    <div class="left-wrap ">
      <!-- {{ JSON.stringify(buyer) }} -->
      <!-- {{ JSON.stringify(tableData) }}  1-->
      <div class="block-wrap ">
        <el-form label-width="120px" ref="form1" :model="buyer" :rules="rules">
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
                  <el-input v-model="scope.row.actual_price" class="w200" @input="val => onInputNum(scope.row, val, 'actual_price', scope.$index)" maxlength="6" />
                </template>
              </el-table-column>

              <el-table-column label="商品数量" min-width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.count" class="w200" @input="val => onInputNum(scope.row, val, 'count', scope.$index)" />
                </template>
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <i class="el-icon-delete table-delete-btn" :class="{ disabled: scope.$index === 0 }" @click="detRow(scope.$index)"></i>
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

            <el-form-item label="渠道类型" prop="channel_type">
              <el-select v-model="buyer.channel_type" class="w200" @change="onChangeChannelType" filterable>
                <el-option v-for="item in channelTypeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代理商" prop="sales_agent_id" v-if="isNeedAgent" required>
              <SelSalesAgent v-model="buyer.sales_agent_id" class="w200" filterable />
            </el-form-item>
            <template v-else>
              <el-form-item label="手机号" prop="buyer_phone">
                <SelPhoneCode v-model="buyer.phone_code_id" class="w200" />
                <el-input v-model="buyer.buyer_phone" placeholder="请输入手机号" class="w250" @input="onInputPhone" />
                <div class="mark-icon-wrap" v-if="buyer.is_registered === 1">
                  <svg-icon icon-class="check" class-name="check-panel-icon" />
                  已注册
                </div>
                <div class="mark-icon-wrap" v-if="buyer.is_registered === 0">
                  <svg-icon icon-class="exclamstion" class-name="check-panel-icon" />
                  未注册
                </div>
                <div class="mark-icon-wrap" v-if="buyer.is_first === 1">
                  <svg-icon icon-class="check" class-name="check-panel-icon" />
                  首购
                </div>
                <div class="mark-icon-wrap" v-if="buyer.is_first === 0">
                  <svg-icon icon-class="exclamstion" class-name="check-panel-icon" />
                  非首购
                </div>
              </el-form-item>
              <el-form-item label="姓名" prop="buyer_name">
                <el-input v-model="buyer.buyer_name" placeholder="请输入买家姓名" class="w450" />
              </el-form-item>
            </template>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收货信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="收货人" prop="receive.receive_name">
                  <el-input v-model="buyer.receive.receive_name" placeholder="请输入收货人" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="手机号" prop="receive.receive_phone">
                  <SelPhoneCode v-model="buyer.receive.phone_code_id" class="w200" />
                  <el-input v-model="buyer.receive.receive_phone" placeholder="请输入手机号码" class="w250" @input="v => (buyer.receive.receive_phone = v.replace(/[^\d]/g, ''))" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货地址" prop="receive.address_area_ids">
                  <SelAddress v-model="buyer.receive.address_area_ids" placeholder="请选择省/市/区" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="详细地址" prop="receive.receive_address">
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
                <el-form-item label="运费(元)" prop="express_price">
                  <el-input v-model="buyer.express_price" class="w250" :maxlength="6" @input="onInputPrice" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实收金额(元)" prop="payment_money">
                  <el-input v-model="buyer.payment_money" class="w250" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款渠道" prop="pay_channel">
                  <SelPayChannel v-model="buyer.pay_channel" class="w250" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款情况" prop="payment_type">
                  <el-select v-model="buyer.payment_type" class="w125" @change="onChangePayment">
                    <el-option label="先款后货" :value="1"> </el-option>
                    <el-option label="先货后款" :value="2"> </el-option>
                  </el-select>
                  <el-select v-model="buyer.order_status" class="w125" disabled>
                    <el-option label="已收款" :value="10"> </el-option>
                    <el-option label="未收款" :value="0"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款时间" prop="pay_time">
                  <el-date-picker v-model="buyer.pay_time" type="date" placeholder="选择日期" class="w250" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="buyer.payment_type === 1">
              <el-col :span="8">
                <el-form-item label="第三方支付单号">
                  <el-input v-model="buyer.transaction_id" class="w250" :maxlength="100" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="图片凭证">
                  <!-- {{ JSON.stringify(buyer.pay_voucher_host +  buyer.pay_voucher) }} -->
                  <SingleImg v-model="buyer.pay_voucher" :imgAllUrl="buyer.pay_voucher_host + buyer.pay_voucher" />
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
import { addOrderList, getGoodsList, appUserStatus, getOrderDetail, editOrderList } from "@/api/order"
import { getOrderChannelList } from "@/api/common"
import SelPhoneCode from "@/components/SelectInput/selPhoneCode"
import SelAddress from "@/components/SelectInput/selAddress"
import SelOrderSource from "@/components/SelectInput/selOrderSource"
import SelPayChannel from "@/components/SelectInput/selPayChannel"
// import SelOrderStatus from "@/components/SelectInput/selOrderStatus"
import SelSalesAgent from "@/components/SelectInput/selSalesAgent"
import SingleImg from "@/components/Upload/singleImg"
import { debounce } from "@/utils"
export default {
  name: "addOrderList",
  components: { SelPhoneCode, SelAddress, SelOrderSource, SelPayChannel, SingleImg, SelSalesAgent },
  props: {},
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (this.isNeedAgent) {
        if (value === "") {
          callback(new Error("选择代理商"))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      goodList: [],
      tableData: [{ goods_id: "", actual_price: "", count: "" }],
      channelTypeList: [],
      currChannelObj: {},
      orderId: this.$route.query.orderId,
      buyer: {
        is_first: "", //是否首购  1是
        is_registered: "", //是否已注册 1是
        receive: {
          address_area_ids: []
        } //收货信息
      }, //买家信息

      rules: {
        channel_type: [{ required: true, message: "请选择渠道类型", trigger: "change" }],
        buyer_phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        buyer_name: [{ required: true, message: "请输入买家姓名", trigger: "blur" }],
        sales_agent_id: [{ validator: validatePass1, trigger: "change" }],
        "receive.receive_name": [{ required: true, message: "请输入收货人", trigger: "blur" }],
        "receive.receive_phone": [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        "receive.address_area_ids": [{ required: true, message: "请选择省/市/区", trigger: "change" }],
        "receive.receive_address": [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        express_price: [{ required: true, message: "请输入运费(元)", trigger: "blur" }],
        payment_money: [{ required: true, message: "请输入实收金额(元)", trigger: "blur" }],
        payment_type: [{ required: true, message: "请选择收款情况", trigger: "change" }],
        pay_channel: [{ required: true, message: "请选择收款渠道", trigger: "change" }],
        pay_time: [{ required: true, message: "请选择收款时间", trigger: "blur" }]
      }
    }
  },
  computed: {
    isNeedAgent() {
      //是否要填入代理商
      return this.currChannelObj.order_type === 3
    }
  },
  watch: {
    "buyer.buyer_phone"(val) {
      this.buyer.buyer_phone = val.replace(/[^\d]/g, "")
    }
  },
  created() {
    this.initData()
    if (this.orderId) {
      this.loadData()
    }
  },
  mounted() {},
  methods: {
    initData() {
      getGoodsList().then(res => {
        // console.log('res:', res)
        this.goodList = res.result
      })
      //获取代理商
      getOrderChannelList({ page: 1, page_size: 100 }).then(res => {
        // console.log('res:', res)
        this.channelTypeList = res.result.data
      })
    },
    loadData() {
      getOrderDetail({ id: this.orderId }).then(res => {
        // console.log('res:', res)
        const data = res.result || {}
        const goods = data.order_goods.map(item => {
          return {
            goods_id: item.goods_id,
            count: item.count,
            actual_price: item.actual_price,
            stock: item.stock,
            sales_price: item.sales_price
          }
        })
        this.tableData = goods

        // let recTemp = {}
        // if(data.order_receive_info && data.order_receive_info){
        //   const obj = data.order_logistics[0]
        //   recTemp = {
        //     receive_name: data.receive_name,
        //     receive_phone: data.receive_phone,
        //     phone_code_id: data.phone_code_id,
        //     receive_address: data.receive_address,
        //     province_id: data.province_id,
        //     address_area: data.address_area,
        //     address_area_ids: data.address_area_ids
        //   }
        // }

        if (data.order_receive_info && data.order_receive_info.address_area_ids) {
          const arr = data.order_receive_info.address_area_ids.split(",")
          const arr2 = arr.map(item => parseInt(item))
          data.order_receive_info.address_area_ids = arr2
        }

        this.buyer = {
          order_sn: data.order_sn,
          buyer_name: data.buyer_name,
          phone_code_id: data.phone_code_id,
          buyer_phone: data.buyer_phone,
          channel_type: data.channel_type,
          total_money: data.total_money,
          payment_money: data.payment_money,
          express_price: data.express_price,
          discount_amount: data.discount_amount,
          payment_type: data.payment_type,
          pay_channel: data.pay_channel,
          order_status: data.order_status,
          pay_time: data.pay_time,
          transaction_id: data.transaction_id,
          pay_voucher: data.pay_voucher,
          pay_voucher_host: data.pay_voucher_host,
          // goods: goods,
          receive: data.order_receive_info,
          sales_agent_id: data.sales_agent_id,
          is_registered: data.is_registered,
          is_first: data.is_first
        }
      })
    },
    addRow() {
      this.tableData.push({ goods_id: "", actual_price: "", count: "" })
    },
    detRow(index) {
      if (index) {
        this.tableData.splice(index, 1)
      }
    },

    onChangePayment(val) {
      if (val === 1) {
        this.buyer.order_status = 10
      } else if (val === 2) {
        this.buyer.order_status = 0
      }
    },
    onInputNum(row, val, type, index) {
      row[type] = val.replace(/[^\d]/g, "")
      if (type === "actual_price") {
      }
      if (type === "count") {
        // val = parseInt(val) //转化位数字
        if (val > row.stock) {
          row[type] = parseInt(row.stock)
        } else if (val < 1) {
          row[type] = 1
        }
          // this.$set(row,type,row[type])
      }
      this.onNum()
    },
    onInputPrice() {
      this.onNum()
    },
    onNum() {
      const total_money = this.tableData.reduce((total, item) => {
        return total + (item.sales_price || 0) * (item.count || 0)
      }, 0)
      const payment_money = this.tableData.reduce((total, item) => {
        return total + (item.actual_price || 0) * (item.count || 0)
      }, 0)

      this.$set(this.buyer, "total_money", total_money)
      this.$set(this.buyer, "payment_money", parseInt(payment_money + parseInt(this.buyer.express_price || 0))) //加上运费
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
    onChangeChannelType(val) {
      if (val) {
        this.currChannelObj = this.channelTypeList.find(item => item.id === val)
      } else {
        this.currChannelObj = {}
      }
    },
    onInputPhone: debounce(
      function(params) {
        this.checkFirstReg(params)
      },
      500,
      false
    ),
    checkFirstReg() {
      if (this.buyer.buyer_phone) {
        appUserStatus({ mobile: this.buyer.buyer_phone }).then(res => {
          this.buyer.is_first = res.result.is_first_buy
          this.buyer.is_registered = res.result.is_registered
        })
      } else {
        this.buyer.is_first = ""
        this.buyer.is_registered = ""
      }
    },
    onSubmit() {
      const params = JSON.parse(
        JSON.stringify({
          goods: this.tableData || [],
          ...this.buyer
        })
      )
      console.log("params:", params)

      if (params.goods.length <= 0) {
        this.msgWarning("请先选择至少一个商品")
        return
      } else if (params.goods.some(item => item.goods_id === "")) {
        this.msgWarning("请先完善商品信息")
        return
      }

      this.$refs["form1"].validate(valid => {
        if (valid) {
          if (params.receive.address_area_ids && params.receive.address_area_ids.length) {
            params.receive.address_area_ids = params.receive.address_area_ids.join(",")
          }

          if (this.orderId) {
            //修改
            editOrderList(params).then(res => {
              // console.log('res:', res)
              this.msgSuccess("订单修改成功")
              this.closeCurrPage()
            })
          } else {
            //新增
            addOrderList(params).then(res => {
              // console.log('res:', res)
              this.msgSuccess("订单创建成功")
              this.closeCurrPage()
            })
          }
        } else {
          this.msgWarning("请完善相关信息")
        }
      })
    },
    closeCurrPage() {
      let view = this.$router.history.current
      this.$store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
        if (window.history.length <= 1) {
          this.$router.push({ path: "/orderMgr/orderList" })
          return false
        } else {
          this.$router.go(-1)
        }
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
.disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>
