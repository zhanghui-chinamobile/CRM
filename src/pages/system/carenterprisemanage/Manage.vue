<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-row>
        <el-form :inline="true" :model="conditions" size="small">
          <el-form-item label="营业执照">
            <el-input v-model="conditions.license" placeholder="请输入营业执照" ></el-input>
          </el-form-item>
          <el-form-item label="车企名称">
            <el-input v-model="conditions.name" placeholder="请输入车企名称" ></el-input>
          </el-form-item>
          <el-form-item label="车企状态">
            <el-select v-model="conditions.status"  placeholder="请选择状态" >
              <el-option label="全部" value="-1"></el-option>
              <el-option v-for="item in queryItem"
                         :key="item.value"
                         :label="item.text"
                         :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;padding-left: 10px">
            <el-button type="primary" @click="queryCarEnterpriseList" size="mini"> 查询</el-button>
            <el-button type="primary" @click="addCarEnter" size="mini" v-if="showOperButton"> 新增</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>

    <!-- 信息列表 -->
    <c-table :table="tableData">
      <template slot-scope="props" slot="status">
        <span>{{formatType(props.obj.row.status)}}</span>
      </template>
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="修改" placement="top-create_time"  v-if="showOperButton">
          <el-button type="primary" @click="updateCarEnter(props.obj.row)"  size="mini"> 修改</el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="选择" placement="top-create_time" v-else>
            <el-button type="primary" @click="choseCarEnter(props.obj.row)"  size="mini"> 选择</el-button>
        </el-tooltip>
      </template>

    </c-table>
    <!-- 分页查询 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, prev, pager, next"
                     :current-page.sync="pagesync" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog :title="title" :visible.sync="addCarEnterpriseVisible" :rules="rules" width="60%" :close-on-click-modal="false" >

        <el-form :inline="true"   :model="form"  ref="addForm" size="small" style="padding-top: 20px;padding-left: 10px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车企名称" prop="mingcheng">
                <el-input v-model="form.mingcheng" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照" prop="zhizhao">
                <el-input v-model="form.zhizhao"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人"  prop="lianxi">
                <el-input v-model="form.lianxi"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式"  prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登录账号"  prop="zhanghao">
                <el-input v-model="form.zhanghao"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录密码" prop="mima">
                <el-input type="password" v-model="form.mima"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态"  prop="state">
                <el-select v-model="form.state"  placeholder="请选择状态">
                  <el-option label="在网" value="1" />
                  <el-option label="潜在" value="0"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车企LOGO">
                <img :src="userLogo" class="logo"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="toolbar">
            <el-col :span="4">
              <label>选择logo：</label>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="4" v-for="item in logoRow1" :key="item" class="selectLogo">
                  <img :src="item" class="logo"  @click="selectLogo(item, 1)"/>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" v-for="item in logoRow2" :key="item" class="selectLogo"  @click="selectLogo(item)">
                  <img :src="item" class="logo"  @click="selectLogo(item, 1)"/>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-form-item style="text-align: center;width: 100%">
              <el-button type="primary" @click="newInfo">新增</el-button>
          </el-form-item>
        </el-form>

    </el-dialog>
      <el-dialog title="车企修改" :visible.sync="modifyCarEnterpriseVisible"  width="60%" :close-on-click-modal="true" >

          <el-form :inline="true"   :model="formdata"  ref="modForm" size="small" style="padding-top: 20px;padding-left: 10px" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="车企名称" prop="mingcheng">
                  <el-input v-model="formdata.mingcheng" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照" prop="zhizhao">
                  <el-input v-model="formdata.zhizhao"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人"  prop="lianxi">
                  <el-input v-model="formdata.lianxi"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式"  prop="phone">
                  <el-input v-model="formdata.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登录账号"  prop="zhanghao">
                  <el-input v-model="formdata.zhanghao"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="登录密码" prop="mima">
                  <el-input  type="password" v-model="formdata.mima"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="状态"  prop="state">
                  <el-select v-model="formdata.state"  placeholder="请选择状态">
                      <el-option v-for="item in selectItem"
                                  :key="item.value"
                                  :label="item.text"
                                  :value="item.value">
                      </el-option>
                  </el-select>
                  <!--<el-input v-model="formdata.state" :value="form.state==1?'有效':'失效'"></el-input>-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车企LOGO">
                  <img :src="formdata.logo" class="logo"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toolbar">
              <el-col :span="4">
                <label>选择logo：</label>
              </el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="4" v-for="item in logoRow1" :key="item" class="selectLogo">
                    <img :src="item" class="logo"  @click="selectLogo(item, 2)"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" v-for="item in logoRow2" :key="item" class="selectLogo"  @click="selectLogo(item)">
                    <img :src="item" class="logo"  @click="selectLogo(item, 2)"/>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
              <el-form-item style="text-align: center;width: 100%">
                  <el-button type="primary" @click="updateInfo">确定</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>

   <!-- <el-dialog :title="title" :visible.sync="modInfoVisible" :close-on-click-modal="false" width="40%">
      <car-enterprise-update v-if="modInfoVisible === true" :CarEnterpriseInfo="info" :Type="type" @handleData="refreshData"></car-enterprise-update>
    </el-dialog>-->
  </section>
</template>


<script>
  import CTable from '../../../components/Table.vue';
  import CSelect from '../../../components/Select.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../../store/mutation-types";
  export default {
    name: "carenterprisemanage",
    components: {
      CTable,
      CSelect,
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
        queryItem:[
          {
            value:"1",
            text:"在网"
          },{
            value:"0",
            text:"潜在"
          }
        ],

        selectItem:[
          {
            value:"1",
            text:"在网"
          },{
            value:"0",
            text:"潜在"
          }
        ],
          userLogo: "/static/img/car-logo/car.png",
          logoRow1:[
            "/static/img/car-logo/car_000.png",
            "/static/img/car-logo/car_001.png",
            "/static/img/car-logo/car_002.png",
            "/static/img/car-logo/car_003.png",
            "/static/img/car-logo/car_004.png"
          ],
          logoRow2:[
            "/static/img/car-logo/car_005.png",
            "/static/img/car-logo/car_006.png",
            "/static/img/car-logo/car_007.png",
            "/static/img/car-logo/car_008.png",
            "/static/img/car-logo/car_009.png"
          ],
          form: {
              mingcheng: cheqi.mingcheng,
              zhizhao: cheqi.zhizhao,
              lianxi: cheqi.lianxi,
              phone: cheqi.phone,
              zhanghao: cheqi.zhanghao,
              mima: cheqi.mima,
              state: cheqi.state,
          },
          rules: {
              mingcheng: [
                  { required: true, message: '请输入名称', trigger: 'blur' }
              ],
              zhizhao: [
                  { required: true, message: '营业执照', trigger: 'blur' }
              ],
              lianxi: [
                  { required: true, message: '请输入联系人', trigger: 'blur' }
              ],
              phone: [
                  { required: true, message: '请输入联系方式', trigger: 'blur' }
              ],
              zhanghao: [
                  { required: true, message: '请输入登录账号', trigger: 'blur' }
              ],
              mima: [
                  { required: true, message: '请输入登录密码', trigger: 'blur' }
              ],
              state: [
                  { required: true, message: '请选择状态', trigger: 'blur' }
              ]
          },
          formdata: {
              id:cheqi.id,
              mingcheng: cheqi.mingcheng,
              zhizhao: cheqi.zhizhao,
              lianxi: cheqi.lianxi,
              phone: cheqi.phone,
              zhanghao: cheqi.zhanghao,
              mima: cheqi.mima,
              state: cheqi.state,
              logo: '/static/img/car-logo/car.png'
          },
        conditions: {
          license: '',
          name: '',
          status: "-1"
        },
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
              show: true
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
      formatType(type){
        if (type=="1") {
          return "在网";
        } else {
          return "潜在";
        }
      },

        selectLogo(imgSrc, type) {
          if (type == 1){
            this.userLogo = imgSrc;
          } else {
            this.formdata.logo = imgSrc;
          }
        },
        updateInfo () {
            this.$refs.modForm.validate((valid) => {
                if (valid) {
                    let params = {
                        id: this.formdata.id,
                        name: this.formdata.mingcheng,
                        license: this.formdata.zhizhao,
                        contactName: this.formdata.lianxi,
                        contactPhone: this.formdata.phone,
                        loginNo: this.formdata.zhanghao,
                        password: this.formdata.mima,
                        status: this.formdata.state,
                        logo: this.formdata.logo
                    };
                    this.$http.updateInfo(params).then(res => {
                        this.$message({
                            message: res.data.result,
                            type: 'success'
                        });
                        this.$refs.modForm.resetFields();
                        this.queryCarEnterpriseList();
                        this.modifyCarEnterpriseVisible=false;

                    }).catch(err => {
                        console.log('err', err);
                    });
                } else {
                    console.log('error modify!!');
                    return "error";
                }
            });
        },
        newInfo (){
            this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        let params = {
                            name: this.form.mingcheng,
                            license: this.form.zhizhao,
                            contactName: this.form.lianxi,
                            contactPhone: this.form.phone,
                            loginNo: this.form.zhanghao,
                            password: this.form.mima,
                            status: this.form.state,
                            logo: this.userLogo

                        };
                        this.$http.newInfo(params).then(res => {
                            this.$message({
                                message: res.data.result,
                                type: 'success'
                            });
                            this.$refs.addForm.resetFields();
                            this.queryCarEnterpriseList();
                            this.$emit("add",'success');
                            this.addCarEnterpriseVisible=false;
                        }).catch(err => {
                            console.log('err', err);
                        });
                    } else {
                        console.log('error submit!!');
                        return "error";
                    }
            });
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
          name: this.conditions.name,
          status: this.conditions.status
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
      addCarEnter() {
        this.addCarEnterpriseVisible = true;
        this.title = "车企新增";
      },
      updateCarEnter(row){
        this.formdata.id=row.id;
        this.formdata.zhizhao = row.license;
        this.formdata.mingcheng=row.name;
        this.formdata.lianxi=row.contactName;
        this.formdata.phone=row.contactPhone;
        this.formdata.zhanghao=row.loginNo;
        this.formdata.state=row.status == "1" ? "1":"0";
        this.formdata.mima=row.password;
        this.formdata.logo = row.logo?row.logo:'/static/img/car-logo/car.png';
        this.title = "车企修改";
        this.modifyCarEnterpriseVisible = true;
      },
      handleCurrentChange(currentPage) {
        this.page = currentPage - 1;
        this.getCarEnterpriseList();
      },
      timestampToENDate1(value) {
        return timestampToENDate(value)
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
