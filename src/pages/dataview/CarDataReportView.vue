<template>
    <section>
        <el-row class="toolbar">
            <el-col :span="24">
                <el-form ref="qryCondition" :inline="true" :model="tableData.qryCondition" size="small">
                    <el-form-item size="small" label="车企:">
                        <el-input placeholder="请选择车企" v-model="tableData.qryCondition.userName" @focus="setDialogTableVisible(true)">
                        </el-input>
                    </el-form-item>

                    <el-form-item size="small" label="分类">
                        <el-select v-model="tableData.qryCondition.discriminate" @change="clearUserInfo" placeholder="请选择分类">
                            <el-option label="apn" value="1"></el-option>
                            <el-option label="serivce_code" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item size="small" label="时间:">
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
                    <el-form-item size="small" style="float: right">
                        <el-button type="primary" htmlType='submit' @click="getViewData()">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="toolbar" style="padding-top: 30px">
            <data-char-view :parentViewData="parentViewData"></data-char-view>
        </el-row>
        <el-dialog title="查询车企" :visible.sync="dialogTableVisible" style="text-align: left;" width="70%">
            <car-enterprise-list @dealSelectRow="getSelectedCarEnterprise"></car-enterprise-list>
        </el-dialog>
    </section>
</template>

<script>
    import DataCharView from "./DataCharView"
    import CarEnterpriseList from '../report/CarEnterpriseList'
    export default {
        name: "CarDataReportView",
        components: {
            DataCharView,CarEnterpriseList
        },
        methods:{
            //调用借口查询数据
            getViewData(){
              if(this.tableData.qryCondition.userName == 'MINI'){
                this.parentViewData = this.$http.static_data_up_down(0,this.tableData.qryCondition.discriminate);
              }else if(this.tableData.qryCondition.userName == '雪佛兰'){
                this.parentViewData = this.$http.static_data_up_down(100,this.tableData.qryCondition.discriminate);
              }else{
                this.parentViewData = this.$http.static_data_up_down_empty
              }
              /*if(this.tableData.qryCondition.discriminate === "1"){
                this.parentViewData = this.$http.dataCharView;
              }else{
                this.parentViewData = this.$http.dataCharView2;
              }*/
            },
            setReportData(data){

                this.parentViewData = this.$http.dataCharView;
            },
            //设置dialog是否可见
            setDialogTableVisible(visitable){
                this.dialogTableVisible = visitable;
            },
            openDialog(objId){
                this.setDialogTableVisible(true);
            },
            closeDialog(){
                this.setDialogTableVisible(false);
            },
            //获取查询条件
            getQryParams(){
                return this.tableData.qryCondition;
            },
            //接口数据和行数据映射
            getSelectData(type) {
                this.$http.getSelectData(type).then(res => {
                    this.selectData.options = res.data.result;
                });
            },
            getSelectedCarEnterprise(row){
                this.dialogTableVisible = false;
                this.tableData.qryCondition.userId = row.id;
                this.tableData.qryCondition.userName = row.name;
                //this.tableData.qryCondition.userName = row.userName;


            },
          clearUserInfo(){

          }
        },
        created(){
            this.getViewData()
        },
        //数据模型
        data(){
            return {
                tableData:{
                    qryCondition:{
                        userId:'',
                        discriminate:"1",
                        startTime:'',
                        endTime:'',
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
        }
    }
</script>

<style scoped>

</style>
