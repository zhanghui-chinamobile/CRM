<template>
  <section>
    <el-row :span="24">
      <el-col :offset="6" :span="12">
        <el-form ref="car" :model="product" :rules="rules" label-width="100px" style="padding-left: 130px">
          <el-form-item label="用户名:">
            <el-input v-model="car.userName" style="width: 350px;margin-left: 20px"></el-input>
          </el-form-item>

          <el-form-item label="实名状态:" prop="name">
            <span>已实名</span>
            <el-button type="primary" v-if="this.car.isReal">实名信息变更</el-button>
            <el-button type="primary" v-if="this.car.isReal">实名绑定</el-button>
            <el-button type="primary" v-if="!this.car.isReal">实名信息认证</el-button>
          </el-form-item>

          <el-form-item label="企业名称:" prop="name">
            <el-input v-model="car.userName" style="width: 350px;margin-left: 20px"></el-input>
          </el-form-item>

          <el-form-item label="营业执照:" prop="name">
            <el-input v-model="car.userName" style="width: 350px;margin-left: 20px"></el-input>
          </el-form-item>

          <el-form-item label="通信地址:" prop="name">
            <el-input v-model="car.userName" style="width: 350px;margin-left: 20px"></el-input>
          </el-form-item>

          <el-form-item label="联系人:" prop="name">
            <el-input v-model="car.userName" style="width: 350px;margin-left: 20px"></el-input>
          </el-form-item>

          <el-form-item label="联系方式:" prop="name">
            <el-input v-model="car.userName" style="width: 350px;margin-left: 20px"></el-input>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    export default {
        name: "CarRealInfoSearch",
        methods:{

        },
        data(){
          return{
            car:{
              userName:"",
              isReal:true

            }
          }
        }
    }
</script>

<style scoped>

</style>
