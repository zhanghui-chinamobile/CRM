<template>
    <section>
        <el-form :model="order" ref="orderForm" size="small" class="orderData">
            <el-form-item label="车企:" v-if="userInfo.userType==1">
                <el-input v-model="order.userName" style="width: 250px" @focus="userDialogVisible=true" placeholder="请选择车企"/>
            </el-form-item>
            <el-form-item label="流量池:">
                <el-input v-model="order.dataPoolName" style="width: 250px" @focus="dataPoolDialogVisible=true" placeholder="请选择流量池"/>
            </el-form-item>
            <el-form-item size="small" label="生失效时间:">
                <el-date-picker
                    v-model="order.orderTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
            </el-form-item>
            <div class="footer">
              <el-button type= "primary" @click="orderDataPoolAction()" >订购</el-button>
            </div>
        </el-form>

        <el-dialog title="车企选择" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false" append-to-body>
            <CarEnterpriseList @dealSelectRow="getSelected"></CarEnterpriseList>
        </el-dialog>
        <el-dialog title="流量池选择" :visible.sync="dataPoolDialogVisible" width="80%" :close-on-press-escape="false" append-to-body>
            <UpDataPoolList @dealSelectRow="getSelectedDataPool"></UpDataPoolList>
        </el-dialog>
    </section>


</template>

<script>
    import CarEnterpriseList from "../report/CarEnterpriseList"
    import UpDataPoolList from "../system/UpDataPoolList"
    export default {
        name: "OrderDataPool",
        components: {
            UpDataPoolList,
            CarEnterpriseList
        },
        computed:{
        },
        data(){
            return {
                userDialogVisible:false,
                dataPoolDialogVisible:false,
                order:{
                    userId:'',
                    userName:'',
                    orderTime:[],
                    dataPoolName:'',
                    dataPoolId:''
                }
            }
        },
        methods:{
            orderDataPoolAction(){
                let params = {
                    userId:this.order.userId,
                    dataPoolId:this.order.dataPoolId,
                    effDate:this.order.orderTime[0].getTime(),
                    expDate:this.order.orderTime[1].getTime()
                }
                this.$http.orderDataPool(params).then(res =>{
                    this.$notify({
                        title: "订购成功",
                        type: 'success',
                        duration: 3000
                    })
                    this.closeOrderDialog();
                })
            },
            getSelectedDataPool(row){
                this.dataPoolDialogVisible = false;
                this.order.dataPoolId = row.id;
                this.order.dataPoolName = row.name;
            },
            getSelected(row){
                this.userDialogVisible = false;
                this.order.userId = row.id;
                this.order.userName = row.name;
            }
        },
        props:{
            dataPoolId:'',
            closeOrderDialog:''
        },
        computed: {
          userInfo() {
            return this.$store.getters.userInfo;
          }
        },
        created() {
          if (this.userInfo.userType == 2){
            this.order.userId = this.userInfo.id;
            this.order.userName = this.userInfo.nickname;
          }
        }
    }
</script>

<style>
    .orderData{
        padding: 10px;
        margin: 0 auto;
        width: 600px;
    }
    .orderData .el-form-item .el-form-item__content{
        margin-right: 40px;
        height: 32px;
        width: 600px !important;
    }
    .footer {
      text-align: center;
    }
</style>
