<template>
  <section>
    <el-row :span="24" class="toolbar">
      <el-form :inline="true" :model="conditions" ref="conditions" size="small" style="padding-top: 20px;padding-left: 10px">
        <el-form-item>
          <el-input  v-model="conditions.ruleName" placeholder="规则名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryConfigItems" style="margin-left:800% ">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <c-table :table="tableData">
    </c-table>


    <div class="bottom" align="right"  style="margin-right: 10%;margin-top: 20%">
      <el-button type="primary" @click="queryConfigItems">确定</el-button>
    </div>

  </section>
</template>

<script>
  import CTable from "../../components/Table.vue";


  export default {
    name:"rule-search",
    components: {
      CTable,
    },
    data() {
      return {

        pushData: {},
        conditions: {
            ruleName: '',
        },
        tableData: {
        hasSelect: true,
        loading: false,
          data: '',
        columns: [
            {
              label: "规则名称",
              props: "name"
            },
            {
              label: "规则参数",
              props: "params"
            },
            {
              label: "规则描述",
              props: "description",
            },
            {
              label: "实现类",
              props: "implClass"
            },
            {
              label: "方法名",
              props: "method"
            },
            {
              label: "创建时间",
              props: "createTime",
              show: true
            },{
                label: "更新时间",
                props: "updateTime",
                show: true
            }
          ]
        },

      };
    },

    methods: {

      queryConfigItems(){
          this.$http.getAllRule().then((res) => {
            this.tableData.data = res.data.result;
          });
      },
    },
      created(){
        this.queryConfigItems();
      }
  }






</script>

<style>


</style>
