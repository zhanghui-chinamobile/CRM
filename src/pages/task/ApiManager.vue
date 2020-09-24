<template>
    <!-- 查询条件 -->
    <section>
      <el-dialog :title="title" :visible.sync="selectCarApiVisible" width="80%" height="1000px" :close-on-click-modal="true">
        <el-col  class="toolbar" >
          <el-form :inline="true" :model="selectCarconditions"  ref="selectCarconditions" size="small" style="padding-top: 20px;padding-left: 10px">
            <el-form-item label="车企名称">
              <el-input v-model="selectCarconditions.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryAllCars">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <c-table :table="selectCartableData" :tableEvents="tableEvents">
          <!--<template slot-scope="props" slot="button-operation">
            <el-tooltip effect="dark" content="选择" placement="top-create_time" >
              <el-button type="primary" @click="choseCarEnter(props.obj.row)"  size="mini"> 选择</el-button>
            </el-tooltip>
          </template>-->
        </c-table>

        <!-- 分页查询 -->
      <!--  <el-col :span="24" class="toolbar">
          <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChangeSelectCar"   :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
          </el-pagination>
        </el-col>-->
     <!--   <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancelSelectCar('selectCarconditions')">取消</el-button>
          <el-button @click="copySubmitSelectCar" type="primary">确定</el-button>
        </div>-->
      </el-dialog>
        <el-col :span="24" class="toolbar" >
            <el-form :inline="true" :model="conditions" ref="conditions" size="small"  style="padding-top: 20px;padding-left: 10px" :rules="rules">
                <el-form-item label="" prop="vehiclesName">
                  <el-button type="primary" @click="queryCars">查询车企</el-button>

                    <el-input :disabled="true" v-model="conditions.vehiclesName" placeholder="请选择车企" ref="inputVehiclesName"></el-input>
                </el-form-item>
              <el-form-item label="API编码">
                <el-input v-model="conditions.apiCode" placeholder="请输入API编码" ></el-input>
              </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" @click="queryVehicles">查询</el-button>
                    <el-button type="primary"  @click="addBindApi">绑定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-dialog title="提示" :visible.sync="newValidateVisible"  append-to-body>
            <span style="font-family:楷体;font-size: 15px;" >请先查询车企，才可新增API！
            </span>
        </el-dialog>
        <!-- 绑定信息列表 -->
        <c-table :table="tableData">
            <!-- api编码 -->
            <template slot-scope="props" slot="code">
        <span>
          <span style="font-family:楷体;font-size: 15px;">{{ props.obj.row.code }}</span>
        </span>
            </template>
            <!-- api类型 -->
            <template slot-scope="props" slot="type">
        <span>
          <span style="font-family:楷体; font-size: 15px;">{{ formatType(props.obj.row.type) }}</span>
        </span>
            </template>
            <!-- 状态 -->
            <template slot-scope="props" slot="apiStatus">
        <span>
          <span style="font-family:楷体;font-size: 15px;">{{ bindStateTagType(props.obj.row.apiStatus) }}</span>
        </span>
            </template>
            <!-- 格式化密钥 -->
            <template slot-scope="props" slot="apiKey">
                <span style="font-family:楷体;font-size: 15px;" @click="viewkey(props.obj.row)">{{ props.obj.row.apiKey.length <= 5 ? props.obj.row.apiKey :props.obj.row.apiKey.substring(0,5) + "***" }}</span>
                <el-dialog title="密钥信息" :visible.sync="keyVisible" :close-on-click-modal="false">
                    <span style="font-family:楷体;font-size: 15px;" >密钥：  {{keyShowValue}}</span>
                </el-dialog>
            </template>
            <!-- 格式化生效时间 -->
            <template slot-scope="props" slot="effTime">
                <span>{{props.obj.row.effTime}}</span>
            </template>
            <!-- 格式化失效时间 -->
            <template slot-scope="props" slot="expTime">
                <span>{{props.obj.row.expTime}}</span>
            </template>
            <!-- 按钮的操作 -->
            <template slot-scope="props" slot="button-operation">
                　　<el-button type="primary" @click="modifyBind(props.obj.row)">修改</el-button>
                　　<el-button type="primary" @click="removeBind(props.obj.row)">解绑</el-button>
            </template>
        </c-table>
        <!-- 分页查询 -->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="queryVehicles"   :current-page.sync="bindpagesync" :page-size="10" :total="bindtotal" style="float:right;">
            </el-pagination>
        </el-col>
        <el-dialog :title="title" :visible.sync="modifyApiVisible" width="80%" height="1000px" :close-on-click-modal="true">
            <el-col :span="24" class="toolbar" >
                <el-form :inline="true" :model="modifyconditions" ref="modifyconditions"  size="small" style="padding-top: 20px;padding-left: 10px">
                    <el-form-item label="生效时间">
                        <el-date-picker
                            v-model="modifyconditions.startTime"
                            type="datetime"
                            align="right"
                            unlink-panels
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :picker-options="pickerOptions" :close-on-click-modal="true" close-on-press-escape="true">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="失效时间">
                        <el-date-picker
                            v-model="modifyconditions.endTime"
                            type="datetime"
                            align="right"
                            unlink-panels
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :picker-options="pickerOptions"  :close-on-click-modal="true" close-on-press-escape="true">
                        </el-date-picker>
                    </el-form-item>
                    <!--   <el-form-item>
                         <el-button type="primary" @click="queryReviewedTask">确定</el-button>
                       </el-form-item>-->
                </el-form>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancelMoidfy('apiconditions')">取消</el-button>
                <el-button @click="copySubmitModify" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="addApiVisible" width="80%" height="1000px" :close-on-click-modal="true">
            <el-col  class="toolbar" >
                <el-form :inline="true" :model="apiconditions"  ref="apiconditions" size="small" style="padding-top: 20px;padding-left: 10px">
                    <el-form-item label="API 类型">
                        <c-select :select="typeSelectData" v-model="apiconditions.type"/>
                    </el-form-item>
                    <el-form-item label="API 编码">
                        <el-input v-model="apiconditions.code" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryAllApis">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <c-table :table="apitableData"  ref="itemTable"  @onHandleSelectionChange="getCopyItemRow">
                <template slot-scope="props" slot="type">
             <span>
            <b>{{ formatType(props.obj.row.type) }}</b><br/>
                 <!--   <span style="font-family:楷体">{{ props.obj.row.apitype }}</span>-->
          </span>
                </template>
                <template slot-scope="props" slot="code">
          <span>
            <b>{{ props.obj.row.code }}</b><br/>
              <!--<span style="font-family:楷体">{{ props.obj.row.apicode }}</span>-->
          </span>
                </template>
                <template slot-scope="props" slot="version">
          <span>
            <b>{{ props.obj.row.version }}</b><br/>
              <!-- <span style="font-family:楷体">{{ props.obj.row.apiversion }}</span>-->
          </span>
                </template>
                <template slot-scope="props" slot="params">
                    <span style="font-family:楷体;font-size: 15px;" @click="viewApiParam(props.obj.row)">{{ props.obj.row.params.length <= 5 ? props.obj.row.params :props.obj.row.params.substring(0,5) + "***" }}</span>
                </template>
            </c-table>
            <el-dialog title="API参数" :visible.sync="apiParamVisible"  append-to-body>
            <span style="font-family:楷体;font-size: 15px;" >API参数：  {{apiParamShowValue}}
            </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="timeValidateVisible"  append-to-body>
            <span style="font-family:楷体;font-size: 15px;" >生失效时间不能未空！
            </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="selectValidateVisible"  append-to-body>
            <span style="font-family:楷体;font-size: 15px;" >请勾选要绑定的API！
            </span>
            </el-dialog>

            <!-- 分页查询 -->
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"   :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
                </el-pagination>
            </el-col>
            <el-col :span="24" class="toolbar" >
                <el-form :inline="true" :model="apiconditions" ref="apiconditions"  size="small" style="padding-top: 20px;padding-left: 10px">
                    <el-form-item label="生效时间">
                        <el-date-picker
                            v-model="apiconditions.startTime"
                            type="datetime"
                            align="right"
                            unlink-panels
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :picker-options="pickerOptions" :close-on-click-modal="true" close-on-press-escape="true">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="失效时间">
                        <el-date-picker
                            v-model="apiconditions.endTime"
                            type="datetime"
                            align="right"
                            unlink-panels
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :picker-options="pickerOptions"  :close-on-click-modal="true" close-on-press-escape="true">
                        </el-date-picker>
                    </el-form-item>
                    <!--   <el-form-item>
                         <el-button type="primary" @click="queryReviewedTask">确定</el-button>
                       </el-form-item>-->
                </el-form>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel('apiconditions')">取消</el-button>
                <el-button @click="copySubmit" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {timestampToFullDate} from "../../common/date";
    import CTable from '../../components/Table.vue';
    import CSelect from '../../components/Select.vue';
    import {mapMutations} from 'vuex';
    import types from "../../store/mutation-types";

    export default {
        components: {
            CTable,
            CSelect,
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
              form: {
                mingcheng: cheqi.mingcheng,
                zhizhao: cheqi.zhizhao,
                lianxi: cheqi.lianxi,
                phone: cheqi.phone,
                zhanghao: cheqi.zhanghao,
                mima: cheqi.mima,
                state: cheqi.state,
              },
                typeSelectData: {
                    options:[
                        {
                            value:"1",
                            text:"实时",
                        },{
                            value:"2",
                            text:"文件",
                        },
                        {
                            value:"3",
                            text:"同步",
                        },{
                            value:"4",
                            text:"异步",
                        }
                    ],
                    clearable:true,
                    placeholder:"请选择API类型",
                },
                apiconditions: {
                enterpriseId: '',
                code: '',
                type:'',
                startTime:'',
                endTime: ''
              },
              selectCarconditions: {
                name: ''
              },
                modifyconditions: {
                    apiRelId: '',
                    enterpriseId: '',
                    startTime:'',
                    endTime: ''
                },
                title:'',
                pickerOptions:'',
                conditions: {
                    vehiclesName: '',
                    apiCode:'',
                    apiType:'',
                    taskState: ''
                },
                bindpage: 0,
                bindpagesync:this.bindpage+1,
                bindtotal: 0,


                page: 0,
                disabled:false,
                pagesync:this.page+1,
                total: 0,
                addApiVisible:false,
                keyVisible:false,
                keyShowValue:"",
                apiParamShowValue:"",
                apiParamVisible:false,
              selectCarApiVisible:false,
                timeValidateVisible:false,
                selectValidateVisible:false,
                newValidateVisible:false,
                modifyApiVisible:false,
                vehiclesId:"",
                rules: {
                    vehiclesName: [{required: true, message: '车企信息不能为空', trigger: 'blur' }],
                },
                apitableData: {
                    loading:false,
                    hasSelect:true,
                    data:[
                    ],
                    columns:[
                        /* {
                           label:"API ID",
                           props:"id",
                         },*/
                        {
                            label:"API编码",
                            props:"code",
                        },
                        {
                            label:"API类型",
                            props:"type",
                            show:true
                        },
                        {
                            label:"API版本",
                            props:"version",
                        },
                        {
                            label:"API参数(可点击查看详情)",
                            props:"params",
                            show:true
                        }


                    ],
                    hasOperation:false,
                    hasOperationTemplate:false

                },
              selectCartableData: {
                loading: false,
                hasSelect: false,
                data: [],
                columns: [
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
                    props: "effectiveDate",
                  },
                  {
                    label: "失效时间",
                    props: "expireDate",
                  }
                ],
                /*hasOperation: true,
                hasOperationTemplate: true,
                operation: {
                  label:"操作",
                  data:[
                  ]
                }*/
              },
              tableEvents: {
                rowDbClick: this.choseCarEnter
              },
                tableData: {
                    loading:false,
                    hasSelect:false,
                    data:[],
                    columns:[
                        {
                            label:"API编码",
                            props:"code",
                            show:true
                        },
                        {
                            label:"API类型",
                            props:"type",
                            show: true,
                            width: 150
                        },
                        {
                            label:"状态",
                            props:"apiStatus",
                            show:true,
                            width:120
                        },
                        {
                            label:"生效时间",
                            props:"effTime",
                            show:true,
                            width:170
                        },
                        {
                            label:"失效时间",
                            props:"expTime",
                            show:true,
                            width:170
                        },
                        {
                            label:"密钥（可点击查看详情）",
                            props:"apiKey",
                            show: true,
                            width: 120
                        }
                    ],
                    hasOperation: true,
                    hasOperationTemplate: true,
                    operation: {
                        label:"操作",
                        id:"1",
                        data:[
                        ]
                    }
                }
            };
        },

        computed: {
        },
        methods: {
          choseCarEnter(row){
            this.conditions.vehiclesName=row.name;
            this.selectCarApiVisible = false;

          },
          queryCars(){
            this.selectCarApiVisible=true;
          },
            queryAllApis(){
                this.pagesync=1;
                this.page=this.pagesync-1;
                this.getAllApis();
            },
          queryAllCars(){
            this.pagesync=1;
            this.page=this.pagesync-1;
            this.getAllsCars();
          },

         formatType(type) {
            if (type == "1") {
              return "实时";
            } else if (type == "2") {
              return "文件";
            } else if (type == "3") {
              return "同步";
            } else if (type == "4") {
              return "异步";
            }
         },

            copySubmitModify() {
                if(this.modifyconditions.startTime!=''&&this.modifyconditions.endTime!=''){
                    let params = {
                        startTime: this.modifyconditions.startTime,
                        endTime: this.modifyconditions.endTime,
                        id:this.modifyconditions.apiRelId
                    };
                    this.$http.modifyCarApiRels(params).then(res => {
                        this.$message({
                            message: res.data.result,
                            type: 'success'
                        });
                        this.modifyApiVisible = false;
                        this.apitableData.data = [];
                        this.apitableData.loading = false;
                        this.queryVehicles();
                    }).catch(err => {
                        console.log('err', err);
                    });
                }else{
                    this.timeValidateVisible=true;

                }
            },

          copySubmitSelectCar() {
        if (this.mulSelection.length > 0) {
          let apiIds = [];
          for (let i in this.mulSelection) {
            apiIds.push(this.mulSelection[i].id);
          }
          let params = {
            startTime: this.apiconditions.startTime,
            endTime: this.apiconditions.endTime,
            apiIds: apiIds,
            enterpriseId: this.apiconditions.enterpriseId
          };

          this.$http.saveCarApiRels(params).then(res => {
            this.$message({
              message: res.data.result,
              type: 'success'
            });
            this.mulSelection = [];
            this.$refs.itemTable.clearSelection();
            this.selectCarconditions.name = "";
            this.selectCarApiVisible = false;
            this.selectCartableData.data = [];
            this.selectCartableData.loading = false;
            this.apiconditions.enterpriseId="";
          }).catch(err => {
            console.log('err', err);
          });
        }else{
          this.selectValidateVisible=true;
        }
    },
            copySubmit() {
                if(this.apiconditions.startTime!=''&&this.apiconditions.endTime!=''){
                    if (this.mulSelection.length > 0) {
                        let apiIds = [];
                        for (let i in this.mulSelection) {
                            apiIds.push(this.mulSelection[i].id);
                        }
                        let params = {
                            startTime: this.apiconditions.startTime,
                            endTime: this.apiconditions.endTime,
                            apiIds: apiIds,
                            enterpriseId: this.apiconditions.enterpriseId
                        };

                        this.$http.saveCarApiRels(params).then(res => {
                            this.$message({
                                message: res.data.result,
                                type: 'success'
                            });
                            this.mulSelection = [];
                            this.$refs.itemTable.clearSelection();
                            this.apiconditions.type = "";
                            this.apiconditions.code = "";
                            this.addApiVisible = false;
                            this.apitableData.data = [];
                            this.apitableData.loading = false;
                            this.apiconditions.enterpriseId="";
                            this.queryVehicles();
                        }).catch(err => {
                            console.log('err', err);
                        });
                    }else{
                        this.selectValidateVisible=true;
                    }
                }else{
                    this.timeValidateVisible=true;

                }
            },
            handleSubmit(formName) {
                const data = this.apiconditions;
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.$http.saveCarApiRel(data).then(res => {
                            this.addApiVisible = false;
                            this.getApps();
                            this.$message({
                                message: res.data.result,
                                type: 'success',
                            });
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                })
            },
            getCopyItemRow(val) {
                this.mulSelection = val;
            },
            getAllApis() {
                // let timeArray = this.apiconditions.time;
                let data = {
                    code: this.apiconditions.code,
                    type: this.apiconditions.type,
                    enterpriseId: this.apiconditions.enterpriseId
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 20,
                    data: data,
                };
                this.apitableData.loading = true;
                this.$http.queryAllApis(params).then((res) => {
                    /* debugger;
                     console.log(res);*/
                    this.total = res.data.result.count;
                    this.apitableData.data = res.data.result.entities;
                    /*   if (data.length == 1) {
                         if (data[0].enterpriseId !='' && data[0].enterpriseId > 0 && (data[0].code == ''&& data[0].code == null)){
                           this.total = 0;
                           this.apitableData.data = [];
                           this.apiconditions.enterpriseId = data.enterpriseId;
                           return;
                         }
                       }*/
                    this.apitableData.loading = false;
                }).catch(() => {
                    this.apitableData.loading = false;
                });
            },
          getAllsCars() {
            this.selectCartableData.data=[];
            // let timeArray = this.apiconditions.time;
            let data = {
              name: this.selectCarconditions.name,
            };
            let params = {
              currentPage: 0,
              pageSize: 1000,
              data: data,
            };
            this.selectCartableData.loading = true;
            this.$http.getCarEnterpriseList(params).then((res) => {
              /* debugger;
               console.log(res);*/
              //this.total = res.data.result.count;
              this.selectCartableData.data = res.data.result.entities;
              /*   if (data.length == 1) {
                   if (data[0].enterpriseId !='' && data[0].enterpriseId > 0 && (data[0].code == ''&& data[0].code == null)){
                     this.total = 0;
                     this.apitableData.data = [];
                     this.apiconditions.enterpriseId = data.enterpriseId;
                     return;
                   }
                 }*/
              this.selectCartableData.loading = false;
            }).catch(() => {
              this.selectCartableData.loading = false;
            });
          },
            handleCancelSelectCar(formName) {
                this.$refs[formName].resetFields();
                this.selectCarconditions.name="";
                this.selectCarApiVisible = false;
            },
            handleCancelMoidfy(formName) {
                this.modifyApiVisible = false;
            },
            timestampToFullDate(value) {
                return timestampToFullDate(value)
            },
            bindStateTagType(bindState) {
                switch(bindState){
                    case 1:
                        return '正常';
                    default:
                        return '删除';
                }
            },
            queryVehicles(){
                if (this.conditions.vehiclesName.length <= 0) {
                    this.$message.warning(`车企信息不能为空`);
                    this.$refs.inputVehiclesName.focus();
                    return;
                }
                this.bindpagesync=1;
                this.bindpage=this.bindpagesync-1;
                //this.getReviewedTask();
                this.getApiByVehicles();
            },

            getApiByVehicles() {
                this.tableData.data = [];
                let data = {
                    enterpriseName: this.conditions.vehiclesName,
                    code: this.conditions.apiCode
                };
                let params = {
                    currentPage: this.bindpage,
                    pageSize: 10,
                    data: data
                };
                this.tableData.loading = true;
                this.$http.getApiByVehicles(params).then((res) => {
                    this.bindtotal = res.data.result.count;
                    this.tableData.data = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(() => {
                    this.tableData.loading = false;
                });
            },



            addBindApi(row) {
                if(this.tableData.data.length>0){
                    this.addApiVisible = true;
                    this.title='API绑定';
                    this.disabled=false;
                    this.apiconditions.enterpriseId = this.tableData.data[0].enterpriseId;
                    this.apitableData.data = [];
                    this.apitableData.startTime='';
                    this.apitableData.endTime='';
                }else{
                    this.newValidateVisible=true;
                }

            },
            modifyBind(row) {
                this.modifyconditions.apiRelId=row.id;
                this.modifyconditions.startTime=row.effTime;
                this.modifyconditions.endTime=row.expTime;
                this.modifyApiVisible = true;
                this.title='API修改';
                this.disabled=false;
            },
            removeBind(row){
                let params = {
                    enterpriseId: row.enterpriseId,
                    id: row.id
                };
                this.$http.removeBind(params).then(res => {
                    this.$message({
                        message: res.data.result,
                        type: 'success'
                    });
                    this.apiconditions.type = "";
                    this.apiconditions.code = "";
                    this.addApiVisible = false;
                    this.apitableData.data = [];
                    this.apitableData.loading = false;
                    this.queryVehicles();
                }).catch(err => {
                    console.log('err', err);
                });
            },

            viewkey(row) {
                this.keyVisible=true;
                this.keyShowValue=row.apiKey;
            },
            viewApiParam(row) {
                this.apiParamVisible=true;
                this.apiParamShowValue=row.params;
            },

            getReviewedTask() {
                this.bindtotal = 1;
                this.tableData.data = [
                    {
                        code:'编码',
                        type:'类型',
                        effTime: '2018-11-14',
                        expTime: '2099-12-31',
                        status:1,
                        key:'AAAAA',
                        operation:''
                    }
                ];
                this.tableData.loading = false;
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.queryAllApis();
            },

          handleCurrentChangeSelectCar(currentPage) {
      this.page = currentPage - 1;
      this.queryAllCars();
    },

            ...mapMutations({
                setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
            }),
        },
        mounted() {
            let itmes = [
                {
                    name:"API管理",
                    icon:"fa fa-tasks",
                    path:"",
                },
            ];
            this.setBreadcrumbItems(itmes);
            //this.getReviewedTask();
        },
    }
</script>
<style scoped>
</style>
