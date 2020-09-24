<template>
    <div class="real-name-view">
      <el-form label-width="100px" :model="simInfo" style="width:500px;margin:auto">
        <el-form-item label="用户名:" key="name">
          <!--{{form.name}}-->
          <el-input v-model="username" disabled></el-input>
        </el-form-item>
        <el-form-item label="实名状态:">
          <el-row  v-if="simInfo.relNameFlag == '1'">
            <el-col :span="10" style="color: green">已实名认证</el-col>
            <el-col :span="14">
              <el-button size="small" style="background-color: #6673F2;color: #ffffff" @click="confirmInfoAuth('update')">实名信息变更</el-button>
              <el-button size="small" style="background-color: #6673F2;color: #ffffff" @click="removeInfoAuth">解除绑定</el-button>
            </el-col>
          </el-row>
            <el-row v-else-if="simInfo.relNameFlag == '2'">
                <el-col :span="10" style="color: blue">等待审核中</el-col>
            </el-row>
            <el-row v-else>
                <el-col :span="10" style="color: red">未实名认证</el-col>
                <el-col :span="14">
                    <el-button size="small" style="background-color: #6673F2;color: #ffffff" @click="confirmInfoAuth('add')">实名信息认证</el-button>
                </el-col>
            </el-row>
        </el-form-item>
        <div  v-if="simInfo.relNameFlag == '1'">
          <el-form-item label="真实姓名:">
              <el-input v-model="simInfo.realName" disabled></el-input>
              <!--{{form1.realName}}-->
          </el-form-item>
          <el-form-item label="通信地址:">
              <!--{{form1.address}}-->
              <el-input v-model="simInfo.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="type">
            <el-select v-model="simInfo.credentialType"  disabled>
              <el-option label="身份证" :value="1" :key="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码:">
              <el-input v-model="simInfo.credentialCode" disabled></el-input>
              <!--{{form1.cardNum}}-->
          </el-form-item>
        </div>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "state-query",
        data() {
          return {
              userName:"",
              number:"",
            codeVisible:false,
            simInfo:{
              relNameFlag: "0",
              realName:'',
              address:'',
              credentialType:'1',
              credentialCode:''
            }
          }
        },
      created() {
        this.getAuthInfo();
      },
      computed: {
        username() {
            if(this.$route && this.$router.currentRoute && this.$router.currentRoute.params && this.$router.currentRoute.params.name) {
                this.userName = this.$router.currentRoute.params.name;
                this.number = this.$router.currentRoute.params.number ? this.$router.currentRoute.params.number : "";
                return this.$router.currentRoute.params.name
            }
          return this.$store.getters.username;
        }
      },
      methods: {
        getAuthInfo() {
            this.$http.getSingleSimData({})
                .then(res => {
                    this.simInfo = res.data.result;
                })
                .catch(error => {
                    console.log('error',error);
                })
        },
        confirmInfoAuth(type) {
          this.$router.push({
              path:"/authInfo?type=" + type,
              name:"实名认证",
              params:{
                  name:this.userName,number:this.number
              }
          });
        },
        removeInfoAuth() {
            this.$confirm('确定解除实名信息绑定?', '提示', {
                type: 'warring',
            }).then(() => {
                this.$http.removeAuthInfo().then(res => {
                    this.$message({
                        message: res.data.result,
                        type: 'success',
                    });
                    this.getAuthInfo();
                }).catch(err => {
                    console.log('err', err);
                });
            })
        }
      }

    }
</script>

<style scoped>
.real-name-view{
    margin-top: 20px;
}
</style>
