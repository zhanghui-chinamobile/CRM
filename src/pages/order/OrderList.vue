<template>
  <section>
    <el-row  class="toolbar">
      <el-form :inline="true">
        <el-form-item label="车企" v-if="isAdmin&&consumerType===1">
          <el-input v-model="conditions.userName" style="width: 250px" @focus="userDialogVisible=true" placeholder="请选择车企"/>
        </el-form-item>
        <!--<el-form-item label="套餐名称" prop="type">-->
        <!--<el-input v-model="conditions.offerName" style="width: 250px" placeholder="请填写套餐名称"/>-->
        <!--</el-form-item>-->
        <el-form-item style="float: right;">
          <el-button type="primary" @click="getOrderOfferList" size="small">查询</el-button>
          <el-button type="primary" @click="orderOffer" size="small">套餐订购</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--<tree-table :table="tableData" :data="tableData.data" :columns="tableData.columns">-->
      <!--<template slot-scope="props" slot="button-operation">-->
        <!--<el-button style="width: 40px;" type="success" @click="details">详情</el-button>-->
        <!--<el-button style="width: 40px;" type="primary" @click="changeOffer(props.obj.$index, props.obj.row)">变更</el-button>-->
        <!--<el-button style="width: 40px;" type="danger" @click="unSubscribeOffer(props.obj.$index, props.obj.row)">退订</el-button>-->
      <!--</template>-->
    <!--</tree-table>-->
    <c-table :table="tableData">
      <template slot-scope="props" slot="expand">
        <el-table
          :data="props.obj.row.children"
          style="width: 90%"
          :show-header="false">
          <el-table-column type="expand" width="30">
            <template slot-scope="props">
              <el-form label-position="left" inline class="attribute-expand" v-for="item in props.row.children" :key="item">
                <el-form-item label="">
                  <span>{{item.attrName}}</span>
                </el-form-item>
                <el-form-item label="">
                  <span>{{item.totalValue}}</span>
                </el-form-item>
                <el-form-item label="">
                  <span>{{item.unit}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-for="item in tableData.columns" :key="item" :label="item.label"
            :prop="item.props"  :width="item.width?item.width: ''">
          </el-table-column>
        </el-table>
      </template>

      <template slot-scope="props" slot="button-operation">
        <el-button style="width: 40px;" type="success" @click="details">详情</el-button>
        <el-button style="width: 40px;" type="primary" @click="changeOffer(props.obj.$index, props.obj.row)">变更</el-button>
        <el-button style="width: 40px;" type="danger" @click="unSubscribeOffer(props.obj.$index, props.obj.row)">退订</el-button>
      </template>
    </c-table>
    <el-dialog title="选择车企" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false" append-to-body>
      <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
    </el-dialog>
    <el-dialog title="套餐订购" :visible.sync="infoListVisible" width="80%" :close-on-click-modal="false" :modal-append-to-body="false" :modal="showDialog" append-to-body>
      <billing ref="Billing" :enterpriseId="enterpriseId" :userIds="userIds" :consumerType="consumerType" v-if="infoListVisible"  @closeBilling="closeBilling"></billing>
    </el-dialog>
    <el-dialog title="套餐变更" :visible.sync="changeOfferVisible" width="80%" :close-on-click-modal="false" :modal-append-to-body="false" append-to-body>
      <billing :userIds="userIds" :enterpriseId="enterpriseId" :consumerType="consumerType" :isUpdate="true" :oldOrderInfo="oldOrderInfo" v-if="changeOfferVisible"  @closeBilling="closeBilling"></billing>
    </el-dialog>
    <el-dialog title="使用详情" :visible.sync="detailsVisible" width="80%" :close-on-click-modal="false" append-to-body>
      <details-progress ref="DetailsProgress" :simId="id" v-if="detailsVisible"></details-progress>
    </el-dialog>
  </section>
</template>

<script>
  import TreeTable from "../../components/TreeGrid";
  import CTable from "../../components/Table";
  import Billing from "../show/Billing";
  // import Meals from "../meal/Meals";
  import CarEnterpriseList from '../report/CarEnterpriseList';
  import DetailsProgress from "../carOwner/detailsProgress";

  export default {
    name: "OrderList",
    components: {
      TreeTable,
      CTable,
      Billing,
      // Meals,
      CarEnterpriseList,
      DetailsProgress
    },
    data() {
      return {
        conditions: {
          userId: this.userId,
          username: '',
          offerName: ''
        },
        userIds: [],
        userDialogVisible:false,
        infoListVisible: false,
        detailsVisible: false,
        changeOfferVisible: false,
        showDialog: true,
        oldOrderInfo: {
          instOfferId: 0,
          offerName: ''
        },
        tableData: {
          columns: [
            {
              label: "业务名称",
              props: "orderName"
            },
            {
              label: "类型",
              props: "offerType"
            },
            {
              label: "生效时间",
              props: "effTime"
            },
            {
              label: "失效时间",
              props: "expTime"
            },
            {
              label: "订购时间",
              props: "orderTime"
            },
            {
              label: "状态",
              props: "state"
            }
          ],
          data: [],
          hasSelect: false, //是否有选中的功能
          hasExpand: true,
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label: "操作",
            width: 200,
            id: "1",
            data: []
          }
        },
      }
    },
    props: {
      consumerType: {
        required: false,
        type: Number,
        default() {
          return 1;
        }
      },
      userId : {
        required: false,
        type: Number,
        default() {
          return 0;
        }
      },
      isAdmin : {
        required: false,
        type: Boolean,
        default() {
          return true;
        }
      },
      enterpriseId: {
        required: false,
        type: Number,
        default() {
          return 0;
        }
      },
    },
    methods: {
      getSelectedCarEnterprise(row){
        this.userDialogVisible = false;
        this.conditions.userId = row.id;
        this.conditions.userName = row.name;
        this.userIds = [];
        this.userIds.push(row.id);
        this.getOrderOfferList();
      },
      orderOffer() {
        if (this.conditions.userId==''||this.conditions.userId === 0) {
          this.$message({
            message:'请先选择用户 ',
            type: "error",
          });
          return;
        }
        this.userIds = [];
        this.userIds.push(this.conditions.userId);
        this.infoListVisible = true;
      },
      unSubscribeOffer(index, row){
        this.$confirm(`确认退订该套餐？`, '退订确认',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let instOfferIds = [];
          instOfferIds.push(row.instOfferId);
          let params = {
            instOfferIds: instOfferIds
          };
          this.$http.unSubscribeOffers(params).then(res => {
            this.$message({
              message: '退订成功！',
              type: 'success'
            });
            this.getOrderOfferList();
          }).catch(err => {
            console.log('err',err);
          })
        }).catch(()=>{

        })
      },
      details(index, row){
        this.detailsVisible = true;
      },
      changeOffer(index, row){
        this.userIds = [];
        this.userIds.push(this.conditions.userId);
        this.oldOrderInfo.instOfferId = row.instOfferId;
        this.oldOrderInfo.offerName = row.orderName;
        this.changeOfferVisible = true;
      },
      closeBilling(){
        this.infoListVisible = false;
        this.changeOfferVisible = false;
        this.getOrderOfferList();
      },
      getOrderOfferList(){
        let params = {
          userId: this.conditions.userId,
          consumerType: this.consumerType
        };
        this.tableData.loading = true;
        this.$http.getOrderOfferList(params).then((res) => {
          this.total = res.data.result.count;
          this.tableData.data = res.data.result;
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },

    },
    created() {
      this.getOrderOfferList();
    }
  }
</script>

<style scoped>
  .attribute-expand {
    font-size: 0;
  }
  .attribute-expand label {
    width: 0px;
    color: #99a9bf;
  }
  .attribute-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>
