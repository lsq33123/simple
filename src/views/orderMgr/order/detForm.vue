<template>
  <div>
    <el-form label-width="110px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号"> {{form.order_sn}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单时间"> {{form.pay_time}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单来源"> {{form.order_type_name}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道类型"> {{form.channel_type_name}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态"> {{form.order_status_name}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="售后状态"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="推荐人"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="买家备注"> {{form.user_remark}}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商家备注"> {{form.remark}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品信息</span>
        </div>
        <el-row v-for="(item,index) in form.order_goods" :key="index" class="line-border">
          <el-col :span="4">
            <el-form-item label="商品ID"> {{item.goods_id}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品标题"> {{item.goods_name}}</el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售价"> {{item.price}}</el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="实收金额"> {{item.actual_price}}</el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="数量"> {{item.count}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>买家信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="昵称"> {{form.buyer_name}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号"> {{form.buyer_phone}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否首购"> {{form.is_first ? '是' : '否'}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收货信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="收货人"> {{form.order_receive_info && form.order_receive_info.receive_name || ''}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号"> {{form.order_receive_info && form.order_receive_info.receive_phone || ''}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址"> {{form.order_receive_info && form.order_receive_info.receive_address || ''}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发货信息</span>
        </div>
        <el-row v-for="(item,index) in form.order_logistics" :key="index" class="line-border">
          <el-col :span="6">
            <el-form-item label="收货人"> {{item.receive_name}}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="快递信息"> {{item.express_company_id}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货时间"> {{item.delivery_time}}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注"> {{item.remark}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>金额信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="支付渠道"> {{form.pay_channel_name}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="第三方支付单号" label-width="110px"> {{form.transaction_id}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="图片凭证"> {{form.pay_voucher}}</el-form-item> -->
            <el-form-item label="图片凭证">
              <span v-if="form.pay_voucher" class="text-btn" @click="onShowIUmg(form.pay_voucher)">点击查看</span>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="支付时间"> {{form.pay_time}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠券"> {{form.user_coupon_ids}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="销售价"> {{form.total_money}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="佣金抵扣"> {{form.commission}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠券抵扣"> {{form.coupon_money}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="运费"> {{form.express_price}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实收金额"> {{form.payment_money}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>售后信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="售后状态"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="售后类型"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款信息"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="退货方式"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="备注"> {{form.itemttttttttttt}}</el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>


    <el-dialog :visible.sync="isShowImg" title="图片凭证" width="1000px" :append-to-body="true">
      <!-- {{ JSON.stringify(currImgUrl) }} -->
      <img :src="currImgUrl" class="wp100 wh100"/>
    </el-dialog>

  </div>
</template>

<script>

export default {
  components: {},
  props: {
    form:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      isShowImg:false,
      currImgUrl: '',
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {

    onShowIUmg(url){
      this.isShowImg = true
      this.currImgUrl = url
    }
  }
};
</script>

<style lang="scss" scoped>
.block-wrap {
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.1);
  padding: 20px;
  background: #fff;
}


.el-card + .el-card {
  margin-top: 20px;
}

.line-border + .line-border{
  border-top:1px solid #dfe6ec;
}

.el-form-item{
  margin-bottom: 10px;
}
</style>
