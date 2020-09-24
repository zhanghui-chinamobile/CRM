<template>
    <div>
        <el-row class="toolbar">
            <el-form ref="qryCondition" :inline="true" :model="qryCondition" size="small">
                <el-form-item size="small" label="车企:">
                    <el-input placeholder="请选择车企" v-model="qryCondition.userName" @focus="dialogTableVisible=true"
                              class="input-with-select">
                    </el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" htmlType='submit' size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="toolbar">
            <el-row>
                <el-col :span="12">
                    <div id="pine" style="height: 350px"></div>
                </el-col>
                <el-col :span="12">
                    <div id="line_right" style="height: 350px"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div id="line_left" style="height: 350px"></div>
                </el-col>
                <el-col :span="12">
                    <div id='bar_right' style="height: 350px"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div id="user_binded_api_count" style="height: 350px"></div>
                </el-col>
                <el-col :span="12">
                    <div id='user_api_use_stat' style="height: 350px"></div>
                </el-col>
            </el-row>
        </el-row>
        <el-dialog title="查询车企" v-if="dialogTableVisible" :visible.sync="dialogTableVisible" style="text-align: left;"
                   width="70%">
            <car-enterprise-list @dealSelectRow="getSelectedCarEnterprise"></car-enterprise-list>
        </el-dialog>
    </div>
</template>

<script>
    import CarEnterpriseList from '../report/CarEnterpriseList'
    import echarts from 'echarts'

    require('echarts/theme/macarons');
    export default {
        name: "NewReport",
        mounted() {
            this.$nextTick(this.drawAll)
        },
        components: {
            CarEnterpriseList
        },
        data() {
            return {
                dialogTableVisible: false,
                qryCondition: {
                    userName: "",
                    userId: ""
                }
            }
        },
        methods: {
            drawAll() {
                this.drawPine()
                this.drawLineRight()
                this.drawLineLeft()
                this.drawBarRight()
                this.drawUserBindedApiCounts();
                this.drawUserApiUseStats();
            },
            drawBarRight() {
                let num =
                this.charts = echarts.init(document.getElementById('bar_right'))
                this.charts.setOption({
                    title: {
                        text: '套餐使用人数统计',
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['套餐1', '套餐2', '套餐3', '套餐4', '套餐5', '套餐6', '套餐7'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '用户数量',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        }
                    ]
                })
            },
            drawLineLeft() {
                this.charts = echarts.init(document.getElementById('line_left'))
                this.charts.setOption({
                    title: {
                        text: 'arpu分析',
                    },
                    xAxis: {
                        name: '时',
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'
                            , '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                    },
                    yAxis: {
                        name: 'arpu',
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320,
                            820, 932, 901, 934, 1290, 1330, 1320,
                            820, 932, 901, 934, 1290, 1330, 1320,
                            820, 932, 901],
                        type: 'line'
                    }]
                })
            },
            drawPine() {
                this.charts = echarts.init(document.getElementById('pine'))
                this.charts.setOption({
                    title: {
                        text: '流量分布',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}M ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['QQ', '微信', 'UC', '腾讯视频']
                    },
                    calculable: true,
                    series: [
                        {
                            name: '流量来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 335, name: 'QQ'},
                                {value: 310, name: '微信'},
                                {value: 234, name: 'UC'},
                                {value: 135, name: '腾讯视频'},
                            ]
                        }
                    ]
                })
            },
            drawLineRight() {
                this.charts = echarts.init(document.getElementById('line_right'))
                this.charts.setOption({
                    title: {
                        text: '业务统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['语音(分钟)', '流量(M)', '短信(条)']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2018/11/1', '2018/11/2', '2018/11/3', '2018/11/4', '2018/11/5', '2018/11/6', '2018/11/7']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '语音(分钟)',
                            type: 'line',
                            stack: '使用',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '流量(M)',
                            type: 'line',
                            stack: '使用',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '短信(条)',
                            type: 'line',
                            stack: '使用',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        }
                    ]
                })
            },
            drawUserBindedApiCounts() {
                this.charts5 = echarts.init(document.getElementById('user_binded_api_count'));
                this.charts5.setOption({
                    title: {
                        text: '车企绑定接口量统计',
                    },
                    color: ['#096dd9'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['奥迪', '宝马', '路虎', '兰博基尼', '玛莎拉蒂', '雷克萨斯', '迈巴赫'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '接口调用数量',
                            type: 'bar',
                            barWidth: '60%',
                            data: [80, 50, 120, 180, 210, 60, 150],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        }
                    ]
                });
            },
            drawUserApiUseStats() {
                this.charts6 = echarts.init(document.getElementById('user_api_use_stat'));
                this.charts6.setOption({
                    title: {
                        text: '车企接口使用统计',
                    },
                    color: ['#389e0d','#cf1322','#096dd9'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['成功量', '失败量','调用时长']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '调用量',
                        }, {
                            type: 'value',
                            name: '调用时长',
                        }
                    ],
                    series: [
                        {
                            name: '成功量',
                            type: 'bar',
                            stack: '总量',
                            barWidth: '60%',
                             // color:'#389e0d',
                            data: [90, 30, 120, 150, 100, 60, 80],
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'top',
                                    position: 'inside'

                                }
                            },
                        },
                        {
                            name: '失败量',
                            stack: '总量',
                            type: 'bar',
                            barWidth: '60%',
                            // color:'#cf1322',
                            data: [9, 5, 12, 8, 15, 6, 10],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                        },
                        {
                            name:'调用时长',
                            type:'line',
                            yAxisIndex: 1,
                            // color:'#096dd9',
                            data:[2.0, 2.2, 3.3, 4.5, 6.3, 7.2, 5.3, 2.4, 2.0, 6.5, 1.8, 6.2]
                        }
                    ]
                });
            },
            getSelectedCarEnterprise(row) {
                this.dialogTableVisible = false;
                this.qryCondition.userId = row.id;
                this.qryCondition.userName = row.name;
            }
        }
    }
</script>

<style scoped>

</style>
