<template>
    <section>
        <el-alert title="根据手机号码进行模糊查询，在返回的车主列表中双击选中的行选择车主" type="info" show-icon></el-alert>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" size="small">
                <el-form-item label="手机号码">
                    <el-input v-model="conditions.number" placeholder="请输入手机号码" size="small"></el-input>
                </el-form-item>
                <el-button type="primary" @click="querySimList" style="float: right">查询</el-button>
            </el-form>
        </el-col>
        <my-table :table="tableData" :tableEvents="tableEvents">
            <template slot-scope="props" slot="status">
                <span>{{ formatStatus(props.obj.row.status) }}</span>
            </template>
        </my-table>
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
        name: "SimLidealSelectRowst",
        components: {
            MyTable
        },
        data() {
            return {
                conditions: {
                    number: '',
                },
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "Sim卡号",
                            props: "simid",
                        },
                        {
                            label: "手机号码",
                            props: "number",
                        },
                        {
                            label: "sim卡状态",
                            props: "status",
                            show:true
                        },
                        {
                            label: "用户名称",
                            props: "userName",
                        },
                    ],
                },
                tableEvents: {
                    rowDbClick: this.selectSim
                },
                page: 0,
                pageSync: this.page + 1,
                total: 0
            }
        },
        methods: {
            querySimList() {
                this.pagesync = 1;
                this.page = this.pagesync - 1;
                this.getSimList();
            },
            getSimList() {
                let data = {
                    number: this.conditions.number,
                };
                if (this.userInfo.userType==2){
                  data.ccId = this.userInfo.id;
                }
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.tableData.loading = true;
                this.$http.getSimList(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getSimList();
            },
            selectSim(row, event) {
                this.$emit('dealSelectRow', row);
            },
            formatStatus(type) {
                switch (type) {
                    case 0:
                        return "销毁";
                    case 1:
                        return "正常";
                    case 2:
                        return "暂停";
                    case 3:return "预激活"
                    case 4: return "已回收"
                    default:
                        return "未知";
                }
            }
        },
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      },
      created() {
        if (this.userInfo.userType == 2){
          this.conditions.id = this.userInfo.id;
          this.conditions.name = this.userInfo.nickname;
        }
      }
    }
</script>

<style scoped>

</style>
