<template>
    <!-- 查询条件 -->
    <section>
      <div v-show="!showInfoAuth">
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" size="small">
                <!--<el-form-item label="成员名称">
                    <el-input v-model="conditions.name" placeholder="请输入成员名称"></el-input>
                </el-form-item>-->
                <el-form-item label="手机号码">
                    <el-input v-model="conditions.phoneNumber" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="SIM卡号">
                    <el-input v-model="conditions.simNumber" placeholder="请输入sim卡号"></el-input>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" @click="queryMember">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- 用户列表 -->
        <c-table :table="tableData" id="userList">
            <template slot-scope="props" slot="status">
                <el-tag size="medium" :type="tagType(props.obj.row.status)">{{ simState(props.obj.row.status) }}</el-tag>
            </template>
            <template slot-scope="props" slot="relNameFlag">
                <el-tag size="medium" :type="tagType(props.obj.row.relNameFlag)">{{ realNameState(props.obj.row.relNameFlag) }}</el-tag>
            </template>
            <template slot-scope="props" slot="efftime">
                <span>{{timestampToENDate1(props.obj.row.efftime)}}</span>
            </template>
            <template slot-scope="props" slot="exptime">
                <span>{{timestampToENDate1(props.obj.row.exptime)}}</span>
            </template>
            <template slot-scope="props" slot="button-operation">
                <el-tooltip effect="dark" content="认证" placement="top-create_time">
                    <el-button :type="realNameButtonType(props.obj.row.relNameFlag)" @click="rAccountSe(props.obj.row)" :disabled="realNameButtonState(props.obj.row.status,props.obj.row.relNameFlag)">
                        {{realNameButton(props.obj.row.relNameFlag)}}</el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="实名信息变更" placement="top-create_time" v-if="props.obj.row.relNameFlag === 1">
                  <el-button type="success" @click="changeAuthInfo(props.obj.row)">
                    变更</el-button>
                </el-tooltip>
            </template>
        </c-table>
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                           :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
      </div>
      <div v-if="showInfoAuth">
        <info-auth :sim-info="curSimInfo" @returnParent="showQuery"></info-auth>
      </div>
    </section>
</template>

<script>
    import {timestampToENDate} from "../../../common/date";
    import CTable from '../../../components/Table.vue';
    import CSelect from '../../../components/Select.vue';
    import InfoAuth from "../../../pages/carOwner/infoAuth";
    import FileSaver from 'file-saver';
    import XLSX from 'xlsx'


    export default {
        components: {
          CTable,
          CSelect,
          InfoAuth
        },
        data() {
            return {
                conditions: {
                    name: '',
                    phoneNumber: '',
                    simNumber: ''
                },
                showInfoAuth: false,
              curSimInfo:{},
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
                    columns: [
                        /*{
                            label: "成员名称",
                            props: "userName",
                        }
                        ,*/
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
                        },
                        {
                            label: "实名状态",
                            props: "relNameFlag",
                            show: true,
                        },
                        {
                          label: "真实姓名",
                          props: "realName",
                        },
                        {
                          label: "车牌号",
                          props: "carNumber",
                        },
                        {
                            label: "生效时间",
                            props: "efftime",
                            show: true,
                        }, {
                            label: "失效时间",
                            props: "exptime",
                            show: true
                        }
                    ],
                    hasOperation: true,
                    hasOperationTemplate: true,
                    operation: {
                        label:"操作",
                        data:[
                        ]
                    },
                    data: [],
                }
            };
        },
        methods: {
            rAccountSe(data) {
                if(data.relNameFlag == 1){
                    this.$confirm('确定解除该帐号绑定?', '提示', {
                        type: 'warring',
                    }).then(() => {
                        this.$http.removeAuthInfo(data).then(res => {
                            this.$message({
                                message: res.data.result,
                                type: 'success',
                            });
                            this.queryMember();
                        }).catch(err => {
                            console.log('err', err);
                        });
                    })
                }else if(data.relNameFlag == 0){
                    // this.$router.push({
                    //     path:"/authInfo",
                    //     name: "实名认证", //必须,不然参数传不过去
                    //     params:{name:data.userName,number:data.number}
                    // });
                  this.curSimInfo = data;
                  this.showInfoAuth = true;
                }
            },
            changeAuthInfo(data){
              this.curSimInfo = data;
              this.showInfoAuth = true;
            },
            updateUserEnter(data){

            },
            timestampToENDate1(value) {
                return timestampToENDate(value)
            },
            queryMember() {
                this.getUsers();
            },
            getUsers() {
                let data = {
                    name: this.conditions.name,
                    phoneNumber: this.conditions.phoneNumber,
                    simNumber: this.conditions.simNumber
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
                this.$http.getUsers(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(() => {
                    this.tableData.loading = false;
                });
            },

            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getUsers();
            },
            simState(status) {
                return status === 1 ? "有效" : status === 0 ? "失效" : "待审核";
            },
            realNameState(state){
                return state === 1 ? "已认证" : state === 0 ? "未认证" : "审核中";
            },
            realNameButton(state){
                return state === 1 ? "解绑" : state === 0 ? "实名" : "等待";
            },
            realNameButtonState(status, state){
                return status === 0 || state === 2;
            },
            realNameButtonType(state){
                return state === 1 ? "danger" : state === 0 ? "primary" : "primary";
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
            showQuery(){
              this.queryMember();
                this.showInfoAuth = false;
            }
        },
        computed: {
            userInfo() {
                return this.$store.getters.userInfo;
            }
        },
        created() {
          this.queryMember();
        }
    }
</script>
<style scoped>
</style>
