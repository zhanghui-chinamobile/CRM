<template>
    <div>
        <el-row class="row-style">
          <i class="fa fa-2x fa-weibo"></i>
          <span>微博:</span>
            <span v-if="weibo.isBind">
                <span>{{weibo.thirdUsername}}</span>
                <span style="color: blue" @click="removeThirdAccount(1)">解除绑定</span>
            </span>
            <span v-else>
                <span style="color: blue" @click="bindThirdAccount(1)">绑定</span>
            </span>
        </el-row>
      <el-row class="row-style">
          <i class="fa fa-2x fa-qq"></i>
          <span>QQ:</span>
          <span v-if="qq.isBind">
              <span>{{qq.thirdUsername}}</span>
              <span style="color: blue" @click="removeThirdAccount(2)">解除绑定</span>
          </span>
          <span v-else>
              <span style="color: blue" @click="bindThirdAccount(2)">绑定</span>
          </span>
      </el-row>
      <el-row class="row-style">
          <i class="fa fa-2x fa-wechat"></i>
          <span>微信:</span>
          <span v-if="wechat.isBind">
              <span>{{wechat.thirdUsername}}</span>
              <span style="color: blue" @click="removeThirdAccount(3)">解除绑定</span>
          </span>
          <span v-else>
              <span style="color: blue" @click="bindThirdAccount(3)">绑定</span>
          </span>
      </el-row>
        <el-dialog title="绑定帐号" :visible.sync="bindAccountVisible" width="38%" :close-on-click-modal="false">
            <el-form label-width="100px" size="small" :model="form"  :rules="rules" ref="form" class="bindAccount">
                <el-form-item label="第三方帐号类型" prop="thirdAccountType" key="thirdAccountType">
                    <el-select v-model="form.thirdAccountType" disabled>
                        <el-option label="微博" :value=1>
                        </el-option>
                        <el-option label="QQ" :value=2>
                        </el-option>
                        <el-option label="微信" :value=3>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="帐号" prop="thirdAccount" key="thirdAccount">
                    <el-input v-model="form.thirdAccount">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="thirdUsername" key="thirdUsername">
                    <el-input v-model="form.thirdUsername">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="background: #6673F2;border-color:#6673F2;" size='medium' type="primary" @click="submitBindInfo">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "bind-account",
        data() {
            return {
                bindAccountVisible: false,
                form: {
                    thirdAccountType : 1,
                    thirdAccount: '',
                    thirdUsername: ''
                },
                weibo:{
                    isBind: false,
                    thirdAccount: '',
                    thirdUsername: ''
                },
                qq:{
                    isBind: false,
                    thirdAccount: '',
                    thirdUsername: ''
                },
                wechat:{
                    isBind: false,
                    thirdAccount: '',
                    thirdUsername: ''
                },
                rules: {
                    thirdAccount: [
                        {required: true, message: '请输入账号！', trigger: 'blur'},
                    ],
                    thirdUsername: [
                        {required: true, message: '请输入用户名！', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            getThirdAccount() {
                this.$http.getThirdAccount({
                }).then(res => {
                    if (res.data.result) {
                        this.weibo = {
                            isBind: false,
                            thirdAccount: '',
                            thirdUsername: ''
                        };
                        this.qq = {
                            isBind: false,
                            thirdAccount: '',
                            thirdUsername: ''
                        };
                        this.wechat = {
                            isBind: false,
                            thirdAccount: '',
                            thirdUsername: ''
                        };
                        let accounts = res.data.result;
                        for (let index in accounts){
                            switch (accounts[index].thirdAccountType) {
                                case 1:
                                    this.weibo = accounts[index];
                                    this.weibo.isBind = true;
                                    break;
                                case 2:
                                    this.qq = accounts[index];
                                    this.qq.isBind = true;
                                    break;
                                case 3:
                                    this.wechat = accounts[index];
                                    this.wechat.isBind = true;
                                    break;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log('error',error);
                })
            },
            bindThirdAccount(type) {
                this.bindAccountVisible = true;
                this.form.thirdAccountType = type;
            },
            submitBindInfo() {
                this.$refs['form'].validate((valid)=> {
                    if(valid) {
                        this.$http.bindThirdAccount(this.form).then(res => {
                            this.$message({
                                message: res.data.result,
                                type: 'success'
                            });
                            this.bindAccountVisible = false;
                            this.getThirdAccount();
                        }).catch(err => {
                            console.log('err', err);
                        });
                    }
                })
            },
            removeThirdAccount(type) {
                let account = {};
                switch (type){
                    case 1:
                        account = this.weibo;
                        break;
                    case 2:
                        account = this.qq;
                        break;
                    case 3:
                        account = this.wechat;
                        break;
                }
                this.$confirm('确定解除该帐号绑定?', '提示', {
                    type: 'warring',
                }).then(() => {
                    this.$http.removeThirdAccount(account).then(res => {
                        this.$message({
                            message: res.data.result,
                            type: 'success',
                        });
                        this.getThirdAccount();
                    }).catch(err => {
                        console.log('err', err);
                    });
                })
            }
        },
        created() {
            this.getThirdAccount();
        }
    }
</script>

<style scoped>
  .row-style {
    margin: 20px;
  }
  .row-style span:nth-child(1) {
    margin-right: 20px;
  }
  .row-style span:nth-child(2) {
    margin-right: 30px;
  }
  .row-style > span:nth-child(3) {
    margin-right: 30px;
  }
  .bindAccount{
      padding: 10px;
      margin: 0 auto;
      width: 50%;
  }
</style>
