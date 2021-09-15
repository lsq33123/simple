<template>
  <div class="table-wrap">
    <div class="title-wrap">
      <div v-for="(item, index) in columns" :key="index" v-show="item.show"  class="title-item-wrap" :style="{ 'min-width': item.width + 'px' }">
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
          <span>订单来源：{{ item.order_type_name }}</span>
        </div>
        <div class="row-info flex">
          <div v-for="(col, cIndex) in columns" :key="cIndex"  v-show="col.show" class="row-info-item" :style="{ 'min-width': col.width + 'px' }">
            <div v-if="col.prop === 'v1'" class="row-info-item-prop">
              <div class="flex flex-align-center info-prop-wrap " v-for="(good, gindex) in item.goods_list" :key="gindex">
                <div class="flex-c wp100 hp100 ">
                  <div class="flex-c flex1 child-cell child-cell-item">
                    <img :src="good.goods_picture_url" />
                    <span class="color-blue ml10">{{ good.goods_name }}</span>
                  </div>
                  <div v-if="good.has_sub_goods" class="flex1 bl child-cell">
                    <div class="flex-c ptb10 child-cell-item" v-for="(list, lindex) in good.logistics_list" :key="lindex">
                      <img :src="list.sub_goods_picture_url" />
                      <span class="color-blue ml10">{{ list.sub_goods_name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="col.prop === 'v4'" class="flex flex-align-center cell wp100 flex-column">
              <div :class="{ 'other-cell': good.logistics_list.length === 1 }" class="flex-c  wp100 flex-column cell-border" v-for="(good, gindex) in item.goods_list" :key="gindex">
                <div class="other-cell flex-c child-cell-item" v-for="(list, lindex) in good.logistics_list" :key="lindex">
                  <span class="">{{ list.logistics_state_name }}</span>
                </div>
              </div>
            </div>
            <div v-else-if="col.prop === 'v9'" class="flex flex-align-center cell wp100 flex-column">
              <div :class="{ 'other-cell': good.logistics_list.length === 1 }" class="flex-c  wp100 flex-column cell-border" v-for="(good, gindex) in item.goods_list" :key="gindex">
                <div class="other-cell flex-c child-cell-item" v-for="(list, lindex) in good.logistics_list" :key="lindex">
                  <div>
                    <p class="table-line-p">{{ list.receive_name }} {{ list.receive_phone }}</p>
                    <p class="table-line-p">{{ list.receive_address }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="col.prop === 'v10'" class="flex flex-align-center cell wp100 flex-column">
              <div :class="{ 'other-cell': good.logistics_list.length === 1 }" class="flex-c  wp100 flex-column cell-border" v-for="(good, gindex) in item.goods_list" :key="gindex">
                <div class="other-cell flex-c child-cell-item" v-for="(list, lindex) in good.logistics_list" :key="lindex">
                  <div>
                    <p class="table-line-p">发货方式：{{ list.logistics_mode_name }}</p>
                    <p class="table-line-p">快递公司：{{ list.express_company }}</p>
                    <p class="table-line-p">运单号：{{ list.express_number }}</p>
                    <p class="table-line-p">发货时间：{{ list.delivery_time }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="col.prop === 'v11'" class="flex flex-align-center cell wp100 flex-column">
              <div :class="{ 'other-cell': good.logistics_list.length === 1 }" class="flex-c  wp100 flex-column cell-border" v-for="(good, gindex) in item.goods_list" :key="gindex">
                <div class="other-cell flex-c child-cell-item" v-for="(list, lindex) in good.logistics_list" :key="lindex">
                  <span>{{list.remark}} </span>
                </div>
              </div>
            </div>

            <div v-else-if="col.prop === 'action'" class="flex flex-align-center cell wp100 flex-column">
              <div :class="{ 'other-cell': good.logistics_list.length === 1 }" class="flex-c  wp100 flex-column cell-border" v-for="(good, gindex) in item.goods_list" :key="gindex">
                <div class="other-cell flex-c child-cell-item" v-for="(list, lindex) in good.logistics_list" :key="lindex">
                  <div style="line-height:30px" v-if="list.sub_goods_type === 1">
                    <span class="text-btn mr10" @click="onDetail(list)">详情</span>
                    <span class="text-btn mr10" @click="onSend(list.order_logistics_id,good.goods_count,list.sub_goods_count)">发货</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-align-center cell"></div>
          </div>
        </div>

        <div v-if="item.customRemark || item.salerRemark" class="remark-info">
          <p v-if="item.customRemark">备注：{{ item.customRemark }}</p>
        </div>
      </div>
    </div>
    <SendDialog :OBDNum="OBDNum"  :orderId="currOrderId" :isShow.sync="isShowSend" @reload="reload"/>
    <SendDetDrawer ref="sendDet" :isShow.sync="isShowSendDet" />
  </div>
</template>

<script>
// import { } from '@/api'
import SendDialog from "./sendDialog.vue"
import SendDetDrawer from "./sendDetDrawer.vue"
import { copyText } from "@/utils/ruoyi"
export default {
  components: { SendDialog, SendDetDrawer },
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
      isShowSend: false,
      isShowSendDet: false,
      OBDNum: 0, //所需要的obd数量
      currOrderId:0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onCopy(val) {
      copyText(val).then(res => {
        this.$message.success("复制成功！")
      })
    },
    onDetail(obj){
      this.isShowSendDet = true
      this.$refs.sendDet.loadData(obj.order_logistics_id)
    },
    onSend(id,goodNum = 0,childNum = 0){
      this.currOrderId = id // 发货记录id
      this.OBDNum = goodNum * childNum
      this.isShowSend = true
    },
    reload(){
      this.$emit('reload')
    }
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
    padding: 0px 5px;
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
        border-right: 1px solid #dfe6ec;
        img {
          width: 70px;
          height: 70px;
        }
        &-prop {
          width: 100%;
        }
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

.table-line-p {
  margin: 8px 0px;
}

.con-cell {
  height: 80px;
  width: 100%;
  padding: 0px 10px;
}

.con-cell + .con-cell {
  border-top: 1px solid #dfe6ec;
}

.br {
  border-right: 1px solid #dfe6ec;
}
.bt {
  border-bottom: 1px solid #dfe6ec;
}
.bl {
  border-left: 1px solid #dfe6ec;
}

.ptb10 {
  padding: 10px 0px;
}

.info-prop-wrap {
  border-bottom: 1px solid #dfe6ec;
  &:last-child {
    border: 0;
  }
}

.child-cell-item {
  padding: 0px 10px;
  height: 110px;
}

.child-cell-item + .child-cell-item {
  border-top: 1px solid #dfe6ec;
}

.other-cell {
  height: 110px;
  width: 100%;
}

.cell-border {
  border-bottom: 1px solid #dfe6ec;
}
.cell {
  .cell-border:last-child {
    border: 0px;
  }
}
</style>
