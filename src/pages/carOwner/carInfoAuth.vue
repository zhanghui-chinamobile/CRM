<template>
    <!--<div style="padding: 30px">-->
  <section>
    <div v-show="!showInfoAuth">
      <el-col :span="24" class="toolbar">
        <el-form label-width="80px" style="width:500px;margin:auto" size="small">
          <el-form-item label="名称">
            <el-input v-model="name ? name : userInfo.nickname" disabled></el-input>
          </el-form-item>
          <el-form-item label="实名状态">
            <el-row>
              <el-col :span="6" v-if="authInfo.ext1 && authInfo.ext1==1" style="color: green">已实名</el-col>
              <el-col :span="6" v-else-if="authInfo.ext1 && authInfo.ext1==2" style="color: blue">审核中</el-col>
              <el-col :span="10" v-else style="color:red;">未实名</el-col>
              <el-col :span="14">
                <el-button size="small" style="background-color: #0054a7;color: #ffffff" @click="changeAuthInfo()" v-if="authInfo.ext1 && authInfo.ext1==1">实名信息变更</el-button>
                <el-button size="small" style="background-color: #0054a7;color: #ffffff" v-if="authInfo.ext1 && authInfo.ext1==1" @click="rAccountSe">解除绑定</el-button>
                <el-button size="small" style="background-color: #0054a7;color: #ffffff" v-if="authInfo.ext1 && authInfo.ext1==0" v-else @click="changeAuthInfo">实名信息认证</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      <el-form label-width="100px" style="width:500px;margin:auto" v-if="authInfo.ext1 && authInfo.ext1==1">
          <el-form-item label="企业名称">
              <el-input v-model="authInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="营业执照">
              <el-input v-model="authInfo.license" disabled></el-input>
          </el-form-item>
          <el-form-item label="通信地址">
              <el-input v-model="authInfo.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系人">
              <el-input v-model="authInfo.contactName" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
              <el-input v-model="authInfo.contactPhone" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div v-if="showInfoAuth">
      <CarInfoAuth :enterprise-info="authInfo" @returnParent="showQuery"></CarInfoAuth>
    </div>
  </section>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";
    import CarInfoAuth from "./carInfoAuth2";
    import {mapState} from "vuex";
    export default {
      components: {
        ElButton,
        CarInfoAuth
      },
      name: "car-info-auth",
      data() {
        return {
          showInfoAuth:false,
          authInfo: {},
            name:"",
            contactName:"",
            contactPhone:"",
        }
      },
      computed: {
        ...mapState({
            userInfo: state => state.userStore,
        })
      },
      created() {
         this.getEnterpriseInfo();

      },
      methods: {
        getEnterpriseInfo() {
          this.$http.getCarEnterprise({}).then(res => {
           if (res.data){
             this.authInfo = res.data.result;
           }
          }).catch(err => {
            console.log('err', err);
          });
        },
        rAccountSe(data) {
          this.$confirm('确定解除该帐号绑定?', '提示', {
            type: 'warring',
          }).then(() => {
            let params = {
              id: this.authInfo.id
            };
            this.$http.cancelTie(params).then(res => {
              this.$message({
                message: res.data.result,
                type: 'success',
              });
            }).catch(err => {
              console.log('err', err);
            });
          })
        },
        changeAuthInfo(){
          this.showInfoAuth = true;
        },
        showQuery(type){
          this.getEnterpriseInfo();
          this.showInfoAuth = false;
        },
          cancelTie() {
            this.$http.cancelTie().then(res => {
                this.$store.dispatch('getCarEnterprise',{})
            }).catch(error => {
                console.log('error',error);
            })
          },
      }
    }
</script>

<style scoped>

</style>
