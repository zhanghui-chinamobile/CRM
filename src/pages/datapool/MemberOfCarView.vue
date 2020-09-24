<template>
    <section>
        <el-row class="toolbar">
            <el-form :model="condition" :inline="true" ref="simForm" size="small" class="toolbar">
                <el-form-item label="手机号码:">
                    <el-input v-model="condition.number" style="width: 250px" placeholder="请输入手机号码"/>
                </el-form-item>
              <el-button style="float: right;margin-right: 10px" type= "primary" @click="getUserMemberDataPoolList">查询</el-button>
              <el-button style="float: right;margin-right: 10px" type= "primary" @click="addMemberAction()" >确定添加</el-button>
            </el-form>
        </el-row>
        <el-row>
            <my-table :table="tableData" :tableEvents="tableEvents" @onHandleSelectionChange="handSelect"/>
        </el-row>
        <div style="clear: both;"></div>
    </section>
</template>

<script>
    import MyTable from '../../components/Table.vue'
    export default {
        name: "MemberOfCarView",
        components:{
            MyTable
        },
        data: function () {
            return {
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "sim卡",
                            props: "simid",
                        }, {
                            label: "车主手机号码",
                            props: "number",
                        }
                    ],
                    hasSelect:true
                },
                tableEvents: {
                    rowDbClick: this.selectUser
                },
                condition:{
                    instDataId:this.parentInstDataId,
                    number:''
                },
                addMemberInfo:{
                    userIds:[],
                }
            }
        },
        created(){
            this.getUserMemberDataPoolList();
        },
        props: {
            parentInstDataId:'',
            closeDialog:''
        },
        methods: {
            getUserMemberDataPoolList() {
                this.tableData.loading = true;
                this.$http.getUserByCcIdAndDataId(this.condition).then((res) => {
                    this.tableData.data = res.data.result;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            selectUser(row, event){
                this.$emit('dealSelectRow',row);
            },
            addMemberAction(){
                let params = {
                    userIds:this.addMemberInfo.userIds,
                    instDataId:this.condition.instDataId
                }
                this.$http.addDataPoolMember(params).then(res =>{
                    this.$notify({
                        title: "添加成员成功",
                        type: 'success',
                        duration: 3000
                    })
                    this.closeDialog();
                })
            },
            handSelect(rows){
                if(rows){
                    rows.forEach(item =>{
                        this.addMemberInfo.userIds.push(item.id)
                    })
                }
            }
        }
    }
</script>

<style>
</style>
