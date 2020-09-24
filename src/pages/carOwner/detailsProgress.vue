<template>
    <el-tabs type="border-card">
        <div class="box">
            <div class="left" :model="count">
                <el-tooltip class="item" effect="dark" content="7000M/10240M" placement="left-start"
                            style="padding-top: 30px">
                    <span style="font-size: 15px">流量: {{count.llDetail}}</span>
                </el-tooltip>
                <el-progress :text-inside="true" :stroke-width="38" :percentage="count.llCount"
                             style="padding-top: 10px" status="text">
                </el-progress>
                <el-tooltip class="item" effect="dark" content="50条/100条" placement="left" style="padding-top: 30px">
                    <span style="font-size: 15px">短信: {{count.dxDetail}}</span>
                </el-tooltip>
                <el-progress :text-inside="true" :stroke-width="38" :percentage="count.dxCount"
                             color="rgba(142, 113, 199, 0.7)" style="padding-top: 10px"></el-progress>
                <el-tooltip class="item" effect="dark" content="96分钟/100分钟" placement="left-end"
                            style="padding-top: 30px">
                    <span style="font-size: 15px">语音: {{count.yyDetail}}</span>
                </el-tooltip>
                <el-progress :text-inside="true" :stroke-width="38" :percentage="count.yyCount" status="exception"
                             style="padding-top: 10px"></el-progress>
            </div>
        </div>
    </el-tabs>


</template>

<script>

    export default {
        name: "DetailProgress",
        props: {
            simId: ""
        },
        data() {
            return {
                id: "",
                label: "",
                count: {
                    llCount: 70,
                    dxCount: 50,
                    yyCount: 96,
                    llDetail:"7000M/10240M",
                    dxDetail:"50条/100条",
                    yyDetail:"96分钟/100分钟",
                },
            }

        },
        methods: {
            getSimOfferUseDetail() {
                let params = {
                    id: this.id,
                };
                this.$http.getSimOfferUseDetail(params).then((res) => {
                    const data = res.data.result;
                    for (var i = 0; i < data.length; i++) {
                        let type = data[i].id;
                        if (data[i].totalValue == 0) {
                            this.count.llCount = 100;
                            continue;
                        }
                        if (type == 1) {
                            this.count.llCount = parseInt((data[i].usedValue / data[i].totalValue) * 100);
                            this.count.llDetail = data[i].usedValue + "M/" +  data[i].usedValue + "M";

                        } else if (type == 2) {
                            this.count.dxCount = parseInt((data[i].usedValue / data[i].totalValue) * 100);
                            this.count.dxDetail = data[i].usedValue + "条/" +  data[i].usedValue + "条";
                        }
                        if (type == 3) {
                            this.count.yyCount = parseInt((data[i].usedValue / data[i].totalValue) * 100);
                            this.count.yyDetail = data[i].usedValue + "分钟/" +  data[i].usedValue + "分钟";
                        }
                    }
                }).catch(error => {
                });
            },
        },
    }
</script>


<style>


</style>
