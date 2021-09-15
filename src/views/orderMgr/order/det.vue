<template>
  <div class="pb50">
    <el-row>
      <el-col :span="18" class="p20">
        <DetForm />
      </el-col>
      <el-col :span="6">
        <RightTimeLine @onDet="onDet" />
      </el-col>
    </el-row>

    <div class="bottom-bar-wrap flex-cc">
      <el-button type="" size="small" class="w100">备 注</el-button>
      <el-button type="primary" size="small" class="w100">提 交</el-button>
    </div>

    <OrderDetDialog :isShow.sync="isShowLine"/>
  </div>
</template>

<script>
// import { } from '@/api'
import DetForm from "./detForm.vue";
import RightTimeLine from "./rightTimeLine.vue";
import OrderDetDialog from "./orderDetDialog.vue";
export default {
  components: {
    DetForm,
    RightTimeLine,
    OrderDetDialog
  },
  props: {},
  data() {
    return {
     isShowLine:false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onDet(){
      this.isShowLine = true
    }
  }
};
</script>

<style lang="scss" scoped>
.pb50 {
  padding-bottom: 50px;
}
.bottom-bar-wrap {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
</style>
