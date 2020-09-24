<template>
  <section>
    <!-- 查询条件 -->
    <el-col :span="24" class="toolbar">
      <el-row>
        <el-form :inline="true" :model="condition" size="small">
          <el-form-item label="用户名称">
            <el-input v-model="selectUserName" placeholder="请输入用户名称" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="selectUserType" placeholder="请选择" style="width: 200px" :disabled="isCarView">
              <el-option style="width: 200px"
                v-for="item in typeUserData.options"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="选择">
            <el-input v-if="selectUserType==2" v-model="selectEnterpriseName" style="width: 230px" :disabled=true :placeholder="selectUserType==1?'点击右边图标选择车企':'点击右边图标选择车企'">
              <el-button slot="append" icon="fa fa-search" @click="selectEnterprise=true" :disabled="selectUserType == 1" v-if="!isCarView"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="primary" @click="queryUserInfo()">查询</el-button>
            <el-button type="primary" @click="addUserView = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    <!--角色信息展示-->
    <c-table :table="tableData">
      <template slot-scope="props" slot="id">
        <span style="display: none">{{props.obj.row.id}}</span>
      </template>
      <template slot-scope="props" slot="userType">
        <span>{{formatUserType(props.obj.row.userType)}}</span>
      </template>
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="修改" placement="top-start" >
          <el-button type="primary" @click="updateUser(props.obj.$index, props.obj.row)"  icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="top-start" >
          <el-button type="danger" @click="delUser(props.obj.row.id)" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </template>
    </c-table>

    <!--对话框-->
    <el-dialog :title="title" :visible.sync="addUserView" width="65%" :close-on-click-modal="false" v-if="addUserView">
      <add-user ref="addUserRef" @refreshUser="refreshUser" v-if="addUserView"></add-user>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserView = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title1" :visible.sync="userModifyView" width="80%" :close-on-click-modal="false" >
      <userModify ref="modifyUserRef" :condition="condition" @refreshUser="refreshUser"></userModify>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userModifyView = false">取 消</el-button>
        <el-button type="primary" @click="modifySubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择车企" :visible.sync="selectEnterprise" width="80%" append-to-body="true" >
      <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
    </el-dialog>
  </section>
</template>

<script>
  import CTable from '../../components/Table.vue';
  import CSelect from '../../components/Select.vue';
  import userModify from "./UserModify";
  import addUser from "./AddUser";
  import CarEnterpriseList from '../report/CarEnterpriseList';


  export default {
    name: "userManage",
    props: {

    },
    components:{
      CTable,
      CSelect,
      CarEnterpriseList,
      userModify,
      addUser
    },
    data(){
      return{
        condition :{
          userName:"",
          userId:"",
          userType:1,
          password:"",
          description : '',
          relatId:'',
          enterpriseName:'',
          roleName:'',
          roleId:'',
          loginNo:''
        },
        queryRelatId:'',
        selectUserName:'',
        selectUserType:1,
        selectEnterpriseName:"",
        isCarView:true,
        userId : '',
        title: '添加用户',
        title1: '修改用户',
        selectEnterprise:false,
        addUserView: false,
        userModifyView: false,
        typeUserData: {
          options:[
            {
              value:1,
              text:"运营商",
            },{
              value:2,
              text:"车企",
            }
          ],
          clearable:true,
          placeholder:"请选择类型",
        },
        tableData: {
          loading: false,
          hasSelect: false,
          data: [],
          columns: [
            {
              label: "id",
              props: "id",
              show:true,
              width:'0'
            },
            {
              label: "用户名称",
              props: "userName"
            },
            {
              label: "用户类型",
              props: "userType",
              show:true
            },
            {
              label: "车企名称",
              props: "enterpriseName"
            },
            {
                 label: "角色",
                 props: "roleName"
            },
            {
              label: "登录名",
              props: "loginNo"
            },
            {
              label: "密码",
              props: "password",
              show:true,
              width:'0'
            },
            {
              label: "创建时间",
              props: "createTime"
            }
          ],
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label:"操作",
            data:[
            ]
          }
        },
      }
    },
    methods: {
      addUser(){
        this.$refs.addUserRef.addUser();
        this.queryUserInfo();
      },

      modifySubmit() {
        this.$refs.modifyUserRef.modifyUser();
        this.queryUserInfo();
      },

      refreshUser() {
        this.queryUserInfo();
        this.addUserView = false;
        this.userModifyView = false;
      },
      delUser(id) {
        let params = {
          id:id
        };
        this.$http.delUser(params).then((res) => {
          if ("success" == res.data.result) {
            this.$message({
              message:"删除成功",
              type:"success",
            });
          } else {
            this.$message({
              message:"删除失败",
              type:"error",
            });
          }
          this.queryUserInfo();
        }).catch(err => {
          console.log('err',err);
        });

      },
      updateUser(index,row){
        this.userModifyView=true;
        this.title1='角色授权';
        this.userId = row.id;
        this.condition.userName = row.userName;
        this.condition.userId = row.id;
        this.condition.userType = row.userType;
        this.condition.password = row.password;
        this.condition.description = row.description;
        this.condition.enterpriseName = row.enterpriseName;
        this.condition.relatId = row.relatId;
        this.condition.roleName = row.roleName;
        this.condition.roleId = row.roleId;
        this.condition.loginNo = row.loginNo;
      },
      queryUserInfo(){
        let params = {
          userName: this.selectUserName,
          userType: this.selectUserType,
          relatId: this.queryRelatId
        };
        this.$http.getUserInfo(params).then((res) => {
          this.tableData.data = res.data.result;
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      formatUserType(userType){
        if(userType == 1) {
          return "运营商";
        } else if(userType == 2) {
          return "车企";
        }else if(userType == 3) {
          return "车主";
        } else {
          return userType;
        }
      },
      getSelectedCarEnterprise(row){
        this.selectEnterprise = false;
        this.condition.relatId = row.id;
        this.queryRelatId = row.id;
        this.condition.enterpriseName = row.name;
        this.selectEnterpriseName = row.name;
      },
      init() {
        if (this.$store.getters.userType == "2") {
          this.isCarView = true;
          this.condition.userType = 2;
          this.selectUserType = 2;
          this.condition.relatId = this.$store.getters.userInfo.id;
          this.queryRelatId = this.$store.getters.userInfo.id;
          this.condition.enterpriseName = this.$store.getters.userInfo.enterpriseName;
          this.selectEnterpriseName = this.$store.getters.userInfo.enterpriseName;
        } else {
          this.isCarView = false;
          this.condition.userType = 1;
          this.selectUserType = 1
        }
      }
    },
    mounted() {
      this.queryUserInfo();
    },
    created(){
      this.init();
    }
  }
</script>

<style scoped>

</style>
