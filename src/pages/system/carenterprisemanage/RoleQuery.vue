<template>
  <section>
    <el-row>
      <span>规则名称: </span>
      <el-input type="text" v-model="roleName" placeholder="请输入需要查询的规则名称"></el-input>
    </el-row>
    <CTable :table="roleTable">

    </CTable>
    <el-row >
      <el-button style="margin-bottom:10px;float:right" type="primary" size="small" @click="submit" >确认</el-button>
    </el-row>
  </section>
</template>

<script>
  import CTable from '../../../components/Table.vue';

  export default {
    name: "RoleQuery",
    components: {
      CTable,
    },
    data(){
      return {
        roleName: '',
        roleTable: {
          columns: [
            {
              label: "规则名称",
              props: "roleName",
            }, {
              label: "规则参数",
              props: "roleArg",
            }, {
              label: "规则描述",
              props: "roleDesc",
            }, {
              label: "实现类",
              props: "className",
              show: true
            }, {
              label: "方法名",
              props: "methodName",
              show: true,
            }, {
              label: "创建时间",
              props: "createTime",
              show: true
            }
          ],
          data: '',
          hasSelect: true,
          loading: false
        }
      }

    },
    methods: {
        roleQuery(){

        },
      submit(){
        alert("确认！");
      }
    },
      created(){
        this.roleQuery();
      }
  }
</script>

<style scoped>

</style>
