<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-row>
        <el-form :inline="true" :model="conditions" size="small">
          <el-form-item label="套餐名称">
            <el-input v-model="conditions.name" placeholder="请输入套餐名称" style="width: 250px"
                      disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>

    <el-col>
      <el-form :inline="true">
          <span style="font-size: 15px;background-color: #fff;border-radius: 3px;padding: 5px;line-height: 30px">已添加规则：</span>
          <el-button style="margin-bottom:10px;float:right" type="primary" @click="addCarEnterRule" size="mini"> 新增规则</el-button>
      </el-form>
    </el-col>
    <!-- 信息列表 -->
    <c-table :table="tableData" style="text-align: center">
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="删除" placement="top-start">
          <el-button type="primary" @click="deleteRule(props.obj.$index, props.obj.row)" size="mini"> 删除</el-button>
        </el-tooltip>
      </template>
    </c-table>
    <!-- 分页查询 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, prev, pager, next"
                     :current-page.sync="pagesync" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog :title="title" :visible.sync="addCarEnterRuleVisible" width="50%" :close-on-click-modal="false" >
      <rule-search ref="RuleSearch" ></rule-search>
    </el-dialog>
  </section>
</template>

<script>
  import CTable from '../../components/Table.vue';
  import CSelect from '../../components/Select.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  import RuleSearch from "./CarRuleSearch";

  export default {
    name: "CarEnterpriseRuleManage",
    components: {
      CTable,
      CSelect,
      RuleSearch
    },
    props: {
      CarEnterpriseInfo: {},
      Type: "",
    },
    data() {
      let user = this.$store.state.userStore;
      return {
        conditions: {
          name: "",
        },
        addCarEnterRuleVisible:false,
        title:"",
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
              label: "规则名称",
              props: "name",
            },
            {
              label: "规则参数",
              props: "params",
            },
            {
              label: "规则描述",
              props: "description",
            },
            {
              label: "创建时间",
              props: "create_time",
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
    computed:
      {
        ...
          mapGetters({
            userInfo: 'userInfo',
          }),
      }
    ,
    methods: {
        getAllRule(){
            this.$http.getAllRule().then((res) => {
                this.tableData.data = res.data.result;
                this.total = res.data.result.count;
            }).catch(err => {
                console.log('err', err);
             });
        },
      queryCarEnterpriseRuleList() {
        this.pagesync = 1;
        this.page = this.pagesync - 1;
        this.getCarEnterpriseRuleList();
      },
      getCarEnterpriseRuleList() {
        let data = {
          name: this.conditions.name,
        };
        let params = {
          currentPage: this.page,
          pageSize: 20,
          data: data,
        };
        this.tableData.loading = true;
        this.getAllRule();
        this.tableData.loading = false;
      },
      addCarEnterRule() {
        this.addCarEnterRuleVisible = true;
        this.title = "新增规则";

      },
      deleteRule(index, row) {
          let params = row.name;
          this.$http.delCarRuleByName(params).then(() =>{
              this.$message({
                  message: '删除成功！',
                  type: 'success',
              })
          }).catch(err => {
              console.log('err', err);
          });
      },
      timestampToENDate1(value) {
        return timestampToENDate(value)
      },
      refreshData() {
        this.modInfoVisible = false;
        this.getEmployeeInfo();
      },
      // handleCancel(formName) {
      //   this.$refs[formName].resetFields();
      //   this.addAppVisible = false;
      // },
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
      // addRecentApp(appId) {
      //   this.$http.addRecentApp({appId: appId}).then(res => {
      //
      //   }).catch(err => {
      //     console.log('err', err);
      //   })
      // }
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
      this.queryCarEnterpriseRuleList();
    },
  }
</script>

<style scoped lang="less">
</style>
