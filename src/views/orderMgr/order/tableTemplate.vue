<template>
  <div class="table-wrap">
    <div class="title-wrap">
      <div v-for="(item, index) in columns" :key="index" class="title-item-wrap" :style="{ 'min-width': item.width + 'px' }">
        <!-- <span v-if=""></span> -->
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="body-wrap">
      <div v-for="(item, index) in tableData" :key="index" class="body-item-wrap">
        <div class="title-info">
          <span>
            订单号：{{ item.orderNo }}
            <span class="span-btn">复制</span>
          </span>
          <span>下单时间：{{ item.date }}</span>
          <span>订单来源：{{ item.source }}</span>
        </div>
        <div class="row-info flex">
          <div v-for="(col, cIndex) in columns" :key="cIndex" class="row-info-item" :style="{ 'min-width': col.width + 'px' }">
            <div v-if="col.prop === 'v1'" class="flex flex-align-center cell">
              <img :src="item.img" />
              <span class="color-blue mg-l-10">{{ item.name }}</span>
            </div>
            <div v-else-if="col.prop === 'v2'" class="flex flex-align-center cell">
              <el-tag type="success">正常</el-tag>
            </div>
            <div v-else-if="col.prop === 'v3'" class="flex flex-align-center cell">
              <el-tag type="success">已支付</el-tag>
            </div>
            <div v-else-if="col.prop === 'v4'" class="flex flex-align-center cell">
              <el-tag type="warning">待发货</el-tag>
            </div>
            <div v-else-if="col.prop === 'v5'" class="flex flex-align-center cell">
              {{ item.price }}
            </div>
            <div v-else-if="col.prop === 'v6'" class="flex flex-align-center cell">
              {{ item.num }}
            </div>
            <div v-else-if="col.prop === 'v7'" class="flex flex-align-center cell">
              <span style="font-weight:bold;color:red"> {{ item.total }}</span>
            </div>
            <div v-else-if="col.prop === 'v8'" class="flex flex-align-center cell">
              <span class="color-blue"> {{ item.phone }}</span>
            </div>
            <div v-else-if="col.prop === 'v9'" class="flex flex-align-center cell">
              <div>
                <p>{{ item.custom }}({{ item.phone }})</p>
                <p>{{ item.address }}</p>
              </div>
            </div>
            <div v-else-if="col.prop === 'v10'" class="flex flex-align-center cell"></div>
            <div v-else class="flex flex-align-center cell"></div>
            <div v-else class="flex flex-align-center cell">
              <div style="line-height:30px">
                <span class="span-btn mg-r-10">详情</span>
                <span class="span-btn mg-r-10" @click="isShowRemark = true">备注</span>
                <span class="span-btn mg-r-10">发货</span>
                <span class="span-btn mg-r-10">发起售后</span>
                <span class="span-btn mg-r-10" @click="isShowHistory = true">操作历史</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="item.customRemark || item.salerRemark" class="remark-info">
          <p v-if="item.customRemark">买家备注：{{ item.customRemark }}</p>
          <p v-if="item.salerRemark">商家备注：{{ item.salerRemark }}</p>
        </div>
      </div>
    </div>
    <RemarkDialog :isShow.sync="isShowRemark" />
    <HistoryDrawer :isShow.sync="isShowHistory" />
  </div>
</template>

<script>
// import { } from '@/api'
import RemarkDialog from './remarkDialog.vue'
import HistoryDrawer from './historyDrawer.vue'
export default {
  components: {RemarkDialog ,HistoryDrawer},
  props: {},
  data() {
    return {
      isShowRemark:false,
      isShowHistory:false,
      columns: [
        {
          label: "商品",
          prop: "v1",
          width: 200
        },
        {
          label: "订单状态",
          prop: "v2",
          width: 100
        },
        {
          label: "付款状态",
          prop: "v3",
          width: 100
        },
        {
          label: "发货状态",
          prop: "v4",
          width: 100
        },
        {
          label: "单价（元）",
          prop: "v5",
          width: 100
        },
        {
          label: "数量",
          prop: "v6",
          width: 100
        },
        {
          label: "实收（元）",
          prop: "v7",
          width: 100
        },
        {
          label: "买家",
          prop: "v8",
          width: 100
        },
        {
          label: "收货信息",
          prop: "v9",
          width: 100
        },
        {
          label: "售后",
          prop: "v10",
          width: 100
        },
        {
          label: "操作",
          width: 100
        }
      ],
      tableData: [
        {
          orderNo: "Y20210124160923898909",
          date: "2021-9-2 14:48:48",
          source: "系统销售",
          img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
          name: "商家增加版套餐",
          orderStatus: 1,
          payStatus: 1,
          sendStatus: 1,
          price: 688.0,
          num: 1,
          total: 688.0,
          custom: "周杰伦",
          phone: "15612341234",
          address: "四川省绵阳市培城区板桥街快乐购超市"
        },
        {
          orderNo: "Y20210124160923898909",
          date: "2021-9-2 14:48:48",
          source: "系统销售",
          img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
          name: "商家增加版套餐",
          orderStatus: 1,
          payStatus: 1,
          sendStatus: 1,
          price: 688.0,
          num: 1,
          total: 688.0,
          custom: "周杰伦",
          phone: "15612341234",
          address: "四川省绵阳市培城区板桥街快乐购超市",
          salerRemark: "微信改装客户群"
        },
        {
          orderNo: "Y20210124160923898909",
          date: "2021-9-2 14:48:48",
          source: "系统销售",
          img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
          name: "商家增加版套餐",
          orderStatus: 1,
          payStatus: 1,
          sendStatus: 1,
          price: 688.0,
          num: 1,
          total: 688.0,
          custom: "周杰伦",
          phone: "15612341234",
          address: "四川省绵阳市培城区板桥街快乐购超市",
          salerRemark: "微信改装客户群",
          customRemark: "别寄寄错了"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
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
      padding: 5px 0px;
      border: 1px solid #dfe6ec;
      border-top: 0px;

      .row-info-item {
        display: flex;
        align-items: center;
        flex: 1;
        padding: 0px 5px;
        img {
          width: 70px;
          height: 70px;
        }
      }
    }
  }

  .body-item-wrap + .body-item-wrap {
    margin-top: 20px;
  }
}

.flex {
  display: flex;
  &-align-center {
    align-items: center;
  }
}

.color-blue {
  color: #1890ff;
}

.mg-l-10 {
  margin-left: 10px;
}
.mg-r-10 {
  margin-right: 10px;
}

.span-btn {
  color: #1890ff;
  &:hover {
    color: #46a6ff;
    cursor: pointer;
  }
}
</style>
