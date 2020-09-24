<template>
    <section>
      <div v-show="!showInfoAuth">
        <el-col :span="24" class="toolbar">
            <el-row>
                <el-form :inline="true" :model="conditions" size="small">
                    <el-form-item label="营业执照">
                        <el-input v-model="conditions.license" placeholder="请输入营业执照"></el-input>
                    </el-form-item>
                    <el-form-item label="车企名称">
                        <el-input v-model="conditions.name" placeholder="请输入车企名称"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right;padding-left: 10px">
                        <el-button type="primary" @click="queryCarEnterpriseList" size="mini"> 查询</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-col>

        <!-- 信息列表 -->
        <c-table :table="tableData">
            <template slot-scope="props" slot="status">
              <el-tag size="medium" :type="tagType(props.obj.row.status)">{{ formatStatus(props.obj.row.status) }}</el-tag>
            </template>
            <template slot-scope="props" slot="ext1">
                <el-tag size="medium" :type="tagType(props.obj.row.ext1)">{{ realNameState(props.obj.row.ext1) }}</el-tag>
            </template>
            <template slot-scope="props" slot="button-operation">
                <el-tooltip effect="dark" content="认证" placement="top-create_time">
                    <el-button :type="realNameButtonType(props.obj.row.ext1)" @click="rAccountSe(props.obj.row)" :disabled="realNameButtonState(props.obj.row.status, props.obj.row.ext1)">
                        {{realNameButton(props.obj.row.ext1)}}</el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="实名信息变更" placement="top-create_time" v-if="props.obj.row.ext1 === 1">
                  <el-button type="success" @click="changeAuthInfo(props.obj.row)">
                    变更</el-button>
                </el-tooltip>
            </template>

        </c-table>
        <!-- 分页查询 -->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next"
                           :current-page.sync="pagesync" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
      </div>
      <div v-if="showInfoAuth">
        <CarInfoAuth :enterprise-info="curEnterpriseInfo" @returnParent="showQuery"></CarInfoAuth>
      </div>
    </section>
</template>


<script>
    import CTable from '../../../components/Table.vue';
    import CSelect from '../../../components/Select.vue';
    import {mapGetters, mapMutations} from 'vuex';
    import types from "../../../store/mutation-types";
    import CarInfoAuth from  "../../../pages/carOwner/carInfoAuth2"

    export default {
        name: "carenterprisemanage",
        components: {
            CTable,
            CSelect,
          CarInfoAuth
        },
        props: {
            CarEnterpriseInfo: {},
            Type: "",
            isShowOperButton:true,
        },
        data() {
            var cheqi = {
                mingcheng:'',
                zhizhao:'',
                lianxi:'',
                phone:'',
                zhanghao:'',
                mima:'',
                state:'',
                id:''
            }
            return {
                conditions: {
                    license: '',
                    name: ''
                },
                showInfoAuth: false,
                curEnterpriseInfo:{},
                showOperButton:true,
                disabled: false,
                userLoading: false,
                addCarEnterpriseVisible: false,
                modifyCarEnterpriseVisible:false,
                modInfoVisible: false,
                operationTitle:"",
                info: {},
                title: "车企新增",
                page: 0,
                pagesync: this.page + 1,
                total: 0,
                tableData: {
                    loading: false,
                    hasSelect: false,
                    data: [],
                    columns: [
                        {
                            label: "车企名称",
                            props: "name",
                        },
                        {
                            label: "登录账号",
                            props: "loginNo",
                        },
                      {
                        label: "营业执照",
                        props: "license",
                      },
                        {
                            label: "法人代表",
                            props: "contactName",
                        },
                        {
                            label: "联系方式",
                            props: "contactPhone",
                        },
                        {
                            label: "状态",
                            props: "status",
                            show: true
                        },
                        {
                            label: "认证状态",
                            props: "ext1",
                            show: true,
                        },
                        {
                            label: "开户时间",
                            props: "effectiveDate",
                        },
                        {
                            label: "失效时间",
                            props: "expireDate",
                        }
                    ],
                    hasOperation: true,
                    hasOperationTemplate: true,
                    operation: {
                        label:"操作",
                        data:[
                        ]
                    }
                },
            }
        },
        methods: {
            rAccountSe(data) {
                if(data.ext1 == 1){
                    this.$confirm('确定解除该帐号绑定?', '提示', {
                        type: 'warring',
                    }).then(() => {
                      let params = {
                        id: data.id
                      };
                        this.$http.cancelTie(params).then(res => {
                            this.$message({
                                message: res.data.result,
                                type: 'success',
                            });
                            this.getCarEnterpriseList();
                        }).catch(err => {
                            console.log('err', err);
                        });
                    })
                } else if(data.ext1 == 0){
                    /*this.$router.push({
                        path:"/info-auth",
                        name: "车企实名认证", //必须,不然参数传不过去
                        params:{
                            name:data.name,
                            contactName:data.contactName,
                            contactPhone:data.contactPhone
                        }
                    });*/
                    this.curEnterpriseInfo = data;
                    this.showInfoAuth = true;
                }
            },
            changeAuthInfo(data){
              this.curEnterpriseInfo = data;
              this.showInfoAuth = true;
            },
            tagType(status) {
                return status === 1 ? "success" : status === 0 ? "danger" : "warning";
            },
            realNameState(state){
                return state === 1 ? "已认证" : state === 0 ? "未认证" : "审核中";
            },
            realNameButton(state){
                return state === 1 ? "解绑" : state === 0 ? "实名" : "等待";
            },
            formatStatus(status) {
              return status === 1 ? "有效" : "失效";
            },
            realNameButtonState(status, state){
              return status === 0 || state === 2;
            },
            realNameButtonType(state){
                return state === 1 ? "danger" : state === 0 ? "primary" : "primary";
            },
            choseCarEnter(row){
                this.$emit("choseCar",row);
            },
            queryCarEnterpriseList() {
                this.pagesync = 1;
                this.page = this.pagesync - 1;
                this.getCarEnterpriseList();

            },
            appendToList(str) {
                alert(str);
                //this.addCarEnterpriseVisible=false;

            },
            getCarEnterpriseList() {
                let data = {
                    license: this.conditions.license,
                    name: this.conditions.name
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.tableData.loading = true;
                this.$http.getCarEnterpriseList(params).then((res) => {
                    console.log(res)
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            addCarEnter() {
                this.addCarEnterpriseVisible = true;
                this.title = "车企新增";
            },
            updateCarEnter(row){
                this.modifyCarEnterpriseVisible = true;
                this.formdata.id=row.id;
                this.formdata.zhizhao = row.license;
                this.formdata.mingcheng=row.name;
                this.formdata.lianxi=row.contactName;
                this.formdata.phone=row.contactPhone;
                this.formdata.zhanghao=row.loginNo;
                this.formdata.state=row.status;
                this.formdata.mima=row.password;
                this.formdata.logo = row.logo?row.logo:'/static/img/car-logo/car.png';
                this.title = "车企修改";
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getCarEnterpriseList();
            },
            timestampToENDate1(value) {
                return timestampToENDate(value)
            },
            showQuery(type){
              this.getCarEnterpriseList();
              this.showInfoAuth = false;
            },
            ...
                mapMutations({
                    setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
                }),
        },
        created() {
            if(this.isShowOperButton != undefined){
                this.showOperButton = this.isShowOperButton;
            }else {
                this.showOperButton = true;
            }
            let itmes = [
                {
                    name: "车企管理",
                    icon: "fa fa-windows",
                    path: "/system/carenterprisemanage",
                },
            ];
            this.setBreadcrumbItems(itmes);
            this.queryCarEnterpriseList();
        },
    }
</script>

<style scoped lang="less">
    .logo {
        width:auto;
        height: 30px;
    }
    .selectLogo {
        padding-top: 2px;
        padding-bottom: 2px;
    }
    .selectLogo :hover{
        background-color: white;
    }
</style>
