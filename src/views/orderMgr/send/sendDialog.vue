<template>
  <div>
    <el-dialog :visible="isShow" title="发货" width="700px" :before-close="onClose" :close-on-click-modal="false" destroy-on-close>
      <el-form label-width="100px" ref="form1" :model="form" :rules="rules">
        <el-form-item label="OBD序列号" required prop="obd_list">
          <!-- <el-input placeholder="请输入" class="w350" @input="onInput"/> -->
          <div v-for="(item, index) in obdList" class="marginb">
            <el-autocomplete
              v-model="item.uuid"
              :fetch-suggestions="inputChange"
              placeholder="请输入OBD"
              :trigger-on-focus="false"
              @select="obj => handleSelect(item, obj)"
              @input="val => onInputUuid(item, val)"
              :debounce="500"
              class="w350 "
              max="100"
              clearable
              highlight-first-item
            />

            <div class="mark-icon-wrap" v-if="item.is_bind === 0">
              <svg-icon icon-class="check" class-name="check-panel-icon" />
              未绑定
            </div>
            <div class="mark-icon-wrap" v-if="item.is_bind === 1">
              <svg-icon icon-class="error" class-name="check-panel-icon" />
              已绑定
            </div>
            <div class="mark-icon-wrap" v-if="item.is_relation_order === 0">
              <svg-icon icon-class="check" class-name="check-panel-icon" />
              未发货
            </div>
            <div class="mark-icon-wrap" v-if="item.is_relation_order === 1">
              <svg-icon icon-class="error" class-name="check-panel-icon" />
              已发货
            </div>
            <div class="mark-icon-wrap" v-if="item.is_exist_obd === 0">
              <svg-icon icon-class="error" class-name="check-panel-icon" />
              该OBD不存在
            </div>
          </div>
        </el-form-item>
        <el-form-item label="发货方式" prop="logistics_mode">
          <el-radio-group v-model="form.logistics_mode">
            <el-radio :label="1">快递</el-radio>
            <el-radio :label="2">自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快递信息" prop="express_number" v-if="form.logistics_mode === 1">
          <el-select v-model="form.express_company_id" placeholder="请选择" style="width:150px">
            <el-option v-for="item in compList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
          <el-input v-model="form.express_number" placeholder="请输入" class="w370" />
        </el-form-item>
        <el-form-item label="发货时间" prop="delivery_time">
          <el-date-picker v-model="form.delivery_time" type="date" placeholder="选择日期" class="w520" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" placeholder="请输入" max="600" class="w520" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getExpressCompanyList } from "@/api/common"
import { addOrderShipment, checkObdBindRel, searchObdList } from "@/api/order"
import { debounce } from "@/utils"
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    OBDNum: {
      type: Number,
      default: 0
    },
    //发货记录id
    orderId: {
      type: Number,
      default: 0
    }
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (this.obdList.some(item => item.uuid === "")) {
        callback(new Error("请把OBD序列号补充完整"))
      } else {
        callback()
      }
    }

    return {
      obdList: [],
      currList: [],
      form: {
        logistics_mode: 1
      },
      compList: [],
      rules: {
        obd_list: [{ validator: validatePass1, message: "请把OBD序列号补充完整", trigger: "blur" }],
        logistics_mode: [{ required: true, message: "请选择发货方式", trigger: "change" }],
        express_number: [{ required: true, message: "请输入快递信息", trigger: "change" }],
        delivery_time: [{ required: true, message: "请选择发货时间", trigger: "change" }]
      }
    }
  },
  computed: {},
  watch: {
    // OBDNum(val) {
    //   for (let i = 0; i < this.OBDNum; i++) {
    //     this.obdList.push({ id: i, uuid: "", is_bind: "", is_relation_order: "" }) //是否绑定  是否关联订单
    //   }
    // },
    obdList() {
      this.form.obd_list = this.obdList.map(item => item.uuid)
    }
  },
  created() {
    this.initData()

    for (let i = 0; i < this.OBDNum; i++) {
      this.obdList.push({ id: i, uuid: "", is_bind: "", is_relation_order: "",is_exist_obd:1 }) //是否绑定  是否关联订单
    }
  },
  mounted() {},
  methods: {
    initData() {
      getExpressCompanyList().then(res => {
        // console.log('res:', res)
        this.compList = res.result.list
      })
    },
    onInput(val) {
      this.searchObdList({ order_logistics_id: 1, uuid: val }).then(res => {
        // console.log('res:', res)
      })
    },
    inputChange(name, callback) {
      debounce(this.querySearch(name, callback), 3000, false)
    },
    querySearch(queryString, cb) {
      searchObdList({ order_logistics_id: this.orderId, uuid: queryString }).then(res => {
        const arr = res.result.list || []
        this.currList = arr.map(item => {
          item.value = item.uuid
          return item
        })
        cb(this.currList)
      })
    },
    onInputUuid(item, val) {
      if (val) {
        checkObdBindRel({ order_logistics_id: this.orderId, uuid: val }).then(res => {
          // console.log('res:', res)
          if (!res.result.data) {
            item.is_exist_obd = 0
            item.is_bind = ""
            item.is_relation_order = ""
          } else {
            item.is_exist_obd = 1
            item.is_bind = res.result.data.is_bind
            item.is_relation_order = res.result.data.is_relation_order
          }
        })
      } else {
        item.is_exist_obd = 0
        item.is_bind = ""
        item.is_relation_order = ""
      }
    },
    handleSelect(item, obj) {
      // item.is_bind = obj.is_bind
      // item.is_relation_order = obj.is_relation_order
    },
    onSure() {
      const params = { ...this.form }
      params.obd_list = this.obdList.map(item => item.uuid)
      params.order_logistics_id = this.orderId
      console.log("params:", params)
      //自提不需要快递信息
      if (params.logistics_mode === 2) {
        delete params.express_company_id
        delete params.express_number
      }

      this.$refs["form1"].validate(valid => {
        if (valid) {
          addOrderShipment(params).then(res => {
            this.msgSuccess("新增成功")
            this.$emit("reload")
            this.onClose()
          })
        } else {
        }
      })
    },
    onClose() {
      this.$emit("update:isShow", false)
    }
  }
}
</script>

<style lang="scss" scoped>
.mark-icon-wrap {
  display: inline-block;
  // line-height: unset;
  // align-items: center;
  // height: 36px;
  .check-panel-icon {
    fill: red;
    font-size: 20px;
    margin-left: 18px;
  }
}
.marginb + .marginb {
  margin-top: 10px;
}

.w370 {
  width: 370px;
}
.w520 {
  width: 520px !important;
}
</style>
