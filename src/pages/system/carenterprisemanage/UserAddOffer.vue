<template>
    <section>
        <el-row>
            <el-form
                ref="offerForm"
                :model="offerForm"
                :rules="formRules"
                :status-icon="true"
                :inline="true"
                size="small">
                <el-form-item label="选择车企" prop="enterpriseName" style="width: 40%">
                  <el-input v-model="offerForm.enterpriseName" @focus="userDialogVisible=true" placeholder="请选择车企" :disabled="userInfo.userType==2"/>
                </el-form-item>
                <el-form-item label="套餐名称" prop="offerName" style="width: 40%">
                    <el-input v-model="offerForm.offerName"></el-input>
                </el-form-item>
                <el-form-item label="套餐类型" prop="offerType" style="width: 40%">
                    <el-select v-model="offerForm.offerType" placeholder="请选择套餐类型">
                        <el-option label="套餐" value="1"></el-option>
                        <el-option label="优惠" value="2"></el-option>
                        <el-option label="促销活动" value="3"></el-option>
                        <el-option label="营销活动" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关停限额" prop="mount" placeholder="请输入车主信用额度" style="width: 40%">
                    <el-input v-model="offerForm.closeNum">
                        <el-select v-model="offerForm.closeNumUnit" slot="append" placeholder="单位" size="small" style="width: 20px">
                            <el-option label="M" value="1"></el-option>
                            <el-option label="G" value="2"></el-option>
                            <el-option label="T" value="3"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <!--<el-form-item label="关联规则" prop="ruleId" placeholder="请选择关联规则">
                    <el-select v-model="offerForm.ruleId">
                        <el-option v-for="item in ruleData"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="生效时间" prop="effectDate" style="width: 40%">
                    <el-date-picker
                        v-model="offerForm.effectDate"
                        type="date"
                        placeholder="选择生效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="失效时间" prop="outDate" style="width: 40%">
                    <el-date-picker
                        v-model="offerForm.outDate"
                        type="date"
                        placeholder="选择失效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="套餐描述" style="width: 40%">
                    <el-input type="textarea" v-model="offerForm.description"></el-input>
                </el-form-item>
            </el-form>
        </el-row>
      <el-row>
        <el-button @click="onSubmit('offerForm')" style="float: right">提交</el-button>
      </el-row>
      <el-dialog title="车企选择" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false" append-to-body>
        <CarEnterpriseList @dealSelectRow="getSelected"></CarEnterpriseList>
      </el-dialog>
    </section>
</template>

<script>
    import CSelect from '../../../components/Select';
    import CarEnterpriseList from "../../report/CarEnterpriseList";
    import {mapGetters, mapMutations} from 'vuex';
    export default {
        name: 'UserAddOffer',
        components: {
            CSelect,
          CarEnterpriseList
        },
        props:['ruleData'],
        data() {
            return {
              userDialogVisible:false,
              offerForm: {
                enterpriseId: 0,
                enterpriseName: '',
                offerName: "",
                offerType: "1",
                effectDate: '',
                outDate: '',
                description: '',
                ruleId: '',
                closeNum: '',
                closeNumUnit: ''
              },
              formRules: {
                enterpriseName: [
                  {required: true, message: '请选择车企！', trigger: 'blur'}
                ],
                offerName: [
                  {required: true, message: '请输入套餐名称！', trigger: 'blur'}
                ],
                offerType: [
                  {required: true, message: '请选择套餐类型！', trigger: 'blur'}
                ],
                effectDate: [
                  {required: true, type: 'date', message: '请选择生效时间！', trigger: 'blur'}
                ],
                outDate: [
                  {required: true, type: 'date', message: '请选择失效时间！', trigger: 'blur'}
                ],
              }
            }
        },
        methods: {
            onSubmit(offerForm) {
                this.$refs[offerForm].validate((valid) => {
                    if (valid) {
                        let params = {
                            addLevel: 1,
                            name: this.offerForm.offerName,
                            consumerType: 2,
                            type: this.offerForm.offerType,
                            description: this.offerForm.description,
                            ruleId: this.offerForm.ruleId,
                            status: 1,
                            ext1: this.offerForm.enterpriseId,
                            ext3:this.offerForm.closeNum+this.offerForm.closeNumUnit
                        };
                        this.$http.addNewOffer(params).then(() => {
                            this.$message({
                                message: '套餐添加成功',
                                type: 'success'
                            })
                            this.$emit("closeAddNewOrder", true);
                            this.$emit("queryOrder", true);
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                });
            },
            getSelected(row){
              this.offerForm.enterpriseId = row.id;
              this.offerForm.enterpriseName = row.name;
              this.userDialogVisible = false;
            },
            queryRules() {
                let tempData = '';
                this.$http.getAllRule().then((res) => {
                    tempData = res.data.result;
                }).catch(error => {
                    console.log("error", error);
                })
            }
        },
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      },
      created() {
        if (this.userInfo.userType == 2){
          this.offerForm.enterpriseId = this.userInfo.id;
          this.offerForm.enterpriseName = this.userInfo.nickname;
        }
      }
    }

</script>
