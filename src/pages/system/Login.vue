<template>
  <div class="login-row">
        <div class="login-form">
          <el-form :model="user" :rules="rules" ref="users" >
            <div id="login_msg">用户登录</div>
            <el-form-item  prop="userType">
              <el-select v-model="user.userType" placeholder="请选择帐号类型" @keyup.enter.native="onSubmit('users')">
                <template slot="prefix">
                  <i class="el-icon-leixing"></i>
                </template>
                <el-option label="运营商" value="1"/>
                <el-option label="车企" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item  prop="username">
                <el-input type=text v-model="user.username" prefix-icon="el-icon-yonghu" placeholder='请输入用户名' @keyup.enter.native="onSubmit('users')"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-input v-model="user.password" prefix-icon="el-icon-mima" type="password" placeholder="请输入密码" @keyup.enter.native="onSubmit('users')"></el-input>
            </el-form-item>
            <el-form-item  prop="authCode"  >
              <el-input v-model="user.authCode" prefix-icon="el-icon-yanzhengma" type="text" placeholder="请输入验证码"  @keyup.enter.native="onSubmit('users')" >
                <template slot="append">
                  <span @click="createCode"  class="verification" v-model="verificationcode">{{verificationcode}}</span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
                <el-button id="submit-button" type="primary" @click="onSubmit('users')" htmlType='submit' style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
      </div>
  	<div class="copyright">
        亚信科技（中国）有限公司 版权所有 © 2018 AsiaInfo
        <!--<a href="http://10.9.236.182/" target="_blank">AsiaInfo</a>-->
    </div>
  </div>
</template>

<script>
  import ElIcon from "element-ui/packages/icon/src/icon";
  import {Message} from "element-ui";

  export default {
    components: {ElIcon},
    data() {
      return {
        code:"",
      	user: {
          userType: "1",
      		username: "",
      		password:"",
          authCode: "",
      	},
        rules: {
          userType:[
            { required: true, message: '请选择用户类型', trigger: 'blur' }
          ],
      		username:[
      			{ required: true, message: '请输入用户名', trigger: 'blur' }
      		],
      		password:[
      			{ required: true, message: '请输入密码', trigger: 'blur' }
      		],
          authCode:[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
      	}
      };
    },
    computed: {
    },
    methods: {
    	onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            console.log(this.verificationcode,this.user.authCode)
            if(this.verificationcode != this.user.authCode){
                Message.error("验证码错误！！！");
            }else{
              this.$store.dispatch('login', this.user).then(() => {
                this.$router.push('/home');
              }).catch(err=>{
                console.log(err);
              })
            }
          } else {
            return false;
          }
        })
    	},

      register() {
      	this.$router.push("/register");
      },
      resetPass() {
    	  this.$router.push('/resetPass');
      },
      // 图片验证码
      createCode(){
          //先清空验证码的输入
          this.code = "";
          this.verificationcode = "";
          this.user.authCode = "";
          //验证码的长度
          var codeLength = 4;
          //随机数
          var random = new Array(0,1,2,3,4,5,6,7,8,9);
          for(var i = 0; i < codeLength; i++) {
            //取得随机数的索引（0~35）
            var index = Math.floor(Math.random()*10);
            //根据索引取得随机数加到code上
            this.code += random[index];
          }
          //把code值赋给验证码
          this.verificationcode = this.code;
      },
    },
    mounted() {
    },
    created(){
        this.createCode();
    }
  }
</script>

<style >
  /*验证码*/
  .verification{
    letter-spacing:5px;
    transform: translate(-15px,0);
    cursor: pointer;
  }

	.login-row{
    background:url(/static/img/login_bg1.png) no-repeat center;
	  background-size: 100% 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	}

	.login-form {
    display: block;
    min-height: 564px;
    max-width: 400px;
    border-radius: 4px;
    background:url(/static/img/login_form1.png) no-repeat;
    background-size: cover;
    bottom: -6px;
    position: absolute;
    left: 819px;
    box-shadow: 0 22px 50px 0 #276DF1;
  }

  #login_msg{
    position: relative;
    font-family: PingFangHK-Medium;
    font-size: 26px;
    color: #5831AC;
    letter-spacing: 8.12px;
    text-align: center;
    height: 37px;
    width: 137px;
    margin: 20px 131px 33px 132px;
  }

  .login-form .el-form-item .el-form-item__content .el-input{
    height: 40px;
    width: 300px;
    border-radius: 4px;
    margin: 0px 50px 0 50px;;
  }

	.register{
	  /*float:left;*/
	  cursor: pointer;
	}

	.forget-password{
	  color:#2e7fdb;
	  /*float:right;*/
	  cursor: pointer;
	}

	.forget-password:hover{
	  color:#2e7fdb;
	  font-weight: bold;
	}

	.copyright{
	  font-size:14px;
    width: 100%;
	  display:block;
	  position:absolute;
	  /*padding: 20px;*/
	  text-align: center;
	  bottom:10px;
	}

	#submit-button{
	  display: inline-block;
	  vertical-align: middle;
	  height:48px;
    width:306px !important;
    margin: 23px 47px auto 43px;
	  line-height: 24px;
	  text-align: center;
	  white-space: nowrap;
    letter-spacing: 1.71px;
	  cursor: pointer;
	  color: #ffffff;
	  background-color: #6673F2;
	  border-radius: 4px;
	  border: none;
	  -webkit-appearance: none;
	  outline:none;
    font-family: PingFangSC-Regular;
    font-size: 24px;
	}
</style>
