<template>
    <el-container>
        <el-row>
            <el-form :model="dataPoolForm" ref="dataPoolForm" size="small" class="creatData" :rules="rules" label-width="100px">

                <el-form-item label="流量池名称" prop="dataPoolName">
                    <el-input v-model="dataPoolForm.dataPoolName" style="width: 250px" placeholder="请输入流量池名称"/>
                </el-form-item>

                <el-form-item size="small" label="单位" prop="unit">
                    <el-select v-model="dataPoolForm.unit" @change="clearTotal" placeholder="请选择流量单位">
                        <el-option label="MB" value="M"></el-option>
                        <el-option label="GB" value="G"></el-option>
                        <el-option label="TB" value="T"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="数量" prop="total">
                    <el-input v-model="dataPoolForm.total" style="width: 200px" placeholder="请输入数量"/>
                </el-form-item>

                <el-form-item size="small" label="超套规则" prop="overflowRule">
                    <el-select v-model="dataPoolForm.overflowRule" placeholder="请选择超套规则">
                        <el-option label="按0.13元/M批价" value='1'></el-option>
                        <el-option label="按0.19元/M批价" value='2'></el-option>
                        <el-option label="停机" value='3'></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item size="small" label="生失效时间" prop="orderTime">
                    <el-date-picker
                        v-model="dataPoolForm.orderTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createDataPool()">确定</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: "CreateDataPool",
        data() {
            return {
                dataPoolForm: {
                    dataPoolName: '',
                    unit: '',
                    total: '',
                    overflowRule: '',
                    orderTime: []
                },
                rules: {
                    dataPoolName: [
                        {required: true, message: '请输入流量池名称', trigger: 'blur'}
                    ],
                    unit: [
                        {required: true, message: '请选择流量单位', trigger: 'blur'}
                    ],
                    total: [
                        {required: true, message: '请输入数量', trigger: 'blur'}
                    ],
                    overflowRule: [
                        {required: true, message: '请选择套餐规则', trigger: 'blur'}
                    ],
                    orderTime: [
                        {required: true, message: '请选择生失效时间', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            createDataPool() {
                this.$refs['dataPoolForm'].validate((valid) => {
                        if (valid) {
                            let params = {
                                name: this.dataPoolForm.dataPoolName,
                                total: this.dataPoolForm.total,
                                unit: this.dataPoolForm.unit,
                                overflowRule: this.dataPoolForm.overflowRule,
                                effTime: this.dataPoolForm.orderTime[0].getTime(),
                                expTime: this.dataPoolForm.orderTime[1].getTime()
                            };
                            if (this.dataPoolId && this.dataPoolId != 0) {
                                //edit
                                params.id = this.dataPoolId;
                                this.$http.editDataPool(params).then(res => {
                                    this.$notify({
                                        title: "修改流量池成功",
                                        type: 'success',
                                        duration: 3000
                                    })
                                })
                            } else {
                                //create
                                this.$http.createDataPool(params).then(res => {
                                    this.$notify({
                                        title: "创建流量池成功",
                                        type: 'success',
                                        duration: 3000
                                    })
                                })
                            }
                            this.closeDialog();
                        }
                });
            },
            clearTotal() {
                this.dataPoolForm.total = ''
            }
        },
        props: {
            dataPoolId: '',
            closeDialog: ''
        },
        created() {
            //初始化
            if (this.dataPoolId != 0) {
                let params = {
                    id: this.dataPoolId
                };
                this.$http.getDataPoolById(params).then(res => {
                    let result = res.data.result;
                    let formData = {
                        dataPoolName: result.name,
                        unit: result.unit,
                        total: result.total,
                        overflowRule: '' + result.overflowRule,
                        orderTime: [new Date(result.effectiveTime), new Date(result.expireTime)]
                    }
                    this.dataPoolForm = formData;
                })
            }
        }
    }
</script>

<style>
    .creatData {
        padding: 10px;
        margin: 0 auto;
        width: 600px;
    }

    .creatData .el-form-item .el-form-item__content {
        margin-right: 40px;
        height: 32px;
        width: 600px !important;
    }
</style>
