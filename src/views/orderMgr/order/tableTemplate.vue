<template>
  <div class="table-wrap">
    <div class="title-wrap">
      <div v-for="(item, index) in columns" :key="index" v-show="item.show" class="title-item-wrap" :style="{ 'min-width': item.width + 'px' }">
        <!-- <span v-if=""></span> -->
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="body-wrap">
      <div v-for="(item, index) in tableData" :key="index" class="body-item-wrap">
        <div class="title-info">
          <span>
            订单号：{{ item.order_sn }}
            <span class="text-btn" @click="onCopy(item.order_sn)">复制</span>
          </span>
          <span>下单时间：{{ item.create_time }}</span>
          <span >订单来源：{{ item.order_type_name }}</span>
        </div>
        <div class="row-info flex">
          <div v-for="(col, cIndex) in columns" :key="cIndex" v-show="col.show" class="row-info-item" :style="{ 'min-width': col.width + 'px' }">
            <div v-if="col.prop === 'goods_name'" class="row-info-item-prop">
              <div class="flex flex-align-center con-cell" v-for="(good, gindex) in item.order_goods" :key="gindex">
                <img :src="good.goods_pic" />
                <span class="color-blue ml10 line-num">{{ good.goods_name }}</span>
              </div>
            </div>
            <div v-else-if="col.prop === 'order_status_name'" class="flex flex-align-center con-cell row-info-item-prop">
              <!-- <el-tag type="success">{{ item.order_status_name }}</el-tag> -->
              {{ item.order_status_name }}
            </div>
            <div v-else-if="col.prop === 'v5'" class="row-info-item-prop">
              <div class="flex flex-align-center con-cell" v-for="(good, gindex) in item.order_goods" :key="gindex">
                {{ good.price }}
              </div>
            </div>
            <div v-else-if="col.prop === 'v6'" class="row-info-item-prop">
              <div class="flex flex-align-center con-cell" v-for="(good, gindex) in item.order_goods" :key="gindex">
                {{ good.count }}
              </div>
            </div>
            <div v-else-if="col.prop === 'payment_money'" class="flex flex-align-center con-cell row-info-item-prop">
              <span style="font-weight:bold;color:red"> {{ item.payment_money }}</span>
            </div>
            <div v-else-if="col.prop === 'buyer_phone'" class="flex flex-align-center con-cell row-info-item-prop">
              <span class="color-blue"> {{ item.buyer_phone }}</span>
            </div>
            <div v-else-if="col.prop === 'v9'" class="flex flex-align-center con-cell row-info-item-prop">
              <div v-if="item.order_logistics_info">
                <p>{{ item.order_logistics_info.receive_name || "" }} {{ item.order_logistics_info.receive_phone || "" }}</p>
                <p>{{ `${item.order_logistics_info.receive_area || ""} ${item.order_logistics_info.receive_address || ""}` }}</p>
              </div>
            </div>
            <div v-else-if="col.prop === 'v10'" class="flex flex-align-center con-cell row-info-item-prop"></div>

            <div v-else-if="col.prop === 'action'" class="flex flex-align-center con-cell row-info-item-prop">
              <div style="line-height:30px">
                <span class="text-btn mr10" @click="onDetail(item.id)">详情</span>
                <span class="text-btn mr10" @click="onRemark(item.order_sn)">备注</span>
                <span class="text-btn mr10" @click="onSend(item.order_sn)" v-if="item.order_status ===10 || item.order_status ===20">发货</span>
                <span class="text-btn mr10" @click="onCancel(item.order_sn)" v-if="item.order_type ===1 &&  item.order_status === 0">取消订单</span>
                <span class="text-btn mr10" v-if="item.order_status !== 9998 &&  item.order_status !== 9999 &&  item.order_status !== 40 && item.order_type ===2" @click="onEdit(item.id,item.order_status)">编辑</span>
                <span class="text-btn mr10" v-if="item.order_status !== 9998 &&  item.order_status !== 9999">发起售后</span>
                <span class="text-btn mr10" @click="onHistory(item.order_sn)">操作历史</span>
              </div>
            </div>
            <div v-else class="flex flex-align-center con-cell row-info-item-prop"></div>
          </div>
        </div>

        <div v-if="item.user_remark || item.remark" class="remark-info">
          <p v-if="item.user_remark">买家备注：{{ item.user_remark }}</p>
          <p v-if="item.remark">商家备注：{{ item.remark }}</p>
        </div>
      </div>
    </div>
    <RemarkDialog :isShow.sync="isShowRemark" v-if="isShowRemark" :currOrderNo="currOrderNo" @onSure="onSureRemark"/>
    <HistoryDrawer :isShow.sync="isShowHistory" ref="history"/>
  </div>
</template>

<script>
import RemarkDialog from "./remarkDialog.vue"
import HistoryDrawer from "./historyDrawer.vue"
import {copyText} from '@/utils/ruoyi'
export default {
  components: { RemarkDialog, HistoryDrawer },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowRemark: false,
      isShowHistory: false,
      currOrderNo:'',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onCopy(val){
        copyText(val).then(res => {
          this.$message.success('复制成功！')
        })
    },
    onDetail(id){
      // this.currOrderNo = order_sn
      this.$router.push("/orderMgr/orderDet?orderId=" + id)
    },
    onEdit(id,order_status){
      this.$router.push("/orderMgr/editOrderList?orderId=" + id )
    },
    onSend(order_sn){
      this.currOrderNo = order_sn
      this.$router.push("/orderMgr/sendList?order_sn=" + order_sn)
    },
    onCancel(order_sn){
      this.currOrderNo = order_sn
      // this.$router.push("/orderMgr/sendList?order_sn=" + order_sn)
    },
    onRemark(order_sn){
      this.currOrderNo = order_sn
      this.isShowRemark = true
    },
    onHistory(order_sn){
      this.currOrderNo = order_sn
      this.isShowHistory = true
      this.$refs.history.loadData(order_sn)
    },
    onSureRemark(){
      this.isShowRemark = false
      this.$emit('reload')
    },
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
}

.title-wrap {
  display: flex;
  height: 40px;
  line-height: 40px;
  .title-item-wrap {
    &:first-child {
      padding-left: 10px;
    }
    padding: 0px 10px;
    flex: 1;
    font-weight: bold;
    background-color: #f8f8f9;
    color: #515a6e;
    font-size: 14px;
  }
}
.body-wrap {
  font-size: 13px;
  .body-item-wrap {
    &:first-child {
      margin-top: 10px;
    }
    .title-info {
      display: flex;
      align-items: center;
      background: #d2ecfb;
      padding: 8px 10px;
      font-size: 13px;
      border: 1px solid #dfe6ec;

      span + span {
        margin-left: 40px;
      }
    }

    .remark-info {
      background-color: #ffeee3;
      color: #ff8963;
      padding: 2px 10px;
      font-size: 13px;
      border: 1px solid #dfe6ec;
      border-top: 0px;
      p {
        margin: 6px 0px;
      }
    }

    .row-info {
      // padding: 5px 0px;
      border: 1px solid #dfe6ec;
      border-top: 0px;

      .row-info-item {
        display: flex;
        align-items: center;
        flex: 1;
        // padding: 0px 5px;
        border-right: 1px solid  #dfe6ec;
        img {
          width: 70px;
          height: 70px;
        }
        &-prop{
          width: 100%;
        }
      }
      .row-info-item:last-child {
        border-right:0px;
      }
    }
  }

  .body-item-wrap + .body-item-wrap {
    margin-top: 20px;
  }
}

.color-blue {
  color: #1890ff;
}

.con-cell{
  height: 80px;
  width: 100%;
  padding: 0px 10px ;
}

.con-cell + .con-cell{
  border-top:1px solid  #dfe6ec;
}

.line-num{
  -webkit-line-clamp: 3; // 用来限制在一个块元素显示的文本的行数
display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
word-break: break-all;
overflow: hidden;
}
</style>
