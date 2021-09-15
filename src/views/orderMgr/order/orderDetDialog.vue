<template>
    <el-dialog :visible="isShow" title="订单详情" width="1200px" :before-close="onClose" custom-class="dialog-padding">
      <DetForm  :detail="form"/>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="onClose">取 消</el-button> -->
        <el-button type="primary" @click="onSure">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
// import { } from '@/api'
import DetForm from './detForm.vue'
export default {
  components: {DetForm},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
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

<style lang="scss" scoped>
</style>
<style >
.dialog-padding  .el-dialog__body{
  padding:20px;
}
</style>
