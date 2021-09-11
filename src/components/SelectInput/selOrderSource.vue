<template>
    <el-select  v-on="$listeners" v-bind="customAttrs">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
    </el-select>
</template>

<script>
//订单来源
export default {
  components: {},
  props: {},
  inheritAttrs:false,
  data() {
    return {
      options: [{id:1,name:'订单商城'},{id:2,name:'手工录入'}]
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
