<template>
    <div>
      <ul class="step">
        <li :class="{active:isActive===0,actived:isActived.indexOf(0)!==-1}">
          <p>1</p>
          <p>验证身份</p>
        </li>
        <li :class="{active:isActive===1,actived:isActived.indexOf(1)!==-1}">
          <p>2</p>
          <p>{{this.$route.query.type=="update"?"修改信息":"基本信息"}}}</p>
        </li>
        <li :class="{active:isActive===2}">
          <p>3</p>
          <p>完成</p>
        </li>
      </ul>
      <!--第一步-->
        <div :span="24" style="width: 500px;margin: auto">
          <el-form label-width="100px" :model="form" style="width:500px;margin:auto" v-if="isActive==0" :rules="rules" ref="form" size="small">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNum">
              <el-input v-model="form.phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="手机验证码" prop="phoneMask">
              <el-input v-model="form.phoneMask">
                <template slot="append"><span style="cursor:pointer;" @click="sendCode">发送验证码</span></template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-button style="background: #0054a7;border-color:#0054a7;width:80%;" size='medium' type="primary" @click="rAccountSe()">上一步</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="background: #0054a7;border-color:#0054a7;width:80%;" size='medium' type="primary" @click="goNextStep(1,'form')">下一步</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <!--第二步-->
          <el-form label-width="100px" :model="form1" style="width:500px;margin:auto" v-if="isActive==1" :rules="rules1" ref="form1" size="small">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="form1.name"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" prop="license">
              <el-input v-model="form1.license"></el-input>
            </el-form-item>
            <el-form-item label="通信地址"  prop="address">
              <el-input v-model="form1.address"></el-input>
            </el-form-item>
            <el-form-item label="法人代表" prop="contactName" key="contactName">
              <el-input v-model="form1.contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactPhone">
              <el-input v-model="form1.contactPhone"></el-input>
            </el-form-item>
            <el-form-item label="上传照片">
                <image-show ref="imageInfo"></image-show>
            </el-form-item>
                <el-form-item style="width: 500px;margin: auto">
                    <el-button style="background: #0054a7;border-color:#0054a7;" size='medium' type="primary" @click="goBeforeStep">上一步</el-button>
                    <el-button style="background: #0054a7;border-color:#0054a7;" size='medium' type="primary" @click="goNextStep(2,'form1')">下一步</el-button>
                </el-form-item>
          </el-form>
      <!--第三步-->
          <div class="form form2" v-if="isActive==2">
            <p style="color: #5B7392">资料上传成功，等待审批</p>
            <div class="text-center">
              <el-button type="danger" @click="rAccountSe()">返回实名状态</el-button>
            </div>
          </div>
        </div>


        <el-dialog
        title="验证码"
        :visible.sync="codeVisible"
        width="30%">
        <span>你的验证码是{{codeNum}}</span>
      </el-dialog>
    </div>
</template>

<script>
    import imageShow from "./test";
    import {mapState} from "vuex";
    export default {
      name: "car-info-auth",
      components: {
        imageShow
      },
      props:{
        enterpriseInfo: {
          type: Object,
          required: false,
          default() {
            return {};
          }
        }
      },
      data() {
        var validatePhoneNum = (rule, value, callback) => {
          if(value === '') {
            callback(new Error("请输入手机号码"));
          } else if(!this.checkPhoneNumber(value)) {
            callback(new Error("手机输入格式不正确"))
          } else {
            callback();
          }
        };
        var validateCodeNum = (rule, value, callback) => {
          if(value === '') {
            callback(new Error("请输入手机号码"));
          } else if(value != this.codeNum) {
            callback(new Error("手机验证码不对，请重新输入"))
          } else {
            callback();
          };
        }
        return {
            carEnterpriseVisible:false,
          isActive: 0,
          isActived: [],
          fileList:[],
          codeVisible:false,
          codeNum:'',
          form: {
            username:"",
            phoneNum:"",
          },
          form1: {
              name:'',
              license: '',
              address:'',
              contactName:'',
              contactPhone:'',
          },
          rules: {
            username: [
              {required: true, message: '请输入用户名', trigger: 'blur'}
            ],
            phoneNum: [
              {required: true, message: '请输入手机号码', trigger: 'blur'},
              { validator: validatePhoneNum, trigger: ['blur','change'] }
            ],
            phoneMask:[
              {required: true, message: '请输入手机验证码', trigger: 'blur'},
              { validator: validateCodeNum, trigger: 'submit' },
            ]
          },
          rules1: {
              name:[
              {required: true, message: '请输入企业名称', trigger: 'blur'}
            ],
              license:[
              {required: true, message: '请输入营业执照', trigger: 'blur'}
            ],
              address:[
              {required: true, message: '请输入通讯地址', trigger: 'blur'}
            ],
              contactName:[
              {required: true, message: '请输入法人姓名', trigger: 'blur'}
            ],
            contactPhone:[
              {required: true, message: '请输入联系方式', trigger: 'blur'},
              { validator: validatePhoneNum, trigger: ['blur','change'] }
            ]
          }
        }
      },
      created() {
        if (this.enterpriseInfo==={}){
          this.carEnterpriseVisible=false;
          if(this.$route && this.$router.currentRoute && this.$router.currentRoute.params && this.$router.currentRoute.params.name){
              this.form.username = this.$router.currentRoute.params.contactName;
              this.form.phoneNum = this.$router.currentRoute.params.contactPhone;
              this.carEnterpriseVisible = true;
          } else if(this.$route.query.type=="update") {
            this.form.username = '';
            this.form.phoneNum = '';
            this.form1.name = this.authInfo.name;
            this.form1.license = this.authInfo.license;
            this.form1.address = this.authInfo.address;
            this.form1.contactName = this.authInfo.contactName;
            this.form1.contactPhone = this.authInfo.contactPhone;
          }
        }else{
          this.form.username = this.enterpriseInfo.loginNo;
          this.form.phoneNum = this.enterpriseInfo.contactPhone;
          this.form1.name = this.enterpriseInfo.name;
          this.form1.id = this.enterpriseInfo.id;
          this.form1.license = this.enterpriseInfo.license;
          this.form1.address = this.enterpriseInfo.address;
          this.form1.contactName = this.enterpriseInfo.contactName;
          this.form1.contactPhone = this.enterpriseInfo.contactPhone;
          this.form1.carNumer = this.enterpriseInfo.carNumber;
          // this.form1.credentialType = 1;
        }
      },
        computed: {
            ...mapState({
                authInfo:state => state.authStore.carEnterprise,
            })
        },
      methods: {
        goNextStep(value,formName) {
          this.$refs[formName].validate((valid) => {
            if(valid) {
              if(value == 1) {
                  this.isActive = value;
                  this.isActived.push(value - 1);
              }
              if(value == 2) {
                //得到文件内容
                let file = this.$refs.imageInfo.getImageInfo();
                //将file更改
                let data = this.form1;
                this.$http.updateCarEnterprise(data).then(res => {
                    this.isActive = value;
                    this.isActived.push(value - 1);
                })
              }
            } else {
              return false;
            }
          })
        },
        goBeforeStep() {
          this.isActive = 0;
          this.isActived.pop(1);
        },
        sendCode() {
          //调用接口显示验证码
          this.codeVisible = true;
          this.codeNum = 1234;
        },
        rAccountSe() {
          debugger;
          if(this.enterpriseInfo==={}){
            this.$router.push("/info-auth");
          }else{
            this.$emit("returnParent")
          }
        },
        //验证手机号
        checkPhoneNumber(value) {
          let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
          return phoneReg.test(value);
        },
      }
    }
</script>

<style scoped>
  .form2 p {
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .text-center {
    text-align: center;
  }
  .step {
    width: 80%;
    height: 85px;
    margin: 40px auto 0;
  }
  .step li {
    position: relative;
    float: left;
    width: 33.33333%;
    list-style-type: none;
  }
  .step li:after {
    content: '';
    position: absolute;
    left: 0;
    top: 15px;
    width: 100%;
    height: 6px;
    background-color: #cccccc;
  }
  .step p {
    text-align: center;
    color: #ccc;
  }
  .step p:first-child {
    position: relative;
    z-index: 1;
    width: 36px;
    height: 36px;
    margin: auto;
    font-size: 22px;
    line-height: 36px;
    color: #fff;
    border-radius: 100%;
    background-color: #cccccc;
  }
  .step li.active p:first-child,
  .step li.active:after {
    background-color: #368605;
  }
  .step li.active:after {
    border-radius: 10px;
  }
  .step li.active p:last-child {
    color: #368605;
  }
  .step li.actived p:first-child,
  .step li.actived:after {
    background-color: #bcdda9;
  }

  .step li.actived p:last-child {
    color: #bcdda9;
  }
</style>
