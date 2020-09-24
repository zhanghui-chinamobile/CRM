<template>
    <section style="height: 400px;">
        <el-col span="12">
            <ve-pie :data="pieData"></ve-pie>
        </el-col>
        <el-col span="12">
            <ve-line :data="lineData" :setting="chartSettings"></ve-line>
        </el-col>
    </section>
</template>

<script>
    import VePie from 'v-charts/lib/pie.common'
    import VeLine from 'v-charts/lib/line.common'

    export default {
        name: "PoolInfoChart",
        components: {
            VePie,
            VeLine
        },
        data() {
            this.chartSettings = {
                axisSite: {right: ['已使用']},
                yAxisType: ['KMB', 'percent'],
                yAxisName: ['数值', '比率']
            };
            return {
                pieData: {
                    columns: ['类型', '流量'],
                    rows: [
                        {'类型': '已使用', '流量': 204800},
                        {'类型': '剩余', '流量': 13792},
                        {'类型': '冻结', '流量': 4593}
                    ]
                },
                lineData: {
                    columns: ['日期', '用户量', '使用流量', '使用率'],
                    rows: [
                        {'日期': '2018/1/1', '用户量': 1393, '使用流量': 1093, '下单率': 0.32},
                        {'日期': '2018/2/2', '用户量': 3530, '使用流量': 3230, '下单率': 0.26},
                        {'日期': '2018/3/3', '用户量': 2923, '使用流量': 2623, '下单率': 0.76},
                        {'日期': '2018/4/4', '用户量': 1723, '使用流量': 1423, '下单率': 0.49},
                        {'日期': '2018/5/5', '用户量': 3792, '使用流量': 3492, '下单率': 0.323},
                        {'日期': '2018/6/6', '用户量': 4593, '使用流量': 4293, '下单率': 0.78}
                    ]
                }
            }
        },
        mounted() {
            this.drawPie();
            this.drawLing();
        },
        methods: {
            drawPie() {
            },
            drawLing() {
            }
        }
    }
</script>

<style scoped>

</style>
