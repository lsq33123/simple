<template>
  <div>
    <el-drawer title="发货详情" :visible="isShow" direction="rtl" :before-close="onClose">
      <div class="order-info-wrap"><span>订单号：</span>{{form.current_info.order_sn}}</div>
      <div class="order-info-wrap"><span>OBD序列号：</span>{{}}</div>
      <div class="order-info-wrap flex"><span>发货方式：</span>
      <div>
        <p class="obd-sty" v-for="item in formObdList" :key="item">{{item}}</p>
      </div>
      </div>
      <div class="order-info-wrap"><span>快递信息：</span>{{form.current_info.express_company}} {{form.current_info.express_number}}</div>
      <div class="order-info-wrap"><span>发货时间：</span>{{form.current_info.delivery_time}}</div>
      <div class="order-info-wrap"><span>备注：</span>{{form.current_info.remark}}</div>
      <div style="padding-right:20px">
        <el-timeline>
     
          <el-timeline-item v-for="(item,index) in form.logistics_snapshot_list" :key="index">
          <p class="el-timeline-item-title">{{item.operation_name}}</p>
            <el-card>
              <h4>{{item.operator}}</h4>
              <p>{{item.operation_time_string}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {getLogisticsDetails } from '@/api/order'
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form:{
        current_info:{
          serial_number:''
        }, //发货记录当前信息
        logistics_snapshot_list:[] //发货记录快照
      }
    };
  },
  computed: {
    formObdList(){
      return this.form.current_info.serial_number.split(',')
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    loadData(id){
      if(id) {
        getLogisticsDetails({order_logistics_id:id}).then(res => {
          // console.log('res:', res)
          this.form = res.result
        })
      }
    },
    onClose() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-info-wrap{
  padding:0px 0px 20px 40px  ;
  font-size:15px;
  span{
    font-weight: bold;
  }
}

.el-timeline-item-title{
  font-weight: bold;
  font-size: 15px;
}

.obd-sty{
  padding:0;
  margin:0;
  margin-bottom: 10px;;
}

</style>
