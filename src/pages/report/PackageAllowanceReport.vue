<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="conditions" ref="conditionForm" size="small" style="padding-top: 20px;padding-left: 10px" :rules="conditionFormRules">
              <el-form-item label="用户类型" prop="type">
                <el-select v-model="conditions.type" placeholder="请选择用户类型" size="small" @change="changeType">
                  <el-option label="车企" value="1"/>
                  <el-option label="车主" value="2"/>
                </el-select>
              </el-form-item>
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="conditions.name" style="width: 250px" :disabled=true placeholder="请点击右边的图标选择用户">
                        <el-button slot="append" icon="fa fa-search" @click="dialogVisible=true" :disabled="userInfo.userType==2&&conditions.type==1"></el-button>
                    </el-input>
                </el-form-item>

                <el-form-item style="float: right">
                    <el-button type="primary" @click="queryPackageAllowanceData('conditionForm')">统计</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <my-table :table="tableData">
          <template slot-scope="props" slot="offerType">
            <span>{{formatOfferType(props.obj.row.offerType)}}</span>
          </template>
        </my-table>
        <el-dialog v-if="conditions.type === '1'" title="选择车企" :visible.sync="dialogVisible" width="80%">
            <CarEnterpriseList @dealSelectRow="getSelectedCarEnterprise"></CarEnterpriseList>
        </el-dialog>
        <el-dialog v-if="conditions.type === '2'" title="选择车主" :visible.sync="dialogVisible" width="80%">
            <SimList @dealSelectRow="getSelectedSim"></SimList>
        </el-dialog>
    </section>
</template>

<script>
    import CarEnterpriseList from './CarEnterpriseList'
    import SimList from './SimList'
    import MyTable from '../../components/Table.vue'
    export default {
        name: "PackageAllowanceReport",
        components: {
            CarEnterpriseList,
            SimList,
            MyTable
        },
        data() {
            return {
                dialogVisible: false,
                conditions:{
                    name: '',
                    type: '1'
                },
                conditionFormRules:{
                    name: [
                        { required: true, message: '请点击右边的图标选择用户', trigger: 'change' },
                    ],
                },
                tableData: {
                    data:[],
                    columns:[
                        {
                            label: "套餐名称",
                            props: "offerName",
                        },
                        // {
                        //     label: "套餐类型",
                        //     props: "offerType",
                        //     show:true
                        // },
                        {
                            label: "剩余流量",
                            props: "flowBalance",
                        },
                        {
                            label: "剩余短信",
                            props: "newShortMessageBalance",
                        },
                        {
                            label: "剩余语音",
                            props: "newVoiceChatBalance",
                        },
                        {
                            label: "生效时间",
                            props: "effTime",
                        },
                        {
                            label: "失效时间",
                            props: "expTime",
                        },
                    ],
                },
            }
        },
        methods:{
            changeType(type) {
              this.conditions.id = '';
              this.conditions.name = '';
              if (this.userInfo.userType==2 && type ==1){
                this.conditions.id = this.userInfo.id;
                this.conditions.name = this.userInfo.nickname;
              }
            },
            getSelectedCarEnterprise(row){

                this.dialogVisible = false;
                this.conditions.id = row.id;
                this.conditions.name = row.name;
            },
            getSelectedSim(row){
                this.dialogVisible = false;
                this.conditions.id = row.id;
                this.conditions.name = row.number;
            },
            queryPackageAllowanceData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            userId: this.conditions.id+'',
                            userType: this.conditions.type
                        };
                        this.tableData.loading = true;
                        this.$http.getOfferSurplus(params).then((res) => {
                            this.tableData.data = res.data.result;
                            this.tableData.loading = false;
                        }).catch(error => {
                            this.tableData.loading = false;
                        });
                    }
                });
            },
            formatOfferType(offerType) {
              if (offerType == "1") {
                  return "正常";
              } else if(offerType == "0") {
                  return "销毁";
              } else if(offerType == "2") {
                  return "暂停";
              } else if(offerType == "3") {
                return "预激活";
              } else if(offerType == "4") {
                return "已回收"
              } else {
                return offerType;
              }
            }
        },
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      },
      created() {
        if (this.userInfo.userType == 2){
          this.conditions.id = this.userInfo.id;
          this.conditions.name = this.userInfo.nickname;
        }
      }
    }
</script>

<style scoped>

</style>
