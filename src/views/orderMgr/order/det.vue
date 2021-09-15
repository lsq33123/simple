<template>
  <div class="pb50">
    <el-row>
      <el-col :span="18" class="p20">
        <DetForm :form="form"/>
      </el-col>
      <el-col :span="6">
        <RightTimeLine ref="rightTimeLine" @onDet="onDet"  />
      </el-col>
    </el-row>

    <div class="bottom-bar-wrap flex-cc fixed-footer">
      <el-button type="" size="small" class="w100" @click="isShowRemark = true">备 注</el-button>
      <el-button type="" size="small" class="w100">取消售后</el-button>
    </div>

    <OrderDetDialog :isShow.sync="isShowLine"/>
    <RemarkDialog :isShow.sync="isShowRemark" :currOrderNo="form.order_sn" />
  </div>
</template>

<script>
import { getOrderDetail} from '@/api/order'
import DetForm from "./detForm.vue";
import RightTimeLine from "./rightTimeLine.vue";
import OrderDetDialog from "./orderDetDialog.vue";
import RemarkDialog from "./remarkDialog.vue"
export default {
  components: {
    DetForm,
    RightTimeLine,
    OrderDetDialog,
    RemarkDialog
  },
  props: {},
  data() {
    return {
     isShowLine:false,
     isShowRemark:false,
     orderId:this.$route.query.orderId,
     form:{}
    };
  },
  computed: {},
  watch: {
    // orderId(val){
    //   this.loadData()
    // }
  },
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    loadData(){
      if(this.orderId) {
        getOrderDetail({"id": this.orderId}).then(res => {
          // console.log('res:', res)
          this.form = res.result
          this.$refs.rightTimeLine.loadData(this.form.order_sn)
        })
      }
    },
    onDet(){
      this.isShowLine = true
    }
  }
};
</script>

<style lang="scss" scoped>
.pb50 {
  padding-bottom: 50px;
}
.bottom-bar-wrap {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
</style>
