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
              <div class="flex">
                <div class="flex flex-align-center">
                  <img :src="item.img" />
                  <span class="color-blue mg-l-10">{{ item.name }}</span>
                </div>
                <div class="flex flex-direction-col" v-if="item.children.length">
                  <div class="flex flex-align-center" style="padding:10px 0px">
                    <img :src="item.img" />
                    <span class="color-blue mg-l-10">{{ item.name }}</span>
                  </div>
                  <div class="flex flex-align-center" style="padding:10px 0px">
                    <img :src="item.img" />
                    <span class="color-blue mg-l-10">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="col.prop === 'v4'" class="flex flex-align-center cell">
              <div class="flex">
                <div class="flex flex-align-center" v-if="!item.children.length">
                  <el-tag type="warning">待发货</el-tag>
                </div>
                <div class="flex flex-direction-col" v-else>
                  <div class="flex flex-align-center" style="height:50%">
                    <el-tag type="warning">待发货</el-tag>
                  </div>
                  <div class="flex flex-align-center" style="height:50%">
                    <el-tag type="warning">待发货</el-tag>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="col.prop === 'v9'" class="flex flex-align-center cell">
              <div>
                <p class="table-line-p">{{ item.custom }}({{ item.phone }})</p>
                <p class="table-line-p">{{ item.address }}</p>
              </div>
            </div>
            <div v-else-if="col.prop === 'v10'" class="flex flex-align-center cell">
              <div>
                <p class="table-line-p">发货方式：{{ item.custom }}</p>
                <p class="table-line-p">快递公司：{{ item.address }}</p>
                <p class="table-line-p">运单号：{{ item.address }}</p>
                <p class="table-line-p">发货时间：{{ item.address }}</p>
              </div>
            </div>

            <div v-else-if="col.prop === 'action'" class="flex flex-align-center cell">
              <div style="line-height:30px">
                <span class="span-btn mg-r-10"  @click="isShowSendDet = true">详情</span>
                <!-- <span class="span-btn mg-r-10" >备注</span> -->
                <span class="span-btn mg-r-10" @click="isShowSend = true">发货</span>
                <!-- <span class="span-btn mg-r-10">发起售后</span>
                <span class="span-btn mg-r-10" @click="isShowHistory = true">操作历史</span> -->
              </div>
            </div>
            <div v-else class="flex flex-align-center cell"></div>
          </div>
        </div>

        <div v-if="item.customRemark || item.salerRemark" class="remark-info">
          <p v-if="item.customRemark">买家备注：{{ item.customRemark }}</p>
          <p v-if="item.salerRemark">商家备注：{{ item.salerRemark }}</p>
        </div>
      </div>
    </div>
    <SendDialog :isShow.sync="isShowSend"/>
    <SendDetDrawer :isShow.sync="isShowSendDet"/>
  </div>
</template>

<script>
// import { } from '@/api'
import SendDialog from './sendDialog.vue'
import SendDetDrawer from './sendDetDrawer.vue'
export default {
  components: {SendDialog,SendDetDrawer},
  props: {},
  data() {
    return {
      isShowSend: false,
      isShowSendDet: true,
      columns: [
        {
          label: "商品",
          prop: "v1",
          width: 200
        },

        {
          label: "发货状态",
          prop: "v4",
          width: 100
        },

        {
          label: "收货信息",
          prop: "v9",
          width: 100
        },
        {
          label: "发货信息",
          prop: "v10",
          width: 100
        },
        {
          label: "操作",
          prop: "action",
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
          custom: "周杰伦",
          phone: "15612341234",
          address: "四川省绵阳市培城区板桥街快乐购超市",
          children: [
            {
              img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
              name: "省份仨",
              custom: "周杰伦",
              phone: "15612341234",
              address: "四川省绵阳市培城区板桥街快乐购超市"
            },
            {
              img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
              name: "西城时代",
              custom: "周杰伦",
              phone: "15612341234",
              address: "四川省绵阳市培城区板桥街快乐购超市"
            }
          ]
        },
        {
          orderNo: "Y20210124160923898909",
          date: "2021-9-2 14:48:48",
          source: "系统销售",
          img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
          name: "商家增加版套餐",
          custom: "周杰伦",
          phone: "15612341234",
          address: "四川省绵阳市培城区板桥街快乐购超市",
          salerRemark: "微信改装客户群",
          children: []
        },
        {
          orderNo: "Y20210124160923898909",
          date: "2021-9-2 14:48:48",
          source: "系统销售",
          img: "https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/25/1612c45bb3e03f39~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp",
          name: "商家增加版套餐",
          custom: "周杰伦",
          phone: "15612341234",
          address: "四川省绵阳市培城区板桥街快乐购超市",
          salerRemark: "微信改装客户群",
          customRemark: "别寄寄错了",
          children: []
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
  &-direction-col {
    flex-direction: column;
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

.table-line-p {
  margin: 8px 0px;
}
</style>
