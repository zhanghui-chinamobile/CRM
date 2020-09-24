<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-row>
        <el-form :inline="true" :model="conditions" size="small">
          <el-form-item label="车企名称" v-if="userInfo.userType==1">
            <el-input v-model="conditions.enterpriseName" @focus="userDialogVisible=true" placeholder="请选择车企"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="conditions.phoneNumber" placeholder="请输入手机号码" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryInfoList" >查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    <!-- 信息列表 -->
    <c-table :table="tableData" style="text-align: center;padding-top: 10px">
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="缴费" placement="top-start">
          <el-button type="primary" @click="payMoney(props.obj.$index, props.obj.row)" size="mini">缴费</el-button>
        </el-tooltip>
      </template>
    </c-table>
    <!-- 分页查询 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, prev, pager, next"
                     :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <section>
      <el-dialog :title="title" :visible.sync="payMoneyVisible" width="50%" :close-on-click-modal="true">
        <pay-fee ref="payFee" v-if="payMoneyVisible" :id="feeId" :fee="fees" @refreshData = "refreshData"></pay-fee>
        <div slot="footer" class="dialog-footer">
          <el-button @click="payMoneyVisible = false">取 消</el-button>
          <el-button type="primary" @click="doSure">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择车企" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false">
        <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
      </el-dialog>
    </section>
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
        feeId: "",
        fees: "",
        label: "",
        formdata: {
          count: "",
        },
        conditions: {
          phoneNumber: null,
          enterpriseId:0,
          enterpriseName:"",
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
          hasSelect: false,
          data: [],
          columns: [
            {
              label: "车企名称",
              props: "enterpriseName",
            },
            {
              label: "手机号码",
              props: "phoneNumber",
            },
            {
              label: "套餐",
              props: "offerName",
            },
            {
              label: "科目",
              props: "feeItem",
            },
            {
              label: "费用",
              props: "fee",
            },
            {
              label: "状态",
              props: "status",
            },
          ],
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label: "操作",
            data: []
          }
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
      doSure() {
        this.$refs.payFee.addMoney();
      },
      queryInfoList() {
        this.pagesync = 1;
        this.page = this.pagesync - 1;
        this.queryInfo();
      },
      queryInfo() {
        var phoneNumber = this.conditions.phoneNumber;
        if(phoneNumber == ""){
          phoneNumber = null;
        }
        let params = {
          phoneNumber: phoneNumber,
          enterpriseId:this.conditions.enterpriseId,
        };
        this.tableData.loading = true;
        this.$http.getEnterpriseFeeInfos(params).then((res) => {
          this.total = res.data.result.count;
          this.tableData.data = res.data.result.entities;
          for (var i = 0; i < this.tableData.data.length; i++) {
            switch (this.tableData.data[i].status) {
              case 1:
                this.tableData.data[i].status = "已结清";
                break;
              case 0:
                this.tableData.data[i].status = "未结清";
                break;
            }
          }
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      payMoney(index, row) {
        if (row.status == "已结清") {
          this.$message({
            message: "当前费用已结清，无须进行缴费！",
            type: "error",
          });
          return;
        }
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
      refreshData(){
        this.payMoneyVisible = false;
        this.queryInfoList();
      },
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
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
    },
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
