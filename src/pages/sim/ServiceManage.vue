<template>
  <div class="">
    <section>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="sim卡号">
            <el-input v-model="formInline.simId" placeholder="请输入sim卡号"></el-input>
          </el-form-item>
          <el-form-item label="service_code">
            <el-select :clearable="true" placeholder="请选择service_code" v-model="formInline.serviceCode">
              <el-option v-for="item in serviceCodeList"
                         :key="item.id"
                         :label="item.serviceCode"
                         :value="item.serviceCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="toolbar-button">
            <el-button type="primary" @click="queryDataList" icon="fa fa-search"> 查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <c-table :table="tableData" class="service-table" ref="itemTable">
        <template slot-scope="props" slot="button-operation">
          <el-button type="primary" @click="changeStatus(props.obj.row.id, props.obj.row.status)">{{props.obj.row.status == "关闭" ? "开通" : "关闭"}}</el-button>
        </template>
      </c-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, prev, pager, next"
                       :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </section>
  </div>
</template>
<script>
  import CTable from '../../components/Table.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import ElFormItem from "element-ui/packages/form/src/form-item";
  import ElButton from "element-ui/packages/button/src/button";
  import { Message } from 'element-ui';

  export default {
    components: {
      ElButton,
      ElFormItem,
      CTable,
    },
    props: {
      simId: ""
    },
    name: "APNManage",
    data() {
      return {
        serviceCodeList:[],
        page: 0,
        pagesync: this.page + 1,
        total: 0,
        formInline: {
          simId: '',
          serviceCode: ''
        },
        tableData: {
          loading: false,
          // hasSelect: true,
          data: [],
          columns: [
            {
              label: "sim卡号",
              props: "simId",
              width: "120px",
            },
            {
              label: "手机号",
              props: "number",
              width: "120px",
            },
            {
              label: "serviceCode",
              props: "serviceCode",
              width: "120px",
            },
            {
              label: "状态",
              props: "status",
              width: "120px",
            },
            {
              label: "类型",
              props: "serviceType",
              width: "120px",
            },
            {
              label: "订购时间",
              props: "createTime",
              width: "120px",
            },
            {
              label: "生效时间",
              props: "eff_time",
              width: "200px",
            },
            {
              label: "失效时间",
              props: "exp_time",
              width: "200px",
            }
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
    methods: {
      queryDataList() {
        this.pagesync = 1;
        this.page = this.pagesync - 1;
        this.getServiceCodeList();
      },
      getServiceCodeList() {
        let data = {
          simId: this.formInline.simId,
          serviceCode: this.formInline.serviceCode,
        };
        let params = {
          currentPage: this.page,
          pageSize: 10,
          data: data,
        };
        this.tableData.loading = true;
        this.$http.getServiceCodeDataList(data).then((res) => {
          this.total = res.data.result.length;
          this.tableData.data = res.data.result;
          for (var i = 0; i < this.tableData.data.length; i++) {
            switch (this.tableData.data[i].status) {
              case 0:
                this.tableData.data[i].status = "关闭";
                break;
              case 1:
                this.tableData.data[i].status = "开通";
                break;
            }
          };
          for (var i = 0; i < this.tableData.data.length; i++) {
            switch (this.tableData.data[i].serviceType) {
              case 0:
                this.tableData.data[i].serviceType = "通用";
                break;
              case 1:
                this.tableData.data[i].serviceType = "语音";
                break;
              case 2:
                this.tableData.data[i].serviceType = "流量";
                break;
              case 3:
                this.tableData.data[i].serviceType = "短信";
                break;
            }
          };
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      getUpServiceCodeListList(){
        this.$http.getUpServiceCodeListList().then((res) => {
          this.serviceCodeList = res.data.result;
        }).catch(error => {
          console.log(error)
        });
      },
      changeStatus(id,state){
        let status = 0;
        if(state == "关闭"){
          status = 1;
        }
        let data = {
          id,
          status
        }
        this.$http.changeAttributeStatus(data).then((res) => {
          this.tableData.loading = true;
          Message.success(res.data.result);
          this.queryDataList();
          this.tableData.loading = false;
        }).catch(error => {
          console.log(error)
        });
      }
    },
    created() {
      this.queryDataList();
      this.getUpServiceCodeListList();
    }
  }
</script>
<style>
</style>
