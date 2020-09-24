<template>
    <section>
        <el-form :model="conditions" size="small" class="addRole">
            <el-form-item label="角色名称">
                <el-input v-model="conditions.roleName" placeholder="请输入角色名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="角色类型">
                <el-select v-model="conditions.roleType" filterable placeholder="请选择角色类型" @change="changeAppEnv" size="small">
              <span v-for="option in options" :key="option.value">
                <el-option :label="option.text" :value="option.value.toString()"></el-option>
              </span>
                </el-select>
            </el-form-item>
            <el-form-item label="描述信息">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="conditions.description">
                </el-input>
            </el-form-item>
        </el-form>
        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="addRole">确定</el-button>-->
        <!--</span>-->

    </section>
</template>

<script>
    export default {
        name: "AddRole",
        data(){
            return {
                operationName: '新增用户',
                option: '',
                options:[{
                    value:"1",
                    text:"运营商",
                },{
                    value:"2",
                    text:"车企",
                }],
                conditions: {
                    roleName: '',
                    roleType: '',
                    description: '',
                },
                condition:''

            }
        },
        methods:{
            addRole(){
                let params = {
                    roleName: this.conditions.roleName,
                    roleType: this.conditions.roleType,
                    description: this.conditions.description
                };
                this.$http.addRole(params).then((res) => {
                    if ("success" == res.data.result) {
                        this.$message({
                            message:"角色添加成功",
                            type:"success",
                        });
                        this.conditions.roleName = '';
                        this.conditions.roleType = '';
                        this.conditions.description = '';
                        this.$emit('refreshRole','success');
                        return "success";
                    } else {
                        this.$message({
                            message:"角色添加失败",
                            type:"error",
                        });
                        return "error";
                    }
                }).catch(err => {
                    console.log('err',err);
                    return "error";
                });
            },
            changeAppEnv(){
                console.log(this.conditions.roleName);
            }
        }
    }
</script>

<style>
    .addRole{
        padding: 10px;
        margin: 0 auto;
        width: 300px;
    }

    .addRole .el-form-item .el-form-item__content{
        margin-right: 40px;
        height: 32px;
        width: 400px !important;
    }
</style>
