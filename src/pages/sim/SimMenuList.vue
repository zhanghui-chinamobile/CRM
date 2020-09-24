<template>
  <section>
    <OrderList :enterpriseId="enterpriseId" :consumerType="2" :isAdmin="true" :userId="simId"></OrderList>
  </section>
  <!--<section>
    <el-col :span="24" class="toolbar">
      <el-row style="text-align: right">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-button type="primary" @click="orderOffer" size="small">套餐订购</el-button>
            <el-button type="primary" @click="updateOffer" size="small">套餐变更</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    已订购套餐列表：
    <tree-table :table="tableData" :data="tableData.data" :columns="tableData.columns">
      <template slot-scope="props" slot="button-operation">
        <el-form>
          <el-form-item>
            <el-button type="primary" size="small" @click="details">使用详情</el-button>
          </el-form-item>
        </el-form>
      </template>
    </tree-table>
    <el-dialog :title="title" :visible.sync="infoListVisible" width="80%" :close-on-click-modal="false" :modal-append-to-body="false" :modal="showDialog">
      <billing ref="Billing" :consumerType="2" :userIds="simIds" :simSingleId="id" :Type="type" :currOfferId = "currId" :currOfferName= "currName" v-if="infoListVisible"  @closeBilling="closeBilling"></billing>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="detailsVisible" width="80%" :close-on-click-modal="false" :modal-append-to-body="false"  :modal="this.showDialog">
      <Meals ref="Meals" :simId="id" v-if="detailsVisible"></Meals>
    </el-dialog>
  </section>-->
</template>
<script>
  import OrderList from  "../order/OrderList";
  // import TreeTable from "../../components/TreeGrid";
  // import Billing from "../show/Billing";
  // import {mapGetters, mapMutations} from 'vuex';
  // import types from "../../store/mutation-types";
  // import Meals from "../meal/Meals"

  export default {
    name: "sim-menu-list",
    components: {
      //TreeTable,
      //Billing,
      //Meals
      OrderList
    },
    props: {
      simId: "",
      Type:"",
      currOfferId:"",
      currOfferName:"",
      enterpriseId: {
        required: false,
        type: Number,
        default() {
          return 0;
        }
      },
    },
    /*data() {
      return {
        simIds:"",
        currId:"",
        currName:"",
        title:"",
        type:"",
        infoListVisible: false,
        detailsVisible: false,
        showDialog:false,
        id: 0,
        tableData: {
          border: false,
          columns: [
            {
              text: "业务名称",
              value: "orderName",
            },
            {
              text: "类型",
              value: "offerType"
            },
            {
              text: "生效时间",
              value: "effTime"
            },
            {
              text: "失效时间",
              value: "expTime"
            },
            {
              text: "订购时间",
              value: "orderTime"
            },
            {
              text: "状态",
              value: "state"
            }
          ],
          data: [],
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label: "操作",
            id: "1",
            data: []
          }
        },
      };
    },*/
    methods: {
      /*closeBilling(){
            this.infoListVisible = false;
            this.getOffers();
            if (this.tableData.data != null && this.tableData.data.length > 0) {
                this.currName = this.tableData.data[0].orderName;
                this.currId = this.tableData.data[0].id;
            }
        },
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
      selectOffer() {
        this.getOffers();
      },
      updateOffer() {
        this.infoListVisible = true;
          this.title = "套餐变更";
          this.type = "update";
          this.currName = this.tableData.data[0].orderName;
          this.currId = this.tableData.data[0].id;
      },
      closeDialog(){
        this.showDialog = true;
      },
      openDialog(){
        this.showDialog = true;
      },
      orderOffer() {
        if(this.tableData.data.length > 0){
            this.$message({
                message: "SIM卡已订购套餐,无法再次订购",
                type: "error",
            });
            return;
        }
        this.infoListVisible = true;
        this.title = "套餐订购";
        this.type = "add";
      },
      getOffers(){
        let params = {
          id: this.simId
        };
        this.tableData.loading = true;
        this.$http.getSimOffer(params).then((res) => {
          this.total = res.data.result.count;
          this.tableData.data = res.data.result;
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      details() {
        this.detailsVisible = true;
        this.title = "套餐使用详情";
      }
    },
    created() {
      this.simIds = [];
      this.simIds.push(this.simId);
      let itmes = [
        {
          name: "套餐列表",
          icon: "fa fa-windows",
          path: "/sim/SIMMenuList",
        },
      ];
      this.setBreadcrumbItems(itmes);
      this.getOffers();
    }*/
    }
  }
</script>
<style>


</style>
