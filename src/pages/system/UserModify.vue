<template>
  <section>
    <el-form size="small" class="modifyUser" :model="condition" :rules="rules" ref="modForm">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="condition.userName" placeholder="请输入用户名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="condition.userType" filterable placeholder="请选择用户类型"  size="small" :disabled="true">
              <span v-for="option in options" :key="option.value">
                <el-option :label="option.text" :value="option.value"></el-option>
              </span>
        </el-select>
        <el-form-item label="关联车企" style="padding-top: 16px;height: 32px;width: 400px">
          <el-input v-model="condition.enterpriseName" placeholder="点击选择车企" :disabled="true"  size="small" >
            <el-button slot="append" icon="fa fa-search" @click="selectRelat=true"   v-if="condition.userType==2 && !isCarView"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="关联角色" style="padding-top: 16px;height: 32px;width: 400px" prop="roleName">
            <el-input v-model="condition.roleName" placeholder="点击选择角色"  size="small" disabled="true">
                <el-button  slot="append" icon="fa fa-search" @click="selectRelatRole=true" ></el-button>
            </el-input>
        </el-form-item>
        <el-form-item label="登录名"  style="padding-top: 16px" prop="loginNo">
          <el-input  v-model="condition.loginNo" placeholder="请输入登录名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码"  style="padding-top: 10px" prop="password">
          <el-input type="password" v-model="condition.password" placeholder="请输入密码" size="small"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="condition.description">
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog title="选择车企" :visible.sync="selectRelat" width="80%" append-to-body="true">
      <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
    </el-dialog>

    <el-dialog title="选择角色" :visible.sync="selectRelatRole" width="80%" append-to-body="true">
      <RoleQuery  @selectRoleList="selectRoleList" @closeRoleQuery="closeRoleQuery" :addRoleType="condition.userType" v-if="selectRelatRole"></RoleQuery>
    </el-dialog>

  </section>
</template>

<script>
  import CarEnterpriseList from '../report/CarEnterpriseList';
  import RoleQuery from './RoleQuery'

  export default {
    name: "ModifyUser",
    components: {
      CarEnterpriseList,
      RoleQuery
    },
    props: {
      condition :{
        userName:"",
        userId:"",
        userType:2,
        password:"",
        loginNo:"",
        description : '',
        relatId : '',
        enterpriseName:'',
        roleName:'',
        roleId:''
      }
    },

    data(){
      return {
        isCarView:false,
        selectRelat: false,
        selectRelatRole: false,
        operationName: '修改用户',
        option: '',
        options:[{
          value:1,
          text:"运营商",
        },{
          value:2,
          text:"车企",
        }],
        rules: {
              userName: [
                  {required: true, type: "string", message: '请填写用户名称', trigger: 'blur'},
              ],
              password: [
                  {required: true, type: "string", message: '请填写密码', trigger: 'blur'},
              ],
              userType: [
                  {required: true, type: "number", message: '请选择用户类型', trigger: 'blur'},
              ],
              roleName: [
                  {required: true, type: "string", message: '请选择角色', trigger: 'blur'},
              ],
              loginNo: [
                {required: true, type: "string", message: '请填写登录名', trigger: 'blur'},
              ]
        }
      }
    },
    methods:{
      modifyUser(){
          this.$refs.modForm.validate((valid) => {
              if (valid) {
                  if (this.condition.userType == 2 && (this.condition.relatId == null || this.condition.relatId == '')){
                      this.$message.warning("请选择车企");
                      return;
                  }
                  let params = {
                      id: this.condition.userId,
                      userName: this.condition.userName,
                      userType: this.condition.userType,
                      description: this.condition.description,
                      password: this.condition.password,
                      relatId: this.condition.relatId,
                      roleId: this.condition.roleId,
                      loginNo: this.condition.loginNo
                  };
                  this.$http.modifyUser(params).then((res) => {
                      if ("success" == res.data.result) {
                          this.$message({
                              message:"用户修改成功",
                              type:"success",
                          });
                          this.condition.userId = '',
                          this.condition.userName = '';
                          this.condition.userType = '';
                          this.condition.description = '';
                          this.condition.password = '';
                          this.condition.relatId = '';
                          this.condition.roleId = '';
                          this.condition.loginNo = '';
                          this.$emit('refreshUser','success');
                          return "success";
                      } else {
                          if("error" == res.data.result) {
                            this.$message({
                              message:"用户修改失败",
                              type:"error",
                            });
                          } else {
                            let errMsg = "账号[" + this.condition.loginNo + "}已存在";
                            this.$message({
                              message:"用户修改失败," + errMsg,
                              type:"error",
                            });
                          }
                          return "error";
                      }
                  }).catch(err => {
                      console.log('err',err);
                      return "error";
                  });
              } else {
                  return;
              }
          });
      },
      changeUserType() {

      },
      getSelectedCarEnterprise(row){
        this.selectRelat = false;
        this.condition.relatId = row.id;
        this.condition.enterpriseName = row.name;
      },
        selectRoleList(roleIds,roleName) {
            this.condition.roleId = roleIds;
            this.condition.roleName = roleName;
        },
      closeRoleQuery() {
        this.selectRelatRole = false;
      },
      init() {
        if (this.$store.getters.userType == "2") {
          this.isCarView = true;
          this.condition.userType = 2;
        } else {
          this.isCarView = false;
          this.condition.userType = 1;
        }
      }
    },
    created(){
      init();
    }

  }
</script>

<style>
  .modifyUser{
    padding: 10px;
    margin: 0 auto;
    width: 300px;
  }

  .modifyUser .el-form-item .el-form-item__content{
    margin-right: 40px;
    height: 32px;
    width: 400px !important;
  }
</style>
