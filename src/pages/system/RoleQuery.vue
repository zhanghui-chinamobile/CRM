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
            <el-select v-model="conditions.roleType" placeholder="请选择" disabled>
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
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    <!--角色信息展示-->
    <c-table :table="tableData" @onHandleSelectionChange="handleSelected" ref="RoleTable" :tableEvents="tableEvents">
      <template slot-scope="props" slot="id">
        <span style="display: none">{{props.obj.row.id}}</span>
      </template>
      <template slot-scope="props" slot="roleType">
        <span>{{formatRoleType(props.obj.row.roleType)}}</span>
      </template>
    </c-table>
    <el-form>
      <el-form-item >
        <div style="text-align: center;">
          <!--<el-button @click="submitSelectRole" style="margin:0px auto;">确定</el-button>-->
        </div>
      </el-form-item>
    </el-form>

  </section>
</template>

<script>
  import CTable from '../../components/Table.vue';
  import CSelect from '../../components/Select.vue';

  export default {
    name: "RoleQuery",
    components:{
      CTable,
      CSelect,
    },
      props: {
          addRoleType: {
              type: Number,
              required: false,
              default() {
                  return 1;
              }
          }
      },
    data(){
      return{
        conditions: {
          roleName: '',
          roleType: ''
        },
        operateid:[],
        roleName:'',
        roleId : '',
        title: '添加角色',
        title1: '',
        typeRoleData: {
          options:[
            {
              value:1,
              text:"运营商",
            },{
              value:2,
              text:"车企",
            },{
              value:3,
              text:"车主",
            }
          ],
          clearable:true,
          placeholder:"请选择角色类型",
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
          hasOperation: false,
          hasOperationTemplate: false,
          operation: {
            label:"操作",
            data:[
            ]
          }
        },
          tableEvents: {
              rowDbClick: this.selectRole
          },
      }
    },

    methods: {

      refreshRole() {
        this.queryRoleInfo();
      },

      queryRoleInfo(){
        let params = {
          roleName: this.conditions.roleName,
          roleType: this.conditions.roleType
        };
        this.$http.getRoleInfo(params).then((res) => {
          this.tableData.data = res.data.result;
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      formatRoleType(roleType){
        if(roleType == 1) {
          return "运营商";
        } else if(roleType == 2) {
          return "车企";
        }else if(roleType == 3) {
          return "车主";
        } else {
          return roleType;
        }
      },
      handleSelected(selectedRow) {
        this.operateid=[];
        if(selectedRow.length>0)
        {
          this.roleName = selectedRow[0].roleName;
          this.operateid[0] = selectedRow[0].id;
          this.$emit('selectRoleList', this.operateid, this.roleName);
/*          for (let i=0;i<selectedRow.length;i++) {
            /!*获取选中数据行的id*!/
            this.operateid[i] = selectedRow[i].id;
            this.$emit('selectRoleList', this.operateid, this.roleName);
          }*/
        }
      },
      submitSelectRole() {
        this.$emit('selectRoleList', this.operateid, this.roleName);
        this.operateid = [];
        this.$refs.RoleTable.clearSelection();
        this.$emit('closeRoleQuery', null);
      },
      selectRole(row,event) {
          this.$emit('selectRoleList', row.id, row.roleName);
          this.operateid = [];
          this.$refs.RoleTable.clearSelection();
          this.$emit('closeRoleQuery', null);
      }
    },

    mounted() {
      //this.queryRoleInfo();
    },
    created(){
        this.conditions.roleType = this.addRoleType;
    }
  }
</script>

<style scoped>

</style>
