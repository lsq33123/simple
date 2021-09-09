<template>
  <div>
    <el-form label-width="110px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单时间"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单来源"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道类型"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="售后状态"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="推荐人"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="买家备注"> </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商家备注"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品信息</span>
        </div>
        <el-row>
          <el-col :span="4">
            <el-form-item label="商品ID"> </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品标题"> </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售价"> </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="实收金额"> </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="数量"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>买家信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="昵称"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否首购"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收货信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="收货人"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号"> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发货信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="收货人"> </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="快递信息"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货时间"> </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>金额信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="支付渠道"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="第三方支付单号" label-width="110px"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="图片凭证"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="支付时间"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠券"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="销售价"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="佣金抵扣"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠券抵扣"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="运费"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实收金额"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>售后信息</span>
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="售后状态"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="售后类型"> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款信息"> </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="退货方式"> </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="备注"> </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script>
// import { } from '@/api'
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
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

.el-form-item{
  margin-bottom: 10px;
}
</style>
