<template>
    <el-row>
        <div style="width: 48%;display: inline-block;padding-top: 10px;vertical-align: top;">
            <span style="font-size: 15px;background-color: #fff;border-radius: 3px;padding: 5px;line-height: 30px">可添加菜单：</span>
            <c-table :table="tableDataCan">
                <template slot-scope="props" slot="id">
                    <span style="display: none">{{props.obj.row.id}}</span>
                </template>
                <template slot-scope="props" slot="button-operation">
                    <el-tooltip effect="dark" content="添加" placement="top-start" >
                        <el-button type="primary" @click="addPermissionEntityRel(props.obj.$index, props.obj.row)"  icon="fa fa-plus-square-o" style="width: 20px;height: 20px;line-height: 20px;background-color: #fff;color:#6673F2"></el-button>
                    </el-tooltip>
                </template>
            </c-table>
        </div>

        <div style="width: 48%;display: inline-block;padding-top: 10px; ;vertical-align: top;">
            <span style="font-size: 15px;background-color: #fff;border-radius: 3px;padding: 5px;line-height: 30px">已添加菜单：</span>
            <c-table :table="tableDataDel">
                <template slot-scope="props" slot="id">
                    <span style="display: none">{{props.obj.row.id}}</span>
                </template>
                <template slot-scope="props" slot="button-operation">
                    <el-tooltip effect="dark" content="删除" placement="top-start" >
                        <el-button type="primary" @click="delPermissionEntityRel(props.obj.$index, props.obj.row)"  icon="el-icon-delete" style="width: 20px;height: 20px;line-height: 20px;background-color: #fff;color:#6673F2"></el-button>
                    </el-tooltip>
                </template>
            </c-table>
        </div>
    </el-row>
</template>

<script>
    import CTable from '../../components/Table.vue';
    export default {
        name: "PermissionEntity",
        components: {
            CTable
        },
        props: {
            permissId : '',
        },
        data(){
            return{
                tableDataCan: {
                    loading: false,
                    hasSelect: false,
                    data: [],
                    columns: [
                        {
                            label: "id",
                            props: "permissionId",
                            width:'0'
                        },
                        {
                            label: "菜单名称",
                            props: "menuName",
                        },
                        {
                          label: "菜单描述",
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
                    data: [ ],
                    columns: [
                        {
                            label: "id",
                            props: "id",
                            show:true,
                            width:"0px"
                        },
                        {
                            label: "菜单名称",
                            props: "menuName",
                        },
                      {
                        label: "菜单描述",
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
        methods: {
            queryPermissionEntity(){
                let params = {
                    id : this.permissId
                };
                this.$http.getPermissionEntityRel(params).then((res) => {
                    this.tableDataDel.data = res.data.result;
                    this.tableDataDel.loading = false;
                }).catch(error => {
                    this.tableDataDel.loading = false;
                    console.log(error);
                });

                this.$http.getNoPermissionEntityRel(params).then((res) => {
                    this.tableDataCan.data = res.data.result;
                    this.tableDataCan.loading = false;
                }).catch(error => {
                    this.tableDataCan.loading = false;
                    console.log(error);
                });

            },
            addPermissionEntityRel(index, row) {
                let params = {
                    permissionId : this.permissId,
                    entityId : row.id,
                    description:row.menuName
                };
                this.$http.addPermissionEntityRel(params).then((res) => {
                    let result = res.data.result;
                    if(result == "success") {
                        this.$message({
                            message:"赋权成功",
                            type:"success",
                        });
                        this.queryPermissionEntity();
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

            delPermissionEntityRel(index, row) {
                let params = {
                    id : row.id
                };
                this.$http.delPermissionEntityRel(params).then((res) => {
                    let result = res.data.result;
                    if(result == "success") {
                        this.$message({
                            message:"删除成功",
                            type:"success",
                        });
                        this.queryPermissionEntity();
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
            this.queryPermissionEntity();
        }

    }
</script>

<style scoped>

</style>
