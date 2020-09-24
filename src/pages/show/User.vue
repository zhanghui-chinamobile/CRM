<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="conditions" size="small">
        <el-form-item label="产品名称">
          <el-input v-model="conditions.creatorName"placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <c-select :select="typeSelectData" v-model="conditions.Type"></c-select>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 产品列表 -->
<!--    <c-table :table="tableData">
      <template slot-scope="props" slot="button-operation">
        <el-form label-position="left" inline class="demo">
          <el-form-item label="产品标识">
            <span>{{ props.row.slogn }}</span>
          </el-form-item>
          <el-form-item label="产品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="产品类型">
            <span>{{ props.row.Type }}</span>
          </el-form-item>

        </el-form>
      </template>
    </c-table>-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        label="产品名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="产品类型"
        prop="name">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="desc">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

    </el-table>
    <!--显示信息以及按钮-->
    <!--<el-col style="padding-right: 20px">-->
      <!--<el-button type="primary" @click="submitForm('ruleForm')" style="float: right">确定</el-button>-->
    <!--</el-col>-->
  </section>
</template>

<script>
  import CSelect from "../../components/Select";
  import CTable from "../../components/Table";
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  export default {
    name: "ProductQuery",
    components: {CTable, CSelect},
    data(){
      return{
        conditions:{},
        typeSelectData:{
          options:[
            {
              value:"1",
              text:"功能产品1",
            },
            {
              value: "2",
              text: "功能产品2",
            }
          ],
          clearable:true,
          placeholder:"请选择产品类型",
        },
        tableData: [{
          id: '产品1',
          name: '功能产品',
          category: '江浙小吃、小吃零食',
          desc: '2018-10-1',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },{
          id: '产品2',
          name: '功能产品',
          category: '江浙小吃、小吃零食',
          desc: '2018-10-2',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },{
          id: '产品3',
          name: '功能产品',
          category: '江浙小吃、小吃零食',
          desc: '2018-10-3',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },]
       /* tableData: {
          loading: false,
          hasSelect: true,
          data: [],
          columns: [
            {
              label: "产品名称",
              props: "name",
            },    {
              label: "产品类型",
              props: "Type",
            },
            {
              label: "创建时间",
              props: "creatTime"
            }
          ],
          operation: {
            data: []
          }
        }*/
      }
    },
    computed: {},
    methods: {
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
      getUsers() {
        let date = {
          creatorName: this.conditions.creatorName,
        };
        this.tableData.data = [
          {
            name: '产品1',
            Type: '功能产品',
            creatTime: '2018-10-1'
          },
          {
            name: '产品2',
            Type: '功能产品',
            creatTime: '2018-10-2'
          }]
      }
    },
    created() {
      let itmes = [
        {
          name: "产品信息",
          icon: "fa fa-windows",
          path: "/shows-billing",
        },
      ];
      this.setBreadcrumbItems(itmes);
      this.getUsers();
    },
  }
</script>
<style scoped>

</style>
