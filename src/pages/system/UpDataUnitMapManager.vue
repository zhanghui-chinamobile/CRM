<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" ref="conditionForm" size="small" style="padding-top: 0px;padding-left: 10px">
                <el-form-item style="float: right">
                    <!--<el-button type="primary" @click="queryUpDataUnitMap('conditionForm')">查询</el-button>-->
                    <el-button type="primary" @click="showDetail()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--<my-table :table="tableData" />-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="srcVal" label="源值"/>
            <el-table-column prop="srcUnit" label="源单位">
                <template slot-scope="{row}">
                    <span>{{ formatUnit(row.srcUnit) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="srcType" label="源类型" width="100">
                <template slot-scope="{row,column,$index}">
                    <span>{{ formatType(row.srcType) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="dstVal" label="目标值"/>
            <el-table-column prop="dstUnit" label="目标单位">
                <template slot-scope="myscope">
                    <span>{{ formatUnit(myscope.row.dstUnit) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="dstType" label="目标类型" width="100">
                <template slot-scope="scope">
                    <span>{{ formatType(scope.row.dstType) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="effTime" label="生效时间"/>
            <el-table-column prop="expTime" label="失效时间"/>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row)" type="primary" size="small">修改</el-button>
                    <el-button @click="deleteUnitMap(scope.row)" type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                           :current-page.sync="pageSync" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <el-dialog :title="title" :visible.sync="isVisible" width="700px">
            <el-form :inline="true" :model="form" ref="detailForm" size="small" style="" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="源类型" prop="srcType">
                          <el-select v-model="form.srcType" placeholder="请选择源类型" size="small" @change="changeUnit">
                            <el-option label="语音" value="1"/>
                            <el-option label="流量" value="2"/>
                            <el-option label="短信" value="3"/>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="源值" prop="srcVal">
                            <el-input v-model="form.srcVal" placeholder="请输入源值" />
                        </el-form-item>
                        <el-form-item label="源单位" prop="srcUnit">
                            <!--<el-select v-model="form.srcUnit" placeholder="请选择源单位" size="small">-->
                                <!--<el-option label="分种" value="m"/>-->
                                <!--<el-option label="小时" value="h"/>-->
                                <!--<el-option label="M" value="M"/>-->
                                <!--<el-option label="G" value="G"/>-->
                                <!--<el-option label="条数" value="c"/>-->
                            <!--</el-select>-->
                          <el-select v-model="form.srcUnit">
                            <!--<el-option label="通用" value="0"></el-option>-->
                            <el-option v-for="item in units" :label="item.label" :value="item.value" :key="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="生效时间" prop="effTime">
                            <el-date-picker v-model="form.effTime" type="date" placeholder="请选择生效时间" value-format="yyyy-MM-dd HH:mm:ss"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目标类型" prop="dstType">
                          <el-select v-model="form.dstType" placeholder="请选择目标类型" size="small" @change="changeDestUnit">
                            <el-option label="语音" value="1"/>
                            <el-option label="流量" value="2"/>
                            <el-option label="短信" value="3"/>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="目标值" prop="dstVal">
                            <el-input v-model="form.dstVal" placeholder="请输入目标值"/>
                        </el-form-item>
                        <el-form-item label="目标单位" prop="dstUnit">
                            <!--<el-select v-model="form.dstUnit" placeholder="请选择目标单位" size="small">-->
                                <!--<el-option label="分种" value="m"/>-->
                                <!--<el-option label="小时" value="h"/>-->
                                <!--<el-option label="M" value="M"/>-->
                                <!--<el-option label="G" value="G"/>-->
                                <!--<el-option label="条数" value="c"/>-->
                            <!--</el-select>-->
                          <el-select v-model="form.dstUnit">
                            <!--<el-option label="通用" value="0"></el-option>-->
                            <el-option v-for="item in destUnits" :label="item.label" :value="item.value" :key="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="失效时间" prop="expTime">
                            <el-date-picker v-model="form.expTime" type="date" placeholder="请选择失效时间" value-format="yyyy-MM-dd HH:mm:ss"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer">
                <el-button @click="isVisible = false">取消</el-button>
                <el-button type="primary" @click="saveUnitMap('detailForm')">保存</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    import MyTable from '../../components/Table.vue'
    export default {
        name: "UpDataUnitMapManager",
        components:{
            MyTable,
        },
        data(){
            return{
              units:[
                {
                  label: "分钟",
                  value: "m"
                },
                {
                  label: "小时",
                  value: "h"
                }
              ],
              destUnits:[
                {
                  label: "分钟",
                  value: "m"
                },
                {
                  label: "小时",
                  value: "h"
                }
              ],
                tableData: [],
                page: 0,
                pageSync: this.page + 1,
                total: 0,
                form:{
                    srcVal:'',
                    srcUnit:'',
                    srcType:'',
                    dstVal:'',
                    dstUnit:'',
                    dstType:'',
                    effTime:'',
                    expTime:'',
                    status:1
                },
                isVisible:false,
                title:'',
                rules: {
                    srcVal: [
                        { required: true, message: '请输入源值', trigger: 'blur' }
                    ],
                    srcUnit: [
                        { required: true, message: '请选择源单位', trigger: 'blur' }
                    ],
                    srcType: [
                        { required: true, message: '请选择源类型', trigger: 'blur' }
                    ],
                    dstVal: [
                        { required: true, message: '请输入目标值', trigger: 'blur' }
                    ],
                    dstUnit: [
                        { required: true, message: '请选择目标单位', trigger: 'blur' }
                    ],
                    dstType: [
                        { required: true, message: '请选择目标类型', trigger: 'blur' }
                    ],
                    effTime: [
                        { required: true, message: '请选择生效时间', trigger: 'blur' }
                    ],
                    expTime: [
                        { required: true, message: '请选择失效时间', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){
            this.queryUpDataUnitMap();
        },
        methods:{
          changeUnit(e) {
            switch (e){
              case "1":
                this.units=[
                  {
                    label: "分钟",
                    value: "m"},
                  {
                    label: "小时",
                    value: "h"
                  }];
                break;
              case "2":
                this.units=[{
                  label: "MB",
                  value: "M"
                },
                  {
                    label: "GB",
                    value: "G"
                  }];
                break;
              case "3":
                this.units=[{
                  label: "条",
                  value: "c"
                }];
                break;
            }
          },
          changeDestUnit(e) {
            switch (e){
              case "1":
                this.destUnits=[
                  {
                  label: "分钟",
                  value: "m"
                  },
                  {
                    label: "小时",
                    value: "h"
                  }];
                break;
              case "2":
                this.destUnits=[{
                  label: "MB",
                  value: "M"
                },
                  {
                    label: "GB",
                    value: "G"
                  }];
                break;
              case "3":
                this.destUnits=[{
                  label: "条",
                  value: "c"
                }];
                break;
            }
          },
            showDetail(row){
                if (row){
                    this.form = {...row};
                    this.form.srcType += '';
                    this.form.dstType += '';
                    this.title = "修改计量映射";
                }else{
                    for (let key in this.form){
                        this.form[key] = '';
                    }
                    this.form.status = 1;
                    this.form.id = '';
                    this.title = '新增计量映射';
                }
                this.changeUnit(this.form.srcType);
                this.changeDestUnit(this.form.dstType);
                this.isVisible = true;
            },
            deleteUnitMap(row) {
                this.$confirm(`确认删除该计量映射？`, '删除确认',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.deleteUpDataUnitMap(row).then(res => {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.isVisible = false;
                        this.queryUpDataUnitMap();
                    }).catch(err => {
                        console.log('err',err);
                    })
                }).catch(() => {});
            },
            saveUnitMap(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.saveUpDataUnitMap(this.form).then((res) => {
                            const action = this.form.id?"修改":'新增';
                            if (res.data.success){
                                this.$message({
                                    message: action + '成功！',
                                    type: 'success'
                                });
                                this.isVisible = false;
                                this.queryUpDataUnitMap();
                            }else{
                                this.$message({
                                    message: action + '失败: '+res.data.errorMsg,
                                    type: 'error'
                                });
                            }
                        }).catch(error => {
                            this.$message({
                                message: action + '失败: '+error,
                                type: 'error'
                            });
                        });
                    }
                });
            },
            queryUpDataUnitMap() {
                this.pagesync = 1;
                this.page = this.pagesync - 1;
                this.getUpDataUnitMapList();
            },
            handleCurrentChange(currentPage) {
                this.page = currentPage - 1;
                this.getUpDataUnitMapList();
            },
            getUpDataUnitMapList(){
                const data = {
                };
                let params = {
                    currentPage: this.page,
                    pageSize: 10,
                    data: data,
                };
                this.$http.getUpDataUnitMapList(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData = res.data.result.entities;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            },
            formatType(type) {
                switch(type){
                    case 1:
                        return "语音";
                    case 2:
                        return "流量";
                    case 3:
                        return "短信";
                    default:
                        return "未知";
                }
            },
            formatUnit(value) {
                switch(value){
                    case 'm':
                        return "分钟";
                    case 'h':
                        return "小时";
                    case 'M':
                        return "MB";
                    case 'G':
                        return "GB";
                    case 'c':
                        return "条";
                    default:
                        return "未知";
                }
            }


        }
    }
</script>

<style scoped>

</style>
