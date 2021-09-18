<template>
  <div>
    <el-timeline>
          <el-timeline-item v-for="(item,index) in timeLineArr" :key="index">
            <p class="el-timeline-item-title">
              {{item.operation_name}}
              <span class="text-btn ml20" v-if="item.operation_type === 'create_order' || item.operation_type === 'create_order'" @click="onDetail(item)">详情</span>
              </p>
            <el-card>
              <h4>{{item.operator}} </h4>
              <p>{{item.operation_time_string}} </p>
            </el-card>
          </el-timeline-item>
    </el-timeline>
        <OrderDetDialog :isShow.sync="isShowDetail" :form="form"/>
  </div>
</template>

<script>
import { getOrderHistoryDetail } from "@/api/order"
import OrderDetDialog from './orderDetDialog.vue'
export default {
  components: {OrderDetDialog},
  props: {},
  data() {
    return {
      order_sn: "",
      isShowDetail:false,
      form:{},
      timeLineArr:[]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    loadData(order_sn) {
      this.order_sn = order_sn
      if (order_sn) {
        getOrderHistoryDetail({ order_sn }).then(res => {
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
  }
}
</script>

<style lang="scss" scoped>
.el-timeline {
  padding-left: 0px;
  margin-right: 20px;
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);
}
</style>
