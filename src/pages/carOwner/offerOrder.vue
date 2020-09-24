<!--车主已办业务套餐新增和订购所用dialog-->
<template>
    <section>
        <el-col :span="24" class="toolbar" style="float: none">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="套餐名称">
                    <el-input v-model="formInline.name" placeholder="输入套餐信息"></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit" style="float: right;margin-right: 10px">查询</el-button>
                <el-form-item label="当前套餐名称" v-if="isUpdate">
                    <el-input v-model="formInline.currentName" style="width: 220px" placeholder="输入套餐信息"
                              disabled></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <!--套餐表格 -->
        <c-table :table="tableData">
            <!-- 格式化生效时间 -->
            <!--<template slot-scope="props" slot="effTime">-->
                <!--<span>{{timestampToFullDate(props.obj.row.createTime)}}</span>-->
            <!--</template>-->
            <!--&lt;!&ndash; 格式化失效时间 &ndash;&gt;-->
            <!--<template slot-scope="props" slot="expTime">-->
                <!--<span>{{timestampToFullDate(props.obj.row.updateTime)}}</span>-->
            <!--</template>-->
        </c-table>

        <!--显示产品表单-->
        <!--<c-table :table="prodData">-->
        <!--</c-table>-->

        <el-row>
            <el-table
                :data="prodData.data"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="国内流量" style="display: block;height: 15px;padding-left: 40px">
                                <span>{{ props.row.flow }}</span>
                            </el-form-item>
                            <el-form-item label="语音通话" style="display: block;height: 15px;padding-left: 40px">
                                <span>{{ props.row.call }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="产品名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="产品状态"
                    prop="status">
                </el-table-column>
                <el-table-column
                    label="生效时间"
                    prop="createTime">
                </el-table-column>
                <el-table-column
                    label="失效时间"
                    prop="updateTime">
                </el-table-column>
                <el-table-column
                    label="价格（元）"
                    prop="price">
                </el-table-column>
            </el-table>
        </el-row>

        <div slot="footer" class="dialog-footer" style="text-align: center;margin: auto">
            <el-button type="primary" style="margin-top: 10px" @click="commitData">提交</el-button>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import types from "../../store/mutation-types";
    import CTable from '../../components/Table.vue';

    export default {
        components: {
            CTable,
        },
        props: {
            simId: "",
            Type: "",
            currOfferId: "",
            currOfferName: "",
            simSingleId:"",
        },
        data() {
            return {
                singleId :"",
                currId: "",
                currName: "",
                offerId: 0,
                title: "",
                ids: "",
                flag: false,
                type: "",
                isUpdate: false,
                showProdInfoVisible: false,
                formInline: {
                    name: '',
                    currentName: '',
                },
                tableData: {
                    loading: false,
                    hasSelect: true, //是否有选中的功能
                    data: [{
                        id: 0,
                        name: '套餐一',
                        offerType: '套餐',
                        createTime: '2018-09-01',
                        updateTime: '2099-12-31',
                        status: '生效',
                        price: '20'}],
                    columns: [
                        {
                            label: "套餐名称",
                            props: "name",
                        },
                        {
                            label: "套餐状态",
                            props: "status",
                        },
                        {
                            label: "生效时间",
                            props: "createTime",
                        },
                        {
                            label: "失效时间",
                            props: "updateTime",
                        },
                        {
                            label: "价格（元）",
                            props: "price",
                        }
                    ]
                },
                prodData: {
                    loading: false,
                    data: [{
                        name: "产品1",
                        createTime: '2018-09-01',
                        updateTime: '2099-12-31',
                        status: '生效',
                        price: '20',
                        flow: '1024M',
                        call: '200分钟'
                    }],
                    columns: [
                        {
                            label: "产品名称",
                            props: "name",
                        },
                        {
                            label: "产品状态",
                            props: "status",
                        },
                        {
                            label: "生效时间",
                            props: "createTime",
                        },
                        {
                            label: "失效时间",
                            props: "updateTime",
                        },
                        {
                            label: "价格（元）",
                            props: "price",
                        }
                    ]
                },
                tableEvents: {
                    rowDbClick: this.selectOffer
                }
            }
        },
        methods: {
            ...
                mapMutations({
                    setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
                }),
            timestampToFullDate(value) {
                return timestampToFullDate(value)
            },
            commitData() {
                if (this.offerId == 0) {
                    this.$message({
                        message: "请选择套餐",
                        type: "error",
                    });
                    return;
                }
                if (this.type == "add") {
                    let params = {
                        ids: this.ids,
                        offerId: this.offerId,
                    };
                    this.$http.orderSimOffer(params).then((res) => {
                        const message = res.data.result;
                        if (message == "订购成功") {
                            this.$message({
                                message: message,
                                type: "success",
                            });
                            this.$emit("closeBilling");
                        }
                    }).catch(error => {
                        this.$message({
                            message: "订购失败",
                            type: "error",
                        });
                    });
                } else {
                    let params = {
                        userId: this.singleId,
                        offerId: this.offerId,
                    };
                    this.$http.updateSimOffer(params).then((res) => {
                        const message = res.data.result;
                        if (message == "success") {
                            this.$message({
                                message: "套餐变更成功",
                                type: "success",
                            });
                            this.$emit("closeBilling");
                        }
                    }).catch(error => {
                        this.$message({
                            message: "套餐变更失败",
                            type: "error",
                        });
                    });
                }

            },
            isSuccess() {
                return this.flag;
            }
            ,
            showProdInfo(row) {
                let params = {
                    id: row.id,
                };
                this.prodData.loading = true;
                this.$http.getUpProdsByOfferId(params).then((res) => {
                    this.total = res.data.result.count;
                    this.prodData.data = res.data.result;
                    this.prodData.loading = false;
                }).catch(error => {
                    this.prodData.loading = false;
                });
            }
            ,

            selectOffer(row, event) {
                if (row.name == this.currName) {
                    this.$message({
                        message: "请选择与当前套餐【" + this.currName + "】不同的套餐",
                        type: "error",
                    });
                    return;
                }
                this.showProdInfo(row);
                this.offerId = row.id;

            }
            ,

            onSubmit() {
                let params = {
                    name: this.formInline.name,
                };
                this.tableData.loading = true;
                this.tableData.loading = true;
                this.$http.getUpOffersByName(params).then((res) => {
                    this.total = res.data.result.count;
                    this.tableData.data = res.data.result;
                    this.tableData.loading = false;
                }).catch(error => {
                    this.tableData.loading = false;
                });
            }
            ,
            handleCurrentChange(val) {
                this.currentRow = val;

            }
        }
        ,
        created() {
            this.singleId = this.simSingleId;
            this.ids = this.simId;
            this.type = "add";
            if (this.Type != undefined) {
                this.type = this.Type;
            }
            if (this.type == "update") {
                this.isUpdate = true;
                this.currId = this.currOfferId;
                this.currName = this.currOfferName;
                this.formInline.currentName = this.currOfferName;
            }
            let itmes = [
                {
                    name: "套餐订购",
                    icon: "fa fa-windows",
                    path: "/show/Billing",
                },
            ];
            this.setBreadcrumbItems(itmes);
            this.onSubmit();
        }
        ,

    }

</script>

<style scoped>

</style>

