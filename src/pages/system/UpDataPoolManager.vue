<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" ref="conditionForm" size="small" style="padding-top: 20px;padding-left: 10px">
                <el-form-item label="车企" v-if="userInfo.userType==1">
                    <el-input v-model="conditions.userName" style="width: 250px" @focus="userDialogVisible=true" placeholder="请选择车企"/>
                </el-form-item>
                <el-form-item label="流量池" prop="type">
                    <el-input v-model="conditions.dataPoolName" style="width: 250px" @focus="dataPoolDialogVisible=true" placeholder="请选择流量池"/>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" @click="orderDataPoolDialogVisible=true">订购流量池</el-button>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" @click="queryUserInstData('conditionForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        已订购流量池列表：
        <my-table :table="tableData" :tableEvents="tableEvents"/>
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                           :current-page.sync="pageSync" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <el-dialog title="选择车企" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false">
            <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
        </el-dialog>
        <el-dialog title="选择流量池" :visible.sync="dataPoolDialogVisible" width="80%" :close-on-press-escape="false">
            <UpDataPoolList @dealSelectRow="getSelectedDataPool"></UpDataPoolList>
        </el-dialog>
        <el-dialog title="车企成员流量池使用情况" :visible.sync="userMemberDialogVisible" width="80%" :close-on-press-escape="false">
            <UserMemberDataPoolList v-if="userMemberDialogVisible" :userId="selectedId"/>
        </el-dialog>

        <el-dialog title="订购流量池" v-if="orderDataPoolDialogVisible" :visible.sync="orderDataPoolDialogVisible" width="40%" :close-on-press-escape="false">
            <OrderDataPool :closeOrderDialog="closeOrderDialog"></OrderDataPool>
        </el-dialog>



        <!--<el-table-column label="操作">-->
            <!--<template slot-scope="scope">-->
                <!--<el-button-->
                    <!--size="mini"-->
                    <!--type="danger"-->
                    <!--@click="handleDelete(scope.$index, scope.row)">成员管理</el-button>-->
            <!--</template>-->
        <!--</el-table-column>-->

    </section>
</template>

<script>
    import CarEnterpriseList from '../report/CarEnterpriseList';
    import UpDataPoolList from './UpDataPoolList';
    import MyTable from '../../components/Table.vue'
    import OrderDataPool from '../datapool/OrderDataPool'
    import UserMemberDataPoolList from './UserMemberDataPoolList'
    import CreateDataPool from '../datapool/CreateDataPool'

    export default {
        name: "UpDataPoolManager",
        components:{
            CarEnterpriseList,
            UpDataPoolList,
            MyTable,
            OrderDataPool,
            UserMemberDataPoolList,
            CreateDataPool
        },
        data(){
            return {
                userDialogVisible:false,
                dataPoolDialogVisible:false,
                orderDataPoolDialogVisible:false,
                userMemberDialogVisible:false,
                selectedId: 0,
                conditions:{
                    userId: '',
                    userName: '',
                    dataPoolId: '',
                    dataPoolName: ''
                },
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "车企名称",
                            props: "userName",
                        },
                        {
                            label: "流量池名称",
                            props: "dataPoolName",
                        },
                        {
                            label: "使用流量",
                            props: "usedData",
                        },
                        {
                            label: "总流量",
                            props: "total",
                        },
                        {
                            label: "流量单位",
                            props: "unit",
                        },
                        {
                            label: "生效时间",
                            props: "effDate",
                        },
                        {
                            label: "失效时间",
                            props: "expDate",
                        },
                    ],
                },
                tableEvents: {
                    rowDbClick: this.showUserMemberDataPool
                },
                page: 0,
                pageSync: this.page + 1,
                total: 0
            }
        },
        computed: {
          userInfo() {
            return this.$store.getters.userInfo;
          }
        },
        methods:{
            getSelectedCarEnterprise(row){
                this.userDialogVisible = false;
                this.conditions.userId = row.id;
                this.conditions.userName = row.name;
            },
            getSelectedDataPool(row){
                this.dataPoolDialogVisible = false;
                this.conditions.dataPoolId = row.id;
                this.conditions.dataPoolName = row.name;
            },
            queryUserInstData() {
                this.pagesync = 1;
                this.page = this.pagesync - 1;
                this.getUserInstDataList();
            },
            getUserInstDataList(){
                const data = {
                    userId: this.conditions.userId,
                    dataPoolId: this.conditions.dataPoolId
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.$http.getUserDataPoolList(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getUserInstDataList();
            },
            showUserMemberDataPool(row, event) {
                // this.$emit('dealSelectRow', row);
                console.log(row.id);
                this.selectedId = row.id;
                this.userMemberDialogVisible = true;
            },
            closeOrderDialog(){
                this.orderDataPoolDialogVisible = false;
                this.queryUserInstData();
            }
        },
      created() {
          if (this.userInfo.userType == 2){
            this.conditions.userId = this.userInfo.id;
            this.conditions.userName = this.userInfo.nickname;
          }
      },
        mounted(){
            this.queryUserInstData('conditionForm')
        }
    }
</script>

<style scoped>

</style>
