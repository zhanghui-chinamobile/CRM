<template>
    <!-- 查询条件 -->
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" size="small">
                <el-form-item label="车企" v-if="userInfo.userType==1">
                  <el-input v-model="conditions.enterpriseName" style="width: 250px" @focus="selectEnterpriseVisible=true" placeholder="请选择车企"/>
                </el-form-item>
                <!--<el-form-item label="成员名称">-->
                    <!--<el-input v-model="conditions.name" placeholder="请输入成员名称"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="手机号码">
                    <el-input v-model="conditions.phoneNumber" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="SIM卡号">
                    <el-input v-model="conditions.simNumber" placeholder="请输入sim卡号"></el-input>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" @click="queryMember">查询</el-button>
                    <el-button type="success" @click="exportCSV">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- 用户列表 -->
        <c-table :table="tableData" id="userList">
            <template slot-scope="props" slot="status">
                <el-tag size="medium" :type="tagType(props.obj.row.status)">{{ simState(props.obj.row.status) }}</el-tag>
            </template>
            <template slot-scope="props" slot="efftime">
                <span>{{timestampToENDate1(props.obj.row.efftime)}}</span>
            </template>
            <template slot-scope="props" slot="exptime">
                <span>{{timestampToENDate1(props.obj.row.exptime)}}</span>
            </template>
            <template slot-scope="props" slot="button-operation">
              <el-button style="width: 60px;" type="danger" @click="removeBind(props.obj.row)">解除绑定</el-button>
              <el-button style="width: 60px;" type="primary"  v-if="userInfo.userType==1" @click="changeBind(props.obj.row)">变更绑定</el-button>
            </template>

        </c-table>
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                           :current-page.sync="pagesync" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <el-dialog title="选择车企" :visible.sync="selectEnterpriseVisible" width="80%" :close-on-press-escape="false" append-to-body>
          <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
        </el-dialog>
        <el-dialog title="选择需要变更的车企" :visible.sync="selectTargetEnterpriseVisible" width="80%" :close-on-press-escape="false" append-to-body>
          <CarEnterpriseList @dealSelectRow="getTargetEnterprise"></CarEnterpriseList>
        </el-dialog>
    </section>
</template>

<script>
    import {timestampToENDate} from "../../common/date";
    import CTable from '../../components/Table.vue';
    import CSelect from '../../components/Select.vue';
    import FileSaver from 'file-saver';
    import XLSX from 'xlsx'
    import CarEnterpriseList from '../report/CarEnterpriseList';


    export default {
        components: {
            CTable,
            CSelect,
          CarEnterpriseList
        },
        data() {
            return {
                selectEnterpriseVisible: false,
                selectTargetEnterpriseVisible:false,
              changeUserId: 0,
                conditions: {
                    enterpriseName: '',
                    ccId: 0,
                    name: '',
                    phoneNumber: '',
                    simNumber: ''
                },
                tempData: [],

                page: 0,
                pagesync: this.page + 1,
                total: 0,

                selectData: {
                    options: [
                        {
                            value: "1",
                            text: "有效",
                        }, {
                            value: "0",
                            text: "失效",
                        },
                        {
                            value: "2",
                            text: "待审核",
                        }
                    ],
                    clearable: true,
                    placeholder: "请选择sim卡状态",
                },

                tableData: {
                    loading: false,
                    hasSelect: false,
                    hasOperation: true,
                    hasOperationTemplate: true,
                    operation: {
                      label: "操作",
                      id: "1",
                      data: []
                    },
                    columns: [
                        // {
                        //     label: "成员名称",
                        //     props: "userName",
                        // },
                        {
                            label: "sim卡号",
                            props: "simid",
                        }, {
                            label: "手机号码",
                            props: "number",
                        }, {
                            label: "sim卡状态",
                            props: "status",
                            show: true,
                        }, {
                            label: "生效时间",
                            props: "efftime",
                            show: true,
                        }, {
                            label: "失效时间",
                            props: "exptime",
                            show: true
                        }
                    ],
                    data: [],
                }
            };
        },
        methods: {
            timestampToENDate1(value) {
                return timestampToENDate(value)
            },
            queryMember() {
                this.getUsers();
            },
            getSelectedCarEnterprise(row){
              this.selectEnterpriseVisible = false;
              this.conditions.ccId = row.id;
              this.conditions.enterpriseName = row.name;
              this.getUsers();
            },
            getUsers() {
                let data = {
                    name: this.conditions.name,
                    phoneNumber: this.conditions.phoneNumber,
                    simNumber: this.conditions.simNumber,
                    ccId: this.conditions.ccId
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.tableData.loading = true;
                this.$http.getUsers(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(() => {
                    this.tableData.loading = false;
                });
            },
            exportCSV() {
                let wb = XLSX.utils.table_to_book(document.querySelector('#userList'));
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                try { FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户列表.csv'); }
                catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) };
                $Message.warning("导出成功");
                return wbout;
            },

            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getUsers();
            },
            simState(status) {

              switch (status){
                case 1:
                  return "测试期";
                case 0:
                  return "已销户";
                case 2:
                  return "已暂停";
                case 3:
                  return "预激活";
                case 4:
                  return "已回收";
              }
            },
            tagType(status) {
                return status === 1 ? "success" : status === 0 ? "danger" : "warning";
            },
            buttonType(status) {
                return status === 1 ? "danger" : status === 0 ? "info" : "success";
            },
            buttonText(status) {
                return status === 1 ? "注销" : status === 0 ? "激活" : "审核";
            },
            removeBind(row){
              this.$confirm('确定解除该用户与车企的绑定?', '提示', {
                type: 'warring',
              }).then(() => {
                let params = {
                  operationType: 2,
                  id: row.id
                };
                this.$http.changeBind(params).then((res) => {
                  this.$message({
                    message: res.data.result,
                    type: "success",
                  });
                  this.getUsers();
                }).catch(error => {
                  console.log(error);
                });
              })
            },
            getTargetEnterprise(row){
              this.$confirm('确定要变更绑定到选择的车企?', '提示', {
                type: 'info',
              }).then(() => {
                let params = {
                  operationType: 1,
                  id: this.changeUserId,
                  ccId: row.id
                };
                this.$http.changeBind(params).then((res) => {
                  this.$message({
                    message: res.data.result,
                    type: "success",
                  });
                  this.selectTargetEnterpriseVisible = false;
                  this.getUsers();
                }).catch(error => {
                  console.log(error);
                });
              });
            },
            changeBind(row){
              this.changeUserId = row.id;
              this.selectTargetEnterpriseVisible = true;
            }
        },
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      },
      created() {
        if (this.userInfo.userType==2){
          this.conditions.ccId = this.userInfo.id;
        }
        this.getUsers();
      }
    }
</script>
<style scoped>
</style>
