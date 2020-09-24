<template >
  <el-tabs type="border-card" >
    <el-tab-pane  :label="label">
      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
        <el-form-item label="车企名称" class="formItem">
          <el-input v-model="form.mingcheng" ></el-input>
        </el-form-item>
        <el-form-item label="营业执照" class="formItem" prop="zhizhao">
          <el-input v-model="form.zhizhao"></el-input>
        </el-form-item>
        <el-form-item label="联系人" class="formItem" prop="lianxi">
          <el-input v-model="form.lianxi"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" class="formItem" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" class="formItem" prop="zhanghao">
          <el-input v-model="form.zhanghao"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" class="formItem" prop="mima">
          <el-input v-model="form.mima"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="formItem" prop="state">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newInfo">新增</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {REGEXP_MOBILE} from '../../common/regexp'
  import {CHECK_PASSWORD} from '../../common/regexp'
  import {updatePassword} from "../../api/api";
  import OperationLog from './OperationLog.vue';
  import {mapGetters,mapMutations} from 'vuex';
  import types from "../../store/mutation-types";

  export default {
    name: "car-enterprise-update",
    props: {
      CarEnterpriseInfo: {},
      Type:"",
    },
    data() {
      var cheqi = {
        mingcheng:'',
        zhizhao:'',
        lianxi:'',
        phone:'',
        zhanghao:'',
        mima:'',
        state:''
      }
      return {
        operate:'',
        label:'新增车企信息',
        form: {
          mingcheng: cheqi.mingcheng,
          zhizhao: cheqi.zhizhao,
          lianxi: cheqi.lianxi,
          phone: cheqi.phone,
          zhanghao: cheqi.zhanghao,
          mima: cheqi.mima,
          state: cheqi.state
        },
        rules: {
          mingcheng: [
            {required: true, message: '名称不可为空', trigger: 'blur'}
          ],
          mima: [
            { required: true, message: '新密码不可为空', trigger: 'blur' },
            { pattern: CHECK_PASSWORD, message: '密码6-16个字符，只能由英文字母和数字加下划线组成', trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    methods: {
      updateInfo () {
        this.$refs['form'].validate((valid) => {
          if (valid) {

            this.$store.dispatch('update', this.form).then(() => {
              this.$notify({
                title: '成功',
                message: '基本信息更新成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {

            return false
          }
        })
      },
      newInfo (){

      }
    },
    created() {
      this.operate = this.Type;
      if(this.operate == 'update'){
        this.form = this.CarEnterpriseInfo;
        this.label = '修改车企信息';
      }

    },
    mounted() {
    },
  }
</script>

<style scoped>
  .formItem{
    width: 80%;
    min-width: 200px;
  }
</style>
