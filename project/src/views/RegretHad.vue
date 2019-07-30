<template>
    <div class="had">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <img v-if="form.regret.url" :src="form.regret.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="主题">
                <el-input v-model="form.regret.theme"></el-input>
            </el-form-item>
            <el-form-item label="发生地点">
                <el-select v-model="form.regret.place" placeholder="请选择活动区域" style="width: 100%;">
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="北京" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发生时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.regret.time" style="width: 100%;"></el-date-picker>
                </el-col>
                
            </el-form-item>
            <el-form-item label="自己可看">
                <el-switch
                active-value="true"
                inactive-value="false"
                v-model="form.regret.privacy"></el-switch>
            </el-form-item>
            <el-form-item label="感恩时刻">
                <el-input type="textarea" v-model="form.regret.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
     props: {
            id:{type:String}
    },
    data() {
      return {
        form: {
             regret:{
                moodId: 2,
                theme: '',
                url: '',
                place: '',
                time: '',
                privacy: true,
                content: ''
            }
        }
      }
    },
    methods: {
        afterUpload(res) {
            this.form.regret.url = res.url
            console.log(res)
        },
      async onSubmit() {
            this.$set(this.form.regret,'rid',JSON.parse(localStorage.getItem('userId')))
            console.log(this.form)
            await this.$http.post(`mood/regretlist`, this.form)
      },
    },
  }
</script>
<style lang="scss">
    .had {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 30rem;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
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
    }

</style>
