<template>
  <section>
    <el-form :model="conditions" size="small" class="addRole">
      <el-form-item label="缴费金额">
        <el-input v-model="conditions.count" placeholder="请输入金额" size="small"></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  export default {
    name: "pay-fee",
    props:{
      id:"",
      fee:"",
    },
    data(){
      return {
        operationName: '新增用户',
        option: '',
        options:[{
          value:"1",
          text:"运营商",
        },{
          value:"2",
          text:"车企",
        },{
          value:"3",
          text:"车主",
        }],
        conditions: {
          count:""
        },
        condition:''

      }
    },
    methods:{
      ...
        mapMutations({
          setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
        }),
      addMoney(){
        if(this.conditions.count == ""  || this.conditions.count == null){
          this.$message({
            message:"请输入缴费金额",
            type:"error",
          });
          return;
        }
        let params = {
          id:this.id,
          fee:this.fee,
          ext1: this.conditions.count
        };
        this.$http.payMoney(params).then((res) => {
          if ("success" == res.data.result) {
            this.$message({
              message:"缴费成功",
              type:"success",
            });
            this.conditions.count = '';
            this.$emit('refreshData','success');
            return "success";
          } else {
            this.$message({
              message:"缴费失败",
              type:"error",
            });
            return "error";
          }
        }).catch(err => {
          console.log('err',err);
          return "error";
        });
      },
      changeAppEnv(){
        console.log(this.conditions.roleName);
      }
    },
    created() {
        this.conditions.count = 0-this.fee;
      let itmes = [
        {
          name: "缴费",
          icon: "fa fa-windows",
        },
      ];
      this.setBreadcrumbItems(itmes);
    }
    ,
  }
</script>

<style>
  .addRole{
    padding: 10px;
    margin: 0 auto;
    width: 300px;
  }

  .addRole .el-form-item .el-form-item__content{
    margin-right: 40px;
    height: 32px;
    width: 400px !important;
  }
</style>
