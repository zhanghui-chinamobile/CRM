<template>
    <section>
        <el-row class="toolbar">
          <i class="el-icon-download" style="float: right;margin-right: 10px"><a  href="/static/excel/批量添加成员.xlsx">模板</a></i>
            <el-upload
                style="float: right;margin-right: 10px"
                class="upload-demo"
                :on-change="handleChange"
                :auto-upload="false"
                :show-file-list="false"
                :action="123">
                <el-button size="small" type="primary" style="width: 100px">批量导入成员</el-button>
            </el-upload>
            <el-button style="float: right;margin-right: 10px" type="primary"  @click="addMemberDialogVisible=true">添加成员</el-button>

        </el-row>
        <el-row>
            <my-table :table="tableData"/>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                               :current-page.sync="pageSync" :page-size="10" :total="total" style="float:right;">
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog title="添加成员" v-if="addMemberDialogVisible" :visible.sync="addMemberDialogVisible" width="50%" :close-on-press-escape="false" append-to-body>
            <MemberOfCarView :parentInstDataId="userId" :closeDialog="closeAddMemberDialog"></MemberOfCarView>
        </el-dialog>
        <div style="clear: both;"></div>
    </section>
</template>

<script>
    import MyTable from '../../components/Table.vue'
    import MemberOfCarView from '../datapool/MemberOfCarView'
    import XLSX from 'xlsx'
    export default {
        name: "UserMemberDataPoolList",
        components: {
            MyTable,
            MemberOfCarView
        },
        data: function () {
            return {
                addMemberDialogVisible:false,
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "sim卡",
                            props: "simId",
                        }, {
                            label: "车主手机号码",
                            props: "number",
                        }, {
                            label: "使用的流量",
                            props: "usedData",
                        }, {
                            label: "流量单位",
                            props: "unit",
                        },
                    ],
                },
                page: 0,
                pageSync: this.page + 1,
                total: 0,
                fileList:[]
            }
        },
        created(){
            this.getUserMemberDataPoolList();
        },
        props: {
            userId: {
                type: Number,
                required: true
            },
        },
        methods: {
            getUserMemberDataPoolList() {
                let data = {
                    userId: this.userId,
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.tableData.loading = true;
                this.$http.getUserMemberDataPoolList(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getUserMemberDataPoolList();
            },
            handleChange(file) {
                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    try {
                        const data = ev.target.result;
                        const workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        let sheetArray;
                        for (let sheet in workbook.Sheets) {
                            sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                            break;
                        }
                        let params = {
                            simIds:[],
                            instDataId:this.userId
                        }
                        for(let i = 0 ;i < sheetArray.length ;i++){
                            params.simIds.push(sheetArray[i]['sim卡号'])
                        }
                        this.addMemBer(params);
                    }catch (e) {
                        this.$message.warning('文件类型不正确！');
                        return false;
                    }
                };
                fileReader.readAsBinaryString(file.raw)
            },
            addMemBer(params){
                this.$http.addDataPoolMemberBySimId(params).then(res =>{
                    this.$notify({
                        title: "添加成员成功",
                        type: 'success',
                        duration: 3000
                    })
                    this.getUserMemberDataPoolList();
                })

            },
            closeAddMemberDialog(){
                this.addMemberDialogVisible =false;
                this.getUserMemberDataPoolList();
            }
        }
    }
</script>

<style scoped>

</style>
