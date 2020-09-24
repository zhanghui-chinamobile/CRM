<template>
  <section>
    <el-alert title="SIM只能选择所属车企的车主套餐" type="info" show-icon></el-alert>
    <el-col :span="24" class="toolbar" style="float: none">
      <el-form :inline="true" label-width="100px" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="套餐名称">
          <el-input v-model="formInline.name" placeholder="输入套餐信息"></el-input>
        </el-form-item>
        <el-button type="primary" @click="getOfferList" style="float: right;margin-right: 10px">查询</el-button>
        <el-form-item label="当前套餐名称" v-if="isUpdate">
          <el-input v-model="oldOrderInfo.offerName" style="width: 220px" placeholder="输入套餐信息"
                    disabled></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <!--套餐表格 -->
    <c-table :table="tableData" :tableEvents="tableEvents" @onHandleSelectionChange="selectOffers">
      <!-- 格式化生效时间 -->
      <template slot-scope="props" slot="createTime">
        <span>{{timestampToFullDate(props.obj.row.createTime)}}</span>
      </template>
      <!-- 格式化失效时间 -->
      <template slot-scope="props" slot="updateTime">
        <span>{{timestampToFullDate(props.obj.row.updateTime)}}</span>
      </template>
    </c-table>
    <!--显示产品表单-->
    <c-table :table="prodData">
    </c-table>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="套餐生效时间" label-width="100px">
          <el-date-picker v-model="formInline.effectTime" type="date" format="yyyy-MM-dd" align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="套餐失效时间" label-width="100px">
          <el-date-picker v-model="formInline.expireTime" type="date" format="yyyy-MM-dd" align="right">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-col>
    <div slot="footer" class="dialog-footer" style="text-align: center;margin: auto">
      <el-button type="primary" style="margin-top: 10px" @click="commitData">提交</el-button>
    </div>
  </section>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  import CTable from '../../components/Table.vue';

  export default {
    components: {
      CTable,
    },
    props: {
      isUpdate: {
        required: false,
        type: Boolean,
        default() {
          return false;
        }
      },
      oldOrderInfo:{
        required: false,
        type: Object,
        default() {
          return {}
        }
      },
      enterpriseId: {
        required: false,
        type: Number,
        default() {
          return 0;
        }
      },
      userIds: {
        required: true,
        type: Array,
      },
      consumerType: {
        required: false,
        type: Number,
        default() {
          return 1;
        }
      }
    },
    data() {
      return {
        flag: false,
        showProdInfoVisible: false,
        offerIds: [],
        formInline: {
          name: '',
          effectTime: "",
          expireTime: "",
        },
        tableData: {
          loading: false,
          hasSelect: true,
          data: [],
          columns: [
            {
              label: "套餐名称",
              props: "name",
            },
            {
              label: "套餐类型",
              props: "typeName",
            },
            {
              label: "生效时间",
              props: "createTime",
            },
            {
              label: "失效时间",
              props: "updateTime",
            }
          ]
        },
        prodData: {
          loading: false,
          data: [],
          columns: [
            {
              label: "产品名称",
              props: "name",
            },
            {
              label: "产品类型",
              props: "typeName",
            },
            {
              label: "生效时间",
              props: "createTime",
            },
            {
              label: "失效时间",
              props: "updateTime",
            }
          ]
        },
        tableEvents: {
          rowDbClick: this.selectOffer
        },
        tableData2: [{
          name: '套餐5',
          state: '生效',
          staTime: '2016-05-02',
          endTime: '2016-05-04'
        }]
      }
    },
    methods: {
      ...mapMutations({
        setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
      }),
      timestampToFullDate(value) {
        return timestampToFullDate(value)
      },
      commitData() {
        if (this.offerIds.length === 0) {
          this.$message({
            message: "请选择套餐",
            type: "error",
          });
        }
        if (this.formInline.effectTime != null && this.formInline.effectTime != "" && this.formInline.expireTime != null && this.formInline.expireTime != "") {
          if (this.formInline.effectTime >= this.formInline.expireTime) {
            this.$message({
              message: "失效日期必须大于生效日期",
              type: "error",
            });
            return;
          }
        }else{
          this.$message({
            message: "生效日期、失效日期不可为空",
            type: "error",
          });
          return;
        }
        if (this.isUpdate) {
          let params = {
            userIds: this.userIds,
            offerIds: this.offerIds,
            oldInstOfferId: this.oldOrderInfo.instOfferId,
            consumerType: this.consumerType,
            effDate: this.formInline.effectTime.getTime(),
            expDate: this.formInline.expireTime.getTime(),
          };
          this.$http.changeOffer(params).then((res) => {
            this.$message({
              message: res.data.result,
              type: "success",
            });
            this.$emit("closeBilling");
          }).catch(error => {
            console.log(error);
          });
        } else {
          let params = {
            userIds: this.userIds,
            offerIds: this.offerIds,
            consumerType: this.consumerType,
            effDate: this.formInline.effectTime.getTime(),
            expDate: this.formInline.expireTime.getTime(),
          };
          this.$http.orderOffers(params).then((res) => {
            this.$message({
              message: res.data.result,
              type: "success",
            });
            this.$emit("closeBilling");
          }).catch(error => {
            console.log(error);
          });
        }

      },
      isSuccess() {
        return this.flag;
      }
      ,
      showProdInfo(row) {
        let params = {
          id: row.id,
        };
        this.prodData.loading = true;
        this.$http.getUpProdsByOfferId(params).then((res) => {
          this.total = res.data.result.count;
          let tableData = res.data.result;
          tableData.forEach(item =>{
            item.typeName = this.convertProduct(item.type);
          })
          this.prodData.data = tableData;
          this.prodData.loading = false;
        }).catch(error => {
          this.prodData.loading = false;
        });
      }
      ,

      selectOffer(row, event) {
        this.showProdInfo(row);
      },
      getOfferList() {
        let params = {
          name: this.formInline.name,
          consumerType: this.consumerType,
          enterpriseId: this.enterpriseId
        };
        this.tableData.loading = true;
        this.tableData.loading = true;
        this.$http.getOfferList(params).then((res) => {
          this.total = res.data.result.count;
          let tableData = res.data.result;
          tableData.forEach(item =>{
            item.typeName = this.convertOfferType(item.type);
          })
          this.tableData.data = tableData;
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      selectOffers(val){
        this.offerIds = [];
        for (let index in val){
          this.offerIds.push(val[index].id);
        }
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      convertOfferType(type){
        switch (type) {
          case 1:return "套餐";
          case 2:return "优惠";
          case 3:return "促销活动";
          case 3:return "营销活动";
        }
      },
      convertProduct(type){
        switch (type) {
          case 1:return "功能产品"
          case 2:return "资费产品"
        }
      }
    },
    created() {
      let itmes = [
        {
          name: "套餐订购",
          icon: "fa fa-windows",
          path: "/show/Billing",
        },
      ];
      this.setBreadcrumbItems(itmes);
      this.getOfferList();
    }
  }

</script>

<style scoped>

</style>
