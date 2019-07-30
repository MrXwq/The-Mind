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
                <img v-if="form.mes.url" :src="form.mes.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="主题">
                <el-input v-model="form.mes.theme"></el-input>
            </el-form-item>
            <el-form-item label="发生地点">
                <el-select v-model="form.mes.place" placeholder="请选择活动区域" style="width: 100%;">
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="北京" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发生时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.mes.time" style="width: 100%;"></el-date-picker>
                </el-col>
                
            </el-form-item>
            <el-form-item label="自己可看">
                <el-switch
                active-value="true"
                inactive-value="false"
                v-model="form.mes.privacy"></el-switch>
            </el-form-item>
            <el-form-item :label="mood">
                <el-input type="textarea" v-model="form.mes.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
     
    data() {
        
      return {
          id: this.$parent.id,
          mood:"",
          routeName: "",
        form: {
            mes:''
        }
      }
    },
    methods: {
        afterUpload(res) {
            
            this.form.mes.url = res.url
            console.log(this.form.mes.url)
            console.log(res)
        },
      async onSubmit() {
        // let res = await this.$http.post(`mood/${this.routeName}`, this.form)
        // console.log(res)
        let res = await this.$http.put(`mood/${this.routeName}/${this.id}`, this.form)
        console.log(res)
      },
      
    },
    created() {
        switch(this.$route.name) {
            case 'gratitudehad': 
                this.routeName = 'gratitudelist',
                this.mood = '感恩时刻'
                 
                ;break;
            case 'happinesshad': 
            this.routeName = 'happinesslist'
            this.mood = '幸福时刻'
            this.form.mes = {
                happiness:{
                    moodId: 1,
                    theme: '',
                    url: '',
                    place: '',
                    time: '',
                    privacy: true,
                    content: ''
                }}
                console.log(this.form.mes)
                ;break;
            case 'regrethad': 
            this.routeName = 'regretlist',this.mood = '后悔时刻';break;
        }
        // if(this.$route.name === 'gratitudehad') {
        //     this.routeName = 'gratitudelist'
        //     this.mood = '感恩时刻'
        // }else if(this.$route.name === 'happinesshad') {
        //     this.routeName = 'happinesslist'
        //     this.mood = '幸福时刻'
        // }else if()
    }
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
