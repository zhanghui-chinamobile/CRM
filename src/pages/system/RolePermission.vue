<template>
    <el-row>

        <div style="width: 48%;display: inline-block;vertical-align: top">
            <span style="font-size: 15px;background-color: #fff;border-radius: 3px;padding: 5px;line-height: 30px">可添加权限：</span>
            <c-table :table="tableDataCan">
                <template slot-scope="props" slot="id">
                    <span style="display: none">{{props.obj.row.id}}</span>
                </template>
                <template slot-scope="props" slot="button-operation">
                    <el-tooltip effect="dark" content="添加" placement="top-start" >
                        <el-button type="primary" @click="addRolePermissionRel(props.obj.$index, props.obj.row)"  icon="fa fa-plus-square-o" style="width: 20px;height: 20px;line-height: 20px;background-color: #fff;color:#6673F2"></el-button>
                    </el-tooltip>
                </template>
            </c-table>
        </div>

        <div style="width: 48%;display: inline-block;vertical-align: top">
            <span style="font-size: 15px;background-color: #fff;border-radius: 3px;padding: 5px;line-height: 30px">已添加权限：</span>
            <c-table :table="tableDataDel">
                <template slot-scope="props" slot="id">
                    <span style="display: none">{{props.obj.row.id}}</span>
                </template>
                <template slot-scope="props" slot="button-operation">
                    <el-tooltip effect="dark" content="删除" placement="top-start" >
                        <el-button type="primary" @click="delRolePermissionRel(props.obj.$index, props.obj.row)"  icon="el-icon-delete" style="width: 20px;height: 20px;line-height: 20px;background-color: #fff;color:#6673F2"></el-button>
                    </el-tooltip>
                </template>
            </c-table>
        </div>
    </el-row>
</template>

<script>
    import CTable from '../../components/Table.vue';
    export default {
        name: "RolePermission",
        components: {
            CTable
        },
        props: {
            roleId : '',
        },
        data(){
            return{
                conditions: {
                    roleName: '',
                    roleType: '',
                },
                tableDataCan: {
                    loading: false,
                    hasSelect: false,
                    data: [/*{
                roleName: '管理员1',
                roleType: '系统角色1',
              },
                {
                  roleName: '管理员2',
                  roleType: '系统角色2',
                }*/
                    ],
                    columns: [
                        {
                            label: "id",
                            props: "permissionId",
                            show:true,
                            width:'0'
                        },
                        {
                            label: "权限名称",
                            props: "permissionName",
                        },
                        {
                            label: "权限类型",
                            props: "permissionType",
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
                    data: [/*{
                roleName: '管理员3',
                roleType: '车企',
              },{
                roleName: '管理员4',
                roleType: '运营商',
              }*/
                    ],
                    columns: [
                        {
                            label: "id",
                            props: "sys_role_permission_rel_id",
                            show:true,
                            width:'0'
                        },
                        {
                            label: "权限名称",
                            props: "permissionName",
                        },
                        {
                            label: "权限类型",
                            props: "permissionType",
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
        methods: {
            queryRolePermission(){
                let params = {
                    /*roleName: this.conditions.roleName,
                    roleType: this.conditions.roleType*/
                    id : this.roleId
                };
                this.$http.getRolePermissionRel(params).then((res) => {
                    this.tableDataDel.data = res.data.result;
                    this.tableDataDel.loading = false;
                }).catch(error => {
                    //this.tableData.loading = false;
                    console.log(error);
                });

                this.$http.getNoRolePermissionRel(params).then((res) => {
                    this.tableDataCan.data = res.data.result;
                    this.tableDataCan.loading = false;
                }).catch(error => {
                    //this.tableData.loading = false;
                    console.log(error);
                });

            },
            addRolePermissionRel(index, row) {
                let params = {
                    roleId : this.roleId,
                    permissionId : row.id
                };
                this.$http.addRolePermissionRel(params).then((res) => {
                    let result = res.data.result;
                    if(result == "success") {
                        this.$message({
                            message:"赋权成功",
                            type:"success",
                        });
                        this.queryRolePermission();
                    } else {
                        this.$message({
                            message:"赋权失败",
                            type:"error",
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },

            delRolePermissionRel(index, row) {
                let params = {
                    roleId : this.roleId,
                    id : row.id
                };
                this.$http.delRolePermissionRel(params).then((res) => {
                    let result = res.data.result;
                    if(result == "success") {
                        this.$message({
                            message:"删除成功",
                            type:"success",
                        });
                        this.queryRolePermission();
                    } else {
                        this.$message({
                            message:"删除失败",
                            type:"error",
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });

            }


        },

        created() {
            this.queryRolePermission();
        }

    }
</script>

<style scoped>

</style>
