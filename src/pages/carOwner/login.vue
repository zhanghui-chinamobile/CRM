<template>
  <div style="padding: 100px">
    <el-form class='form' :rules="rules" ref="pass" :model="form" label-width="150px" style="width:500px;margin:auto">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" type='password' clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="vcode" label="验证码">
        <el-row>
          <el-col :span='10'>
            <el-input style='width: 150px;' v-model="form.vcode" clearable></el-input>
          </el-col>
          <el-col :span='8' :offset='2'>
            <input disabled class="verification" v-model="verificationcode"/>
          </el-col>
          <el-col :span='4'>
            <el-button style="float: right;line-height: 1;" @click="createCode" type="text">换一张</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button style='width: 100%;background: #0054a7;height: 38px;border-color:#0054a7' size='medium' type="primary" @click="onSubmit('pass')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    data() {
      let check = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if(value.toUpperCase() != this.vcode.toUpperCase()) {
          callback(new Error('验证码输入不正确'));
        }else {
          callback();
        }
      };
      return {
        verificationcode:'',
        form: {
          username: 'test',
          password:'123456',
          vcode:'',
          userType:"3",
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          vcode:[
            {  validator: check, trigger: 'submit' }
          ],

        },

      };
    },
    created() {
      this.createCode();
    },
    mounted(){
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('login', this.form).then(() => {
              this.$router.push('/stateQuery');
            })
          } else {
            return false;
          }
        });
      },

      createCode(){
        this.vcode = "";
        this.verificationcode = "";
        //验证码的长度
        var codeLength = 4;
        //随机数
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(var i = 0; i < codeLength; i++) {
          //取得随机数的索引（0~35）
          var index = Math.floor(Math.random()*36);
          //根据索引取得随机数加到code上
          this.vcode += random[index];
        }
        //把code值赋给验证码
        this.verificationcode = this.vcode;
      },

    }
  }
</script>
<style scoped>
  .verification{
    /*border-radius: 12px;*/
    width:100px;
    /*letter-spacing:5px;*/
    margin-left:5px;
    height: 30px;
    /*transform: translate(-15px,0);*/
  }
</style>
