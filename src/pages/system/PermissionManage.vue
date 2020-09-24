<template>
    <section>
        <!-- 查询条件 -->
        <el-col :span="24" class="toolbar">
            <el-row>
                <el-form :inline="true" :model="conditions" size="small">
                    <el-form-item label="权限名称">
                        <el-input v-model="conditions.permissionName" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                    <el-form-item style="float:right">
                        <el-button type="primary" @click="queryPermissInfo()"> 查询</el-button>
                        <el-button type="primary" @click="addPermissView = true"> 新增</el-button>
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
                <span>{{formatPermissType(props.obj.row.roleType)}}</span>
            </template>
            <template slot-scope="props" slot="button-operation">
                <el-tooltip effect="dark" content="授权" placement="top-start">
                    <el-button type="primary" @click="updatePermiss(props.obj.$index, props.obj.row)"
                               icon="el-icon-edit"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除" placement="top-start">
                    <el-button type="danger" @click="delPermiss(props.obj.row.id)" icon="el-icon-delete"></el-button>
                </el-tooltip>
            </template>
        </c-table>

        <!--对话框-->
        <el-dialog :title="title" :visible.sync="addPermissView" width="50%">
            <el-form :inline="true" :model="formdata" ref="modForm" size="small"
                     style="padding-top: 20px;padding-left: 10px" >
                <el-form-item label="权限名称" prop="permissionName">
                    <el-input v-model="formdata.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="description">
                    <el-input type="textarea" v-model="formdata.description"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;width: 100%;padding-top: 10px">
                    <el-button @click="addPermissView = false">取 消</el-button>
                    <el-button type="primary" @click="addPermiss">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :title="title1" :visible.sync="rolePermissionView" width="80%" :close-on-click-modal="false">
            <permission-entity ref="PermissionEntity" :permissId='permissId' v-if="rolePermissionView"></permission-entity>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rolePermissionView = false">取 消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import CTable from '../../components/Table.vue';
    import CSelect from '../../components/Select.vue';
    import CarEnterpriseUpdate from "./CarEnterpriseUpdate";
    import PermissionEntity from "./PermissionEntity";

    export default {
        name: "RoleManage",
        components: {
            CTable,
            CSelect,
            CarEnterpriseUpdate,
            PermissionEntity,
        },
        data() {
            return {
                conditions: {
                    permissionName: "",
                },
                formdata: {
                    permissionName: "",
                    description: "",
                },
                permissId: '',
                title: '添加权限',
                title1: '权限授权',
                addPermissView: false,
                rolePermissionView: false,
                tableData: {
                    loading: false,
                    hasSelect: false,
                    data: [],
                    columns: [
                        {
                            label: "权限名称",
                            props: "permissionName"
                        },
                        {
                            label: "权限类型",
                            props: "type",
                        },
                        {
                            label: "创建时间",
                            props: "createTime"
                        }
                    ],
                    hasOperation: true,
                    hasOperationTemplate: true,
                    operation: {
                        label: "操作",
                        data: []
                    }
                },
            }
        },
        methods: {
            queryPermissInfo() {
                let params = {
                    permissionName: this.conditions.permissionName
                };
                this.$http.getPermission(params).then((res) => {
                    this.tableData.data = res.data.result;
                    for(var i = 0 ; i< this.tableData.data.length;i++){
                        this.tableData.data[i].type = "菜单";
                    }
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            refreshPerimiss() {
                this.queryPermissInfo();
                this.addPermissView = false;
            },
            addPermiss() {
                let params = {
                    permissionName: this.formdata.permissionName,
                    description: this.formdata.description,
                    permissionType: this.formdata.permissionType
                };
                this.$http.addPermission(params).then((res) => {
                    if ("success" == res.data.result) {
                        this.$message({
                            message:"权限添加成功",
                            type:"success",
                        });
                        this.formdata.permissionName = '';
                        this.formdata.description = '';
                        this.formdata.permissionType = '';
                        this.refreshPerimiss();
                    } else {
                        this.$message({
                            message:"权限添加失败",
                            type:"error",
                        });
                        return "error";
                    }
                }).catch(err => {
                    console.log('err',err);
                    return "error";
                });
            },

            updatePermiss(index,row){
                this.rolePermissionView = true;
                this.permissId = row.id;
            },
            delPermiss(id) {
                let params = {
                    id: id
                };
                this.$http.delPermission(params).then((res) => {
                    if ("success" == res.data.result) {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                        this.queryPermissInfo();
                    } else {
                        this.$message({
                            message: "删除失败",
                            type: "error",
                        });
                    }
                }).catch(err => {
                    console.log('err', err);
                });

            },
        },
        mounted() {
            this.queryPermissInfo();
        }
    }
</script>

<style scoped>

</style>
