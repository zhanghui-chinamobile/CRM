<template>
  <section>
    <!-- 查询条件 -->
    <el-col :span="24" class="toolbar">
      <el-row>
        <el-form :inline="true" :model="conditions" size="small">
          <el-form-item label="角色名称">
            <el-input v-model="conditions.roleName" placeholder="请输入角色名称" ></el-input>
          </el-form-item>
          <el-form-item label="角色类型">
            <el-select v-model="conditions.roleType" placeholder="请选择">
              <el-option
                v-for="item in typeRoleData.options"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="primary" @click="queryRoleInfo()"> 查询</el-button>
            <el-button type="primary" @click="addRoleView = true"> 新增</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    <!--角色信息展示-->
    <c-table :table="tableData">
        <template slot-scope="props" slot="id">
            <span style="display: none">{{props.obj.row.id}}</span>
        </template>
      <template slot-scope="props" slot="roleType">
            <span>{{formatRoleType(props.obj.row.roleType)}}</span>
      </template>
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="授权" placement="top-start" >
          <el-button type="primary" @click="updateRole(props.obj.$index, props.obj.row)"  icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="top-start" >
          <el-button type="danger" @click="delRole(props.obj.row.id)" icon="el-icon-delete" :disabled="props.obj.row.id == 2000 || props.obj.row.id == 1000"></el-button>
        </el-tooltip>
      </template>
    </c-table>

  <!--对话框-->
    <el-dialog :title="title" :visible.sync="addRoleView" width="50%" :close-on-click-modal="false" >
      <add-role ref="addRoleRef" @refreshRole="refreshRole"></add-role>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleView = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title1" :visible.sync="rolePermissionView" width="80%" :close-on-click-modal="false" >
      <role-permission ref="RolePermission" :roleId = 'roleId'></role-permission>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolePermissionView = false">取 消</el-button>
        <!--<el-button type="primary" @click="addRolePermission">确 定</el-button>-->
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import CTable from '../../components/Table.vue';
  import CSelect from '../../components/Select.vue';
  import CarEnterpriseUpdate from "./CarEnterpriseUpdate";
  import RolePermission from "./RolePermission";
  import AddRole from "./AddRole";

    export default {
      name: "RoleManage",
      components:{
        CTable,
        CSelect,
        CarEnterpriseUpdate,
        RolePermission,
        AddRole
      },
      data(){
          return{
            conditions: {
              roleName: '',
              roleType: ''
            },
            roleId : '',
            title: '添加角色',
            title1: '',
            addRoleView: false,
            rolePermissionView: false,
            typeRoleData: {
              options:[
                {
                  value:"1",
                  text:"运营商",
                },{
                  value:"2",
                  text:"车企",
                }
              ],
              clearable:true,
              placeholder:"请选择角色类型",
            },
            tableData: {
              loading: false,
              hasSelect: false,
              data: [/*{
                id:'1',
                roleName: '管理员',
                roleType: '系统角色',
                createTime: '2018-11-15'
              }*/],
              columns: [
                  {
                      label: "id",
                      props: "id",
                      show:true,
                      width:'0'
                  },
                {
                  label: "角色名称",
                  props: "roleName"
                },
                {
                  label: "角色类型",
                  props: "roleType",
                  show:true
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
        addRole(){
         // this.addRoleView=true;
         // this.title='新增角色';
            this.$refs.addRoleRef.addRole();
        },

          refreshRole() {
              this.queryRoleInfo();
              this.addRoleView = false;
          },
        delRole(id) {
            let params = {
               id:id
            };
            if (id == 1000 || id == 2000) {
              this.$message({
                message:"管理员权限不可删除",
                type:"error",
              });
              return;
            }
            this.$http.delRole(params).then((res) => {
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
                this.queryRoleInfo();
            }).catch(err => {
                console.log('err',err);
            });

        },
        updateRole(index,row){
          this.rolePermissionView=true;
          this.title1='角色授权';
          this.roleId = row.id;
        },
        queryRoleInfo(){
          let params = {
            roleName: this.conditions.roleName,
            roleType: this.conditions.roleType
          };
          this.$http.getRoleInfo(params).then((res) => {
            this.tableData.data = res.data.result;
/*            if(this.tableData.data.length > 0) {
                for(let i=0;i<this.tableData.data.length;i++) {
                    this.tableData.data[i].roleType = this.formatRoleType(this.tableData.data[i].roleType);
                }
            }*/
            this.tableData.loading = false;
          }).catch(error => {
            this.tableData.loading = false;
          });
        },
          formatRoleType(roleType){
            if(roleType == "1") {
                return "运营商";
            } else if(roleType == "2") {
                return "车企";
            }else if(roleType == "3") {
                return "车主";
            } else {
              return roleType;
            }
          },
          addRolePermission() {
              this.$refs.RolePermission.addRole();
              this.rolePermissionView = false;
          },
      },
        mounted() {
            this.queryRoleInfo();
        }
    }
</script>

<style scoped>

</style>
