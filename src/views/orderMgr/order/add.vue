<template>
  <div class="container-wrap">
    <div class="left-wrap ">
      <div class="block-wrap ">
        <el-form label-width="120px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品信息</span>
            </div>
            <el-table :data="tableData">
              <el-table-column label="商品标题" min-width="200">
                <template slot-scope="scoped">
                  <div class="flex-c">
                    <span style="color:red;margin-right:6px;font-size:16px">*</span>
                    <el-select v-model="scoped.row.v1" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="库存" min-width="100"> </el-table-column>
              <el-table-column label="销售价(元)" min-width="100"> </el-table-column>

              <el-table-column label="实收金额(元)" min-width="150">
                <template slot-scope="scoped">
                  <el-input />
                </template>
              </el-table-column>

              <el-table-column label="商品数量" min-width="150">
                <template slot-scope="scoped">
                  <el-input />
                </template>
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template slot-scope="scoped">
                  <i class="el-icon-delete table-delete-btn" @click="detRow(scoped.$index)"></i>
                </template>
              </el-table-column>
            </el-table>

            <div class="flex-cc add-row-wrap">
              <div @click="addRow">
                <i class="el-icon-plus"></i>
                <span>添加一行</span>
              </div>
            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>买家信息</span>
            </div>

            <el-form-item label="渠道类型" required>
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="手机号" required>
              <el-select></el-select>
              <el-input placeholder="请输入手机号" class="w300" />
              <div class="mark-icon-wrap">
              <svg-icon icon-class="check" class-name="check-panel-icon" />
              已注册
              </div>
              <div class="mark-icon-wrap">
              <svg-icon icon-class="check" class-name="check-panel-icon" />
              首购
              </div>
            </el-form-item>
            <el-form-item label="姓名" required>
              <el-select></el-select>
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收货信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="收货人" required>
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="手机号" required>
                  <SelPhoneCode />
                  <el-input placeholder="请输入" style="width:400px" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货地址" required>
                  <SelAddress />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="详细地址" required>
                  <el-select></el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收款信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="销售价(元)">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运费(元)" required>
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实收金额(元)" required>
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款渠道" required>
                  <el-select></el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款情况" required>
                  <el-select class="w200"></el-select>
                  <el-select class="w200"></el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款时间" required>
                  <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
              </el-col>

                      <el-col :span="8">
                <el-form-item label="第三方支付单号" >
                  <el-input />
                </el-form-item>
              </el-col>
                      <el-col :span="8">
                <el-form-item label="图片凭证" >

                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>

      </div>
    </div>
    <!-- <div class="right-wrap ">
      <el-tabs tab-position="right" style="height: 200px;position: absolute;">
        <el-tab-pane label="商品信息"></el-tab-pane>
        <el-tab-pane label="买家信息"></el-tab-pane>
        <el-tab-pane label="收货信息"></el-tab-pane>
        <el-tab-pane label="金额信息"></el-tab-pane>
      </el-tabs>
    </div> -->
    <div class="bottom-bar-wrap flex-cc">
      <el-button type="primary" size="small" style="width:200px">提  交</el-button>
    </div>

  </div>
</template>

<script>
// import { } from '@/api'
import SelPhoneCode from '@/components/SelectInput/selPhoneCode'
import SelAddress from '@/components/SelectInput/selAddress'
export default {
  components: {SelPhoneCode,SelAddress},
  props: {},
  data() {
    return {
      tableData: [{ v1: "" }, { v1: "" }],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addRow() {
      this.tableData.push({ v1: "" });
    },
    detRow(index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-wrap{
  padding-bottom: 50px;
}

.block-wrap {
  margin: 20px;
}

.el-card + .el-card {
  margin-top: 20px;
}


.left-wrap {
  // width: calc(100% - 200px);
  width: 100%;
  display: inline-block;

}
.right-wrap {
  width: 200px;
  display: inline-block;
  padding-top: 20px;
}

.table-delete-btn {
  color: red;
  font-size: 20px;
  cursor: pointer;
}

.add-row-wrap {
  height: 40px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  div {
    cursor: pointer;
  }
  span {
    font-size: 15px;
    margin-left: 6px;
    color: #909399;
  }
}
.mark-icon-wrap{
  display: inline-block;
  // line-height: unset;
  // align-items: center;
  // height: 36px;
.check-panel-icon{
  fill: red;
  font-size: 20px;
  margin-left:18px;
}
}


.bottom-bar-wrap{
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
</style>
