<template>
  <el-popover placement="bottom" width="200" trigger="click">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkeds" @change="handleCheckedChange">
      <el-checkbox v-for="(item, index) in columns" :label="item.label" :key="index" class="check-item">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
    <i class="el-icon-setting pointer icon-size" slot="reference"></i>
  </el-popover>
</template>

<script>
// import { } from '@/api'
export default {
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkeds: [],
      checkAll: false,
      isIndeterminate: true
    }
  },
  computed: {},
  watch: {},
  created() {
    this.checkAll = true
    this.checkeds = this.columns.map(item => item.label)
  },
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      this.checkeds = val ? this.columns.map(item => item.label) : []
      this.isIndeterminate = false
      this.$emit("onChangeCheck", this.checkeds)
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
      this.$emit("onChangeCheck", this.checkeds)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-size {
  font-size: 20px;
  margin-left: 20px;
  line-height: 36px;
}

.check-item {
  margin: 10px 0px;
  display: block;
}
</style>
