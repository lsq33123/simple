<template>
  <div>
    <el-drawer title="操作记录" :visible="isShow" direction="rtl" :before-close="onClose">
      <div class="order-info-wrap">订单号：Y20210124160923898909</div>
      <div style="padding-right:20px">
        <el-timeline>
          <el-timeline-item >
          <p class="el-timeline-item-title">售后审核通过</p>
          </el-timeline-item>
          <el-timeline-item >
          <p class="el-timeline-item-title">发起售后</p>
            <el-card>
              <h4>张三</h4>
              <p>2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
     
          <el-timeline-item >
          <p class="el-timeline-item-title">发货</p>
            <el-card>
              <h4>jinxia.feng</h4>
              <p>2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
     
          <el-timeline-item >
          <p class="el-timeline-item-title">修改订单 <span class="span-btn mg-l-20">详情</span></p>
            <el-card>
              <h4>xuanzhi.zeng</h4>
              <p>2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
     
          <el-timeline-item >
          <p class="el-timeline-item-title">创建订单 <span class="span-btn mg-l-20">详情</span></p>
            <el-card>
              <h4>xuanzhi.zeng</h4>
              <p>2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
     
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import { } from '@/api'
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClose() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-info-wrap{
  padding:0px 0px 40px 40px  ;
}

.el-timeline-item-title{
  font-weight: bold;
  font-size: 15px;
}

.span-btn {
  color: #1890ff;
  &:hover {
    color: #46a6ff;
    cursor: pointer;
  }
}
.mg-l-20{
  margin-left:20px;
}
</style>
