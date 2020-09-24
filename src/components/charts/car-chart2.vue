<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    props: {
      className: {
        type: String,
        default: 'yourClassName'
      },
      id: {
        type: String,
        default: 'yourID'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '180px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        this.chart.setOption({
          title: {
            text: '按天新增成员数量'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7'],
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '数量',
            data: [4, 6, 10, 7, 7, 9, 3],
            type: 'line'
          }]
        })
      }
    }
  }
</script>
