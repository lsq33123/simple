<template>
    <el-cascader  :options="options" v-on="$listeners" v-bind="customAttrs" :props="{value:'id',label:'cname'}">
        <template slot-scope="{ node, data }">
          <span>{{ data.cname }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
    </el-cascader>
</template>

<script>
//省市区 选择
import {getAddressList } from '@/api/common'
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
      getAddressList({page:1,page_size:100}).then(res => {
        // console.log('res:', res)
        this.options = res.result
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
