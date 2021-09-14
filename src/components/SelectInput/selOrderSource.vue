<template>
    <el-select  v-on="$listeners" v-bind="customAttrs">
      <el-option label="全部" value="" v-if="showAll"/>
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
    </el-select>
</template>

<script>
//订单来源
import {orderSource} from '@/utils/dict'
export default {
  components: {},
  props: {
    showAll:{
      type: Boolean,
      default:false
    }
  },
  inheritAttrs:false,
  data() {
    return {
      options: orderSource
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
  },
  mounted() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped></style>
