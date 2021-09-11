<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="关键字" prop="userName">
            <el-input v-model="queryParams.keywords" placeholder="请输入用户账号/姓名" clearable size="small" style="width: 240px" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <!-- <el-form-item label="用户名称" prop="userName">
            <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable size="small" style="width: 240px" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="queryParams.mobile" placeholder="请输入手机号码" clearable size="small" style="width: 240px" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="用户状态" clearable size="small" style="width: 240px">
              <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" ></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="userList">
          <!-- <el-table-column type="selection" width="50" align="center" /> -->
          <el-table-column label="用户账号" align="center" key="username" prop="username" v-if="columns[1].visible" :show-overflow-tooltip="true" />
          <el-table-column label="用户姓名" align="center" key="truename" prop="truename" v-if="columns[2].visible" :show-overflow-tooltip="true" />
          <el-table-column label="备注" align="center" key="remark" prop="remark" v-if="columns[3].visible" :show-overflow-tooltip="true" width="160" />
          <el-table-column label="手机号码" align="center" key="mobile" prop="mobile" v-if="columns[4].visible" width="120" />
          <el-table-column label="组ID" align="center" key="group_id" prop="group_id" width="100" />
          <el-table-column label="状态" align="center" key="status" v-if="columns[5].visible">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="添加时间" align="center" prop="regist_time" v-if="columns[6].visible" width="160" />
          <el-table-column label="登录IP" align="center" key="last_login_ip" prop="last_login_ip" width="120" />
          <el-table-column label="登录时间" align="center" prop="last_login_time" v-if="columns[6].visible" width="160" />
          <el-table-column label="权限到期时间" align="center" prop="expire_date" v-if="columns[6].visible" width="160" />
          <el-table-column label="登录次数" align="center" prop="login_count" width="120" />
          <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope" v-if="scope.row.id !== 1">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['system:user:remove']">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.page_size" @pagination="getList" />
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="isShow" width="700px" append-to-body :close-on-click-modal="false" custom-class="dialog-no-pd">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户账号" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户账号称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户姓名" prop="truename" label-width="120px">
              <el-input v-model="form.truename" placeholder="请输入用户姓名" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限到期时间" prop="expire_date" label-width="120px">
              <el-date-picker v-model="form.expire_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password" :required="!this.form.id">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="password_confirm" label-width="120px" :required="!this.form.id">
              <el-input v-model="form.password_confirm" placeholder="请输入用户密码" type="password" maxlength="20" show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUserList, updateUserList, updateUserListStatus } from "@/api/system/user"
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"

export default {
  name: "User",
  components: { Treeselect },
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (!this.form.id) {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else if (value.length > 20 || value.length < 6) {
          callback(new Error("请输入6至20位用户密码"))
        } else {
          callback()
        }
      } else {
        if (value && (value.length > 20 || value.length < 6)) {
          callback(new Error("请输入6至20位用户密码"))
        } else {
          callback()
        }
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!this.form.id) {
        if (value === "") {
          callback(new Error("请再次输入密码"))
        } else if (value !== this.form.password) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      } else {
        if (this.form.password && value !== this.form.password) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      }
    }

    return {
      loading: true, // 遮罩层
      ids: [], // 选中数组
      showSearch: true, // 显示搜索条件
      total: 0, // 总条数
      userList: [], // 用户表格数据
      title: "", // 弹出层标题
      isShow: false, // 是否显示弹出层
      form: {
        password: "",
        password_confirm: ""
      },
      // 查询参数
      queryParams: {
        page: 1,
        page_size: 20,
        keywords: undefined
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `用户名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `部门`, visible: true },
        { key: 4, label: `手机号码`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true }
      ],
      // 表单校验
      rules: {
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }
        ],
        truename: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
        password: [{ validator: validatePass1, trigger: "blur" }],
        password_confirm: [{ validator: validatePass2, trigger: "blur" }],
        mobile: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          },
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ]
      }
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      getUserList(this.queryParams).then(response => {
        this.userList = response.result.data
        this.total = response.result.total
        this.loading = false
      })
    },

    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用"
      this.$confirm('确认要"' + text + "【" + row.truename + "】用户吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return updateUserListStatus({ id: row.id, status: row.status })
        })
        .then(() => {
          this.msgSuccess(text + "成功")
        })
        .catch(function() {
          row.status = row.status === "0" ? "1" : "0"
        })
    },
    // 取消按钮
    cancel() {
      this.isShow = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        username: undefined,
        truename: undefined,
        password: undefined,
        password_confirm: undefined,
        mobile: undefined,
        email: undefined,
        sex: undefined,
        status: "1",
        remark: undefined
      }
      this.resetForm("form")
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.isShow = true
      this.title = "添加用户"
      this.form.password = this.form.password_confirm = "123456" //默认密码
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.form = { ...row, password: "", password_confirm: "" }
      this.isShow = true
      this.title = "修改用户"
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("this.form:", this.form)
          if (this.form.id != undefined) {
            updateUserList(this.form).then(response => {
              this.msgSuccess("修改成功")
              this.isShow = false
              this.getList()
            })
          } else {
            addUserList(this.form).then(response => {
              this.msgSuccess("新增成功")
              this.isShow = false
              this.getList()
            })
          }
        }
      })
    }
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const userIds = row.id || this.ids;
    //   this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(function() {
    //       return delUser(userIds);
    //     })
    //     .then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     })
    //     .catch(() => {});
    // },
  }
}
</script>

<style lang="scss">
.dialog-no-pd .el-dialog__body {
  padding-bottom: 0px;
}
</style>
