<template>
    <section>
        <el-row class="toolbar">
            <el-col :span="24">
                <el-form ref="qryCondition" :inline="true" :model="tableData.qryCondition" size="small">

                    <el-form-item size="small" label="用户:">
                        <el-input placeholder="请选择用户" v-model="tableData.qryCondition.userName" @focus="setDialogTableVisible(true)" class="input-with-select">
                        </el-input>
                    </el-form-item>

                    <el-form-item size="small" label="分类">
                        <el-select v-model="tableData.qryCondition.discriminate"  placeholder="请选择分类">
                            <el-option label="apn" value="1"></el-option>
                            <el-option label="serivce_code" value="2"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item size="small" label="时间">
                        <el-date-picker
                            v-model="tableData.qryCondition.orderTime"
                            type="datetimerange"
                            :picker-options="orderPickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="float: right">
                        <el-button type="primary" htmlType='submit' size="small" @click="getViewData()">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="toolbar" style="padding-top: 30px">
            <all-char-view :parentViewData="parentViewData"></all-char-view>
        </el-row>
        <el-dialog title="查询sim卡" :visible.sync="dialogTableVisible" style="text-align: left;" width="70%">
            <sim-list @dealSelectRow="getSelectedCarEnterprise"></sim-list>
        </el-dialog>
    </section>
</template>

<script>
    import SimList  from '../report/SimList'
    import AllCharView from './AllCharView'
    import NewReport from './NewReport'
    export default {
        name: "CarView",
        components: {
            AllCharView,SimList,NewReport
        },
        methods:{
            clearUserInfo(){
                this.tableData.qryCondition.userName=''
                this.tableData.qryCondition.userId=''
            },
            //调用借口查询数据
            getViewData(){
              if(this.tableData.qryCondition.userName && this.tableData.qryCondition.userName.length > 0){
                this.parentViewData = this.$http.static_data(this.num,this.tableData.qryCondition.discriminate)
              }else{
                this.parentViewData =this.$http.empty_static_data;
              }
            },
            //设置dialog是否可见
            setDialogTableVisible(visitable){
                this.dialogTableVisible = visitable;
            },
            //获取查询条件
            getQryParams(){
                return {
                    data:this.qryCondition
                };
            },
            //接口数据和行数据映射
            getSelectData(type) {
                this.$http.getSelectData(type).then(res => {
                    this.selectData.options = res.data.result;
                });
            },
            getSelectedCarEnterprise(row){
              this.num+=100;
                this.dialogTableVisible = false;
                this.tableData.qryCondition.userId = row.id;
                if(row.name){
                    this.tableData.qryCondition.userName = row.name;
                }else if(row.userName){
                    this.tableData.qryCondition.userName = row.userName;
                }

            }
        },
        created(){
            this.getViewData()
        },
        //数据模型
        data(){
            return {
              num:100,
                tableData:{
                    qryCondition:{
                        userId:'',
                        apn:'',
                        discriminate:'1',
                        endTime:'',
                        userType:'2',
                        userName:''
                    },
                },
                parentViewData:{},
                dialogTableVisible:false,
                orderPickerOptions:{
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
    }
</script>

<style scoped>

</style>
