<template>
    <div>
        <el-alert title="根据流量池名称进行模糊查询" type="info" show-icon></el-alert>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" size="small">
                <el-form-item label="流量池名称">
                    <el-input v-model="conditions.name" placeholder="请输入流量池名称关键字" size="small"></el-input>
                </el-form-item>
                <el-button type="primary" @click="queryDataPool" style="float: right">查询</el-button>
            </el-form>
        </el-col>
        <my-table :table="tableData" :tableEvents="tableEvents"/>
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                           :current-page.sync="pageSync" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <div style="clear: both;"></div>
    </div>
</template>

<script>
    import MyTable from '../../components/Table.vue'
    export default {
        name: "UpDataPoolList",
        components: {
            MyTable
        },
        data: function () {
            return {
                conditions: {
                    name: '',
                },
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "流量池名称",
                            props: "name",
                        }, {
                            label: "总流量",
                            props: "total",
                        }, {
                            label: "流量单位",
                            props: "unit",
                        }, {
                            label: "生效时间",
                            props: "effectiveTime",
                        }, {
                            label: "失效时间",
                            props: "expireTime",
                        },
                    ],
                },
                tableEvents: {
                    rowDbClick: this.selectDataPool
                },
                page: 0,
                pageSync: this.page + 1,
                total: 0
            }
        },
        methods: {
            queryDataPool() {
                this.pagesync = 1;
                this.page = this.pagesync - 1;
                this.getDataPoolList();
            },
            getDataPoolList() {
                let data = {
                    name: this.conditions.name,
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.tableData.loading = true;
                this.$http.getDataPoolList(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getDataPoolList();
            },
            selectDataPool(row, event) {
                this.$emit('dealSelectRow', row);
            },
        }
    }
</script>

<style scoped>

</style>
