<template>
  <section>
    <el-row class="toolbar">
      <el-form :model="condition" :inline="true" ref="simForm" size="small" class="toolbar">
        <el-form-item label="apn:">
          <el-input v-model="condition.apnName" style="width: 250px" placeholder="请输入apn"/>
        </el-form-item>
        <el-form-item label="serviceCode:">
          <el-input v-model="condition.serviceCode" style="width: 250px" placeholder="请输入serviceCode"/>
        </el-form-item>
        <el-button style="float: right" type= "primary" @click="queryServiceCode()" >查询</el-button>
      </el-form>
    </el-row>
    <el-row>
      <my-table :table="tableData" :tableEvents="tableEvents"/>
    </el-row>
    <div style="clear: both;"></div>
  </section>
</template>

<script>
  import MyTable from '../../../components/Table.vue'
    export default {
        name: "CreateServiceCodeArg",
      components:{
        MyTable
      },
      data(){
          return {
            condition:{
              serviceCode:'',
              apnName:''
            },
            tableData: {
              data:[],
              columns:[
                {
                  label: "apn名称",
                  props: "apnName",
                },
                {
                  label: "serviceCode",
                  props: "serviceCode",
                },
                {
                  label:"功能",
                  props:'serviceTypeName'
                }
              ],
            },
            tableEvents: {
              rowDbClick: this.selectServiceCode
            },
          }
      },
      methods:{
        queryServiceCode(){
          this.$http.getServiceCodeWithCondition(this.condition).then(res=>{
            let tableData = res.data.result;
            tableData.forEach(item =>{
              switch (item.serviceType) {
                case 1:item.serviceTypeName = "语音";break;
                case 2:item.serviceTypeName = "流量";break;
                case 3:item.serviceTypeName = "短信";break;
                default:break;
              }
            })
            this.tableData.data = tableData;
          })
        },
        selectServiceCode(row){
          let params = {
            serviceCode:row.serviceCode,
            upProductId:this.parentProductId
          }
          this.$http.addServiceCodeAttribute(params).then(res=>{
            this.$message({
              message: '添加属性成功',
              type: 'success'
            });
          })
          this.closeDialog()
        }
      },
      props:{
          parentProductId:'',
          closeDialog:''
      }
    }
</script>

<style scoped>

</style>
