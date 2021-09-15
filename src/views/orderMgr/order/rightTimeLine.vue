<template>
  <div>
    <el-timeline>
      <el-timeline-item>
        <p class="el-timeline-item-title">售后审核通过</p>
      </el-timeline-item>
      <el-timeline-item>
        <p class="el-timeline-item-title">发起售后</p>
        <el-card>
          <h4>张三</h4>
          <p>2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item>
        <p class="el-timeline-item-title">发货</p>
        <el-card>
          <h4>jinxia.feng</h4>
          <p>2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item>
        <p class="el-timeline-item-title">修改订单 <span class="text-btn ml20" @click="onDet">详情</span></p>
        <el-card>
          <h4>xuanzhi.zeng</h4>
          <p>2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item>
        <p class="el-timeline-item-title">创建订单 <span class="text-btn ml20" @click="onDet">详情</span></p>
        <el-card>
          <h4>xuanzhi.zeng</h4>
          <p>2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getOrderHistoryDetail } from "@/api/order"
export default {
  components: {},
  props: {},
  data() {
    return {
      order_sn: ""
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
        getOrderHistoryDetail({ order_sn }).then(res => {
          // console.log('res:', res)
          this.timeLineArr = res.result
        })
      }
    },
    onDet() {
      this.$emit("onDet")
    }
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
