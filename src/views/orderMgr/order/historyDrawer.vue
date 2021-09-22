<template>
  <div>
    <el-drawer title="操作历史" :visible="isShow" direction="rtl" :before-close="onClose">
      <div class="order-info-wrap"><span>订单号：</span>{{order_sn}}</div>
      <div style="padding-right:20px">
        <el-timeline>
      

          <el-timeline-item v-for="(item,index) in timeLineArr" :key="index">
            <p class="el-timeline-item-title">
              {{item.operation_name}}
              <span class="text-btn ml20" v-if="item.operation_type === 'create_order' || item.operation_type === 'edit_order'" @click="onDetail(item)">详情</span>
              </p>
            <el-card>
              <h4>{{item.operator}} </h4>
              <p>{{item.operation_time_string}} </p>
            </el-card>
          </el-timeline-item>

        </el-timeline>
      </div>
    </el-drawer>
    <OrderDetDialog :isShow.sync="isShowDetail" :form="form"/>
  </div>
</template>

<script>
// import { } from '@/api'
import { getOrderHistoryDetail } from "@/api/order"
import OrderDetDialog from './orderDetDialog.vue'
export default {
  components: {OrderDetDialog},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeLineArr: [],
      order_sn: "",
      isShowDetail:false,
      form:{}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    loadData(order_sn) {
      this.order_sn = order_sn
      if (order_sn) {
        getOrderHistoryDetail({order_sn}).then(res => {
          // console.log('res:', res)
          this.timeLineArr = res.result
        })
      }
    },
    onDetail(item){
      this.isShowDetail = true
      this.form ={
        ...item.order_info,
        order_receive_info: item.order_receive_info,
        order_goods:item.order_goods,
        order_logistics:item.order_logistics,
      }
    },
    onClose() {
      this.$emit("update:isShow", false)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-info-wrap {
  padding: 0px 0px 20px 40px;
  font-size: 15px;
  span {
    font-weight: bold;
  }
}

.el-timeline-item-title {
  font-weight: bold;
  font-size: 15px;
}
</style>
