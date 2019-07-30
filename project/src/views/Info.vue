<template>
  <div class="info">
    <el-form :model="form" @submit.native.prevent="onSubmit">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.info.username"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.info.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.info.birth" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="住址">
        <el-cascader placeholder="试试搜索：广东" v-model="form.info.address" :options="options" filterable></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    props: {
        id: ''
    },
  data() {
    return {
      form: {
        tel: "",
            avatar: "",
        info: {
            username: "",
            sex: "",
            birth: "",
            address: []
        }
      },
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhoushi",
              label: "广州市",
              children: [
                {
                  value: "baiyunqu",
                  label: "白云区"
                },
                {
                  value: "tianhequ",
                  label: "天河区"
                },
                {
                  value: "yuexiuqu",
                  label: "越秀区"
                }
              ]
            },
            {
              value: "meizhoushi",
              label: "梅州市",
              children: [
                {
                  value: "pingyuanxian",
                  label: "平远县"
                },
                {
                  value: "meixian",
                  label: "梅县"
                }
              ]
            }
          ]
        },
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "haidianqu",
              label: "海淀区",
              children: [
                {
                  value: "zhongguancun",
                  label: "中关村"
                }
              ]
            }
          ]
        },
        {
          value: "tianjing",
          label: "天津",
          children: [
            {
              value: "jinghaiqu",
              label: "静海区"
            },
            {
              value: "hepingqu",
              label: "和平区"
            },
            {
              value: "nankaiqu",
              label: "南开区"
            }
          ]
        }
      ]
    };
  },
  methods: {
      async getUser() {
          let user = await this.$http.get(`rest/user/${this.id}`)
          console.log(user)
          this.form = Object.assign({}, this.form, user.data)

      },
    async onSubmit() {
      let res = await this.$http.put(`rest/user/${this.id}`, this.form);
      console.log(res);
      this.$router.go(0)
    },
    afterUpload(res) {
      
      this.form.avatar = res.url;
      console.log(this.form.avatar)
      
      console.log(res);
    }
  },
    created() {
        this.getUser()
    }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>