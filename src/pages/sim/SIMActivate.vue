<template>
  <div class="">
    <section>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="车企:" v-if="userInfo.userType==1">
            <el-input v-model="formInline.name" style="width: 200px" @focus="userDialogVisible=true"
                      placeholder="请选择车企"/>
          </el-form-item>
          <el-form-item label="sim卡号">
            <el-input v-model="formInline.id" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="sim状态">
            <el-select v-model="formInline.status" style="width: 200px">
              <el-option label="全部" value=""></el-option>
              <el-option label="测试期" value="1"></el-option>
              <el-option label="已暂停" value="2"></el-option>
              <el-option label="已销户" value="0"></el-option>
              <el-option label="预激活" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formInline.number" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item style="float: right">
            <el-button type="primary" @click="quertSimList" icon="fa fa-search" size="small"> 查询</el-button>
            <el-button type="primary" @click="downloadSim" icon="el-icon-download" size="small">SIM卡下载</el-button>
            <el-button type="primary" @click="batchUpdateSimStatus" icon="fa fa-edit" size="small"> 批量激活</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <c-table :table="tableData" @onHandleSelectionChange="getCopyItemRow" ref="itemTable" style="padding-top: 10px">
      </c-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                       :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
      <el-dialog title="车企选择" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false"
                 append-to-body>
        <CarEnterpriseList @dealSelectRow="getSelected"></CarEnterpriseList>
      </el-dialog>
      <el-dialog :title="title" :visible.sync="infoListVisible" width="80%" :close-on-click-modal="false">
        <sim-menu-list ref="SimMenuList" :simId="id" v-if="infoListVisible"></sim-menu-list>
      </el-dialog>
      <el-dialog :title="title" :visible.sync="parchServiceVisible" width="80%" :close-on-click-modal="false">
        <billing ref="Billing" :userIds="simIds" :consumerType="2" v-if="parchServiceVisible"
                 @closeBilling="parchServiceVisible = false"></billing>
      </el-dialog>
      <el-dialog :title="title" :visible.sync="addSimVisible" width="50%" :close-on-click-modal="false">
        <add-sim ref="addSimInfo" v-if="addSimVisible" @closeAddSim="addSimVisible = false"></add-sim>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import CTable from '../../components/Table.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  import SimMenuList from "./SimMenuList";
  import AddSim from "./AddSim";
  import Billing from "../show/Billing";
  import ElFormItem from "element-ui/packages/form/src/form-item";
  import CarEnterpriseList from "../report/CarEnterpriseList"

  export default {
    components: {
      ElFormItem,
      CTable,
      SimMenuList,
      Billing,
      AddSim,
      CarEnterpriseList
    },
    props: {
      simId: ""
    },
    name: "SIMManage",
    data() {
      return {
        isCheQi: false,
        simIds: "",
        id: "",
        disabled: false,
        mulSelection: [],
        infoListVisible: false,
        parchServiceVisible: false,
        userDialogVisible: false,
        addSimVisible: false,
        enterpriseId: 0,
        enterpriseName:'',
        operationTitle: "",
        info: {},
        title: "新增SIM",
        page: 0,
        pagesync: this.page + 1,
        total: 0,
        formInline: {
          id: '',
          status: '',
          number: ''
        },
        tableData: {
          loading: false,
          hasSelect: true,
          data: [],
          columns: [
            {
              label: "sim卡号",
              props: "simid",
              width: "170px",
            },
            {
              label: "手机号码",
              props: "number",
              width: "120px",
            },
            {
              label: "sim状态",
              props: "status",
              width: "100px",
            },
            {
              label: "语音开通状态",
              props: "voiceStatus"
            },
            {
              label: "短信开通状态",
              props: "smsStatus"
            },
            {
              label: "APN状态",
              props: "apnStatus",
              width: "80px",
            },
            {
              label: "生效时间",
              props: "createTime"
            },
            {
              label: "失效时间",
              props: "updateTime"
            },
            {
              label: "",
              props: "state",
              width: "10px",
              show: true,

            }
          ],
        },
      }
    },
    methods: {
      isSuccess() {
        if (this.$refs.Billing.isSuccess()) {
          this.parchServiceVisible = false;
        }
      },
      commitData() {
        this.$refs.Billing.commitData();
      },
      submitRequest() {
        this.$refs.addSimInfo.submitRequest();
        this.addSimVisible = false;
      },
      addSim() {
        this.addSimVisible = true;
        this.title = "批量添加SIM卡";
      },
      formatDate(value) {
        return timestampToENDate(value)
      },
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
      quertSimList() {
        this.pagesync = 1;
        this.page = this.pagesync - 1;
        this.getSimList();

      },
      getCopyItemRow(val) {
        this.simIds = new Array();
        for (var i = 0; i < val.length; i++) {
          if (val[i].status != "预激活") {
            this.$message({
              message: "SIM卡【" + val[i].simid + "】" + "已激活，无须再次激活，请选择【预激活】状态的SIM卡",
              type: "error",
            });
            this.$refs.itemTable.clearSelection();
            return;
          } else {
            this.simIds.push(val[i].id);
          }
        }
      },
      getSimList() {
        let data = {
          simid: this.formInline.id,
          status: this.formInline.status,
          number: this.formInline.number,
          ccId: this.enterpriseId,
          credentialCode: "4",
        };
        if (this.userInfo.userType == 2) {
          this.isCheQi = true;
          data.ccId = this.userInfo.id;
        }
        let params = {
          currentPage: this.page,
          pageSize: 10,
          data: data,
        };
        this.tableData.loading = true;
        this.$http.getSimInfo(params).then((res) => {
          this.total = res.data.result.count;
          this.tableData.data = res.data.result.entities;
          for (var i = 0; i < this.tableData.data.length; i++) {
            switch (this.tableData.data[i].status) {
              case 0:
                this.tableData.data[i].status = "销户";
                this.tableData.data[i].state = "已销户"
                break;
              case 1:
                this.tableData.data[i].status = "测试期";
                this.tableData.data[i].state = "暂停"
                break;
              case 2:
                this.tableData.data[i].status = "暂停";
                this.tableData.data[i].state = "恢复"
                break;
              case 3:
                this.tableData.data[i].status = "预激活";
                break;
            }
            ;
            switch (this.tableData.data[i].voiceStatus) {
              case 0:
                this.tableData.data[i].voiceStatus = "销户";
                break;
              case 1:
                this.tableData.data[i].voiceStatus = "正常";
                break;
              case 2:
                this.tableData.data[i].voiceStatus = "暂停";
                break;
            }
            ;
            switch (this.tableData.data[i].smsStatus) {
              case 0:
                this.tableData.data[i].smsStatus = "销户";
                break;
              case 1:
                this.tableData.data[i].smsStatus = "正常";
                break;
              case 2:
                this.tableData.data[i].smsStatus = "暂停";
                break;
            }
            ;
            switch (this.tableData.data[i].apnStatus) {
              case 0:
                this.tableData.data[i].apnStatus = "销户";
                break;
              case 1:
                this.tableData.data[i].apnStatus = "正常";
                break;
              case 2:
                this.tableData.data[i].apnStatus = "暂停";
                break;
            }

          }
          this.tableData.loading = false;
        }).catch(error => {
          this.tableData.loading = false;
        });
      },
      batchUpdateSimStatus() {
        if (this.simIds == null || this.simIds == "") {
          this.$message({
            message: "请选择要回收的SIM卡",
            type: "error",
          });
          return;
        }
        let params = {
          ids: this.simIds,
          status: "1"
        }
        this.$http.batchUpdateSimStatus(params).then((res) => {
          if (res.data.result == "success") {
            this.$message({
              message: "SIM卡批量激活成功",
              type: "success",
            });
            this.getSimList();
          }
        }).catch(error => {
          this.$message({
            message: "SIM卡批量激活失败",
            type: "error",
          });
        });
      },
      handleCurrentChange(currentPage) {
        this.page = currentPage - 1;
        this.getSimList();
      },
      downloadSim() {
        if(this.userInfo.userType == 2){
          this.enterpriseId = this.userInfo.id;
        }
        let params = {
          id: this.enterpriseId,
        }
        this.$http.downloadSim(params).then((res) => {
          if (res.data.result == "success") {
            this.$message({
              message: "SIM卡文件下载成功",
              type: "success",
            });
            this.getSimList();
          } else if (res.data.result == "not_found") {
            this.$message({
              message: "无SIM卡文件可下载",
              type: "error",
            });
          } else if (res.data.result == "error") {
            this.$message({
              message: "SIM卡文件下载失败",
              type: "error",
            });
          }
        }).catch(error => {
          this.$message({
            message: "SIM卡文件下载失败",
            type: "error",
          });
        });
      },
      getSelected(row) {
        this.enterpriseId=row.id,
        this.userDialogVisible = false;
        this.formInline.name = row.name;
        this.quertSimList();
      },
    },
    created() {
      let itmes = [
        {
          name: "SIM管理",
          icon: "fa fa-windows",
          path: "/sim/SIMManage",
        },
      ];
      this.setBreadcrumbItems(itmes);
      this.quertSimList();
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      }
    }
  }
</script>
<style>
</style>
