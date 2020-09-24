<template>
  <section>
    <el-row class="toolbar">
      <el-form :inline="true" :model="conditions" ref="conditionForm" size="small" style="padding-top: 20px;padding-left: 10px">
        <el-form-item label="用户类型">
          <el-select v-model="conditions.type" placeholder="请选择用户类型" size="small">
            <el-option label="车企" value="2"/>
            <el-option label="车主" value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="conditions.type==2?'选择车企':'选择车主'">
          <el-input v-model="conditions.name" style="width: 250px" :disabled=true :placeholder="conditions.type==1?'请点击右边的图标选择车企':'请点击右边的图标选择车主'">
            <el-button slot="append" icon="fa fa-search" @click="dialogVisible=true"></el-button>
          </el-input>
        </el-form-item>

      </el-form>
    </el-row>
    <el-dialog v-if="conditions.type === '2'" title="选择车企" :visible.sync="dialogVisible" width="80%">
      <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
    </el-dialog>
    <el-dialog v-if="conditions.type === '3'" title="选择车主" :visible.sync="dialogVisible" width="80%">
      <SimList @dealSelectRow="getSelectedSim"></SimList>
    </el-dialog>
    <el-row>
      <div style="width: 48%;display: inline-block">
        <span >可设置的角色：</span>
        <my-table :table="tableDataCan">
          <template slot-scope="props" slot="button-operation">
            <el-tooltip effect="dark" content="分配为此角色" placement="top-start" >
              <el-button type="primary" @click="updateUserRole(props.obj.row)"  icon="fa fa-plus-square-o" style="width: 20px;height: 20px;line-height: 20px;background-color: #fff;color:#6673F2"></el-button>
            </el-tooltip>
          </template>
        </my-table>
      </div>

      <div style="width: 48%;display: inline-block">
        <span >当前角色：</span>
        <my-table :table="tableDataDel">
          <template slot-scope="props" slot="button-operation">
            <el-tooltip effect="dark" content="删除" placement="top-start" >
              <el-button type="primary" @click="delUserRole()"  icon="el-icon-delete" style="width: 20px;height: 20px;line-height: 20px;background-color: #fff;color:#6673F2"></el-button>
            </el-tooltip>
          </template>
        </my-table>
      </div>
    </el-row>
  </section>
</template>

<script>
  import CarEnterpriseList from '../report/CarEnterpriseList'
  import SimList from '../report/SimList'
  import MyTable from '../../components/Table.vue';

  export default {
    name: "AssignRoles",
    components: {
      CarEnterpriseList,
      SimList,
      MyTable
    },
    data() {
      return {
        dialogVisible: false,
        conditions:{
          name: '',
          type: '2'
        },
        tableDataCan: {
          loading: false,
          hasSelect: false,
          data: [],
          columns: [
            {
              label: "权限名称",
              props: "roleName",
            },
            {
              label: "角色描述",
              props: "description",
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
        tableDataDel: {
          loading: false,
          hasSelect: false,
          data: [],
          columns: [
            {
              label: "角色名称",
              props: "roleName",
            },
            {
              label: "角色描述",
              props: "description",
            }
          ],
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label:"操作",
            data:[
            ]
          }
        }
      }
    },
    methods:{
      getSelectedCarEnterprise(row){
        this.dialogVisible = false;
        this.conditions.id = row.id;
        this.conditions.name = row.name;
        this.getUserRole();
      },
      getSelectedSim(row){
        this.dialogVisible = false;
        this.conditions.id = row.id;
        this.conditions.name = row.number;
        this.getUserRole();
      },
      getUserRole(){
        let params = {
          id : this.conditions.id,
          userType: this.conditions.type
        };
        this.$http.getUserRole(params).then((res) => {
          if (res.data.result){
            this.tableDataDel.data = res.data.result.current;
            this.tableDataCan.data = res.data.result.all;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      updateUserRole(row) {
        let params = {
          userId : this.conditions.id,
          userType: this.conditions.type,
          roleId: row.id
        };
        this.$http.updateUserRole(params).then((res) => {
          this.$message({
            message: res.data.result,
            type:"success",
          });
          this.getUserRole();
        }).catch(error => {
          console.log(error);
        });
      },
      delUserRole() {
        let params = {
          userId : this.conditions.id,
          userType: this.conditions.type,
        };
        this.$confirm('确定删除此角色，删除后此用户将不担任任何角色?', '提示', {
          type: 'warring',
        }).then(() => {
          this.$http.delUserRole(params).then((res) => {
            this.$message({
              message: res.data.result,
              type:"success",
            });
            this.getUserRole();
          }).catch(error => {
            console.log(error);
          });
        })

      }
    }
  }
</script>

<style scoped>

</style>
