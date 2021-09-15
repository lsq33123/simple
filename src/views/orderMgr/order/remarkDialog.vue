<template>
  <div>
    <el-dialog :visible="isShow" title="备注" width="700" :before-close="onClose">
      <el-input v-model="value" type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" placeholder="请输入内容"maxlength="600" show-word-limit /> 
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
      value:''
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSure() {
      this.$emit('onSure',this.value)
    },
    onClose() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
