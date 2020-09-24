<template>
  <section>
      <el-col :span="24" class="toolbar">
          <el-row>
              <el-form :inline="true" :model="conditions" size="small">
                  <el-form-item label="月份">
                      <el-date-picker
                          v-model="date"
                          type="date"
                          placeholder="查询日期" label="月份">
                      </el-date-picker>
                  </el-form-item>
              </el-form>
            </el-row>
      </el-col>
      <el-col>
          <el-form :inline="true">
              <span style="font-size: 15px;background-color: #fff;border-radius: 3px;padding: 5px;line-height: 30px">所有流量池</span>
              <el-button style="margin-bottom:10px;float:right" type="primary" size="small" @click="addNewPool">新增流量池</el-button>
          </el-form>
      </el-col>
    <CTable :table="roleTable">
      <template slot-scope="props" slot="button-operation">
        <el-tooltip effect="dark" content="退订" placement="top-start">
          <el-button type="danger" icon="el-icon-delete"  size="mini"
                     @click="deletePool(props.obj.$index, props.obj.row)">
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="使用详情" placement="top-start">
          <el-button type="info" size="mini" icon="el-icon-info"
                     @click="checkInfo(props.obj.$index, props.obj.row)">
          </el-button>
        </el-tooltip>
      </template>
    </CTable>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"  :current-page.sync="pagesync" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog :title="title" :visible.sync="addNewVisible" width="60%" height="30%">
      <add-new-pool></add-new-pool>
    </el-dialog>

    <el-dialog :title="title1" :visible.sync="poolInfoVisible" width="60%" height="30%">
      <pool-info></pool-info>
    </el-dialog>

  </section>
</template>

<script>
  import CTable from '../../components/Table.vue';
  import addNewPool from './carenterprisemanage/addNewPool';
  import poolInfo from './carenterprisemanage/PoolInfo';

  export default {
    name: "FlowPoolManage",
    components: {
      CTable,
      addNewPool,
      poolInfo
    },
    data(){
      return{
        date: '',
        roleName: '',
        addNewVisible: false,
        poolInfoVisible: false,
          title:"新增流量池",
          title1:"使用详情",
        tempData: [
          {
            poolName: "test1",
            poolUsers: '2333',
            total: 20480,
            usage: 20110,
            rest: 20480-20110,
          }, {
            poolName: "test1",
            poolUsers: '2333',
            total: 20480,
            usage: 20110,
            rest: 20480-20110,
          }
        ],
        roleTable: {
          columns: [
            {
              label: "流量池名称",
              props: "poolName",
            },
            {
              label: "流量池用户数",
              props: "poolUsers",
            },
            {
              label: "总量(MB)",
              props: "total",
            },
            {
              label: "使用量(MB)",
              props: "usage",
            },
            {
              label: "剩余量(MB)",
              props: "rest",
            },
          ],
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label: "操作",
            data: []
          },
        },

        page: 0,
        pagesync:this.page+1,
        total: 0

      }
    },
    methods: {
      getPoolInfo(){
        this.roleTable.data = this.tempData;
        console.log(this.tempData)
      },
      addNewPool(){
        this.addNewVisible = true;
      },
      deletePool(index, row){
        console.log(123);
        this.$confirm('删除该流量池？', '提示',{
          type: 'warring'
        }).then(() => {
          this.message({
            message: '删除成功',
            type: 'success'
          }).catch( error => {
            console.log('err' , error);
          })
        })
      },
      checkInfo(index, row){
        this.poolInfoVisible = true;

      },
      handleCurrentChange(currentPage) {
        this.page = currentPage - 1;
      },
    },
    created(){
      this.getPoolInfo();
    },
  };
</script>

<style scoped>

</style>
