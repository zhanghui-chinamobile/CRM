<template>
    <div class="">
        <section>
        <el-form ref="form" :model="content" size="small" style="padding-top: 40px;padding-left: 30px">
          <el-form-item label="车企名称:" v-if="userInfo.userType==1">
            <el-input v-model="content.name" style="width: 300px" @focus="userDialogVisible=true"
                      placeholder="请选择车企"/>
          </el-form-item>
            <el-form-item label="制卡类型">
                <el-select v-model="content.type" style="width: 300px">
                    <el-option label="类型一" value="1"></el-option>
                    <el-option label="类型二" value="2"></el-option>
                    <el-option label="类型三" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="制卡数量" class="formItem" prop="lianxi">
                <el-input v-model="content.count" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item style="width: 120px;padding-left: 120px">
                <el-button type="primary" style="width: 120px" @click="submitRequest">发起制卡请求</el-button>
            </el-form-item>
          <el-dialog title="车企选择" :visible.sync="userDialogVisible" width="80%" :close-on-press-escape="false"
                     append-to-body>
            <CarEnterpriseList @dealSelectRow="getSelected"></CarEnterpriseList>
          </el-dialog>
        </el-form>
        </section>
    </div>
</template>
<script>
    import {CHECK_AUTH_CODE} from '../../common/regexp'
    import CarEnterpriseList from "../report/CarEnterpriseList"

    export default {
        name: "add-sim",
        components: {
          CarEnterpriseList
        },
        props: {
            carEnterVisible: "",
            isShowOperButton: "",
        },
        data() {
            return {
              userDialogVisible:false,
                content: {
                    name: "",
                    type: "",
                    count: "",
                    id: "",
                },
                rules: {
                    name: [
                        {required: true, message: '请选择车企', trigger: 'blur'},

                    ],
                    simType: [
                        {required: true, message: '请选择制卡类型', trigger: 'blur'},

                    ],
                    count: [
                        {required: true, message: '请输入制卡数量', trigger: 'blur'},
                        {pattern: CHECK_AUTH_CODE, message: '请输入数字', trigger: ['blur', 'change']}

                    ],
                },
                carVisible: false,
                selectCarEnterVisible: false,
                label: '批量添加SIM卡',
            };
        },
        methods: {
            selectCarEnter() {
                this.selectCarEnterVisible = true;
            },
            submitRequest() {
                if (!this.content.name) {
                    this.$message({
                        message: "请选择车企",
                        type: "error",
                    });
                    return;
                }
                if (!this.content.type) {
                    this.$message({
                        message: "请选择制卡类型",
                        type: "error",
                    });
                    return;
                }
                if (!this.content.count) {
                    this.$message({
                        message: "请输入制卡数量",
                        type: "error",
                    });
                    return;
                }
                let params = {
                    id: this.content.id,
                    name: this.content.name,
                    description: this.content.type,
                    ext2: this.content.count,
                };
                /* let params = {
                     data: data,
                 };*/
                this.$http.submitSimRequest(params).then((res) => {
                    if (res.data.result == "success") {
                        this.$message({
                            message: "制卡请求发起成功",
                            type: "success",
                        });
                        this.$emit("closeAddSim", true);
                    } else {
                        this.$message({
                            message: "制卡请求发起失败",
                            type: "error",
                        });
                        return;
                    }
                }).catch(error => {
                    this.$message({
                        message: "制卡请求发起失败",
                        type: "error",
                    });
                });

            },
          getSelected(row) {
            this.content.name = row.name;
            this.content.id = row.id;
            this.userDialogVisible = false;
          },
        },
        created() {
            this.operate = this.Type;
            if (this.operate == 'update') {
                this.form = this.CarEnterpriseInfo;
                this.label = '修改车企信息';
            }

        },
        mounted() {
        },
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      }
    }
</script>

<style>
    .addSIM {
        padding: 10px;
        margin: 0 auto;
        width: 300px;
    }

    .addSIM .el-form-item .el-form-item__content {
        margin-right: 40px;
        height: 32px;
        width: 400px !important;
    }
</style>
