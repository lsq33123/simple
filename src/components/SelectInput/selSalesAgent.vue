<template>
    <el-select  v-on="$listeners" v-bind="customAttrs">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
    </el-select>
</template>

<script>
//获取代理商接口 - 下拉框
import {getSalesAgent } from '@/api/common'
export default {
  components: {},
  props: {},
  inheritAttrs:false,
  data() {
    return {
      options: []
    }
  },
  computed: {
    customAttrs(){
      return {
        ...this.$attrs,
      }
    }
  },
  watch: {},
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    loadData(){
      getSalesAgent().then(res => {
        // console.log('res:', res)
        this.options = res.result
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
