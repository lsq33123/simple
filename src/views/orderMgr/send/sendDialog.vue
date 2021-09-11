<template>
  <div>
    <el-dialog :visible="isShow" title="发货" width="700px" :before-close="onClose">
      <el-form label-width="100px">
        <el-form-item label="OBD序列号" required>
          <el-input placeholder="请输入" class="w350" @input="onInput"/>
          <div class="mark-icon-wrap">
            <svg-icon icon-class="check" class-name="check-panel-icon" />
            已注册
          </div>
          <div class="mark-icon-wrap">
            <svg-icon icon-class="check" class-name="check-panel-icon" />
            首购
          </div>
        </el-form-item>
        <el-form-item label="发货方式" required>
          <el-radio-group v-model="radio">
            <el-radio :label="3">快递</el-radio>
            <el-radio :label="6">自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快递信息" required v-if="radio === 3">
          <el-select v-model="value" placeholder="请选择" style="width:160px">
            <el-option v-for="item in compList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
          <el-input placeholder="请输入" style="width:400px" />
        </el-form-item>
        <el-form-item label="发货时间" required>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" class="w350" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入" v-model="textarea2" class="w350" />
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
import { searchObdList } from "@/api/order"
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radio: 3,
      textarea2: "",
      value1: "",
      compList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      getExpressCompanyList().then(res => {
        // console.log('res:', res)
        this.compList = res.result.list;
      });
    },
    onInput(val){
        this.searchObdList({"order_logistics_id": 1, "uuid": val}).then(res => {
          // console.log('res:', res)
          
        })
    },
    onSure() {
      this.onClose();
    },
    onClose() {
      this.$emit("update:isShow", false);
    }
  }
};
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
</style>
