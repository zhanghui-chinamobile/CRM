<template>
  <div>
    <ul class="step">
      <li :class="{active:isActive===0,actived:isActived.indexOf(0)!==-1}">
        <p>1</p>
        <p>验证身份</p>
      </li>
      <li :class="{active:isActive===1,actived:isActived.indexOf(1)!==-1}">
        <p>2</p>
        <p>设置信息</p>
      </li>
      <li :class="{active:isActive===2}">
        <p>3</p>
        <p>完成</p>
      </li>
    </ul>
    <!--第一步-->
    <el-form label-width="100px" :model="form" style="width:500px;margin:auto" v-if="isActive==0" :rules="rules" ref="form">
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

    <el-form label-width="100px" :model="form1" style="width:500px;margin:auto" v-if="isActive==1" :rules="rules1" ref="form1">
      <el-form-item label="真实姓名" prop="realName" key="realName">
        <el-input v-model="form1.realName"></el-input>
      </el-form-item>
      <el-form-item label="通信地址" prop="address" key="address">
      <el-input v-model="form1.address"></el-input>
    </el-form-item>
      <el-form-item label="车牌号码" prop="carNumber" key="carNumber">
        <el-input v-model="form1.carNumber"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="credentialType" key="credentialType">
        <el-select v-model="form1.credentialType" >
          <el-option label="身份证" :value=1>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="credentialCode" key="credentialCode">
        <el-input v-model="form1.credentialCode">
        </el-input>
      </el-form-item>
      <el-form-item label="上传照片">
        <image-show ref="imageInfo"></image-show>
        <span style="font-size: 10px">请上传身份证件照</span>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-button style="background: #0054a7;border-color:#0054a7;width:80%;" size='medium' type="primary" @click="goBeforeStep">上一步</el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="background: #0054a7;border-color:#0054a7;width:80%;" size='medium' type="primary" @click="goNextStep(2,'form1')">下一步</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div class="form form2" v-if="isActive==2">
      <p>资料上传成功，等待审批</p>
      <div class="text-center">
        <el-button type="danger" @click="rAccountSe()">返回实名状态</el-button>
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
    export default {
      components: {
        imageShow
      },
      props:{
        simInfo: {
          type: Object,
          required: false,
          default() {
            return {};
          }
        }
      },
      name: "info-auth",
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
          };
          var validatecredentialCode = (rule, value,callback) => {
            let myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!myreg.test(value)) {
              callback(new Error('身份证号码不正确！'));
            } else {
              callback();
            }
          };
          return {
            codeVisible:false,
            codeNum:'',
            isActive: 0,
            form: {
              username:'',
              phoneNum:'',
              phoneMask:'',
            },
            form1: {
              realName:'',
              address:'',
              credentialType: 1,
              credentialCode:'',
              carNumber:''
            },
            isActived: [],
            rules: {
              realName: [
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
              realName:[
                {required: true, message: '请输入真实姓名', trigger: 'blur'}
              ],
              address:[
                {required: true, message: '请输入通信地址', trigger: 'blur'}
              ],
              carNumber:[
                {required: true, message: '请输入车牌号码', trigger: 'blur'}
              ],
              credentialType:[
                {required: true, message: '请选择证件类型', trigger: 'blur'}
              ],
              credentialCode:[
                {required: true, message: '请输入证件号码', trigger: 'blur'},
                {validator:validatecredentialCode, trigger:['change','blur']}
              ],
            }
          }
        },
      created() {
        console.log('simInfo',this.simInfo);
        if (this.simInfo == {}) {
          if (this.$route && this.$router.currentRoute && this.$router.currentRoute.params && this.$router.currentRoute.params.name) {
            this.form.username = this.$router.currentRoute.params.name;
            this.form.phoneNum = this.$router.currentRoute.params.number;
          } else if (this.$route.query.type == "update") {

            this.$http.getSingleSimData({}).then(res => {
              if (res.data.result) {
                let simInfo = res.data.result;
                this.form.username = simInfo.loginNo;
                this.form.phoneNum = simInfo.number;
                this.form1.carNumer = simInfo.carNumber;
                this.form1.realName = simInfo.realName;
                this.form1.address = simInfo.address;
                this.form1.credentialCode = simInfo.credentialCode;
                this.form1.credentialType = simInfo.credentialType;
              }
            })
              .catch(error => {
                console.log('error', error);
              });
          }
        }else{
          this.form.username = this.simInfo.userName;
          this.form.phoneNum = this.simInfo.number;
          this.form1.carNumer = this.simInfo.carNumber;
          this.form1 = this.simInfo;
          this.form1.credentialType = 1;
        }
      },
      methods: {
        goNextStep(value,formName) {
          this.$refs[formName].validate((valid)=> {
            if(valid) {
                if(value == 2) {
                    this.$http.updateAuthInfo(this.form1).then(res => {
                        this.isActive = value;
                        this.isActived.push(value - 1);
                    }).catch(err => {
                        console.log('err', err);
                    });
                    //获取文件内容
                    let file = this.$refs.imageInfo.getImageInfo();
                    console.log('file',file);
                }else{
                    this.isActive = value;
                    this.isActived.push(value - 1);
                }
            }
          })
        },
        goBeforeStep() {
          this.isActive = 0;
          this.isActived.pop(1);
        },
        rAccountSe() {
            if(this.simInfo!={}){
                this.$emit("returnParent");
            }else{
                this.$router.push("/stateQuery");
            }
        },
        sendCode() {
          //调用接口显示验证码
          this.codeVisible = true;
          this.codeNum = 1234;
        },
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
