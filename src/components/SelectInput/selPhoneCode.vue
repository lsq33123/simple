<template>
    <el-select  v-on="$listeners" v-bind="customAttrs">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
    </el-select>
</template>

<script>
//区号列表
import {getPhoneCodeList } from '@/api/common'
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
      getPhoneCodeList({page:1,page_size:100}).then(res => {
        // console.log('res:', res)
        this.options = res.result.data
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
