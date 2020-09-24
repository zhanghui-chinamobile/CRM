<template>
    <section>
        <el-alert title="根据营业执照和车企名称进行模糊查询，在返回的车企列表中双击选中的行选择车企" type="info" show-icon></el-alert>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" size="small">
                <el-form-item label="营业执照">
                    <el-input v-model="conditions.busiLicence" placeholder="请输入营业执照" size="small"></el-input>
                </el-form-item>
                <el-form-item label="车企名称">
                    <el-input v-model="conditions.name" placeholder="请输入车企名称" size="small"></el-input>
                </el-form-item>
                <el-button type="primary" @click="queryCarEnterpriseList" style="float: right">查询</el-button>
            </el-form>
        </el-col>
        <my-table :table="tableData" :tableEvents="tableEvents"></my-table>
        <!-- 分页查询 -->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                           :current-page.sync="pageSync" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <div style="clear: both;"></div>
    </section>
</template>

<script>
    import MyTable from '../../components/Table.vue'

    export default {
        name: "CarEnterpriseList",
        components: {
            MyTable
        },
        data() {
            return {
                conditions: {
                    busiLicence: '',
                    name: ''
                },
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "营业执照",
                            props: "license",
                        },
                        {
                            label: "车企名称",
                            props: "name",
                        },
                        {
                            label: "登录账号",
                            props: "loginNo",
                        },
                        {
                            label: "联系人",
                            props: "contactName",
                        },
                        {
                            label: "联系方式",
                            props: "contactPhone",
                        },
                        {
                            label: "状态",
                            props: "status",
                        },
                        {
                            label: "开户时间",
                            props: "createTime",
                        },
                        {
                            label: "失效时间",
                            props: "expireDate",
                        }
                    ],
                },
                tableEvents: {
                    rowDbClick: this.selectCarEnterprise
                },
                page: 0,
                pageSync: this.page + 1,
                total: 0
            }
        },
        methods: {
            queryCarEnterpriseList(){
                this.pagesync=1;
                this.page=this.pagesync-1;
                this.getCarEnterpriseList();
            },
            getCarEnterpriseList() {
                let data = {
                    license: this.conditions.busiLicence,
                    name: this.conditions.name
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.tableData.loading = true;
                this.$http.getCarEnterpriseList(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getCarEnterpriseList();
            },
            selectCarEnterprise(row, event){
                this.$emit('dealSelectRow',row);
            }
        },
      created() {
        this.getCarEnterpriseList();
      }

    }
</script>

<style scoped>

</style>
