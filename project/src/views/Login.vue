<template>
    <!-- 登陆页面 -->
    <div class="loginContainer">
        <div class="loginForm">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i>
                         登陆
                    </span>
                    <el-form @submit.native.prevent="submitLogin" :model="loginForm" status-icon :rules="rules" 
                    ref="loginForm" label-width="100px" >
                        
                        <el-form-item label="手机号" prop="tel">
                            <el-input v-model.number="loginForm.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" native-type = "submit">登陆</el-button>
                            <el-button @click="resetForm('loginForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <!-- 注册模块 -->
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i>
                         注册
                    </span>
                    <el-form :model="regForm" status-icon :rules="rules" ref="regForm" 
                    label-width="100px" class="demo-ruleForm">
                        
                        <el-form-item label="手机号" prop="tel">
                            <el-input v-model.number="regForm.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="regForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="regForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item>
                            <el-button type="primary" @click="submitRegister('regForm')">注册</el-button>
                            <el-button @click="resetForm('regForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
        
            </el-tabs>
            
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.regForm.checkPass !== '') {
            this.$refs.regForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        //   登陆验证信息
        loginForm: {
          password: '',
          tel: '',
        },
        //   注册验证信息
        regForm: {
            tel: "",
            password: "",
            checkPass: ""
        },
        // 验证规则
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          tel: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        
      };
    },
    methods: {
        //注册提交 
        submitRegister(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await this.$http.post('/register',this.regForm)
            console.log(res)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //登陆提交
     async submitLogin() {
            let res = await this.$http.post('/login',this.loginForm)
            console.log("返回来的是用户" + res.data.user._id + '和token' + res.data.token)
            localStorage.token = res.data.token
            this.$store.dispatch('userLogin',{userId: res.data.user._id})
            localStorage.setItem('userId', JSON.stringify(this.$store.state.userId))
            console.log(this.$store.state) 
            this.$router.push('/mood/moodlist')
            this.$message({
                message: '登陆成功',
                type: 'success'
            })
         
       
      }
    }
  }
</script>

<style lang="scss">
    .loginContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .loginForm {
            padding-top: 5rem; 
            width: 30rem;
            height: 30rem;
            box-sizing: border-box;
            border: 1px solid aqua;
        }
    }
</style>
