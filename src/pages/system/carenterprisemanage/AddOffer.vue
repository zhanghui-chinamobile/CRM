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
                <el-form-item label="套餐名称" prop="offerName">
                    <el-input v-model="offerForm.offerName"></el-input>
                </el-form-item>
                <el-form-item label="套餐类型" prop="offerType">
                    <el-select v-model="offerForm.offerType" placeholder="请选择套餐类型">
                        <el-option label="套餐" value="1"></el-option>
                        <el-option label="优惠" value="2"></el-option>
                        <el-option label="促销活动" value="3"></el-option>
                        <el-option label="营销活动" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联规则" prop="ruleId" placeholder="请选择关联规则">
                    <el-select v-model="offerForm.ruleId">
                        <el-option v-for="item in ruleData"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生效时间" prop="effectDate">
                    <el-date-picker
                        v-model="offerForm.effectDate"
                        type="date"
                        placeholder="选择生效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="失效时间" prop="outDate">
                    <el-date-picker
                        v-model="offerForm.outDate"
                        type="date"
                        placeholder="选择失效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="套餐描述">
                    <el-input type="textarea" v-model="offerForm.description"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="onSubmit('offerForm')" style="float: right">提交</el-button>
        </el-row>
    </section>
</template>

<script>
    import CSelect from '../../../components/Select'
    import {mapGetters, mapMutations} from 'vuex';
    export default {
        name: 'AddNewProduction',
        components: {
            CSelect,
        },
        props:['ruleData'],
        data() {
            return {
                offerForm: {
                    offerName: "",
                    offerType: '',
                    effectDate: '',
                    outDate: '',
                    description: '',
                    ruleId: ''
                },
                formRules: {
                    offerName: [
                        {require: true, type: 'string', message: '请输入套餐名称！', trigger: 'blur'}
                    ],
                    offerType: [
                        {require: true, message: '请选择套餐类型！', trigger: 'blur'}
                    ],
                    effectDate: [
                        {require: true, type: 'date', message: '请选择生效时间！', trigger: 'blur'}
                    ],
                    outDate: [
                        {require: true, type: 'date', message: '请选择失效时间！', trigger: 'blur'}
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
                            consumerType: 1,
                            type: this.offerForm.offerType,
                            description: this.offerForm.description,
                            ruleId: this.offerForm.ruleId,
                            status: 1,
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
                    } else {
                        this.$message({
                            message: '请正确填写表单！',
                            type: "warring"
                        })
                    }
                });
            },
            queryRules() {
                let tempData = '';
                this.$http.getAllRule().then((res) => {
                    tempData = res.data.result;
                }).catch(error => {
                    console.log("error", error);
                })
            }
        }
    }

</script>
