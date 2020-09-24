<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-row>
        <el-form :inline="true" :model="conditions" size="small">
          <el-form-item label="车企名称" v-if="userInfo.userType==1">
            <el-input v-model="conditions.enterpriseName" @focus="userDialogVisible=true" placeholder="请选择车企"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="conditions.phone" placeholder="请输入手机号码" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryInfoList" >查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    <!-- 信息列表 -->
    <c-table :table="tableData" style="text-align: center;padding-top: 10px"  @onHandleSelectionChange="getCopyItemRow">
    </c-table>
    <!-- 分页查询 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, prev, pager, next"
                     :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-form :inline="true" :model="formdata" size="small" style="padding-top: 20px;padding-left: 10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="充值金额">
            <el-input v-model="formdata.fee" placeholder="请输入充值金额" style="width: 300px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="充值方式">
            <el-select v-model="formdata.payType" style="width: 300px">
              <el-option label="现金" value="1"></el-option>
              <el-option label="POS" value="2"></el-option>
              <el-option label="微信" value="3"></el-option>
              <el-option label="支付宝" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="doSure">确 定</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择车企" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false">
      <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
    </el-dialog>
  </section>
</template>

<script>
  import CTable from '../../components/Table.vue';
  import CSelect from '../../components/Select.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  import PayFee from "./PayFee" ;
  import CarEnterpriseList from '../report/CarEnterpriseList';

  export default {
    name: "repaid-payment",
    components: {
      CTable,
      CSelect,
      PayFee,
      CarEnterpriseList
    },
    props: {
      id: 0,
      fee: "",
    },
    data() {
      return {
        userDialogVisible:false,
        ids:"",
        enterId: "",
        fees: "",
        label: "",
        formdata: {
          item: "",
          fee: "",
          payType: ""
        },
        conditions: {
          enterpriseId: 0,
          phone: null,
          enterpriseName:null,
        },
        payMoneyVisible: false,
        title: "",
        disabled: false,
        info: {},
        page: 0,
        pagesync: this.page + 1,
        total: 0,
        tableData: {
          loading: false,
          hasSelect: true,
          data: [],
          columns: [
            {
              label: "车企名称",
              props: "enterprise",
            },
            {
              label: "手机号码" ,
              props: "phone",
            },
            {
              label: "金额",
              props: "fee",
            },
            {
              label: "状态",
              props: "status",
            }
          ],
        },
      }
    },
    computed:
      {
        ...
          mapGetters({
            userInfo: 'userInfo',
          }),
      }
    ,
    methods: {
      queryInfoList() {
        this.pagesync = 1;
        this.page = this.pagesync - 1;
        this.queryInfo();
      },
      queryInfo() {
        let params = {
          enterId: this.conditions.enterpriseId,
          phone: this.conditions.phone
        };
        this.tableData.loading = true;
        this.$http.getItemInfo(params).then((res) => {
          this.total = res.data.result.count;
          this.tableData.data = res.data.result.entities;
          for (var i = 0; i < this.tableData.data.length; i++) {
            switch (this.tableData.data[i].status) {
              case 1:
                this.tableData.data[i].status = "有效";
                break;
              case 0:
                this.tableData.data[i].status = "无效";
                break;
            }
          }
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      payMoney(index, row) {
        this.payMoneyVisible = true;
        this.title = "缴费";
        this.label = "缴费";
        this.feeId = row.id;
        this.fees = row.fee;
      },
      repaid() {
        this.payMoneyVisible = true;
        this.title = "充值";
        this.label = "充值";
      },
      refreshData() {
        this.payMoneyVisible = false;
        this.queryInfoList();
      },
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
      doSure() {
        if(this.ids == "" || this.ids == null){
          this.$message({
            message: "请选择要充值的车企",
            type: "error",
          });
          return;
        }
        if (this.formdata.fee == "" || this.formdata.fee == null) {
          this.$message({
            message: "请输入金额",
            type: "error",
          });
          return;
        }
        if (this.formdata.payType == "" || this.formdata.payType == null) {
          this.$message({
            message: "请选择支付方式",
            type: "error",
          });
          return;
        }
        let params = {
          ext2:this.ids,
          ext1: this.formdata.fee,
          payType: this.formdata.payType,
        };
        this.$http.repaidMoney(params).then((res) => {
          this.$message({
            message: "充值成功",
            type: "success",
          });
          this.formdata.ext1 = "";
          this.formdata.payType = "";
          this.queryInfoList();
        }).catch(error => {
          this.$message({
            message: "充值失败",
            type: "success",
          });
        });
      },
      getCopyItemRow(val) {
        this.ids = ""
        for (var i = 0; i < val.length; i++) {
          if (i==0) {
            this.ids = val[i].id;
          }else {
            this.ids = this.ids + ","+ val[i].id;
          }
        }
      },
      getSelectedCarEnterprise(row){
        this.userDialogVisible = false;
        this.conditions.enterpriseName = row.name;
        this.conditions.enterpriseId = row.id;
        this.queryInfoList();
      },
    },
    created() {
      let itmes = [
        {
          name: "车企管理",
          icon: "fa fa-windows",
          path: "/apps",
        },
      ];
      this.setBreadcrumbItems(itmes);
      if (this.userInfo.userType==2){
        this.conditions.enterpriseId= this.userInfo.id;
      }
      this.queryInfoList();
    } ,
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      }
    }
  }
</script>

<style scoped lang="less">
  .payMoney {
    padding: 10px;
    padding-bottom: 20px;
    margin: 0 auto;
    width: 300px;
  }

  .payMoney .el-form-item .el-form-item__content {
    margin-right: 40px;
    height: 32px;
    width: 400px !important;
  }
</style>
