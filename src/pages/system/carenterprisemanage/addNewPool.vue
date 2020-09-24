<template>
  <section>
    <div class="toolbar">
      <span>流量池名称:
        <el-input style="width: 200px"></el-input>
      </span>
      <el-button @click="getPoolInfo">查询</el-button>
    </div>

    <div>
        <pool-table :table="tableDataA"></pool-table>
        <pool-table :table="tableDataB"></pool-table>
        <el-button type="primary" size="small" @click="submitData">确认</el-button>
    </div>
  </section>
</template>

<script>
  import poolTable from '../../../components/Table.vue';

  export default {
    name: "addNewPool",
    components: {
      poolTable,
    },
    data(){
      return{
        tableDataA: {
          columns: [
            {
              label: "流量池名称",
              props: "poolName",
            },
            {
              label: "套餐状态",
              props: "poolUsers",
            },
            {
              label: "生效时间",
              props: "workTime",
            },
            {
              label: "失效时间",
              props: "outTime",
            },
          ],
            data: [
                {
                    poolName: "流量池-2018-09",
                    poolUsers: "1192",
                    workTime: "2018-09",
                    outTime: "2019-09"
                }, {
                    poolName: "流量池-2018-07",
                    poolUsers: "2192",
                    workTime: "2018-07",
                    outTime: "2019-09"
                }, {
                    poolName: "流量池-2017-07",
                    poolUsers: "2292",
                    workTime: "2018-07",
                    outTime: "2019-09"
                }
            ],
            hasSelect: true,
        },
        tableDataB: {
          columns: [
            {
              label: "产品名称",
              props: "proName",
            },
            {
              label: "产品状态",
              props: "proStatus",
            },
            {
                label: "生效时间",
                props: "workTime",
            },
            {
                label: "失效时间",
                props: "outTime",
            },
          ],
        data: [
            {
                proName: '不限量流量套餐',
                proStatus: '生效',
                workTime: '2018-07-06',
                outTime: '2018-09-09'

            }, {
                proName: '限量限速',
                proStatus: '生效',
                workTime: '2018-05-06',
                outTime: '2018-09-09'
            }, {
                proName: '免费视频通话',
                proStatus: '生效',
                workTime: '2018-08-09',
                outTime: '2018-09-09'
            }
        ],
        },

      }
    },
    methods: {
      submitData(){
        alert("数据提交");
      },
    }
  }
</script>

<style scoped>

</style>
