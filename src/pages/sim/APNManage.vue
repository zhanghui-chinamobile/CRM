<template>
    <div class="">
        <section>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="车企" v-if="isEnterprise">
                      <el-input v-model="formInline.enterpriseName" style="width: 200px" @focus="userDialogVisible=true" placeholder="请选择车企" :disabled="userInfo.userType==2" />
                    </el-form-item>
                    <el-form-item label="sim卡号" v-else>
                        <el-input v-model="formInline.simId" placeholder="请输入sim卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="APN名称">
                      <el-select :clearable="true" placeholder="请选择APN名称" v-model="formInline.apnName">
                        <el-option v-for="item in apnList"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="toolbar-button">
                        <el-button type="primary" @click="queryDataList" icon="fa fa-search"> 查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <c-table :table="tableData" class="apn-table" ref="itemTable">
                <template slot-scope="props" slot="button-operation">
                  <el-button type="primary" @click="changeStatus(props.obj.row.id, props.obj.row.status)">{{props.obj.row.status == "关闭" ? "开通" : "关闭"}}</el-button>
                </template>
            </c-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total, prev, pager, next"
                               :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
                </el-pagination>
            </el-col>
          <el-dialog title="车企选择" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false" append-to-body>
            <CarEnterpriseList @dealSelectRow="getSelected"></CarEnterpriseList>
          </el-dialog>
        </section>
    </div>
</template>
<script>
    import CarEnterpriseList from "../report/CarEnterpriseList";
    import CTable from '../../components/Table.vue';
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElButton from "element-ui/packages/button/src/button";
    import { Message } from 'element-ui';

    export default {
        components: {
          ElButton,
          ElFormItem,
          CarEnterpriseList,
          CTable,
        },
        props: {
          isEnterprise: {
            type: Boolean,
            required: false,
            default() {
              return false;
            }
          }
        },
        name: "APNManage",
        data() {
            return {
                apnList:[],
                title: "查询APN",
                page: 0,
                pagesync: this.page + 1,
                total: 0,
                userDialogVisible: false,
                formInline: {
                  simId: '',
                  apnName: '',
                  enterpriseId:0,
                  enterpriseName:'',
                  isEnterprise: this.isEnterprise
                },
                tableData: {
                    loading: false,
                    // hasSelect: true,
                    data: [],
                    columns: [
                        {
                          label: this.isEnterprise?"车企名称":"sim卡号",
                          props: this.isEnterprise?"enterpriseName":"simId",
                          width:"120px",
                        },
                        {
                            label: "手机号",
                            props: "number",
                            width:"120px",
                        },
                        {
                            label: "APN",
                            props: "apnName",
                            width:"120px",
                        },
                        {
                            label: "状态",
                            props: "status",
                            width:"120px",
                        },
                        {
                            label: "订购时间",
                            props: "createTime"
                        },
                        {
                            label: "生效时间",
                            props: "effTime"
                        },
                        {
                            label: "失效时间",
                            props: "expTime"
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
            this.getAPNList();
          },
          getSelected(row){
            this.userDialogVisible = false;
            this.formInline.enterpriseId = row.id;
            this.formInline.enterpriseName = row.name;
            //this.queryDataList();
          },
          getAPNList() {
            // let params = {
            //   currentPage: this.page,
            //   pageSize: 10,
            //   data: this.formInline,
            // };
            this.tableData.loading = true;
            this.$http.getAPNDataList(this.formInline).then((res) => {
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
              this.tableData.loading = false;
            }).catch(error => {
              this.tableData.loading = false;
            });
          },
          getUpServiceCodeListList(){
            this.$http.getUpServiceCodeListList().then((res) => {
              let list = [];
              for (var i = 0; i < res.data.result.length; i++) {
                if(!list.includes(res.data.result[i].apnName)){
                  list.push(res.data.result[i].apnName);
                }
              };
              this.apnList=list;
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
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      },
      created() {
        if (this.isEnterprise&&this.userInfo.userType==2){
          this.formInline.enterpriseId = this.userInfo.id;
          this.formInline.enterpriseName = this.userInfo.nickname;
        }
        this.getUpServiceCodeListList();
        this.queryDataList();
      }
    }
</script>
<style>

</style>
