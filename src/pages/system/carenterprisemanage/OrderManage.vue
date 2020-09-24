<template>
    <el-row style="width:100%">
        <!-- headBar-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" size="small" :model="conditions">
                <el-form-item label="套餐名称">
                    <el-input v-model="conditions.name" placeholder="输入套餐名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <c-select :select="selectData" v-model="conditions.type"></c-select>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" @click="queryOrder" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--新增车企套餐-->
        <el-col :span="24">
            <el-button type="primary"
                       @click="addNewOrder"
                       icon="el-icon-plus"
                       style="float: right;margin-bottom: 10px" size="small">车企套餐
            </el-button>
            <el-dialog title="车企套餐 - 新增"
                       :visible.sync="addOrderDialogVisible"
                       width="50%">
                <AddOffer @closeAddNewOrder = "closeAddNewOrder" @queryOrder="queryOrder" :ruleData="ruleData"></AddOffer>
            </el-dialog>
        </el-col>
        <!-- table -->
        <el-col :span="24">
            <tree-table
                :columns="columns"
                :tree-structure="true"
                :data-source="tableData"
                :props="defaultProps"
                :defaultExpandAll="true"
                @add="handleAdd"
                @edit="handleEdit"
                @delete="handleDistory">
            </tree-table>
        </el-col>
        <!--编辑产品-->
        <el-dialog :title="prodTitle" :visible.sync="addProdDialogVisible">
            <add-prod :offerData="parentData" @queryOrder="queryOrder" @closeHandleAdd="closeHandleAdd"></add-prod>
        </el-dialog>
        <!--编辑属性-->
        <el-dialog title="修改套餐" :visible.sync="editOfferVisible" width="50%">
            <el-form
                ref="editDataForm"
                :model="editDataForm"
                :rules="myRules"
                :status-icon="true"
                :inline="true"
                size="small">
                <el-form-item label="套餐名称" prop="offerName">
                    <el-input v-model="editDataForm.name"></el-input>
                </el-form-item>
                <el-form-item label="套餐类型" prop="offerType">
                    <el-select v-model="editDataForm.type" placeholder="请选择套餐类型">
                        <el-option label="套餐" value="1"></el-option>
                        <el-option label="优惠" value="2"></el-option>
                        <el-option label="促销活动" value="3"></el-option>
                        <el-option label="营销活动" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联规则" prop="ruleId" placeholder="请选择关联规则">
                    <el-select v-model="editDataForm.ruleId">
                        <el-option v-for="item in ruleData"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id.toString()">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生效时间" prop="effectDate">
                    <el-date-picker
                        v-model="editDataForm.effectDate"
                        type="date"
                        placeholder="选择生效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="失效时间" prop="outDate">
                    <el-date-picker
                        v-model="editDataForm.outDate"
                        type="date"
                        placeholder="选择失效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="套餐描述">
                    <el-input type="textarea" v-model="editDataForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onEditSubmit('editDataForm')">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改产品" :visible.sync="editProductVisible">
            <el-form
                ref="editDataForm"
                :model="editDataForm"
                :rules="myRules"
                :status-icon="true"
                :inline="true"
                size="small">
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="editDataForm.name"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" prop="type" placeholder="请选择产品类型">
                    <el-select v-model="editDataForm.type">
                        <el-option label="功能产品" value="1"></el-option>
                        <el-option label="资费产品" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生效时间" prop="effectDate">
                    <el-date-picker
                        v-model="editDataForm.effectDate"
                        type="date"
                        placeholder="选择生效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="失效时间" prop="outDate">
                    <el-date-picker
                        v-model="editDataForm.outDate"
                        type="date"
                        placeholder="选择失效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="产品描述" prop="description">
                    <el-input type="textarea" v-model="editDataForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onEditSubmit('editDataForm')">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑产品属性值" :visible.sync="editAttributeVisible">
            <el-form ref="editDataForm"
                     :rules="myRules"
                     :model="editDataForm"
                     :inline="true"
                     :status-icon="true"
                     size="small"
                     label-width="120px;">
                <el-form-item label="属性名称" prop="name">
                    <el-input v-model="editDataForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop="key">
                    <el-input v-model="editDataForm.key" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源类型" prop="resType" placeholder="请选择资源类型">
                  <el-select v-model="editDataForm.resType" @click="changeUnit">
                    <!--<el-option label="通用" value="0"></el-option>-->
                    <el-option label="语音" value="1"></el-option>
                    <el-option label="流量" value="2"></el-option>
                    <el-option label="短信" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="属性值" prop="value">
                    <el-input v-model="editDataForm.value" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <!--<el-input v-model="editDataForm.unit" auto-complete="off"></el-input>-->
                  <el-select v-model="editDataForm.unit">
                    <!--<el-option label="通用" value="0"></el-option>-->
                    <el-option v-for="item in units" :label="item" :value="item" :key="item"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onEditSubmit('editDataForm')">提交</el-button>
            </div>
        </el-dialog>


        <el-dialog title="新增产品属性值" :visible.sync="addNewArgVisible">
            <el-form ref="argForm"
                     :rules="myRules"
                     :model="argForm"
                     :inline="true"
                     :status-icon="true"
                     size="small"
                     label-width="120px;">
                <el-form-item label="属性名称" prop="attributeName">
                    <el-input v-model="argForm.attributeName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop="attributeKey">
                    <el-input v-model="argForm.attributeKey" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源类型" prop="resType" placeholder="请选择资源类型">
                  <el-select v-model="argForm.resType" @change="changeUnit">
                    <!--<el-option label="通用" value="0"></el-option>-->
                    <el-option label="语音" value="1"></el-option>
                    <el-option label="流量" value="2"></el-option>
                    <el-option label="短信" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="属性值" prop="attributeValue">
                  <el-input v-model="argForm.attributeValue" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="attributeUnit">
                    <!--<el-input v-model="argForm.attributeUnit" auto-complete="off"></el-input>-->
                  <el-select v-model="argForm.attributeUnit">
                    <!--<el-option label="通用" value="0"></el-option>-->
                    <el-option v-for="item in units" :label="item" :value="item" :key="item"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm('argForm')">取消</el-button>
                <el-button type="primary" @click="submitMyForm('argForm')">确定</el-button>
            </div>
        </el-dialog>
      <el-dialog title="新增产品属性值" :visible.sync="addServiceCodeArgVisible">
        <CreateServiceCodeArg :parentProductId="parentProductId" :closeDialog="closeCSCADialog"></CreateServiceCodeArg>
      </el-dialog>

    </el-row>
</template>

<script>
    import CTable from '../../../components/Table.vue';
    import CSelect from '../../../components/Select.vue';
    import TreeTable from './treeTable';
    import AddProd from './AddProd';
    import AddOffer from './AddOffer';
    import CreateServiceCodeArg from './CreateServiceCodeArg'

    export default {
        name: "CompanyOrderManage",
        components: {
            CTable,
            CSelect,
            TreeTable,
            AddProd,
            AddOffer,
            CreateServiceCodeArg
        },
        data() {
            return {
              parentProductId:'',
                editDataForm:{
                    id:"",
                    name:"",
                    type:"",
                    ruleId:"",
                    effectDate:"",
                    outDate:"",
                    description:"",
                    key:"",
                    value:"",
                    unit:"",
                    resType:"",
                },
                units:[
                  "分钟"
                ],
                parentData:"",
                ruleData:[],
                addProdDialogVisible: false,
                editOfferVisible:false,
                editProductVisible:false,
                editAttributeVisible:false,
                addServiceCodeArgVisible:false,
                prodTitle: '',
                addOrderDialogVisible: false,
                editFormVisible: false,
                addNewArgVisible: false,
                editFormLoading: false,
                myFormTitle: '',

                conditions: {
                    orderName: '',
                    type: ''
                },
                argForm: {
                    attributeName: '',
                    attributeKey:"",
                    attributeValue: '',
                    attributeUnit: "",
                    resType:""
                },
                props1: {
                    'value': "id",
                    'label': 'category_name',
                },
                selectData: {
                    options: [{
                        value: "0",
                        text: "基本套餐",
                    }, {
                        value: "1",
                        text: "增值套餐",
                    }, {
                        value: '2',
                        text: '优惠套餐'
                    }],
                    clearable: true,
                    placeholder: "请选择套餐类型",
                },
                tableData: [],
                columns: [
                    {
                        text: '名称',
                        dataIndex: 'name'
                    },
                    {
                        text: '类型',
                        dataIndex: 'type',
                        mapping:function (data,levelIndex) {
                            switch (levelIndex) {
                                case 0:
                                    switch (data) {
                                        case 1:return "套餐";
                                        case 2:return "优惠";
                                        case 3:return "促销活动";
                                        case 4:return "营销活动";
                                        default:break;
                                    }
                                    break;
                                case 1:
                                    switch (data) {
                                        case 1:return "功能产品";
                                        case 2:return "资费产品";
                                        default:break;
                                    }
                                    break;
                            }

                        }
                    },
                    {
                        text: '描述',
                        dataIndex: 'description'
                    },
                    {
                        text: '生效时间',
                        dataIndex: 'createTime'
                    },
                    {
                        text: '失效时间',
                        dataIndex: 'updateTime'
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'category_name'
                },
                categorys: [],
                myForm: {
                    id: '',
                    orderName: '',
                    type: '',
                    workTime: '',
                    updateTime: '',
                    desc: '',
                    prodName: '',
                    prodType: '',
                    pworkTime: '',
                    pupdateTime: '',
                    pdesc: '',
                    prodKey: '',
                    prodValue: '',
                },
                myRules: {
                    orderName: [
                        {required: true, type: "string", message: '请填写产品名称', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择套餐类型', trigger: 'blur'}
                    ],
                    workTime: [
                        {required: true, message: '请选择生效时间', trigger: 'blur'}
                    ],
                    updateTime: [
                        {required: true, message: '请选择套餐类型', trigger: 'blur'}
                    ],
                    desc: [
                        {min: 0, max: 99, message: '请控制在2~99个字符', trigger: 'blur'},
                    ],
                    prodName: [
                        {required: true, type: "string", message: '请填写产品名称', trigger: 'blur'},
                    ],
                    prodType: [
                        {required: true, message: '请选择套餐类型', trigger: 'blur'}
                    ],
                    pworkTime: [
                        {required: true, message: '请选择生效时间', trigger: 'blur'}
                    ],
                    attributeName: [
                        {required: true, message: '请填写属性名称', trigger: 'blur'},
                    ],
                    attributeKey: [
                        {required: true, message: '请填写关键字', trigger: 'blur'},
                    ],
                    attributeValue: [
                        {required: true, message: '请填写属性值', trigger: 'blur'},
                    ],
                    attributeUnit: [
                        {required: true, message: '请填写属性单位', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请填写名称', trigger: 'blur'},
                    ],
                    ruleId: [
                        {required: true, message: '请选择规则', trigger: 'blur'},
                    ],
                    key: [
                        {required: true, message: '请填写关键字', trigger: 'blur'},
                    ],
                    value: [
                        {required: true, message: '请填写属性值', trigger: 'blur'},
                    ],
                    unit: [
                        {required: true, message: '请填写单位', trigger: 'blur'},
                    ],
                    resType: [
                        {required: true, message: '请选择资源类型', trigger: 'blur'},
                    ],

                },
            }
        },
        methods: {
            changeUnit(e) {
              switch (e){
                case "1":
                  this.units=["分钟"];
                  break;
                case "2":
                  this.units=["MB","GB"];
                  break;
                case "3":
                  this.units=["条"];
                  break;
              }
            },
            addNewOrder() {
                this.queryRules();
                this.addOrderDialogVisible = true;
            },
            closeAddNewOrder() {
                this.addOrderDialogVisible = false;
            },
            handleAdd(row) {
                const level = row._level + 1;
                if (level === 1) {
                    this.addProdDialogVisible = true;
                    this.prodTitle = '套餐 --> 新增产品';
                    this.parentData = row;
                } else if (level === 2) {
                  if(row.type === 1){
                    this.parentProductId = row.id;
                    this.addServiceCodeArgVisible=true;
                  }else{
                    this.addNewArgVisible = true;
                  }
                    this.parentData = row;
                }
            },
            closeHandleAdd(){
                this.addProdDialogVisible = false;
            },
            handleEdit(row, level) {
                this.editDataForm = row;
                if (level === 0) {
                    this.queryRules();
                    this.editDataForm.type = this.editDataForm.type.toString();
                    this.editOfferVisible = true;
                } else if (level === 1) {
                    this.editDataForm.type = this.editDataForm.type.toString();
                    this.editProductVisible = true;
                } else if (level === 2) {
                    this.editDataForm.resType = this.editDataForm.resType.toString();
                    this.changeUnit(this.editDataForm.resType);
                    this.editAttributeVisible = true;
                }
            },
            handleDistory(row) {
                let params = {
                    deleteLevel: row._level + 1,
                    id: row.id
                };
                this.$confirm('确认要删除该分类么?', '提示', {}).then(() => {
                    this.$http.delOffer(params).then(() => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        })
                        this.queryOrder();
                    })
                }).catch(error => {
                    console.log(error);
                });
            },
            onEditSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {
                            addLevel: this.editDataForm._level + 1,
                            id: this.editDataForm.id,
                            name: this.editDataForm.name,
                            ruleId:this.editDataForm.ruleId,
                            type:this.editDataForm.type,
                            key: this.editDataForm.key,
                            value: this.editDataForm.value,
                            unit: this.editDataForm.unit,
                            resType: this.editDataForm.resType,
                            description:this.editDataForm.description,
                            consumerType:1,
                            upProductId:this.editDataForm.upProductId,
                            status: 1,
                        };
                        this.addNewOne(params);
                    } else {
                        this.$message({
                            message: '编辑失败，请稍后重试！',
                            type: "warring"
                        })
                    }
                });
            },
            submitMyForm(argForm) {
                this.$refs[argForm].validate((valid) => {
                    if (valid) {
                        let params = {
                            addLevel: 3,
                            upProductId:this.parentData.id,
                            name: this.argForm.attributeName,
                            key: this.argForm.attributeKey,
                            value: this.argForm.attributeValue,
                            unit: this.argForm.attributeUnit,
                            resType: this.argForm.resType,
                            status: 1,
                        };
                        this.addNewOne(params);
                    } else {
                        this.$message({
                            message: '编辑失败，请稍后重试！',
                            type: "warring"
                        })
                    }
                });
            },
            addNewOne(params) {
                this.$http.addNewOffer(params).then(() => {
                    if(params && params.id && params.id > 0){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '套餐添加成功',
                            type: 'success'
                        });
                    }
                    this.addNewArgVisible = false;
                    this.editOfferVisible = false;
                    this.editProductVisible = false;
                    this.editAttributeVisible = false;
                    this.queryOrder();
                }).catch(error => {
                    console.log(error)
                })
            },
            closeForm(myForm) {
                this.editFormVisible = false;
                this.$refs[myForm].resetFields();
                this.myForm = {
                    id: 0,
                    orderName: '',
                    type: '',
                    workTime: '',
                    updateTime: '',
                    desc: '',
                    prodName: '',
                    prodType: '',
                    pworkTime: '',
                    pdesc: '',
                    prodKey: '',
                    prodValue: '',
                };
            },
            queryOrder() {
                let params = this.conditions;
                this.$http.getOfferList(params).then((res) => {
                    this.tableData = res.data.result;
                }).catch(error => {
                    console.log('error', error);
                })
            },
            queryRules() {
                this.$http.getAllRule().then((res) => {
                    this.ruleData = res.data.result;
                }).catch(error => {
                    console.log("error", error);
                })
            },
          closeCSCADialog(){
              this.addServiceCodeArgVisible=false;
              this.queryOrder();
          }
        },
        created() {
            this.queryOrder();
        }
    }
</script>
<style scoped>
</style>
