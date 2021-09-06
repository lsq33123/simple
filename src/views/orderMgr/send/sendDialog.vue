<template>
  <div>
    <el-dialog :visible="isShow" title="发货" width="700px" :before-close="onClose">
      <el-form label-width="100px">
        <el-form-item label="OBD序列号" required>
          <el-input placeholder="请输入" class="input-width" />
        </el-form-item>
        <el-form-item label="发货方式" required>
          <el-radio-group v-model="radio">
            <el-radio :label="3">快递</el-radio>
            <el-radio :label="6">自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快递信息" required v-if="radio === 3">
          <el-select v-model="value" placeholder="请选择" style="width:160px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-input placeholder="请输入" style="width:400px" />
        </el-form-item>
        <el-form-item label="发货时间" required>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" class="input-width" /> 
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入" v-model="textarea2" class="input-width" />
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
    return {
      radio: 3,
      textarea2: "",
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSure() {
      this.onClose();
    },
    onClose() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
