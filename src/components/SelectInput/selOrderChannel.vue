<template>
  <el-select v-on="$listeners" v-bind="customAttrs">
    <el-option label="全部" value="" v-if="showAll" />
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
  </el-select>
</template>

<script>
//订单渠道类型
import { getOrderChannelList } from "@/api/common"
export default {
  components: {},
  props: {
    showAll: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  data() {
    return {
      options: []
    }
  },
  computed: {
    customAttrs() {
      return {
        ...this.$attrs
      }
    }
  },
  watch: {},
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    loadData() {
      getOrderChannelList({ page: 1, page_size: 100 }).then(res => {
        // console.log('res:', res)
        this.options = res.result.data
      })
    },
    getData(){
      return this.options
    }
  }
}
</script>

<style lang="scss" scoped></style>
