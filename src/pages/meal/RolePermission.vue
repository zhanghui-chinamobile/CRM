<template>
  <el-row>
    <el-col>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <span>可添加权限</span>
    </div>
    <c-table :table="tableDataCan">
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="授权" placement="top-start" >
          <el-button type="primary" @click="updateRole(props.obj.$index, props.obj.row,'update')"  icon="el-icon-edit" circle></el-button>
        </el-tooltip>
      </template>
    </c-table>
  </el-card>
    <el-card class="box-card1" >
      <div slot="header" class="clearfix">
        <span>已添加权限</span>
      </div>
      <c-table :table="tableDataDel">
        <template slot-scope="props" slot="button-operation">
          <el-tooltip effect="dark" content="删除" placement="top-start" >
            <el-button type="primary" @click="updateRole(props.obj.$index, props.obj.row,'update')"  icon="el-icon-edit" circle></el-button>
          </el-tooltip>
        </template>
      </c-table>
    </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import CTable from '../../components/Table.vue';
  export default {
        name: "RolePermission",
      components: {
        CTable
      },
        data(){
          return{
            tableDataCan: {
              loading: false,
              hasSelect: false,
              data: [{
                roleName: '管理员',
                roleType: '系统角色',
              }],
              columns: [
                {
                  label: "角色名称",
                  props: "roleName",
                },
                {
                  label: "角色类型",
                  props: "roleType",
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
              data: [{
                roleName: '管理员',
                roleType: '车企',
              },{
                roleName: '管理员',
                roleType: '运营商',
              }
              ],
              columns: [
                {
                  label: "角色名称",
                  props: "roleName",
                },
                {
                  label: "角色类型",
                  props: "roleType",
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
        }

    }
</script>

<style scoped>
.box-card{
  float: left;
  width: 50%;
  height: 100%;
}
.box-card1{
  width: 50%;
  height: 100%;
}
</style>
