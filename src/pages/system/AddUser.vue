<template>
  <section>
    <el-form :model="conditions" size="small" class="addUser" :rules="rules" ref="addForm">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="conditions.userName" placeholder="请输入用户名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
      <el-select v-model="conditions.userType" filterable placeholder="请选择用户类型" @change="changeUserType" size="small" :disabled="isCarView">
              <span v-for="option in options" :key="option.value">
                <el-option :label="option.text" :value="option.value"></el-option>
              </span>
      </el-select>
      <el-form-item label="关联角色" style="padding-top: 16px;height: 32px;width: 400px" prop="roleName">
          <el-input v-model="conditions.roleName" placeholder="点击选择角色"  size="small" disabled="true">
            <el-button  slot="append" icon="fa fa-search" @click="selectRelatRole=true" ></el-button>
          </el-input>
      </el-form-item>
        <el-form-item label="关联车企" style="padding-top: 16px;height: 32px;width: 400px">
          <el-input v-model="conditions.relatName" placeholder="点击选择车企" disabled="true" size="small">
            <el-button slot="append" icon="fa fa-search" @click="selectRelat=true"  v-if="conditions.userType==2 && !isCarView" ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="登录名"  style="padding-top: 16px" prop="loginNo">
          <el-input  v-model="conditions.loginNo" placeholder="请输入登录名" size="small"></el-input>
        </el-form-item>
      <el-form-item label="密码"  style="padding-top: 10px" prop="password">
          <el-input type="password" v-model="conditions.password" placeholder="请输入密码" size="small"></el-input>
      </el-form-item>
    </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="conditions.description">
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog title="选择车企" :visible.sync="selectRelat" width="80%" append-to-body="true">
      <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
    </el-dialog>

    <el-dialog title="选择角色" :visible.sync="selectRelatRole" width="80%" append-to-body="true">
      <RoleQuery  @selectRoleList="selectRoleList" @closeRoleQuery="closeRoleQuery" :addRoleType="conditions.userType" v-if="selectRelatRole"></RoleQuery>
    </el-dialog>

  </section>
</template>

<script>
  import CarEnterpriseList from '../report/CarEnterpriseList';
  import RoleQuery from './RoleQuery'

  export default {
    name: "AddUser",
    components: {
      CarEnterpriseList,
      RoleQuery
    },
    props:{
        addRoleType:1
    },
    data(){
      return {
        selectRelat: false,
        selectRelatRole: false,
        operationName: '新增用户',
        isCarView:true,
        option: '',
        options:[{
          value:1,
          text:"运营商",
        },{
          value:2,
          text:"车企",
        }],
        operateRoleId:'',
        conditions: {
          userName: '',
          userType: 1,
          description: '',
          password: '',
          loginNo:'',
          relatId:'',
          relatName:'',
          roleName:''
        },
        condition:'',
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
      addUser(){
          this.$refs.addForm.validate((valid) => {
              if (valid) {
                  if (this.conditions.userType == 2 && (this.conditions.relatId == null || this.conditions.relatId == '')){
                      this.$message.warning("请选择车企");
                      return;
                  }
                  let params = {
                      userName: this.conditions.userName,
                      userType: this.conditions.userType,
                      description: this.conditions.description,
                      password: this.conditions.password,
                      relatId: this.conditions.relatId,
                      roleId: this.operateRoleId,
                      loginNo: this.conditions.loginNo
                  };
                  this.$http.addUser(params).then((res) => {
                      if ("success" == res.data.result) {
                          this.$message({
                              message:"用户添加成功",
                              type:"success",
                          });
                          this.conditions.userName = '';
                          this.conditions.userType = '';
                          this.conditions.description = '';
                          this.conditions.password = '';
                          this.conditions.relatId = '';
                          this.conditions.loginNo = '';
                          this.operateRoleId = '';
                          this.$emit('refreshUser','success');
                          return "success";
                      } else {
                          if("error" == res.data.result) {
                            this.$message({
                              message:"用户添加失败",
                              type:"error",
                            });
                          } else {
                            let errMsg = "账号[" + this.conditions.loginNo + "}已存在";
                            this.$message({
                              message:"用户添加失败," + errMsg,
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
      changeUserType(val) {
        this.conditions.userType = val;
      },
      getSelectedCarEnterprise(row){
        this.selectRelat = false;
        this.conditions.relatId = row.id;
        this.conditions.relatName = row.name;
      },
      selectRoleList(roleIds,roleName) {
        this.operateRoleId = '';
          this.operateRoleId = roleIds;
          this.conditions.roleName=roleName;
/*        if(roleIds.length > 0) {
          for(let i = 0;i<roleIds.length; i++) {
            if (i==0) {
              this.conditions.roleName=roleName;
              this.operateRoleId = roleIds[i];
            } else {
              this.operateRoleId = this.operateRoleId + "," + roleIds[i];
            }
          }
        }*/
      },
      closeRoleQuery() {
        this.selectRelatRole = false;
      },
      init() {
        if (this.$store.getters.userType == "2") {
          this.isCarView = true;
          this.conditions.userType = 2;
          this.conditions.relatId = this.$store.getters.userInfo.id;
          this.conditions.relatName = this.$store.getters.userInfo.enterpriseName;
        } else {
          this.isCarView = false;
          this.conditions.userType = 1;
        }
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style>
  .addUser{
    padding: 10px;
    margin: 0 auto;
    width: 300px;
  }

  .addUser .el-form-item .el-form-item__content{
    margin-right: 40px;
    height: 32px;
    width: 400px !important;
  }
</style>
