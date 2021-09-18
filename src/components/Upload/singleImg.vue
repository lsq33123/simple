<template>
  <div>
    <el-upload
      :action="rootUrl"
      :limit="1"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :headers="headerObj"
      :file-list="imgFilesList"
      list-type="picture-card"
      class="avatar-uploader"
      :class="{ disabled: uploadDisabled }"
    >
      <!-- <img v-if="imgUrl" :src="imgUrl" class="avatar" /> -->
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrl" alt="图片未找到" />
    </el-dialog>
  </div>
</template>

<script>
// import { } from '@/api'
import { getTokenLocal } from "@/utils/auth"
export default {
  components: {},
  model: {
    prop: "imgUrl",
    event: "onBindValue"
  },
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    imgAllUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rootUrl: process.env.VUE_APP_BASE_API + "/uploadImage",
      dialogVisible: false,
      uploadDisabled: false,
      headerObj: {
        "x-access-token": getTokenLocal()
      }
    }
  },
  computed: {
    imgFilesList() {
      let arr = []
      if (this.imgUrl) {
        arr = [
          {
            url: this.imgUrl,
            name: "图片1",
            id: 1
          }
        ]
      }
      return arr
    }
  },
  watch: {
    imgFilesList: {
      handler(val) {
        if (val.length) {
          this.uploadDisabled = true
        } else {
          this.uploadDisabled = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSuccess(res, file) {
      this.uploadDisabled = true
      this.$emit("onBindValue", res.result.url)
      this.$emit("handleSuccess", { res, file })
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = false
      this.$emit("onBindValue", "")
      this.$emit("handleRemove", { file, fileList })
    },
    handleExceed(files, fileList) {
      // 图片上传超过数量限制
      this.$message.warning("上传图片不能超过1张!")
    },
    handlePreview(file) {
      // this.dialogImageUrl = file.response.result.path
      this.dialogVisible = true
      this.uploadDisabled = true
    },
    beforeUpload(file) {
      const isPNG = file.type === "image/png"
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2
      this.uploadDisabled = true
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式")
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB")
      }
      return (isJPG || isPNG) && isLt2M
    }
  }
}
</script>

<style scoped>
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader /deep/ .el-upload--picture-card {
  width: 146px;
  height: 146px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}

.disabled /deep/ .el-upload--picture-card {
  display: none;
}
</style>
